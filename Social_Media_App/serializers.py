from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, Post, Story, Comment, Like, SharedPost ,Message ,Chat


class CustomUserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "mobile_number",
            "username",
            "password",
            "confirm_password",
            "created_on",
            "updated_on",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError("The passwords do not match.")
        return attrs

    def create(self, validated_data):
        # Remove confirm_password if it exists
        validated_data.pop("confirm_password", None)
        user = CustomUser.objects.create_user(**validated_data)
        return user

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            mobile_number=validated_data["mobile_number"],
            profile_photo=validated_data.get("profile_photo"),
        )
        return user


class ProfilePhotoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["profile_photo"]


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "content",
            "image",
            "created_on",
            "updated_on",
        ]
        
class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = [
            "id",
            "user",
            "image",
            "video",
            "link",
            "created_on",
            "expires_on",
        ]
        read_only_fields = ["user", "created_on", "expires_on"]


class CustomUserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "profile_photo",
        ]
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_on', 'updated_on']
        read_only_fields = ['id', 'user', 'created_on', 'updated_on']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'post', 'user', 'created_on']
        read_only_fields = ['id', 'user', 'created_on', 'post']

    def create(self, validated_data):
        return super().create(validated_data)
    
class SharedPostSerializer(serializers.ModelSerializer):
    original_post = PostSerializer(read_only=True)
    shared_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = SharedPost
        fields = ['id', 'original_post', 'shared_by', 'shared_on']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile_photo']

class FollowersSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['followers']

    def get_followers(self, obj):
        followers = obj.followers.all()
        return FollowSerializer(followers, many=True).data
    
class FollowingSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['following']

    def get_following(self, obj):
        following = obj.following.all()
        return FollowSerializer(following, many=True).data
    
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'timestamp']

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Chat
        fields = ['id', 'participants', 'messages']
        
               
# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['id'] = user.id
#         token['first_name'] = user.first_name
#         token['last_name'] = user.last_name
#         token['username'] = user.username

#         return token

#     def validate(self, attrs):
#         data = super().validate(attrs)

#         # Add custom user data to the response
#         data.update({
#             'id': self.user.id,
#             'first_name': self.user.first_name,
#             'last_name': self.user.last_name,
#             'username': self.user.username,
#         })

#         return data

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        user_data = {
            'userId':user.id,
            'username':user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }

        data.update({'user': user_data})
        return data
    
class ProfilePhotoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["profile_photo"]
