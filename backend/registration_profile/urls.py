from django.urls import path

from registration_profile.views import CreateRegistrationView, ValidateCreateRegistrationView, PasswordResetView, \
    PasswordResetValidationView

urlpatterns = [
    path('', CreateRegistrationView.as_view()),
    path('validation/', ValidateCreateRegistrationView.as_view()),
    path('password-reset/', PasswordResetView.as_view()),
    path('password-reset/validation/', PasswordResetValidationView.as_view()),
]
