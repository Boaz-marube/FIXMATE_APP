"use client";

import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '../ui/button';

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function LogoutButton({ variant = 'outline', size = 'sm', className }: LogoutButtonProps) {
  const { logout } = useAuth();

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={logout}
      className={className}
    >
      Logout
    </Button>
  );
}