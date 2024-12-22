# Generated by Django 5.1.4 on 2024-12-22 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Ticket",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("name", models.CharField(max_length=50)),
                ("email", models.CharField(max_length=100)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Open", "Open"),
                            ("In Progress", "In Progress"),
                            ("Resolved", "Resolved"),
                            ("Closed", "Closed"),
                        ],
                        default="Open",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now_add=True)),
                (
                    "issueType",
                    models.CharField(
                        choices=[
                            ("Bug", "Bug"),
                            ("Feature Request", "Feature Request"),
                            ("Access Issue", "Access Issue"),
                            ("Other", "Other"),
                        ],
                        default="Bug",
                        max_length=30,
                    ),
                ),
                (
                    "urgencyType",
                    models.CharField(
                        choices=[
                            ("Low", "Low"),
                            ("Medium", "Medium"),
                            ("High", "High"),
                            ("Critical", "Critical"),
                        ],
                        default="Low",
                        max_length=30,
                    ),
                ),
            ],
        ),
    ]