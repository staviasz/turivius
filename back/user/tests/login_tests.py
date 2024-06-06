import json
from django.test import TestCase
from django.urls import reverse
from django.test import RequestFactory
from user.models import CustomUser
from user.views import UserView
from django.contrib.auth.hashers import make_password


class UserViewLoginTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

        # Criar um usuário para testar o login
        self.user = CustomUser.objects.create_user(
            name='John Doe',
            email='john.doe@example.com',
            password='Password!23'
        )

    def test_login_success(self):
        request = self.factory.post(reverse('user-login'), {
            'email': 'john.doe@example.com',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='login')

        data = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', data)
        self.assertEqual(data['email'], 'john.doe@example.com')
        self.assertTrue(CustomUser.objects.filter(email='john.doe@example.com').exists())

    def test_login_bad_request(self):
        request = self.factory.post(reverse('user-login'), {
            'email': 'john.doe@example.com',
            'password': 'Password!234'
        })
        response = UserView.as_view()(request, action='login')

        data = json.loads(response.content.decode('utf-8'))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data, {"message": "Credenciais inválidas"})


    def test_required_email(self):
        request = self.factory.post(reverse('user-login'), {
            'name': 'John Doe',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='login')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['email'], 'O campo email é obrigatório')

    def test_invalid_email(self):
        request = self.factory.post(reverse('user-login'), {
            'name': 'John Doe',
            'email': 'invalid-email',
            'password': 'Password!23'
        })
        response = UserView.as_view()(request, action='login')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['email'], 'O email não é válido')

    def test_required_password(self):
        request = self.factory.post(reverse('user-login'), {
            'name': 'John Doe',
            'email': 'john@example.com',
        })
        response = UserView.as_view()(request, action='login')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['password'], 'O campo senha é obrigatório')

    def test_invalid_password(self):
        request = self.factory.post(reverse('user-login'), {
            'name': 'John Doe',
            'email': 'john@example.com',
            'password': 'pwd'
        })
        response = UserView.as_view()(request, action='login')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content.decode('utf-8'))
        self.assertIn('error', data)
        self.assertEqual(data['error']['password'], 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial e pelo menos 6 caracteres')

