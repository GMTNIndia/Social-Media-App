from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from .models import Like, Comment, Notification, CustomUser, Message
from django.contrib.auth import get_user_model
import re

User = get_user_model()

@receiver(post_save, sender=Like)
def create_like_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.post.user,
            notification_type='LIKE',
            content=f"User {instance.user.username} liked your post.",
        )

# @receiver(post_save, sender=Comment)
# def create_comment_notification(sender, instance, created, **kwargs):
#     if created:
#         Notification.objects.create(
#             user=instance.post.user,
#             notification_type='COMMENT',
#             content=f"User {instance.user.username} commented on your post.",
#         )

# @receiver(post_save, sender=Message)
# def create_message_notification(sender, instance, created, **kwargs):
#     if created:
#         for participant in instance.chat.participants.all():
#             if participant != instance.sender:
#                 Notification.objects.create(
#                     user=participant,
#                     notification_type='MSG',
#                     content=f"User {instance.sender.username} sent you a message.",
#                 )

@receiver(m2m_changed, sender=CustomUser.following.through)
def create_friend_request_notification(sender, instance, action, reverse, pk_set, **kwargs):
    if action == "post_add":
        for pk in pk_set:
            followed_user = User.objects.get(pk=pk)
            Notification.objects.create(
                user=followed_user,
                notification_type='FR',
                content=f"User {instance.username} sent you a friend request.",
            )

@receiver(post_save, sender=Comment)
def create_comment_and_mention_notification(sender, instance, created, **kwargs):
    if created:
        # Create a comment notification
        Notification.objects.create(
            user=instance.post.user,
            notification_type='COMMENT',
            content=f"User {instance.user.username} commented on your post.",
        )
        
        # Detect mentions and create mention notifications
        mentioned_usernames = re.findall(r'@(\w+)', instance.content)
        for username in mentioned_usernames:
            try:
                mentioned_user = User.objects.get(username=username)
                Notification.objects.create(
                    user=mentioned_user,
                    notification_type='MENTION',
                    content=f"User {instance.user.username} mentioned you in a comment.",
                )
            except User.DoesNotExist:
                continue
            
@receiver(post_save, sender=Message)
def create_message_notification(sender, instance, created, **kwargs):
    if created:
        # Create a notification for the receiver
        Notification.objects.create(
            user=instance.receiver,
            notification_type='MSG',
            content=f"User {instance.sender.username} sent you a message.",
        )