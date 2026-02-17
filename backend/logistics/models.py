from django.conf import settings
from django.db import models

from marketplace.models import City, DropOffLocation, Order


class DriverProfile(models.Model):
    class VehicleType(models.TextChoices):
        MOTORCYCLE = "motorcycle", "Motorcycle"
        BICYCLE = "bicycle", "Bicycle"
        CAR = "car", "Car"
        VAN = "van", "Van"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="driver_profile",
    )
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name="drivers")
    vehicle_type = models.CharField(
        max_length=20,
        choices=VehicleType.choices,
        default=VehicleType.MOTORCYCLE,
    )
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"Driver: {self.user.username}"


class DriverAvailability(models.Model):
    driver = models.ForeignKey(
        DriverProfile,
        on_delete=models.CASCADE,
        related_name="availability_slots",
    )
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_online = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.driver.user.username} {self.start_time}-{self.end_time}"


class DeliveryTask(models.Model):
    class Status(models.TextChoices):
        ASSIGNED = "assigned", "Assigned"
        PICKED_UP = "picked_up", "Picked up"
        IN_ROUTE = "in_route", "In route"
        COMPLETED = "completed", "Completed"
        FAILED = "failed", "Failed"

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="delivery")
    driver = models.ForeignKey(
        DriverProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="deliveries",
    )
    pickup_location = models.ForeignKey(
        DropOffLocation,
        on_delete=models.PROTECT,
        related_name="delivery_tasks",
    )
    dropoff_address = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ASSIGNED)
    assigned_at = models.DateTimeField(auto_now_add=True)
    picked_up_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self) -> str:
        return f"Delivery for order #{self.order_id}"
