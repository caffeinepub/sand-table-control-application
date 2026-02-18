import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import PatternGalleryPage from './pages/PatternGalleryPage';
import PatternRunPage from './pages/PatternRunPage';
import CustomPatternCreatorPage from './pages/CustomPatternCreatorPage';
import LedControlPage from './pages/LedControlPage';
import DashboardPage from './pages/DashboardPage';
import SettingsConnectionPage from './pages/SettingsConnectionPage';

const rootRoute = createRootRoute({
  component: AppShell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PatternGalleryPage,
});

const patternRunRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pattern/$patternId',
  component: PatternRunPage,
});

const customCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CustomPatternCreatorPage,
});

const ledControlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/led',
  component: LedControlPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsConnectionPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  patternRunRoute,
  customCreatorRoute,
  ledControlRoute,
  dashboardRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
