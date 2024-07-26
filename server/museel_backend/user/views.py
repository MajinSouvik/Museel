from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from user.serializers import RegistrationSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken, TokenError

@api_view(['POST'])
def registration_view(request):

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        
        data = {}
        
        if serializer.is_valid():
            account = serializer.save()
            
            data['response'] = "Registration Successful!"
            data['username'] = account.username
        else:
            data = serializer.errors
        
        return Response(data, status=status.HTTP_201_CREATED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    userID=request.data.get('user_id')
    user=User.objects.get(id=userID)
    user_serializer = UserSerializer(user)
    print("user-->",user_serializer.data)
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
        
    
        
        
    
    