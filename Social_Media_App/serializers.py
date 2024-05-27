from rest_framework import serializers
from .models import CustomUser, Post


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
