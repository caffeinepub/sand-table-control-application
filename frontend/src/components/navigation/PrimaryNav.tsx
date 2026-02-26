import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Sparkles, Lightbulb, Activity, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Patterns', icon: Home },
  { path: '/create', label: 'Create', icon: Sparkles },
  { path: '/led', label: 'LED', icon: Lightbulb },
  { path: '/dashboard', label: 'Status', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function PrimaryNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
