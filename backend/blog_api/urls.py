from django.urls import path
from .views import PostList, PostDetail, category

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'blog_api'

urlpatterns = [
    path("<int:pk>/", PostDetail.as_view(), name="detailcreate"),
    path("", PostList.as_view(), name="listcreate"),
    path("posts/", PostList.as_view(), name="post-list"),
    path("category/", category, name="category-list"),
]
