from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import NewsFeedView, UserCreateView, UserDetailView,  PostViewSet, ProfilePhotoUpdateView,UserSearchView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path("api/users/", UserCreateView.as_view(), name="user-create"),
    path("api/users/<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
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
    path("api/", include(router.urls)),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
