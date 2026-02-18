import Link from "next/link";

const pillars = [
  {
    title: "Idiomas",
    description:
      "Ruta progresiva por niveles, speaking guiado y micro-retos diarios.",
    href: "/idiomas",
    cta: "Ver plan de idiomas",
  },
  {
    title: "Habilidades con Agentes IA",
    description:
      "Prompts, automatizaciones y copilotos para productividad real.",
    href: "/agentes-ia",
    cta: "Explorar habilidades IA",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <section className="ax-card ax-fade-up mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-3xl p-6 shadow-[0_18px_45px_rgba(19,41,22,0.12)] sm:p-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <p className="rounded-full bg-[var(--ax-primary-soft)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ax-primary)]">
            AxIxU Web/App
          </p>
          <nav className="flex flex-wrap gap-3 text-sm font-medium text-[var(--ax-muted)]">
            <Link href="/idiomas" className="rounded-lg px-3 py-2 hover:bg-white/80">
              Idiomas
            </Link>
            <Link href="/agentes-ia" className="rounded-lg px-3 py-2 hover:bg-white/80">
              Agentes IA
            </Link>
          </nav>
        </header>

        <div className="ax-fade-up-delay max-w-3xl space-y-4">
          <h1 className="text-4xl leading-tight sm:text-6xl">
            Aprende <span className="ax-gradient-text">de todo</span> en una sola
            plataforma
          </h1>
          <p className="text-base text-[var(--ax-muted)] sm:text-lg">
            Desde idiomas hasta habilidades practicas con agentes de IA, AxIxU te da
            rutas claras, retos accionables y progreso medible.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="ax-card rounded-2xl p-5">
              <h2 className="text-2xl">{pillar.title}</h2>
              <p className="mt-2 text-sm text-[var(--ax-muted)]">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="mt-5 inline-flex rounded-xl bg-[var(--ax-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {pillar.cta}
              </Link>
            </article>
          ))}
        </div>

        <footer className="flex flex-wrap items-center gap-3 text-sm text-[var(--ax-muted)]">
          <Link href="/idiomas" className="rounded-lg border border-[var(--ax-border)] px-3 py-2 hover:bg-white">
            Empezar en idiomas
          </Link>
          <Link
            href="/agentes-ia"
            className="rounded-lg border border-[var(--ax-border)] px-3 py-2 hover:bg-white"
          >
            Empezar en agentes IA
          </Link>
          <a
            href="http://127.0.0.1:8000/health/"
            className="rounded-lg border border-[var(--ax-border)] px-3 py-2 hover:bg-white"
          >
            Backend health
          </a>
        </footer>
      </section>
    </main>
  );
}
