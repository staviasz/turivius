from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from user.views import UserView
from django.test import Client


class UserViewRegisterTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_register_success(self):
        # Faz requisição para rota de registro
        response = self.client.post(reverse('user-register'), {
            'first_name': 'John Doe',
            'email': 'john.doe@example.com',
            'password': 'Password!23'
        })

        # Verificar se o código de status é 201 (created) e se os dados contém o id do usuário
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertIn('id', data)
        self.assertEqual(data['email'], 'john.doe@example.com')
        self.assertTrue(User.objects.filter(email='john.doe@example.com').exists())

    def test_register_email_in_use(self):
        # Criando um usuário
        User.objects.create(first_name='Jane Doe', email='jane.doe@example.com', password='Password!23')
        
        # Faz requisição para rota de registro com email em uso
        response = self.client.post(reverse('user-register'), {
            'first_name': 'John Doe',
            'email': 'jane.doe@example.com',
            'password': 'Password!23'
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de email em uso
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Email em uso')

    def test_required_first_name(self):
        response = self.client.post(reverse('user-register'), {
            'email': 'john@example.com',
            'password': 'Password!23'
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de nome obrigatório
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('error', data)
        self.assertEqual(data['error']['first_name'], 'O campo nome é obrigatório')
    
    def test_invalid_first_name(self):
        response = self.client.post(reverse('user-register'), {
            'first_name': 'John123',
            'email': 'john@example.com',
            'password': 'Password!23'
        })

        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de nome inválido
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('error', data)
        self.assertEqual(data['error']['first_name'], 'O nome não pode conter números ou caracteres especiais')

    def test_required_email(self):
        response = self.client.post(reverse('user-register'), {
            'first_name': 'John Doe',
            'password': 'Password!23'
        })
        
        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de email obrigatório
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('error', data)
        self.assertEqual(data['error']['email'], 'O campo email é obrigatório')

    def test_invalid_email(self):
        response = self.client.post(reverse('user-register'), {
            'first_name': 'John Doe',
            'email': 'invalid-email',
            'password': 'Password!23'
        })
        
        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de email inválido
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('error', data)
        self.assertEqual(data['error']['email'], 'O email não é válido')

    def test_required_password(self):
        response = self.client.post(reverse('user-register'), {
            'first_name': 'John Doe',
            'email': 'john@example.com',
        })
        
        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de senha obrigatória
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('error', data)
        self.assertEqual(data['error']['password'], 'O campo senha é obrigatório')

    def test_invalid_password(self):
        response = self.client.post(reverse('user-register'), {
            'first_name': 'John Doe',
            'email': 'john@example.com',
            'password': 'pwd'
        })
        
        # Verificar se o código de status é 400 (bad request) e se os dados contém a mensagem de senha inválida
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertIn('error', data)
        self.assertEqual(data['error']['password'], 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial e pelo menos 6 caracteres')

