from django.urls import path
from .views import QuestionListCreate, AnswerCreate
urlpatterns = [
    path("questions/", QuestionListCreate.as_view(), name="questions"),
    path("answers/", AnswerCreate.as_view(), name="answers"),
]
