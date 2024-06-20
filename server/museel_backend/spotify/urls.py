from django.urls import path
from .views import *

urlpatterns = [
    path('auth-url', AuthURL.as_view()),
    path('login',login),
    path('refresh', refresh),
    path('callback',spotify_callback),
    path("check-auth", CheckAuthentication.as_view()),
    path("current-song", CurrentSong.as_view()),
    path("is-authenticated", IsAuthenticated.as_view()),
    path("get-artist", Artist.as_view()),
    path("upload-track",upload_track)
]
