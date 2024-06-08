import json
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.test import Client


class UserViewLoginTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        # Criar um usuário para testar o login
        self.user = User.objects.create_user(
            first_name='John Doe',
            username='john.doe@example.com',
            email='john.doe@example.com',
            password='Password!23'
        )

    def test_login_success(self):
        # Faz requisição para rota de login
        response = self.client.post(reverse('user-login'), {
            'email': 'john.doe@example.com',
            'password': 'Password!23'
        })

        # Verificar se o código de status é 200 (ok) e se os dados contém email e id do usuário
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', data)
        self.assertEqual(data['email'], 'john.doe@example.com')
        self.assertTrue(User.objects.filter(email='john.doe@example.com').exists())

    def test_login_bad_request(self):
        response = self.client.post(reverse('user-login'), {
            'email': 'john.doe@example.com',
            'password': 'Password!234'
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de credenciais inválidas
        data = response.json()
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data, {"message": "Credenciais inválidas"})

    def test_required_email(self):
        response = self.client.post(reverse('user-login'), {
            'name': 'John Doe',
            'password': 'Password!23'
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de email obrigatório
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'email': ['O campo email é obrigatório']})

    def test_invalid_email(self):
        response = self.client.post(reverse('user-login'), {
            'email': 'invalid-email',
            'password': 'Password!23'
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de email inválido
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'email': ['O email não é válido']})

    def test_required_password(self):
        response = self.client.post(reverse('user-login'), {
            'name': 'John Doe',
            'email': 'john@example.com',
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de senha obrigatória
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'password': ['O campo senha é obrigatório']})

    def test_invalid_password(self):
        response = self.client.post(reverse('user-login'), {
            'name': 'John Doe',
            'email': 'john@example.com',
            'password': 'pwd'
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de senha inválida
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'message': 'Credenciais inválidas'})

