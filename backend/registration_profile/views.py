from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from registration_profile.models import RegistrationProfile, code_generator
from registration_profile.serializers import RegistrationSerializer, RegistrationValidationSerializer, \
    PasswordResetSerializer, PasswordResetValidationSerializer

User = get_user_model()


class CreateRegistrationView(GenericAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        send_mail(
            'Thank you for registering!',
            'Thank you for registering for Social POLY\n'
            f'Here is your code for registration:\n{instance.code}',
            'djppfinal@gmail.com',
            [request.data['email']],
            fail_silently=False,
        )
        return Response(status.HTTP_200_OK)


class ValidateCreateRegistrationView(GenericAPIView):
    serializer_class = RegistrationValidationSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            User.objects.create_user(email=serializer.validated_data['email'],
                                     password=serializer.validated_data['password'],
                                     username=serializer.validated_data['username'],
                                     first_name=serializer.validated_data['first_name'],
                                     last_name=serializer.validated_data['last_name'])
            return Response(status.HTTP_200_OK)


class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = RegistrationProfile.objects.get(email=request.data['email'])
        instance.code = code_generator()
        instance.save()
        send_mail(
            'Your password reset code!',
            f'Here is your password reset code:\n{instance.code}',
            'djppfinal@gmail.com',
            [request.data['email']],
            fail_silently=False,
        )
        return Response(status.HTTP_200_OK)


class PasswordResetValidationView(GenericAPIView):
    serializer_class = PasswordResetValidationSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = User.objects.get(email=serializer.validated_data['email'])
            user.password = make_password(serializer.validated_data['password'])
            user.save()
            send_mail(
                'Password reset',
                'Your password was successfully reset\nCongratulations!!!',
                'djppfinal@gmail.com',
                [request.data['email']],
                fail_silently=False,
            )
            return Response(status.HTTP_200_OK)
