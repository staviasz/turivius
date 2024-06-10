from functools import wraps
from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

# Decorator para proteger as rotas que precisam de login
def authentication_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        try:
            print("user no decorator",)
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({"message": "Token de autenticação não fornecido ou no formato inválido"}, status=401)
            
            # Extrai o token JWT do cabeçalho de autorização
            token = auth_header.split()[1]
            print("token no decorator", token)

            # Autentica o usuário com base no token
            jwt_authentication = JWTAuthentication()
            user, _ = jwt_authentication.authenticate(request)
            request.user = user
            print("user no decorator", request.user)
            print("user no decorator is authenticated", request.user.is_authenticated)
            if not request.user.is_authenticated:
                return JsonResponse({"message": "Autenticação necessária"}, status=401)
            return view_func(request, *args, **kwargs)
        except (InvalidToken, AuthenticationFailed) as e:
            return JsonResponse({"message": "Token inválido"}, status=401)
    return wrapped_view
