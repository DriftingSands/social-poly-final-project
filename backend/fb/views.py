import os
from facebook import GraphAPI
from rest_framework import response
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from fb.models import FacebookPost
from fb.serializers import FacebookSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from apscheduler.schedulers.background import BackgroundScheduler


User = get_user_model()
app_id = client_id = "572036803856268"  # os.environ.get('FACEBOOK_APP_ID')
app_secret = client_secret = "6b206dc4613513860222e121e3f5ea09"  # os.environ.get('FACEBOOK_APP_SECRET')
redirect_uri = "https://socialpoly.ch/"  # os.environ.get('FACEBOOK_REDIRECT_URI')
redirect_uri_encoded = "https%3A%2F%2Fsocialpoly.ch%2F"  # os.environ.get('FACEBOOK_REDIRECT_URI_ENCODED')
access_token = 'EAAIIQ7JZBB4wBADhC4LCffCVl4yUwFAYXOZA5dmTIYYXnClwVrZCSIWYFVoiy4kBixnuxHP22lbhtUcOileIKlVpPnJukOIBZBLEjKk1zQ42um8Yb8dzhbqowXeQNUn5YAX1mhdN2ExpGG0JhzdgqBUVBsUXbn7CmZBoZAUmjcuId8Q9CRSZA7I3RZBkAui04AAZD'
state = 987654321


class SendPost(GenericAPIView):
    serializer_class = FacebookSerializer
    queryset = FacebookPost.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)

        graph = GraphAPI(access_token)
        post = request.data['content']
        page_owner = "me"
        appears_on = "feed"

        if 'send_time' in request.data.keys():
            trigger = request.data['send_time']
            scheduler = BackgroundScheduler()
            def job(page_id, page_type, content):
                graph.put_object(page_id, page_type, message=content)

            scheduler.add_job(job, 'date', run_date=trigger, id=post, args=[page_owner, appears_on, post],
                              replace_existing=True)
            scheduler.start()
            return Response({'page Id: ': "success"})
        else:
            graph.put_object(page_owner, appears_on, message=post)
            return Response({'page Id: ': "success"})

class Auth(APIView):

    def get(self, request):
        # perms = ["manage_pages", "publish_pages"]
        # graph = GraphAPI(access_token=access_token)
        # fb_login_url = graph.get_auth_url(app_id, redirect_uri)
        # received_acces_token = graph.get_access_token_from_code(code, redirect_uri, app_id, app_secret)
        request_code_url = f"https://www.facebook.com/v12.0/dialog/oauth?client_id={app_id}&redirect_uri={redirect_uri_encoded}&state={state}"
        return Response({'auth url: ': request_code_url})


class GetToken(APIView):
    def get(self, request):
        graph = GraphAPI(access_token)
        # facebook_token_url = f"https://www.graph.facebook.com/v6.0/oauth/access_token?redirect_uri={redirect_uri_encoded}&client_id={client_id}&client_secret={client_secret}&code="
        get_token = graph.get_access_token_from_code(request.data['code'], redirect_uri, app_id, app_secret)
        return Response({'token url: ': get_token})


class GetLastPosts(APIView):
    def get(self, request):
        graph = GraphAPI(access_token)
        feed = graph.get_object("me")
        return Response({'users feed': feed})


class ChangeAccessToken(APIView):

    def get(self, request):
        graph = GraphAPI(access_token)
        extended = graph.extend_access_token(app_id, app_secret)
        # debug = graph.debug_access_token(access_token, app_id, app_secret)
        return Response({'token': extended})
