from tokenize import Comment
from rest_framework import serializers
from blog.models import Bookmark, Like, Post, Category
from django.conf import settings
from blog.models import Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Post
        fields = (
            "id",
            "title",
            "category",
            "ingredient",
            "author",
            "excerpt",
            "content",
            "status",
            "image",
        )


class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ("email", "user_name", "first_name")
        extra_kwargs = {"password": {"write_only": True}}

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ("id", "post", "author", "content", "created_at")

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Like
        fields = ("id", "post", "user", "created_at")


class BookmarkSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Bookmark
        fields = ("id", "post", "user", "created_at")
