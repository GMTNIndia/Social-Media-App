from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import NewsFeedView, UserCreateView, UserDetailView,  PostViewSet, ProfilePhotoUpdateView, UserSearchView, StoryViewSet, CommentViewSet, LikeViewSet, SharePostView, NotificationListView, share_post
from .views import *
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'stories', StoryViewSet, basename='story')
# router.register(r'comments', CommentViewSet, basename='comment')
# router.register(r'likes', LikeViewSet, basename='like')

urlpatterns = [
    path("api/users/", UserCreateView.as_view(), name="user-create"),
    path("api/users/<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    path("api/login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "api/profile/photo/",
        ProfilePhotoUpdateView.as_view(),
        name="profile_photo_update",
    ),
    path('api/search/', UserSearchView.as_view(), name='user-search'),
    path('api/posts/',
         PostViewSet.as_view({'post': 'create'}), name='post-create'),
    path("api/newsfeed/", NewsFeedView.as_view(), name="news_feed"),
    path('api/posts/<int:pk>/likes/', LikeViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'destroy'  }), name='like-list'),
    path('api/posts/<int:pk>/comments/', CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='comment-list'),
    path('api/posts/<int:post_id>/share/', SharePostView.as_view(), name='share-post'),
    path("api/users/<int:user_id>/follow/", FollowUserView.as_view(), name="follow-user"),
    path("api/users/<int:user_id>/unfollow/", UnfollowUserView.as_view(), name="unfollow-user"),
    path("api/users/<int:user_id>/followers/", FollowersListView.as_view(), name="followers-list"),
    path("api/users/<int:user_id>/following/", FollowingListView.as_view(), name="following-list"),
    # path("api/chats/", ChatListView.as_view(), name="chat-list"),
    # path("api/chats/<int:pk>/", ChatDetailView.as_view(), name="chat-detail"),
    # path("api/chats/<int:chat_id>/messages/", MessageCreateView.as_view(), name="message-create"),
    path(
        "api/profile/photo/retrieve/",
        ProfilePhotoRetrieveView.as_view(),
        name="profile_photo_retrieve",
    ),
    path('posts/', PostViewSet.as_view({'get': 'list', 'post': 'create'}), name='post-list'),
    path('posts/<int:pk>/', PostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'delete'}), name='post-detail'),
    path('posts/<int:pk>/post_count/', PostViewSet.as_view({'get': 'post_count'}), name='post-count'),
    path('api/notifications/', NotificationListView.as_view(), name='notifications'),
    path('api/notifications/<int:notification_id>/read/', notification_detail, name='notification_detail'),
    path('all-users/', AllUsersAPIView.as_view(), name='all-users'),
    path('chat/<int:user_id>/<int:partner_id>/', ChatHistoryAPIView.as_view(), name='chat-history'),
    path('send-message/', SendMessageAPIView.as_view(), name='send-message'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('otp-verify/', OTPVerificationView.as_view(), name='otp_verification'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path("api/profile/photo/delete/", ProfilePhotoDeleteView.as_view(), name="profile_photo_delete"),
    path('users/<int:pk>/followers_count/', UserFollowersCountAPIView.as_view(), name='user-followers-count'),
    path('chat/<int:user_id>/', chat_between_users, name='chat-between-users'),
    path("api/users/<int:user_id>/block/", BlockUserView.as_view(), name="block-user"),
    path("api/users/<int:user_id>/unblock/", UnblockUserView.as_view(), name="unblock-user"),
    path("api/users/blocked/", BlockedUsersView.as_view(), name="blocked-users"),
    path('block-status/<int:user_id>/', BlockStatusView.as_view(), name='block_status'),
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
