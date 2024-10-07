from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from user.serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

User=get_user_model()

class RegisterUser(APIView):
    def post(self, request):
        data = request.data
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        if password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    userID=request.data.get('user_id')
    user=User.objects.get(id=userID)
    user_serializer = UserSerializer(user)
    return Response(user_serializer.data, status=status.HTTP_200_OK)

class Login(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        tokens = response.data 
        
        user=User.objects.get(username=request.data.get('username'))
        user_serializer = UserSerializer(user)
        
        resp={
            'access_token':tokens['access'],
            'refresh_token':tokens['refresh'],
            'user':user_serializer.data
        }
        
        response = Response(resp, status=status.HTTP_200_OK)
        
        response.set_cookie(
            key='access_token',
            value=tokens['access'],
            httponly=True,
            secure=True,
            samesite='Lax'
        )
        
        response.set_cookie(
            key='refresh_token',
            value=tokens['refresh'],
            httponly=True,
            secure=True,  
            samesite='Lax'
        )
        return response
        
    
        
        
    
    