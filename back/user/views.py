import re
from django.views import View
from django.http import JsonResponse
from django.contrib.auth import login as django_login, authenticate
from django.contrib.auth.models import User


class UserView(View):
    def post(self, request, action):
        # Verifica se a ação é de registro ou login e executa o metodo correspondente
        if action == "register":
            return self.register(request)
        elif action == "login":
            return self.login(request)

    def register(self, request):
        #recuperando dados do body
        first_name = request.POST.get("first_name")
        email = request.POST.get("email")
        password = request.POST.get("password")

        # Valida os dados de entrada
        errors = self._clean_all_data(first_name, email, password)
        if errors:
            return JsonResponse({"error": errors}, status=400)

        # Verifica se o email já está em uso no sistema
        if User.objects.filter(email=email).exists():
            return JsonResponse({"message": "Email em uso"}, status=400)

        # Cria o novo usuário
        new_user = User.objects.create_user(username=email, email=email)
        new_user.first_name = first_name
        new_user.set_password(password)
        new_user.save()

        # Retorna os dados do usuario sem a senha
        user_data = {
            "id": new_user.id,
            "first_name": new_user.first_name,
            "email": new_user.email,
        }

        return JsonResponse(user_data, status=201)

    def login(self, request):
        #recuperando dados do body
        email = request.POST.get("email")
        password = request.POST.get("password")

        # Valida os dados de entrada
        errors = self._clean_partial_data(email, password)
        if errors:
            return JsonResponse({"error": errors}, status=400)

        # Busca o usuario no banco
        user = authenticate(username=email, password=password)
        if not user:
            return JsonResponse({"message": "Credenciais inválidas"}, status=400)

        # Autentica o usuário
        django_login(request, user)

        # remove a senha e adiciona o token a resposta
        user_data = {
            "id": user.id,
            "first_name": user.first_name,
            "email": user.email,
        }

        return JsonResponse(user_data)

    def _clean_all_data(self, first_name, email, password):
        # gera uma lista com os erros de validação para os campos email e password
        partial_errors = self._clean_partial_data(email, password)

        # gera uma lista com os erros de validação para o campo first_name e adiciona os erros de validação para os campos restantes
        errors = [
            ("first_name", self._clean_first_name(first_name)),
            *partial_errors.items(),
        ]

        return {field: error for field, error in errors if error}

    def _clean_partial_data(self, email, password):
        """metodo auxiliar para validar apenas os campos email e password, pensando no metodo de login"""
        # gera uma lista com os erros de validação para os campos email e password
        errors = [
            ("email", self._clean_email(email)),
            ("password", self._clean_password(password)),
        ]

        return {field: error for field, error in errors if error}

    def _clean_first_name(self, first_name):
        if not first_name:
            return "O campo nome é obrigatório"
        if not re.match(r"^[a-zA-ZÀ-ÿ\s]+$", first_name):
            return "O nome não pode conter números ou caracteres especiais"

        return None

    def _clean_email(self, email):
        if not email:
            return "O campo email é obrigatório"
        if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
            return "O email não é válido"

        return None

    def _clean_password(self, password):
        regex = (
            r"^(?=.*[a-z])"  # Pelo menos uma letra minúscula
            r"(?=.*[A-Z])"  # Pelo menos uma letra maiúscula
            r'(?=.*[!@#$%^&*(),.?":{}|<>])'  # Pelo menos um caractere especial
            r".{6,}$"  # Mínimo de 6 caracteres
        )

        if not password:
            return "O campo senha é obrigatório"

        if not re.match(regex, password):
            return "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial e pelo menos 6 caracteres"

        return None
