from rest_framework import serializers
from blog.models import Post, Category
from django.conf import settings


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    # 将 category 字段从只读字段更改为可写字段
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
