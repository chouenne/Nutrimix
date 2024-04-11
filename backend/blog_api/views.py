from rest_framework import generics
from rest_framework.views import APIView
from blog.models import Bookmark, Like, Post, Category, Comment
from .serializers import (
    BookmarkSerializer,
    CommentSerializer,
    LikeSerializer,
    PostSerializer,
    CategorySerializer,
)
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
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView, DestroyAPIView

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

# 评论
class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        post_id = self.kwargs.get("pk")
        return Comment.objects.filter(post_id=post_id)


# 点赞
# class LikeCreateDestroy(generics.CreateAPIView, generics.DestroyAPIView):
class PostLikesView(APIView):
    def get(self, request, post_id):
        post = Post.objects.get(pk=post_id)
        likes_count = post.likes.count()  # 获取点赞数量
        user = request.user
        is_liked = False
        if user.is_authenticated:
            is_liked = post.likes.filter(user=user).exists()  # 检查当前用户是否已经点赞
        return Response({"likes_count": likes_count, "is_liked": is_liked})


class LikeCreateDestroy(CreateAPIView, DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            # 如果用户已登录，则将点赞与该用户关联
            serializer.save(user=user)
        else:
            # 如果用户未登录，则将点赞与 AnonymousUser 关联
            serializer.save(user=None)


# 收藏
class PostBookmarksView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        bookmarks_count = Bookmark.objects.filter(
            post_id=post_id
        ).count()  # 获取收藏数量
        user = request.user
        is_bookmarked = Bookmark.objects.filter(
            post_id=post_id, user=user
        ).exists()  # 检查当前用户是否已经收藏
        return Response(
            {"bookmarks_count": bookmarks_count, "is_bookmarked": is_bookmarked}
        )


# 收藏创建和删除
class BookmarkCreateDestroy(generics.CreateAPIView, generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        if not Bookmark.objects.filter(post_id=post_id, user=user).exists():
            Bookmark.objects.create(post_id=post_id, user=user)
            return Response({"message": "Bookmark created successfully."}, status=201)
        return Response({"message": "Bookmark already exists."}, status=200)

    def delete(self, request, post_id):
        user = request.user
        bookmark = Bookmark.objects.filter(post_id=post_id, user=user)
        if bookmark.exists():
            bookmark.delete()
            return Response(status=204)
        return Response(status=404)
