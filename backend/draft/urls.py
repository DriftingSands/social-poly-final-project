from django.urls import path

from draft.views import CreateDraft, SearchDraftView, RetrieveUpdateDeleteDraftView

urlpatterns = [
    path('create/', CreateDraft.as_view()),
    path('search/', SearchDraftView.as_view()),
    path('update/<int:id>/', RetrieveUpdateDeleteDraftView.as_view())
]