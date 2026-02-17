"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getStripe } from "@/lib/stripe";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export default function PagoPage() {
  const [amount, setAmount] = useState("15");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [checkoutResult, setCheckoutResult] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCheckoutResult(params.get("status") || "");
  }, []);

  const checkoutBanner = useMemo(() => {
    if (checkoutResult === "success") {
      return {
        tone: "success",
        text: "Pago completado en modo test.",
      };
    }

    if (checkoutResult === "cancel") {
      return {
        tone: "warning",
        text: "Pago cancelado por el usuario.",
      };
    }

    return null;
  }, [checkoutResult]);

  const handleCheckout = async () => {
    const parsed = Number(amount);
    const amountCents = Math.round(parsed * 100);

    if (!Number.isFinite(parsed) || amountCents <= 0) {
      setStatus("error");
      setMessage("Ingresa un monto valido mayor a 0.");
      return;
    }

    setStatus("loading");
    setMessage("Creando sesion de pago...");

    try {
      const stripe = await getStripe();
      const origin = window.location.origin;

      const response = await fetch(
        `${BACKEND_URL}/api/payments/create-checkout-session/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount_cents: amountCents,
            currency: "usd",
            product_name: "AXIXU Test Payment",
            success_url: `${origin}/pago?status=success`,
            cancel_url: `${origin}/pago?status=cancel`,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo crear la sesion de pago");
      }

      if (stripe && data.session_id) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.session_id,
        });

        if (result?.error?.message) {
          throw new Error(result.error.message);
        }

        return;
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }

      throw new Error("Stripe no devolvio una URL de checkout valida");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Ocurrio un error de pago");
      return;
    }

    setStatus("success");
    setMessage("Redirigiendo a Stripe...");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Pagos</p>
        <h1 className="text-3xl font-bold text-slate-900">Stripe Checkout Test</h1>
        <p className="text-sm text-slate-600">
          Este flujo crea la sesion en Django con tu `sk_test` y luego abre Stripe Checkout.
        </p>

        {checkoutBanner ? (
          <div
            className={`rounded-xl border p-4 text-sm ${
              checkoutBanner.tone === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-amber-300 bg-amber-50 text-amber-700"
            }`}
          >
            {checkoutBanner.text}
          </div>
        ) : null}

        <label className="flex max-w-sm flex-col gap-2 text-sm font-medium text-slate-700">
          Monto (USD)
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2 outline-none ring-emerald-300 transition focus:ring"
          />
        </label>

        <button
          type="button"
          onClick={handleCheckout}
          className="w-fit rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Procesando..." : "Pagar con Stripe"}
        </button>

        {message ? (
          <div
            className={`rounded-xl border p-4 text-sm ${
              status === "error"
                ? "border-rose-300 bg-rose-50 text-rose-700"
                : "border-emerald-300 bg-emerald-50 text-emerald-700"
            }`}
          >
            {message}
          </div>
        ) : null}

        <div className="pt-2">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
