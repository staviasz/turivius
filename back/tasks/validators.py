from datetime import date
from rest_framework import serializers

def validate_execute_date(execute_date):
    if execute_date < date.today():
        raise serializers.ValidationError({"execute_date": "O campo 'execute_date' deve ser uma data futura"})