from django.urls import path
from .views import upload_song,get_song

urlpatterns = [
    path('upload', upload_song),
    path('load',get_song)
]
