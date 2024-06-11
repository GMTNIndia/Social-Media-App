from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model

# Create your models here.


class CustomUser(AbstractUser):
    email = models.EmailField(max_length=100, unique=True, null=False, blank=False)
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
        "self", symmetrical=False, related_name="followers"
    )
    blocked_users = models.ManyToManyField('self', related_name='blocked_by', blank=True)

    def __str__(self):
        return self.username


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.FileField(upload_to="post_images/", null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


User = get_user_model()


class Story(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="story_images/", null=True, blank=True)
    video = models.FileField(upload_to="story_videos/", null=True, blank=True)
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


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.content[:30]}"


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("post", "user")

    def __str__(self):
        return f"{self.user.username} liked {self.post.id}"


class SharedPost(models.Model):
    original_post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="shared_posts"
    )
    shared_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    shared_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.shared_by.username} shared post {self.original_post.id}"


# class Chat(models.Model):
#     participants = models.ManyToManyField(CustomUser, related_name='chats')
#     created_at = models.DateTimeField(auto_now_add=True)

# class Message(models.Model):
#     chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
#     sender = models.ForeignKey(CustomUser, related_name='messages', on_delete=models.CASCADE)
#     text = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)


class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ("FR", "Friend Request"),
        ("MSG", "Message"),
        ("MENTION", "Mention"),
        ("COMMENT", "Comment"),
        ("LIKE", "Like"),
    )
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="notifications"
    )
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username} - {self.notification_type}"


class Message(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="received_messages", default=None
    )
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class PasswordResetOTP(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        return timezone.now() < self.expires_at
