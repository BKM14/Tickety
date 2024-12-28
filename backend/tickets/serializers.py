from rest_framework import serializers
from .models import Ticket, CustomUser, Admin, Agent
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'first_name', 'last_name', 'email'
        ]

class TicketSerializer(serializers.ModelSerializer):

    agent_email = serializers.CharField(source='agent.user.email', read_only=True)
    class Meta:
        model = Ticket
        fields = [
            'id', 'title', 'description',   
            'status', 'created_at', 'updated_at', 
            'issueType', 'urgencyType', 'user', 'agent_email',
            'assigned_by'
        ]

class AdminSerializer(serializers.ModelSerializer):
    user  = UserSerializer()

    class Meta:
        model = Admin
        fields = ['id', 'user']

class AgentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model: Agent
        fields = ['id', 'user', 'department']

class EmailTokenObtainSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = CustomUser.objects.get(email=email)
        if user and user.check_password(password):
            self.user = user
            return attrs
        raise serializers.ValidationError("Invalid credentials")

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)


class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
    def validate(self, attrs):
        super().validate(attrs)

        refresh = self.get_token(self.user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }