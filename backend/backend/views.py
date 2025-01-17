from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework import status, viewsets
from tickets.models import Ticket, Admin, Agent
from tickets.serializers import TicketSerializer, AdminSerializer, AgentSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminUser, IsAgentUser
from tickets.serializers import CustomTokenObtainPairSerializer 
import json
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class AdminTicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    @action(detail=True, methods=['put'])
    def assign_agent(self, request, pk=None):
        ticket = self.get_object()
        
        if ticket.status == 'closed':
            return Response({"detail": "Cannot assign an agent to a closed ticket."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            admin = Admin.objects.get(user=request.user)
        except Admin.DoesNotExist:
            return Response({"detail": "You do not have permission to assign tickets."}, status=status.HTTP_403_FORBIDDEN)

        agent_id = request.data.get("agent_id")

        try:
            agent = Agent.objects.get(user_id=agent_id)
        except Agent.DoesNotExist:
            return Response({"detail": "Agent not found."}, status=status.HTTP_404_NOT_FOUND)

        admin.assign_ticket(ticket, agent)

        return Response(TicketSerializer(ticket).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def change_status(self, request, pk=None):
        ticket = self.get_object()

        new_status = request.data.get("status")
        if new_status not in ['Open', 'Resolved', 'Closed', 'In Progress']:
            return Response({"detail": "Invalid status value."}, status=status.HTTP_400_BAD_REQUEST)

        ticket.status = new_status
        ticket.save()

        return Response(TicketSerializer(ticket).data, status=status.HTTP_200_OK)


class UserTicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='user-tickets')
    def user_tickets(self, request):
        tickets = Ticket.objects.filter(user=request.user)
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], url_path='create-ticket')
    def create_ticket(self, request):
        data = json.loads(request.body.decode("utf-8"))
        ticket = Ticket.objects.create(
            title = data['title'], description = data['description'],  
            urgencyType = data['urgencyType'], issueType = data['issueType'],
            user=request.user, screenshot_links = data['screenshot_links']
        )
        ticket.save()
        return Response(TicketSerializer(ticket).data, status=status.HTTP_200_OK)

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes=[IsAuthenticated, IsAgentUser]

    def list(self, request):
        agents = self.get_queryset()
        emails = [{'email': agent.user.email} for agent in agents]
        return Response(emails)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer