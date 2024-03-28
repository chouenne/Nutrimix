from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, UserDeleteView

app_name = 'users'

urlpatterns = [
    path("create/", CustomUserCreate.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
    path("users/<int:pk>/", UserDeleteView.as_view(), name="delete-user"),
]
