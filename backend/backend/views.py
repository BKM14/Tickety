from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from tickets.models import Ticket, Admin, Agent
from tickets.serializers import TicketSerializer, AdminSerializer, AgentSerializer
from rest_framework.permissions import IsAuthenticated

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]  

    @action(detail=True, methods=['post'])
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
            agent = Agent.objects.get(id=agent_id)
        except Agent.DoesNotExist:
            return Response({"detail": "Agent not found."}, status=status.HTTP_404_NOT_FOUND)

        admin.assign_ticket(ticket, agent)

        return Response(TicketSerializer(ticket).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def change_status(self, request, pk=None):
        ticket = self.get_object()

        try:
            admin = Admin.objects.get(user=request.user)
        except Admin.DoesNotExist:
            return Response({"detail": "You do not have permission to change ticket status."}, status=status.HTTP_403_FORBIDDEN)

        new_status = request.data.get("status")
        if new_status not in ['Open', 'Resolved', 'Closed', 'In Progress']:
            return Response({"detail": "Invalid status value."}, status=status.HTTP_400_BAD_REQUEST)

        admin.change_ticket_status(ticket, new_status)

        return Response(TicketSerializer(ticket).data, status=status.HTTP_200_OK)

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
