from django.contrib import admin
from . import models


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "id",
        "category",
        "status",
        "slug",
        "author",
        "display_image",
    )
    prepopulated_fields = {
        "slug": ("title",),
    }

    def display_image(self, obj):
        return obj.image.url if obj.image else None

    display_image.short_description = "Image"


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
