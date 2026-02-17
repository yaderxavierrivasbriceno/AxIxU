import json

import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


def _safe_error_message(exc):
    if getattr(exc, "user_message", None):
        return exc.user_message
    return str(exc)


@csrf_exempt
@require_POST
def create_checkout_session(request):
    if not settings.STRIPE_SECRET_KEY:
        return JsonResponse(
            {"error": "STRIPE_SECRET_KEY is missing in backend/.env"},
            status=500,
        )

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload"}, status=400)

    amount_cents = payload.get("amount_cents", 1500)
    currency = str(payload.get("currency", "usd")).lower()
    product_name = str(payload.get("product_name", "AXIXU Order"))
    success_url = str(
        payload.get("success_url", f"{settings.FRONTEND_URL}/pago?status=success")
    )
    cancel_url = str(
        payload.get("cancel_url", f"{settings.FRONTEND_URL}/pago?status=cancel")
    )

    if not isinstance(amount_cents, int) or amount_cents <= 0:
        return JsonResponse(
            {"error": "amount_cents must be a positive integer"},
            status=400,
        )

    stripe.api_key = settings.STRIPE_SECRET_KEY

    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[
                {
                    "price_data": {
                        "currency": currency,
                        "product_data": {"name": product_name},
                        "unit_amount": amount_cents,
                    },
                    "quantity": 1,
                }
            ],
            success_url=success_url,
            cancel_url=cancel_url,
        )
    except stripe.error.StripeError as exc:
        return JsonResponse({"error": _safe_error_message(exc)}, status=400)

    return JsonResponse({"session_id": session.id, "checkout_url": session.url})
