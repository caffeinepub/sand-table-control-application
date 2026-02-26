import ConnectionForm from '@/components/connection/ConnectionForm';
import ConnectionStatusBadge from '@/components/connection/ConnectionStatusBadge';

export default function SettingsConnectionPage() {
  return (
    <div className="container max-w-2xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your sand table controller connection
          </p>
        </div>
        <ConnectionStatusBadge />
      </div>

      <ConnectionForm />
    </div>
  );
}
