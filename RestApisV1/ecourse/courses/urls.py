from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(prefix='categories', viewset=views.CategoryViewset, basename='category')
router.register(prefix='courses', viewset=views.CourseViewSet, basename='course')
router.register(prefix='lessons', viewset=views.LessonViewSet, basename='lesson')
router.register(prefix='comments', viewset=views.CommentViewSet, basename='comment')
router.register(prefix='users', viewset=views.UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls))
]