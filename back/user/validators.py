import re
from rest_framework import serializers

def validate_first_name(first_name):
    if not re.match(r"^[a-zA-ZÀ-ÿ\s]+$", first_name):
        raise serializers.ValidationError({"first_name": "O nome não pode conter números ou caracteres especiais"})

def validate_password(password):
    regex = (
        r"^(?=.*[a-z])"  # Pelo menos uma letra minúscula
        r"(?=.*[A-Z])"  # Pelo menos uma letra maiúscula
        r'(?=.*[!@#$%^&*(),.?":{}|<>])'  # Pelo menos um caractere especial
        r".{6,}$"  # Mínimo de 6 caracteres
    )
    if not re.match(regex, password):
        raise serializers.ValidationError({"password": "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial e pelo menos 6 caracteres"})
