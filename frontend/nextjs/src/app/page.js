import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">AXIXU Platform</p>
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
          Marketplace + Drivers + Locales por ciudad
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
          Frontend en Next.js con Google Maps y Stripe test para operaciones de entregas.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/mapa"
            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
          >
            Abrir mapa
          </Link>
          <Link
            href="/pago"
            className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
          >
            Probar Stripe
          </Link>
          <a
            href="http://127.0.0.1:8000/health/"
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
          >
            Backend health
          </a>
        </div>
      </section>
    </main>
  );
}
