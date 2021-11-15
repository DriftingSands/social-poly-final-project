import os
import tweepy
from django.core.files.storage import FileSystemStorage
from rest_framework.generics import GenericAPIView, ListCreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from twitter.serializers import TwitterSerializer
from user.serializers import UserSerializer
from twitter.models import Tweet
from django.contrib.auth import get_user_model
import json
from apscheduler.schedulers.background import BackgroundScheduler


User = get_user_model()
bearer_token = os.environ.get('TWITTER_BEARER_TOKEN')

class CreateTweetOnTime(GenericAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)
        access_token = self.request.user.twitter_access_token
        access_token_secret = self.request.user.twitter_access_token_secret
        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'))
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        api.verify_credentials()
        tweet = request.data['content']

        if request.data['send_time'] != "" and 'images' in request.data.keys():
            def publish_tweet(text, image):
                api.update_status(text, media_ids=[image.media_id])

            trigger = request.data['send_time']
            file = request.FILES['images']
            fs = FileSystemStorage()
            filename = fs.save(file.name, file)
            uploaded_file_path = fs.path(filename)

            media = api.media_upload(uploaded_file_path)

            scheduler = BackgroundScheduler()
            scheduler.add_job(publish_tweet, 'date', run_date=trigger, id="tweet", args=[tweet, media],
                              replace_existing=True)
            scheduler.start()

        elif request.data['send_time'] != "" and 'images' not in request.data.keys():
            def publish_tweet(text):
                api.update_status(text)

            trigger = request.data['send_time']
            scheduler = BackgroundScheduler()
            scheduler.add_job(publish_tweet, 'date', run_date=trigger, id="tweet", args=[tweet],
                              replace_existing=True)
            scheduler.start()

        elif request.data['send_time'] == "" and 'images' in request.data.keys():
            file = request.FILES['images']
            fs = FileSystemStorage()
            filename = fs.save(file.name, file)
            uploaded_file_path = fs.path(filename)
            media = api.media_upload(uploaded_file_path)
            api.update_status(tweet, media_ids=[media.media_id])

        else:
            api.update_status(tweet)
        return Response(serializer.data)


class ShowMe(APIView):

    def get(self, request):
        access_token = self.request.user.twitter_access_token
        access_token_secret = self.request.user.twitter_access_token_secret
        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'))
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        api.verify_credentials()
        cursor = tweepy.Cursor(api.user_timeline, tweet_mode="extended").items()
        tweets = []
        for tweet in cursor:
            json_str = json.dumps(tweet._json)
            parsed = json.loads(json_str)
            tweets.append(parsed)

        user = tweets[0]['user']
        user_infos = {
            "id": user['id'],
            "member_since": user['created_at'],
            "name": user['name'],
            "screen_name": user['screen_name'],
            "location": user['location'],
            "description": user['description'],
            "followers_count": user['followers_count'],
            "friends_count": user['friends_count'],
            "statuses_count": user['statuses_count'],
            "profile_image_url_https": user['profile_image_url_https'],
            "profile_background_image_url_https": user['profile_background_image_url_https'],
            # "profile_banner_url": user['profile_banner_url']
        }
        try:
            return Response(user_infos)
        except:
            return Response({'message': 'Error during auth'})


