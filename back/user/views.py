import re
from django.contrib.auth.hashers import make_password
from django.views import View
from django.http import JsonResponse
from user.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserView(View):
    def post(self, request, action):
        if action == "register":
            return self.register(request)
        elif action == "login":
            return self.login(request)

    def register(self, request):
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")

        errors = self._clean_data(name, email, password)
        if errors:
            return JsonResponse({"error": errors}, status=400)

        # Verifica se o email já está em uso
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email em uso"}, status=400)

        # Cria o novo usuário
        new_user = User.objects.create(
            name=name, email=email, password=make_password(password)
        )

        # Retorna os dados do usuario sem a senha
        user_data = new_user.values("id", "username", "email")[0]

        return JsonResponse(user_data, status=201)

    def login(self, request):
        email = request.POST.get("email")
        password = request.POST.get("password")

        # Valida os dados de entrada
        errors = self._clean_data("", email, password)
        if errors:
            return JsonResponse({"error": errors}, status=400)

        # Busca o usuario no banco
        user = User.objects.filter(email=email).first()
        if not user or not user.check_password(password):
            return JsonResponse({"error": "Credenciais inválidas"}, status=400)

        # Autenticação bem-sucedida, gera o token JWT
        refresh = RefreshToken.for_user(user)

        user_data = user.values("id", "username", "email")[0]
        user_data["token"] = {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }

        return JsonResponse(user_data)

    def _clean_data(self, name, email, password):
        errors = [
            ("name", self._clean_name(name)),
            ("email", self._clean_email(email)),
            ("password", self._clean_password(password)),
        ]

        return {field: error for field, error in errors if error}

    def _clean_name(self, name):
        if not re.match(r"^[a-zA-ZÀ-ÿ\s]+$", name):
            return "O nome não pode conter números ou caracteres especiais"

    def _clean_email(self, email):
        if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
            return "O email não é válido"

    def _clean_password(self, password):
        regex = (
            r"^(?=.*[a-z])"  # Pelo menos uma letra minúscula
            r"(?=.*[A-Z])"  # Pelo menos uma letra maiúscula
            r'(?=.*[!@#$%^&*(),.?":{}|<>])'  # Pelo menos um caractere especial
            r".{6,}$"  # Mínimo de 6 caracteres
        )

        if not re.match(regex, password):
            return "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial e pelo menos 6 caracteres"
