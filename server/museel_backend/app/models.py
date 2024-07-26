from django.db import models
from django.contrib.auth.models import User

class Album(models.Model):
    name=models.CharField(max_length=500)
    image=models.URLField()

class Song(models.Model):
    name=models.CharField(max_length=500)
    tracks=models.JSONField(default=list)
    images=models.JSONField(default=list)
    artists=models.JSONField(default=list)
    likes=models.IntegerField(default=0)
    album=models.ForeignKey(Album, on_delete=models.CASCADE ,related_name='songs')
    
class Comment(models.Model):
    text=models.TextField(blank=True, null=True)
    song=models.ForeignKey(Song, on_delete=models.CASCADE, related_name='comments')
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
