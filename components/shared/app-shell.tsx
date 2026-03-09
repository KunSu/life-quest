import type { ReactNode } from 'react';

type AppShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  action?: ReactNode;
};

export function AppShell({
  title,
  eyebrow,
  description,
  action,
}: AppShellProps) {
  return (
    <main className="shell-page">
      <section className="shell-card">
        <div className="shell-toolbar">
          <span className="shell-eyebrow">{eyebrow}</span>
          {action}
        </div>
        <h1 className="shell-title">{title}</h1>
        <p className="shell-description">{description}</p>
      </section>
    </main>
  );
}
