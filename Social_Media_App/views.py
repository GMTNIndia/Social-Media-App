from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CustomUser, Post
from .serializers import CustomUserSerializer, PostSerializer, ProfilePhotoUpdateSerializer


class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]


class ProfilePhotoUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = ProfilePhotoUpdateSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NewsFeedView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        following_users = user.following.all()
        queryset = Post.objects.filter(user__in=following_users)
        return queryset
