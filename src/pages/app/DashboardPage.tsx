import AppLayout from '@src/components/layouts/AppLayout';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <span>Akademik ASP</span>
        <span>/</span>
      </div>
    </AppLayout>
  );
}
