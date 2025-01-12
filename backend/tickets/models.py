from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
import uuid
from django.contrib.postgres.fields import ArrayField

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, primary_key=True) 
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_agent = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

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

    id = models.UUIDField(
        primary_key=True,
        default = uuid.uuid4, 
        editable = False
    ) 
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(choices=STATUS_CHOICES, max_length=20, default='Open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    issueType = models.CharField(choices=ISSUE_TYPE, max_length=30, default='Bug')
    urgencyType = models.CharField(choices=URGENCY_TYPE, max_length=30, default='Low')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='tickets', on_delete=models.CASCADE)
    agent = models.ForeignKey('Agent', related_name='assigned_tickets', null=True, blank=True, on_delete=models.SET_NULL)
    assigned_by = models.ForeignKey('Admin', related_name='assigned_tickets', null=True, blank=True, on_delete=models.SET_NULL)
    screenshot_links = ArrayField(models.CharField(max_length=500), blank=True, null=True)

    def __str__(self):
        return self.title
    
    def is_assigned(self):
        return self.agent is not None
    

class Admin(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email
    
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
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    department = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.email