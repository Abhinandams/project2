from django.urls import path
from . import views

urlpatterns = [
    path('fetch-news/', views.fetch_news),
    path('save-article/', views.save_article),
    path('saved/', views.saved_articles),
]
