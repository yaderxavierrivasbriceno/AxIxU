from django.contrib import admin
from django.http import JsonResponse
from django.urls import path

from core.payments import create_checkout_session


def health_check(_request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", health_check, name="health-check"),
    path(
        "api/payments/create-checkout-session/",
        create_checkout_session,
        name="create-checkout-session",
    ),
]
