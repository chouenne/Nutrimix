from django.contrib import admin
from . import models


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "id",
        "category",
        'max_cooking_time',
        "ingredient",
        "status",
        "slug",
        "author",
        "display_image",
    )
    prepopulated_fields = {
        "slug": ("title",),
    }

    def max_cooking_time(self, obj):
        return obj.max_cooking_time

    max_cooking_time.short_description = 'Max Cooking Time'

    def display_image(self, obj):
        return obj.image.url if obj.image else None

    display_image.short_description = "Image"


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
