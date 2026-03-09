import { AppShell } from '@/components/shared/app-shell';
import { bootstrapDatabase } from '@/src/db/client';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  bootstrapDatabase();

  return (
    <AppShell
      eyebrow="Dashboard"
      title="Life Quest"
      description="A mobile-first shell for the Life Quest MVP."
    />
  );
}
