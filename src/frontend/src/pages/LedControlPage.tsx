import LedControlPanel from '@/components/led/LedControlPanel';

export default function LedControlPage() {
  return (
    <div className="container max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">LED Control</h1>
        <p className="text-muted-foreground">
          Control the RGB LED lighting for your sand table
        </p>
      </div>

      <LedControlPanel />
    </div>
  );
}
