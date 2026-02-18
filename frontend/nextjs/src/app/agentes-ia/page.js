import Link from "next/link";

const aiSkills = [
  {
    title: "Prompt Design",
    level: "Base",
    result: "Crear prompts claros para tareas de estudio y trabajo.",
  },
  {
    title: "Automatizacion",
    level: "Intermedio",
    result: "Conectar herramientas y ejecutar flujos repetibles con agentes.",
  },
  {
    title: "Copiloto Personal",
    level: "Avanzado",
    result: "Disenar un agente con memoria, contexto y evaluacion continua.",
  },
];

export default function AgentesIaPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <section className="ax-card mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-3xl p-6 sm:p-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ax-primary)]">
            AxIxU / Agentes IA
          </p>
          <h1 className="text-4xl sm:text-5xl">Habilidades con agentes de IA</h1>
          <p className="max-w-3xl text-sm text-[var(--ax-muted)] sm:text-base">
            Un camino practico para pasar de usar IA en modo casual a construir
            sistemas de aprendizaje y productividad.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {aiSkills.map((skill) => (
            <article key={skill.title} className="ax-card rounded-2xl p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--ax-accent)]">
                Nivel {skill.level}
              </p>
              <h2 className="mt-2 text-2xl">{skill.title}</h2>
              <p className="mt-2 text-sm text-[var(--ax-muted)]">{skill.result}</p>
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
            href="/idiomas"
            className="rounded-xl border border-[var(--ax-border)] px-4 py-2 text-sm font-semibold text-[var(--ax-ink)] hover:bg-white"
          >
            Ir a idiomas
          </Link>
        </div>
      </section>
    </main>
  );
}
