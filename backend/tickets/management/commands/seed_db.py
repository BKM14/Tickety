from django.core.management.base import BaseCommand
from tickets.models import CustomUser, Admin, Agent, Ticket

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Creating users...'))

        user1 = CustomUser.objects.create_user(
        email='john.doe@example.com',
        password='password123'
        )

        user2 = CustomUser.objects.create_user(
        email='mary.jane@example.com',
        password='password123'
        )

        user1.save()
        user2.save()
        
        admin_user = CustomUser.objects.create(
            email="admin@example.com",
            password='adminpassword'
        )
        
        admin = Admin.objects.create(user=admin_user)
        admin.is_superuser = True
        admin.is_staff = True
        admin.save()
        
        agent_user = CustomUser.objects.create(
            email="agent@example.com",
            password='agentpassword'
        )
        
        agent = Agent.objects.create(user=agent_user, department="Support")
        agent.is_staff = True
        agent.save()

        self.stdout.write(self.style.SUCCESS('Creating tickets...'))
        
        ticket1 = Ticket.objects.create(
            title="Bug in the system",
            description="There is a bug in the login system.",
            urgencyType="High",
            issueType="Bug",
            user=user1,
        )
        
        ticket2 = Ticket.objects.create(
            title="Feature request",
            description="Request to add a dark mode feature.",
            urgencyType="Medium",
            issueType="Feature Request",
            user=user1,
        )
        
        ticket3 = Ticket.objects.create(
            title="Access issue",
            description="User cannot access the admin dashboard.",
            urgencyType="Critical",
            issueType="Access Issue",
            user=user2,
        )

        ticket1.save()
        ticket2.save()
        ticket3.save()



        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
