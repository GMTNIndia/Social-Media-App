from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Create your models here.


class CustomUser(AbstractUser):
    email = models.EmailField(
        max_length=100, unique=True, null=False, blank=False)
    mobile_regex = RegexValidator(regex=r"^[6-9]\d{9}$")
    mobile_number = models.CharField(
        validators=[mobile_regex], max_length=10, unique=True, null=False, blank=False
    )
    profile_photo = models.ImageField(
        upload_to="profile_photos/", null=True, blank=True
    )
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    following = models.ManyToManyField(
        'self', symmetrical=False, related_name='followers')

    def __str__(self):
        return self.username


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to="post_images/", null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
