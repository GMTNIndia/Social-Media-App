from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model
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
    
    
User = get_user_model()

class Story(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='stories/', null=True, blank=True)
    video = models.FileField(upload_to='stories/', null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    expires_on = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_on = timezone.now()
        self.expires_on = self.created_on + timedelta(hours=24)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Story by {self.user.username} created on {self.created_on}"