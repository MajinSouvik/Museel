from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from app.serializers import SongSerializer, AlbumSerializer, CommentSerializer
from app.models import Song, Album

class SongVS(viewsets.ViewSet):
    def list(self, request):
        queryset = Song.objects.all()
        serializer = SongSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Song.objects.all()
        try:
            song = get_object_or_404(queryset, pk=pk)
        except:
            song=get_object_or_404(queryset, name=pk)
        serializer = SongSerializer(song)
        return Response(serializer.data)
    
    def create(self,request):
        serializer=AlbumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def update(self,request,pk=None):
        print(request.data)
        queryset=Song.objects.all()
        song=get_object_or_404(queryset, pk=pk)
        serializer=CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class CommentVS(viewsets.ViewSet):
    def create(self,request):
        serializer=CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        

class AlbumVS(viewsets.ViewSet):
    def list(self, request):
        queryset = Album.objects.all()
        serializer = AlbumSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Album.objects.all()
        song = get_object_or_404(queryset, pk=pk)
        serializer = AlbumSerializer(song)
        return Response(serializer.data)
    
        

    