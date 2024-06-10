from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login as django_login, logout as django_logout, authenticate
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from .serializers import UserRegisterSerializer, UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegisterView(APIView):
    def post(self, request):
        print(request)
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            if User.objects.filter(email=email).exists():
                return Response({"message": "Este e-mail já está em uso."}, status=status.HTTP_400_BAD_REQUEST)
            
            user = serializer.save()
            user_data = {
                "id": user.id,
                "first_name": user.first_name,
                "email": user.email,
            }
            return Response(user_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(username=email, password=password)
            
            if user:
                django_login(request, user)
                print("esta autenticado no login",request.user.is_authenticated)
                user_data = {
                    "id": user.id,
                    "first_name": user.first_name,
                    "email": user.email,
                }
                csrf_token = get_token(request)

                refresh = RefreshToken.for_user(user)  # Gerar um token de atualização
                access_token = str(refresh.access_token) 
                
                return Response({
                    'user': user_data,
                    'csrftoken': csrf_token,
                    'access_token': access_token
                }, status=status.HTTP_200_OK)
            return Response({"message": "Credenciais inválidas"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    def post(self, request):
        django_logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