class SearchTweetView(ListCreateAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all()

    def get_queryset(self):
        search = self.request.query_params.get('search')
        if search:
            return Tweet.objects.filter(content__contains=search)
        return Tweet.objects.all()


class GetScheduledTweets(ListAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all().filter(send_time__contains=" ")

    def get(self, request, *args, **kwargs):
        if self.kwargs:
            queryset = self.get_queryset().filter(author=self.kwargs['author_id'])
        else:
            queryset = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetFollowers(APIView):
    def get(self, request):
        access_token = self.request.user.twitter_access_token
        access_token_secret = self.request.user.twitter_access_token_secret
        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'))
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        api.verify_credentials()

        try:
            my_followers = api.get_followers()
            parsed_followers = []
            for follower in my_followers:
                json_str = json.dumps(follower._json)
                parsed = json.loads(json_str)
                parsed_followers.append(parsed)
            return Response({'followers': parsed_followers})
        except:
            return Response({'message': 'Error during auth'})


class GetMyTweets(APIView):
    def get(self, request):
        access_token = self.request.user.twitter_access_token
        access_token_secret = self.request.user.twitter_access_token_secret
        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'))
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        api.verify_credentials()

        try:
            cursor = tweepy.Cursor(api.user_timeline, tweet_mode="extended").items()
            tweets = []
            for tweet in cursor:
                json_str = json.dumps(tweet._json)
                parsed = json.loads(json_str)
                tweets.append(parsed)
            return Response({'tweets': tweets})
        except:
            return Response({'message': 'Error during auth'})


class GetAllTweets(ListAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all()

    def get(self, request, *args, **kwargs):
        if self.kwargs:
            queryset = self.get_queryset().filter(author=self.kwargs['author_id'])
        else:
            queryset = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetToken(APIView):

    def get(self, request):
        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'),
                                   os.environ.get('TWITTER_AUTH_CALLBACK_URL'))
        try:
            redirect_url = auth.get_authorization_url()
            return Response({'url': redirect_url})
        except tweepy.TweepyException:
            return Response({'message': 'Error! Failed to get request token.'})


class VerifyToken(APIView):

    def post(self, request):

        user = User.objects.get(id=request.user.id)
        verifier = request.data['oauth_verifier']
        token = request.data['oauth_token']

        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'),
                                   os.environ.get('TWITTER_AUTH_CALLBACK_URL'))

        auth.request_token = {'oauth_token': token,
                              'oauth_token_secret': verifier}
        try:
            auth.get_access_token(verifier)
            serializer = UserSerializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(twitter_access_token=auth.access_token,
                            twitter_access_token_secret=auth.access_token_secret,
                            **serializer.validated_data)
            return Response(serializer.validated_data)
        except tweepy.TweepyException:
            return Response({'message': 'Error! Failed to get request token.'})


class ShowTweetDetails(APIView):
    def get(self, request):
        access_token = self.request.user.twitter_access_token
        access_token_secret = self.request.user.twitter_access_token_secret
        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'))
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        api.verify_credentials()
        try:
            cursor = tweepy.Cursor(api.user_timeline, tweet_mode="extended").items()

            tweets = []
            for tweet in cursor:
                json_str = json.dumps(tweet._json)
                parsed = json.loads(json_str)
                tweets.append(parsed)

            reduced_tweets = []
            for elem in tweets:
                extract = {
                    'content': elem['full_text'],
                    'created_at': elem['created_at'],
                    'tweet_id': elem['id'],
                    'length': elem['display_text_range'][1],
                    'retweet_count': elem['retweet_count'],
                    'likes': elem['favorite_count']
                }
                reduced_tweets.append(extract)
            return Response(reduced_tweets)
        except:
            return Response({'message': 'Error during auth'})


class RetrieveNewData(APIView):

    def get(self, request):
        access_token = self.request.user.twitter_access_token
        access_token_secret = self.request.user.twitter_access_token_secret
        auth = tweepy.OAuthHandler(os.environ.get('TWITTER_API_KEY'), os.environ.get('TWITTER_API_KEY_SECRET'))
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        api.verify_credentials()
        cursor = tweepy.Cursor(api.user_timeline, tweet_mode="extended").items()
        tweets = []
        for tweet in cursor:
            json_str = json.dumps(tweet._json)
            parsed = json.loads(json_str)
            tweets.append(parsed)

        user = tweets[0]['user']
        user_id = user['id']
        # client = tweepy.Client(bearer_token=bearer_token)
        # print_user = client.get_user(user_id)
        print_user = api.get_user(user_id)

        return Response({'user': print_user})