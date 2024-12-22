from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Ticket(models.Model):
    STATUS_CHOICES = (
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
        ('Closed', 'Closed')
    )

    ISSUE_TYPE = (
        ('Bug', 'Bug'),
        ('Feature Request', 'Feature Request'),
        ('Access Issue', 'Access Issue'),
        ('Other', 'Other')
    )

    URGENCY_TYPE = (
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
        ('Critical', 'Critical')
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    status = models.CharField(choices=STATUS_CHOICES, max_length=20, default='Open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    issueType = models.CharField(choices=ISSUE_TYPE, max_length=30, default='Bug')
    urgencyType = models.CharField(choices=URGENCY_TYPE, max_length=30, default='Low')
    user = models.ForeignKey(User, related_name='tickets', on_delete=models.CASCADE)
    agent = models.ForeignKey('Agent', related_name='assigned_tickets', null=True, blank=True, on_delete=models.SET_NULL)
    assigned_by = models.ForeignKey('Admin', related_name='assigned_tickets', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title
    
    def is_assigned(self):
        return self.agent is not None
    

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    
    def assign_ticket(self, ticket, agent):
        if ticket.status != 'closed': 
            ticket.agent = agent
            ticket.assigned_by = self
            ticket.save()

    def change_ticket_status(self, ticket, new_status):
        if new_status in ['Open', 'In Progress', 'Closed', 'Resolved']:
            ticket.status = new_status
            ticket.save()

class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.username