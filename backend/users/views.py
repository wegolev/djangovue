# Create your views here.
from rest_framework import viewsets

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()  # Это будет использовать вашу кастомную модель

from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# from rest_framework import viewsets
# from .serializers import UserSerializer
# from rest_framework.permissions import AllowAny
# from django.contrib.auth import get_user_model

# User = get_user_model()  # Получаем кастомную модель пользователя

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

    