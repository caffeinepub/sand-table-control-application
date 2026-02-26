import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Send } from 'lucide-react';
import { useCommandClient } from '@/hooks/useCommandClient';
import { toast } from 'sonner';

interface GCodePreviewPanelProps {
  gCode: string;
}

export default function GCodePreviewPanel({ gCode }: GCodePreviewPanelProps) {
  const { sendCommand, isConnected } = useCommandClient();

  const handleDownload = () => {
    const blob = new Blob([gCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pattern-${Date.now()}.gcode`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('G-code downloaded');
  };

  const handleSend = async () => {
    try {
      await sendCommand(`UPLOAD:${gCode}`);
      toast.success('G-code sent to controller');
    } catch (error) {
      toast.error('Failed to send: ' + (error as Error).message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>G-Code Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-48 rounded-lg border border-border bg-muted p-4">
          <pre className="text-xs font-mono">{gCode || 'No G-code generated yet'}</pre>
        </ScrollArea>
        <div className="flex gap-2">
          <Button onClick={handleDownload} disabled={!gCode} className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button
            onClick={handleSend}
            disabled={!gCode || !isConnected}
            variant="secondary"
            className="flex-1 gap-2"
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
