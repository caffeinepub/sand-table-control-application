import { Outlet } from '@tanstack/react-router';
import PrimaryNav from '../navigation/PrimaryNav';
import EmergencyStopFab from '../safety/EmergencyStopFab';
import AppLogo from '../branding/AppLogo';
import ThemeToggle from '../theme/ThemeToggle';
import LoginButton from '../auth/LoginButton';
import ProfileSetupModal from '../auth/ProfileSetupModal';
import ResumePromptDialog from '../safety/ResumePromptDialog';

export default function AppShell() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <AppLogo />
            <h1 className="text-lg font-semibold tracking-tight">Sand Table</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <PrimaryNav />
      <EmergencyStopFab />
      <ProfileSetupModal />
      <ResumePromptDialog />
    </div>
  );
}
