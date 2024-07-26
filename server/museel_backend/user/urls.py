from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import registration_view,Login,get_user_details

urlpatterns = [
    path('register/', registration_view, name='registration'),
    path('api/token/', Login.as_view(), name='token_obtain_pair'),
    path('get-user/', get_user_details, name='get-iser'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
