from django.urls import path
from .views import (
    BookmarkCreateDestroy,
    CommentListCreate,
    LikeCreateDestroy,
    PostBookmarksView,
    PostLikesView,
    PostList,
    PostDetail,
    category,
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "blog_api"

urlpatterns = [
    path("<int:pk>/", PostDetail.as_view(), name="detailcreate"),
    path("", PostList.as_view(), name="listcreate"),
    path("posts/", PostList.as_view(), name="post-list"),
    path("category/", category, name="category-list"),
    path(
        "posts/<int:pk>/comments/",
        CommentListCreate.as_view(),
        name="comment-list-create",
    ),
    path(
        "posts/<int:pk>/like/", LikeCreateDestroy.as_view(), name="like-create-destroy"
    ),
    path("posts/<int:post_id>/likes/", PostLikesView.as_view(), name="post-likes"),
    path(
        "posts/<int:post_id>/bookmarks/",
        PostBookmarksView.as_view(),
        name="post-bookmarks-view",
    ),
    path(
        "posts/<int:post_id>/bookmark/",
        BookmarkCreateDestroy.as_view(),
        name="bookmark-create-destroy",
    ),
]
