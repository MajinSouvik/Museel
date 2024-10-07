from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'profilePic', 'password']
        extra_kwargs = {
            'password': {'write_only': True}, 
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            profilePic=validated_data.get('profilePic') 
        )
        user.set_password(validated_data['password'])
        user.save()
        return user



