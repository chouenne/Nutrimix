from django.conf import settings
from django.urls import path
from django.views.generic import TemplateView
from django.conf.urls.static import static


app_name = 'blog'

urlpatterns = [
    path('', TemplateView.as_view(template_name="blog/index.html")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
