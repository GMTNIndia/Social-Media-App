from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CustomUser, Post, Story, Comment, Like, SharedPost
from .serializers import (
    CustomUserSerializer,
    PostSerializer,
    ProfilePhotoUpdateSerializer,
    CustomUserSearchSerializer,
    StorySerializer,
    CommentSerializer, 
    LikeSerializer, 
    SharedPostSerializer
)
from .serializers import *
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError


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


class UserSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get("query", None)
        if not query:
            return Response(
                {"detail": "Query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        users = CustomUser.objects.filter(
            Q(username__icontains=query)
            | Q(first_name__icontains=query)
            | Q(last_name__icontains=query)
        )
        serializer = CustomUserSearchSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
        queryset = Post.objects.filter(user__in=following_users).order_by('-created_on')
        return queryset
    
class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        following_users = user.following.all()
        now = timezone.now()
        return Story.objects.filter(user__in=following_users, expires_on__gt=now)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs['pk']
        post = Post.objects.get(id=post_id)
        serializer.save(user=self.request.user, post=post)


class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Like.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs['pk']
        try:
            post = Post.objects.get(id=post_id)
            user = self.request.user
            # Check if the user already liked this post
            if Like.objects.filter(post=post, user=user).exists():
                raise ValidationError("You have already liked this post.")
            serializer.save(user=user, post=post)
        except Post.DoesNotExist:
            raise ValidationError("Post not found.")
    
    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SharePostView(generics.ListCreateAPIView):
    queryset = SharedPost.objects.all()
    serializer_class = SharedPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        return SharedPost.objects.filter(original_post_id=post_id)

    def post(self, request, *args, **kwargs):
        post_id = self.kwargs.get('post_id')
        user = request.user
        try:
            post = Post.objects.get(id=post_id)
            shared_post = SharedPost.objects.create(original_post=post, shared_by=user)
            serializer = self.get_serializer(shared_post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def share_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        user = request.user
        SharedPost.objects.create(original_post=post, shared_by=user)
        return Response({"message": f"Post {post_id} shared successfully!"}, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        try:
            user_to_follow = CustomUser.objects.get(id=user_id)
            request.user.following.add(user_to_follow)
            return Response({"detail": "User followed successfully."}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class UnfollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        try:
            user_to_unfollow = CustomUser.objects.get(id=user_id)
            request.user.following.remove(user_to_unfollow)
            return Response({"detail": "User unfollowed successfully."}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class FollowersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            serializer = FollowersSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class FollowingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            serializer = FollowingSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)