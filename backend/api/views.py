from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer


# সব প্রশ্ন লিস্ট + নতুন প্রশ্ন যোগ
class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all().order_by("-id")
    serializer_class = QuestionSerializer


# নির্দিষ্ট প্রশ্নে উত্তর লিস্ট + উত্তর যোগ
@api_view(["GET", "POST"])
def answer_list_create(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response({"error": "Question not found"}, status=404)

    if request.method == "GET":
        answers = question.answers.all()
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(question=question)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
