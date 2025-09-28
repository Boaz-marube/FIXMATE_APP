"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export function OAuthSection() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005'}/auth/google`;
    console.log('Redirecting to Google auth:', googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex items-center justify-center w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        <FcGoogle className="mr-3" size={20} />
        <span className="text-gray-700 dark:text-gray-300">
          Login with Google
        </span>
      </button>
    </div>
  );
}