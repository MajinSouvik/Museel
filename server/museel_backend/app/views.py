from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Song
from app.serializers import SongSerializer
import json, random

# Create your views here.
@api_view(['POST'])
def upload_song(request):
    serializer=SongSerializer(data=json.loads(request.body))
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def get_song(request):
    songID=random.randint(1,Song.objects.count())
    song=Song.objects.get(pk=songID)
    serializer=SongSerializer(song)
    return Response(serializer.data)
    