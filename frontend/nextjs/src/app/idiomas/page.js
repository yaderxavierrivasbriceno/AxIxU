import Link from "next/link";

const languageTracks = [
  {
    id: "EN-A1",
    title: "Ingles Starter",
    focus: "Conversaciones esenciales y pronunciacion base.",
    cadence: "20 min al dia",
  },
  {
    id: "FR-A1",
    title: "Frances Foundations",
    focus: "Vocabulario de vida diaria y comprension auditiva.",
    cadence: "25 min al dia",
  },
  {
    id: "JP-N5",
    title: "Japones N5 Sprint",
    focus: "Hiragana, frases utiles y estructura de oraciones.",
    cadence: "30 min al dia",
  },
];

export default function IdiomasPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <section className="ax-card mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-3xl p-6 sm:p-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ax-primary)]">
            AxIxU / Idiomas
          </p>
          <h1 className="text-4xl sm:text-5xl">Rutas de aprendizaje por idioma</h1>
          <p className="max-w-3xl text-sm text-[var(--ax-muted)] sm:text-base">
            Escoge un idioma y avanza por ciclos cortos: teoria minima, practica guiada
            y evaluacion semanal.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {languageTracks.map((track) => (
            <article key={track.id} className="ax-card rounded-2xl p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--ax-accent)]">{track.id}</p>
              <h2 className="mt-2 text-2xl">{track.title}</h2>
              <p className="mt-2 text-sm text-[var(--ax-muted)]">{track.focus}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--ax-primary)]">{track.cadence}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-[var(--ax-primary)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            Volver al inicio
          </Link>
          <Link
            href="/agentes-ia"
            className="rounded-xl border border-[var(--ax-border)] px-4 py-2 text-sm font-semibold text-[var(--ax-ink)] hover:bg-white"
          >
            Ir a habilidades IA
          </Link>
        </div>
      </section>
    </main>
  );
}
