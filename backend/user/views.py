import os, requests
from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from user.models import User
from user.serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework.response import Response
from linkedin.linkedin_helpers import headers, user_info, authorize, refresh_token

class ListAllUsersView(ListAPIView):
    """
    get:
    List all users
    search: filter
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        search_string = self.request.query_params.get('search')
        if search_string:
            return User.objects.filter(username__icontains=search_string)
        return User.objects.all()


class SpecificUserView(RetrieveAPIView):
    """
    get:
    Get specific user profile
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'


class RetrieveUpdateProfileView(GenericAPIView):
    """
    get:
    Get own profile
    patch:
    Update own profile
    """
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        return Response(self.get_serializer(user).data)

    def patch(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=user, **serializer.validated_data)
        return Response(serializer.validated_data)

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer


class RetrieveUpdateUserLinkedinView(GenericAPIView):
    """
    patch:
    Update user linkedin parameters
    get:
    Get user Linkedin information
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def patch(self, request, *args, **kwargs):

        user = User.objects.get(id=request.user.id)

        if(request.data['linked_in_auth_code']):
            try:
                client_id = os.environ.get('LINKEDIN_CLIENT_ID')
                client_secret = os.environ.get('LINKEDIN_CLIENT_SECRET')
                redirect_uri = os.environ.get('LINKEDIN_REDIRECT_URI')
                access_token_url = os.environ.get('LINKEDIN_ACCESS_TOKEN_URL')
                linkedin_token = refresh_token(request.data['linked_in_auth_code'], client_id, client_secret, redirect_uri, access_token_url)
                serializer = UserSerializer(user, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save(user_id=user, linked_in_access_token=linkedin_token, **serializer.validated_data)
                return Response(serializer.validated_data)
            except Exception as e:
                print(e)
                return Response({"error":str(e)})


    def get(self, request, *args, **kwargs):

        user = User.objects.get(id=request.user.id)

        try:
            access_token = user.linked_in_access_token
            linkedin_me_url = os.environ.get('LINKEDIN_ME_URL')
            linkedin_headers = headers(access_token)  # Make the headers to attach to the API call.
            linkedin_user_info = user_info(linkedin_headers,linkedin_me_url)  # Get user info
            avatar_object_url =  "https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))&oauth2_access_token=" + access_token
            avatar_response = requests.get(avatar_object_url)
            response_complete = avatar_response.json()
            print(response_complete)
            avatar_picture_data = avatar_response.json()['profilePicture']['displayImage~']['elements'][0]['identifiers'][0]['identifier']
            response = {
                "id": linkedin_user_info['id'],
                "first_name": linkedin_user_info['firstName']['localized']['en_US'],
                "last_name": linkedin_user_info['lastName']['localized']['en_US'],
                "avatar_picture_data": avatar_picture_data
            }

            return Response({"results": response})
            #return Response(response_complete)
        except Exception as e:
            print(e)
            return Response({"error":str(e)})
