from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# from django.contrib.auth.models import User


# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(max_length=100, unique=True, null=False, blank=False)
    mobile_regex = RegexValidator(regex=r"^[6-9]\d{9}$")
    mobile_number = models.CharField(
        validators=[mobile_regex], max_length=10, unique=True, null=False, blank=False
    )
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username
