from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
    company_name = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)  # Добавлено новое поле
   
    def __str__(self):
        return self.username
    