import { useState } from 'react';
import { useConnectionStore } from '@/state/connectionStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ConnectionForm() {
  const { httpUrl, wsUrl, setHttpUrl, setWsUrl, testConnection } = useConnectionStore();
  const [localHttpUrl, setLocalHttpUrl] = useState(httpUrl);
  const [localWsUrl, setLocalWsUrl] = useState(wsUrl);
  const [testing, setTesting] = useState(false);

  const handleSave = () => {
    setHttpUrl(localHttpUrl);
    setWsUrl(localWsUrl);
    toast.success('Connection settings saved');
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      await testConnection();
      toast.success('Connection test successful');
    } catch (error) {
      toast.error('Connection test failed: ' + (error as Error).message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controller Connection</CardTitle>
        <CardDescription>
          Configure the connection to your sand table controller
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="httpUrl">HTTP Base URL</Label>
          <Input
            id="httpUrl"
            placeholder="http://192.168.1.100"
            value={localHttpUrl}
            onChange={(e) => setLocalHttpUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            The base URL for HTTP commands (required)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wsUrl">WebSocket URL (Optional)</Label>
          <Input
            id="wsUrl"
            placeholder="ws://192.168.1.100/ws"
            value={localWsUrl}
            onChange={(e) => setLocalWsUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            WebSocket URL for real-time status updates
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            Save Settings
          </Button>
          <Button onClick={handleTest} variant="outline" disabled={testing || !localHttpUrl}>
            {testing ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
