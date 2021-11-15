from django.urls import path

from twitter.views import GetFollowers, GetAllTweets, GetMyTweets, CreateTweetOnTime,\
    SearchTweetView, GetToken, VerifyToken, ShowTweetDetails, GetScheduledTweets, RetrieveNewData

urlpatterns = [
    path('followers/', GetFollowers.as_view()),
    path('mytweets/', GetMyTweets.as_view()),
    path('tweets/', GetAllTweets.as_view()),
    path('send/', CreateTweetOnTime.as_view()),
    path('search/', SearchTweetView.as_view()),
    path('auth/', GetToken.as_view()),
    path('verify/', VerifyToken.as_view()),
    path('analitycs/', ShowTweetDetails.as_view()),
    path('scheduled/', GetScheduledTweets.as_view()),
    path('newdata/', RetrieveNewData.as_view())
]
