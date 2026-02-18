import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Cloud, HardDrive } from 'lucide-react';

interface PatternSourceTabsProps {
  localContent: React.ReactNode;
  cloudContent: React.ReactNode;
}

export default function PatternSourceTabs({ localContent, cloudContent }: PatternSourceTabsProps) {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <Tabs defaultValue="local" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="local" className="gap-2">
          <HardDrive className="h-4 w-4" />
          Local
        </TabsTrigger>
        <TabsTrigger value="cloud" className="gap-2">
          <Cloud className="h-4 w-4" />
          Cloud
        </TabsTrigger>
      </TabsList>
      <TabsContent value="local" className="mt-4">
        {localContent}
      </TabsContent>
      <TabsContent value="cloud" className="mt-4">
        {isAuthenticated ? (
          cloudContent
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Cloud className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">Login Required</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Please login to access your cloud patterns
            </p>
            <Button onClick={login}>Login</Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
