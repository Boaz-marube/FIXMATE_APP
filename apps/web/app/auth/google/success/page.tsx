'use client'

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

function GoogleAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const userParam = searchParams.get('user');

    if (token && userParam) {
      try {
        // Parse user data from URL
        const user = JSON.parse(decodeURIComponent(userParam));
        
        if (!token) throw new Error('Token is missing');
        if (!user.id) throw new Error('User ID is missing');
        
        // Use AuthContext login method
        login(token, refreshToken || '', user);
        
        // Redirect based on user type
        const redirectPath = user.userType === 'fixer' ? '/fixer' : '/customer';
        router.push(redirectPath);
      } catch (error) {
        console.error('Error processing Google auth:', error);
        router.push('/login?error=Authentication failed');
      }
    } else {
      router.push('/login?error=Authentication failed');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Completing Google sign in...</p>
      </div>
    </div>
  );
}

export default function GoogleAuthSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleAuthSuccessContent />
    </Suspense>
  );
}