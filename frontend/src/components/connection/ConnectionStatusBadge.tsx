import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useConnectionStore } from '@/state/connectionStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ConnectionStatusBadge() {
  const { status, lastError } = useConnectionStore();

  const getIcon = () => {
    switch (status) {
      case 'Connected':
        return <Wifi className="h-3 w-3" />;
      case 'Connecting':
        return <Loader2 className="h-3 w-3 animate-spin" />;
      default:
        return <WifiOff className="h-3 w-3" />;
    }
  };

  const getVariant = () => {
    switch (status) {
      case 'Connected':
        return 'default';
      case 'Connecting':
        return 'secondary';
      default:
        return 'destructive';
    }
  };

  if (!lastError) {
    return (
      <Badge variant={getVariant()} className="gap-1">
        {getIcon()}
        {status}
      </Badge>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge variant={getVariant()} className="gap-1 cursor-pointer">
          {getIcon()}
          {status}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Connection Error</h4>
          <p className="text-sm text-muted-foreground">{lastError}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
