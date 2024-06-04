from django.urls import path, re_path
from .consumers import NotificationConsumer
from Social_Media_App import consumers

websocket_urlpatterns = [
    path('ws/notifications/', NotificationConsumer.as_asgi()),
    re_path(r'ws/chat/(?P<user_id>\d+)/$', consumers.ChatConsumer.as_asgi()),
]
