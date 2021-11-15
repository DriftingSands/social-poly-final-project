"""
step 1
LinkedInuserAuth ==> ok


step 2
catch the authorization verifier code from the callback url ==> being done on the FrontEnd

step 3
get the access token stored in the user DB ==> ok
"""
import os

from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .linkedin_helpers import *
from .models import LinkedInPost
from .serialzers import LinkedInPostSerializer
from apscheduler.schedulers.background import BackgroundScheduler


User = get_user_model()

class LinkedinAuth(APIView):
    """
    post:
    LinkedIn Authentication: get login URL
    """

    def post(self, request):

        client_id = os.environ.get('LINKEDIN_CLIENT_ID')
        api_url = os.environ.get('LINKEDIN_API_URL')
        redirect_uri = os.environ.get('LINKEDIN_REDIRECT_URI')

        try:
            response = authorize(api_url, client_id, redirect_uri)
            return Response({"url": response})
        except Exception as e:
            print(e)
            return Response({"error":str(e)})


class LinkedinPost(GenericAPIView):
    """
    post:
    Make a post
    """

    queryset = LinkedInPost.objects.all()
    serializer_class = LinkedInPostSerializer


    def post(self, request, *args, **kwargs):

        user = User.objects.get(id=request.user.id)

        serializer = LinkedInPostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)
    

        linkedin_access_token = user.linked_in_access_token
        linkedin_headers = headers(linkedin_access_token)  # Make the headers to attach to the API call.
        linkedin_me_url = os.environ.get('LINKEDIN_ME_URL')
        linkedin_post_url = os.environ.get('LINKEDIN_UGC_POST_URL')
        linkedin_user_info = user_info(linkedin_headers, linkedin_me_url)
        urn = linkedin_user_info['id']
        linkedin_author = f'urn:li:person:{urn}'  # called author in the linkedin model
        linkedin_post_message = request.data['content']  # comes from the FrontEnd
        linkedin_post_link = request.data['link'] if 'link' in request.data.keys() else ""
        linkedin_post_image = request.data['image'] if 'image' in request.data.keys() else ""
        image = request.FILES["image"] if 'image' in request.data.keys() else ""
        has_media = linkedin_post_link != "" or linkedin_post_image != ""
        #print("this is the value of has_media: ",has_media)

        linkedin_image_registration_url = os.environ.get('LINKEDIN_IMAGE_REGISTRATION_URL')
        image_upload_asset = register_image_and_return_asset(linkedin_image_registration_url,linkedin_author,image,headers=linkedin_headers) if 'image' in request.data.keys() else ""

        post_data = {
            "author": linkedin_author,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": linkedin_post_message
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }

        post_data_with_image = {
            "author": linkedin_author,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": linkedin_post_message
                    },
                    "shareMediaCategory": "IMAGE",
                    "media": [
                        {
                            "status": "READY",
                            "description": {
                                "text": "Center stage!"
                            },
                            "media": image_upload_asset,
                            "title": {
                                "text": "testing image upload!"
                            }
                        }
                    ]
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }


        if 'post_date_time' in request.data.keys() and has_media:
            def job(request_url, request_headers, request_json):
                print("inside job")
                requests.post(request_url, headers=request_headers, json=request_json)

            trigger = request.data['post_date_time']
            scheduler = BackgroundScheduler()
            scheduler.add_job(job, 'date', run_date=trigger, id="tweet",
                              args=[linkedin_post_url, linkedin_headers, post_data_with_image],
                              replace_existing=True)
            scheduler.start()
        elif 'post_date_time' in request.data.keys() and not has_media:
            def job(request_url,request_headers,request_json):
                print("inside job")
                requests.post(request_url, headers=request_headers, json=request_json)

            trigger = request.data['post_date_time']
            scheduler = BackgroundScheduler()
            scheduler.add_job(job, 'date', run_date=trigger, id="tweet", args=[linkedin_post_url,linkedin_headers,post_data],
                              replace_existing=True)
            scheduler.start()
        else:
            post_data_for_request = post_data_with_image if has_media else post_data
            requests.post(linkedin_post_url, headers=linkedin_headers, json=post_data_for_request)
        return Response({"message": "post successful."})


class ListLinkedinPosts(ListAPIView):
    serializer_class = LinkedInPostSerializer
    queryset = LinkedInPost.objects.all()

    def get(self, request, *args, **kwargs):
        if self.kwargs:
            queryset = self.get_queryset().filter(author=self.kwargs['author_id'])
        else:
            queryset = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetScheduledPosts(ListAPIView):
    serializer_class = LinkedInPostSerializer
    queryset = LinkedInPost.objects.all().filter(post_date_time__contains=" ")

    def get(self, request, *args, **kwargs):
        if self.kwargs:
            queryset = self.get_queryset().filter(author=self.kwargs['author_id'])
        else:
            queryset = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
