from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse
from .models import Category, Course, User, Lesson, Tag, Comment
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path


class LessonForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Lesson
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    search_fields = ['subject', 'category']
    readonly_fields = ['image_view']

    def image_view(self, course):
        if course:
            return mark_safe(
                '<img src="/static/{url}" width="120" />' \
                    .format(url=course.image.name)
            )

    def get_urls(self):
        return [
           path('course-stats/', self.stats_view)
        ] + super().get_urls()


    def stats_view(self, request):
        c = Course.objects.filter(active=True).count()
        stats = Course.objects.annotate(lesson_count=Count('my_lesson')).values('id', 'subject', 'lesson_count')

        return TemplateResponse(request,
                                'admin/course-stats.html', {
                                    'count': c,
                                    'stats': stats
                                })


class LessonAdmin(admin.ModelAdmin):
    form = LessonForm


class CategoryAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['name', 'created_date']
    list_display = ['id', 'name', 'created_date']


# Register your models here.
admin.site.register(User)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Tag)
admin.site.register(Comment)