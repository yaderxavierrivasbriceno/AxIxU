"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.0060 };

function loadGoogleMapsScript(apiKey) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Browser environment required"));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  return new Promise((resolve, reject) => {
    const scriptId = "google-maps-script";

    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google.maps), {
        once: true,
      });
      existing.addEventListener(
        "error",
        () => reject(new Error("Could not load Google Maps")),
        { once: true },
      );
      return;
    }

    const callbackName = "__initGoogleMaps";
    window[callbackName] = () => {
      resolve(window.google.maps);
      delete window[callbackName];
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
    script.onerror = () => reject(new Error("Could not load Google Maps"));

    document.head.appendChild(script);
  });
}

export default function MapaPage() {
  const mapContainerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError(
        "No se encontro la API key. Agrega NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local",
      );
      return;
    }

    let isMounted = true;

    loadGoogleMapsScript(apiKey)
      .then((maps) => {
        if (!isMounted || !mapContainerRef.current) {
          return;
        }

        new maps.Map(mapContainerRef.current, {
          center: DEFAULT_CENTER,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
      })
      .catch(() => {
        if (isMounted) {
          setError("No se pudo cargar Google Maps. Revisa la API key y sus permisos.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">AXIXU</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Mapa de Operaciones</h1>
          <p className="mt-2 text-sm text-slate-600">
            Vista base para rutas de drivers, locales por ciudad y entregas.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Volver al inicio
          </Link>
        </header>

        {error ? (
          <section className="rounded-2xl border border-rose-300 bg-rose-50 p-5 text-rose-700">
            {error}
          </section>
        ) : null}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div ref={mapContainerRef} className="h-[65vh] w-full" />
        </section>
      </div>
    </main>
  );
}
