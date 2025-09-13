from django.urls import path
from .views import QuestionListCreateView, answer_list_create

urlpatterns = [
    path("questions/", QuestionListCreateView.as_view(), name="question-list-create"),
    path("questions/<int:pk>/answers/", answer_list_create, name="answer-list-create"),
]
