from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from draft.models import Draft
from draft.serializers import DraftSerializer

User = get_user_model()


class CreateDraft(GenericAPIView):
    serializer_class = DraftSerializer
    queryset = Draft.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)

        return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        if self.kwargs:
            queryset = self.get_queryset().filter(author=self.kwargs['author_id'])
        else:
            queryset = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SearchDraftView(ListCreateAPIView):
    serializer_class = DraftSerializer
    queryset = Draft.objects.all()

    def get_queryset(self):
        search = self.request.query_params.get('search')
        if search:
            return Draft.objects.filter(content__contains=search)
        return Draft.objects.all()


class RetrieveUpdateDeleteDraftView(RetrieveUpdateDestroyAPIView):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer
    lookup_field = 'id'

    permission_classes = [IsAuthenticated]
