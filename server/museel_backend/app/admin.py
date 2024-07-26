from django.contrib import admin
from app.models import Song, Album,Comment


# Register your models here.
admin.site.register(Song)
admin.site.register(Album)
admin.site.register(Comment)