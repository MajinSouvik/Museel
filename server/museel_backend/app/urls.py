from django.urls import path,include
from rest_framework.routers import DefaultRouter
from app.views import SongVS, AlbumVS,CommentVS

router=DefaultRouter()
router.register('upload-song', SongVS, basename='song')
router.register('album',AlbumVS, basename='album'),
router.register('comment', CommentVS, basename='comment')

urlpatterns = [
    path('',include(router.urls))
]
