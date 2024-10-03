# from django.contrib.auth.models import User
# from rest_framework import serializers
# from django.contrib.auth import get_user_model

# UUser=get_user_model()

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UUser
#         fields = ('id', 'username', 'profilePic')  
    

# class RegistrationSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

#     class Meta:
#         model = User
#         fields = ['username', 'password', 'password2']
#         extra_kwargs = {
#             'password' : {'write_only': True}
#         }
    
#     def save(self):
#         password = self.validated_data['password']
#         password2 = self.validated_data['password2']

#         if password != password2:
#             raise serializers.ValidationError({'error': 'P1 and P2 should be same!'})

#         if User.objects.filter(username=self.validated_data['username']).exists():
#             raise serializers.ValidationError({'error': 'Username already exists!'})

#         account = User(username=self.validated_data['username'])
#         account.set_password(password)
#         account.save()

#         return account

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'profilePic', 'password']
        extra_kwargs = {
            'password': {'write_only': True},  # Don't send the password back in responses
        }

    def create(self, validated_data):
        # Create the user with validated data
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            profilePic=validated_data.get('profilePic')  # Store Firebase URL here
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user



