from rest_framework import serializers
from .models import Ticket, User, Admin, Agent

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'name', 'email'
        ]

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            'id', 'title', 'description', 'name', 'email',  
            'status', 'created_at', 'updated_at', 
            'issueType', 'urgencyType', 'user', 'agent',
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

