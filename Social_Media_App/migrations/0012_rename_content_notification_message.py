# Generated by Django 5.0.6 on 2024-06-03 05:04

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("Social_Media_App", "0011_rename_content_message_message"),
    ]

    operations = [
        migrations.RenameField(
            model_name="notification",
            old_name="content",
            new_name="message",
        ),
    ]
