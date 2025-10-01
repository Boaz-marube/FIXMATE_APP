"use client";

import { useAuth } from '@/app/contexts/AuthContext';
import { LogoutButton } from '../auth/LogoutButton';
import { ModeToggle } from '../theme/mode-toggle';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and user info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">FixMate</span>
          </div>
          <div className="hidden md:block text-gray-500 dark:text-gray-400">|</div>
          <div className="hidden md:block">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back, <span className="font-medium text-gray-900 dark:text-white">{user?.name}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">
              {user?.userType} Dashboard
            </p>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          <ModeToggle />
          <LogoutButton variant="outline" size="sm" />
        </div>
      </div>
    </header>
  );
}