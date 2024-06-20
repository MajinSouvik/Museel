from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from urllib.parse import urlencode
from django.http import HttpResponseRedirect
from .extras import *

# Create your views here.

class AuthURL(APIView):
    def get(self,request,format=None):
        scopes='user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming'
        
        url=Request('GET','https://accounts.spotify.com/authorize', params={
            'scope':scopes,
            'response_type':'code',
            'redirect_uri':"http://localhost:3000",
            'client_id':CLIENT_ID,
            'show_dialog':True
        }).prepare().url
        
        return Response({'url':url}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def upload_track(request,format=None):
    print('Reached here')
    print(request.data['id'])
    return Response({"message":"Got the song ID!"},status=status.HTTP_200_OK)
    
        
@api_view(['POST'])
def login(request,format=None): 
    code=request.data['code']
    
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': "http://localhost:3000",
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
        }).json()
        
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    
    return Response({'response':response}, status=status.HTTP_200_OK)

@api_view(['POST'])
def refresh(request, format=None):
    refresh_token=request.data['refreshToken']
    
    response=post('https://accounts.spotify.com/api/token',data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret':CLIENT_SECRET
    }).json()
    
    return Response({'response':response}, status=status.HTTP_200_OK)

def spotify_callback(request,format=None):
    print("XXCCXX")
    code=request.GET.get('code')
    error=request.GET.get('error')
    
    print("POKKPO-->",code)
    rDirect=f"https://localhost:3000/code={code}"
    return HttpResponseRedirect(rDirect)

    # return Response(code, status=status.HTTP_200_OK)
    if error:
        return error
    return "OK"
    # response = post('https://accounts.spotify.com/api/token', data={
    #     'grant_type': 'authorization_code',
    #     'code': code,
    #     'redirect_uri': REDIRECT_URI,
    #     'client_id': CLIENT_ID,
    #     'client_secret': CLIENT_SECRET
    #     }).json()
        
    # access_token = response.get('access_token')
    # token_type = response.get('token_type')
    # refresh_token = response.get('refresh_token')
    # expires_in = response.get('expires_in')
    # authKey=request.session.session_key
    
    # if not request.session.exists(authKey):
    #     request.session.create()
    #     authKey=request.session.session_key
    
    # create_or_update_tokens(
    #     session_id=authKey,
    #     access_token=access_token,
    #     refresh_token=refresh_token,
    #     expires_in=expires_in,
    #     token_type=token_type
    # )
    
    # rDirect=f"http://localhost:3000"
    #redirect_url=f"http://localhost:8000/spotify/get-artist?key={authKey}"
    # # redirect_url=f"http://localhost:8000/spotify/current-song?key={authKey}"
    # return HttpResponseRedirect(redirect_url)  
           

class CheckAuthentication(APIView):
    def get(self, request, format=None):
        
        key=self.request.session.session_key      
        if not self.request.session.exists(key):
            self.request.session.create()
            key=self.request.session.session_key
        auth_status=is_spotify_authenticated(key)
        
        if auth_status:
            # redirect_url=f"http://localhost:8000/spotify/current-song?key={key}"
            redirect_url=f"http://localhost:8000/spotify/get-artist?key={key}"
            return HttpResponseRedirect(redirect_url)
        else:
            redirect_url="http://localhost:8000/spotify/auth-url"
            return HttpResponseRedirect(redirect_url)
    
class CurrentSong(APIView):
    kwarg="key"
    def get(self, request, format=None):
        key=request.GET.get(self.kwarg)
        token=Token.objects.filter(user=key)
        endpoint="player/currently-playing"
        response=spotify_requests_execution(key, endpoint)
        
        if "error" in response or "item" not in response:
            err=response.get("error")
            if err is "No Token":
                redirect_url="http://localhost:8000/spotify/auth-url"
                return HttpResponseRedirect(redirect_url)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item=response.get("item")
        progress=response.get("progress_ms")
        is_playing=response.get("is_playing")
        duration=item.get("duration_ms")
        song_id=item.get("id")
        title=item.get("name")
        album_cover=item.get("album").get("images")[0].get("url")
        
        artists=""
        for i,artist in enumerate(item.get("artists")):
            if i>0:
                artists+=", "
            name=artist.get("name")
            artists+=name
        
        song={
            "id":song_id,
            "title":title,
            "artist":artists,
            "duration":duration,
            "time":progress,
            "album_cover":album_cover,
            "is_playing":is_playing
        }
        
        return Response(song, status=status.HTTP_200_OK)

class Artist(APIView):
    kwarg="key"
    def get(self,request, format=None):
        print("ekhane namaz porlam and aazan dilam..")
        key=request.GET.get(self.kwarg)
        # artist_name=request.GET.get("artist_name")
        artist_name="Vishal"
        token=Token.objects.filter(user=key)
        query=f"?q={artist_name}&type=artist&limit=1"
        endpoint="search"
        
        query_url=endpoint+query
        response=spotify_requests_execution(key, query_url)
        
        if "error" in response or "artists" not in response:
            err=response.get("error")
            if err =="No Token":
                redirect_url="http://localhost:8000/spotify/auth-url"
                return HttpResponseRedirect(redirect_url)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        return Response(response, status=status.HTTP_200_OK)
    

class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated=is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
    

        
        
        
        
        
        


        
                
        
    
        
                              
        

    
        
    
    
        

