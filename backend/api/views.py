from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer
import requests
from transformers import pipeline
import torch


summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@api_view(['GET'])
def fetch_news(request):
    topic = request.GET.get('topic', 'technology')
    api_key = "YOUR_NEWS_API_KEY"
    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={api_key}"

    response = requests.get(url)
    data = response.json()
    summarized_articles = []

    for article in data.get("articles", [])[:5]:
        content = article.get('content') or ''
        if content:
            summary = summarizer(content[:1024])[0]['summary_text']
            summarized_articles.append({
                'title': article['title'],
                'summary': summary,
                'content': content,
                'url': article['url'],
                'topic': topic,
                'published_at': article['publishedAt'],
            })

    return Response(summarized_articles)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_article(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def saved_articles(request):
    articles = Article.objects.filter(user=request.user)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
