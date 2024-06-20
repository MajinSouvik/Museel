from rest_framework import serializers
from app.models import Song

class SongSerializer(serializers.Serializer):
    id=serializers.IntegerField(read_only=True)
    name=serializers.CharField()
    imgUrl1=serializers.URLField()
    imgUrl2=serializers.URLField()
    trackUrl=serializers.URLField()
    previewUrl=serializers.URLField()
    
    def create(self, validated_data):
        return Song.objects.create(**validated_data)