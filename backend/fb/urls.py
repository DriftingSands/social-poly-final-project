from django.urls import path
from fb.views import SendPost, Auth, GetToken, GetLastPosts, ChangeAccessToken


urlpatterns = [
    path('send/', SendPost.as_view()),
    path('auth/', Auth.as_view()),
    path('token/', GetToken.as_view()),
    path('feed/', GetLastPosts.as_view()),
    path('exchangetoken/', ChangeAccessToken.as_view())
]

