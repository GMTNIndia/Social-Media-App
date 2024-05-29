from django.apps import AppConfig

class SocialMediaAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Social_Media_App"
    
    def ready(self):
        import Social_Media_App.signals
