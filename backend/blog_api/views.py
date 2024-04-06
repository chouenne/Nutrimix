from rest_framework import generics
from blog.models import Post, Category
from .serializers import PostSerializer, CategorySerializer
from rest_framework.permissions import (
    SAFE_METHODS,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    AllowAny,
    BasePermission,
    IsAdminUser,
    DjangoModelPermissions,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response

class PostUserWritePermission(BasePermission):
    message = "Editing posts is restricted to the author only."

    def has_object_permission(self, request, view, obj):

        # if request.method in SAFE_METHODS:
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [IsAuthenticatedOrReadOnly, AllowAny]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

    # filter  and See your own posts
    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            return Post.postobjects.filter(author=user)
        else:
            return Post.postobjects.all()

    def perform_create(self, serializer):
        # serializer.save(author=self.request.user)
        category_id = self.request.data.get("category", None)
        serializer.save(author=self.request.user, category_id=category_id)


@api_view(["GET"])
def category(request):
    categories = Category.objects.all()
    serialize = CategorySerializer(categories, many=True)
    return Response(serialize.data)


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
