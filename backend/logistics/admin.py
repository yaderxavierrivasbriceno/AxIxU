from django.contrib import admin

from .models import DeliveryTask, DriverAvailability, DriverProfile


@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "city", "vehicle_type", "is_active")
    list_filter = ("city", "vehicle_type", "is_active")
    search_fields = ("user__username",)


@admin.register(DriverAvailability)
class DriverAvailabilityAdmin(admin.ModelAdmin):
    list_display = ("driver", "start_time", "end_time", "is_online")
    list_filter = ("is_online",)


@admin.register(DeliveryTask)
class DeliveryTaskAdmin(admin.ModelAdmin):
    list_display = ("order", "driver", "status", "assigned_at", "completed_at")
    list_filter = ("status", "assigned_at")
    search_fields = ("order__id", "driver__user__username")
