# Generated by Django 5.0.6 on 2024-05-24 06:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Social_Media_App", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="profile_photo",
            field=models.ImageField(blank=True, null=True, upload_to="profile_photos/"),
        ),
    ]
