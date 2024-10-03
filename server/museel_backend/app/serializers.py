from rest_framework import serializers
from app.models import Song, Album, Comment
# from django.contrib.auth.models import User
from user.serializers import UserSerializer
from django.contrib.auth import get_user_model

User=get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    song=serializers.PrimaryKeyRelatedField(read_only=True)
    user=UserSerializer(read_only=True)
    
    class Meta:
        model=Comment
        fields="__all__"
        
    songID = serializers.CharField(write_only=True)
    userID = serializers.CharField(write_only=True)
    
    def create(self,validated_data):
        print("va->",validated_data)
        song=Song.objects.get(id=validated_data['songID'])
        user=User.objects.get(id=validated_data['userID'])
        
        comment_data={
            'text':validated_data['text'],
            'song':song,
            'user':user
        }
        
        cc=Comment.objects.create(**comment_data)
        return cc
        
class SongSerializer(serializers.ModelSerializer):
    comments=CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model=Song
        fields="__all__"
        

class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = "__all__"

    # Fields for writing
    trackUrl = serializers.URLField(write_only=True)
    previewUrl = serializers.URLField(write_only=True)
    imgUrl1 = serializers.URLField(write_only=True)
    imgUrl2 = serializers.URLField(write_only=True)
    artists = serializers.ListField(child=serializers.CharField(), write_only=True)  # Change to ListField to accept array of strings
    album = serializers.CharField(write_only=True)

    def create(self, validated_data):
        trackUrl = validated_data.pop('trackUrl')
        previewUrl = validated_data.pop('previewUrl')
        imgUrl1 = validated_data.pop('imgUrl1')
        imgUrl2 = validated_data.pop('imgUrl2')
        artists = validated_data.pop('artists')  # Now 'artists' is a list
        songName = validated_data['name']

        # Update the album name
        validated_data['name'] = validated_data.pop('album')

        # Check if album already exists
        album, created = Album.objects.get_or_create(name=validated_data['name'], defaults=validated_data)

        # Prepare song data
        song_data = {
            'name': songName,
            'tracks': [trackUrl, previewUrl],
            'images': [imgUrl1, imgUrl2],
            'artists': artists,  # Since it's already a list, no need to split or parse
            'likes': 0,
            'album': album
        }

        # Create the song
        Song.objects.create(**song_data)
        return album

        
        
        
    
    
    