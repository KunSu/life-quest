type AppShellProps = {
  title: string;
  eyebrow: string;
  description: string;
};

export function AppShell({ title, eyebrow, description }: AppShellProps) {
  return (
    <main className="shell-page">
      <section className="shell-card">
        <span className="shell-eyebrow">{eyebrow}</span>
        <h1 className="shell-title">{title}</h1>
        <p className="shell-description">{description}</p>
      </section>
    </main>
  );
}
