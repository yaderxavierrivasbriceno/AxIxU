from django.contrib import admin

from .models import City, DropOffLocation, Order, OrderItem, Product, Store


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ("name", "state", "is_active")
    list_filter = ("is_active", "state")
    search_fields = ("name", "state")


@admin.register(DropOffLocation)
class DropOffLocationAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "is_active")
    list_filter = ("city", "is_active")
    search_fields = ("name", "address")


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ("name", "owner", "city", "is_active", "created_at")
    list_filter = ("city", "is_active")
    search_fields = ("name", "owner__username")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "store", "price", "is_available")
    list_filter = ("store", "is_available")
    search_fields = ("name",)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "store", "status", "total_amount", "created_at")
    list_filter = ("status", "store", "created_at")
    search_fields = ("customer__username", "store__name")
    inlines = [OrderItemInline]
