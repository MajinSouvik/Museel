from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from user.views import RegisterUser, get_user_details, Login

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='registration'),
    path('api/token/', Login.as_view(), name='token_obtain_pair'),
    path('get-user/', get_user_details, name='get-user'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]
