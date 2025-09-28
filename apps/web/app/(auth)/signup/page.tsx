import Link from "next/link";
import { SignupForm } from "@/app/components/auth/SignupForm";
import { OAuthSignup } from "@/app/components/auth/OAuthSignUp";
import AuthHeader from "@/app/components/auth/AuthHeader";

export const metadata = {
  title: 'Sign Up - Health Bridge',
  description: 'Create your Health Bridge account',
};

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 ">
      
      <AuthHeader/>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 ">
        <div className="max-w-md mx-auto border-2 p-4 rounded-2xl">
          {/* Static header content */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-orange-600">Sign Up</h2>
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-xl">Welcome to FixMate</p>
          </div>

          {/* Signup Form - Client Component */}
          <SignupForm />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* OAuth Section - Client Component */}
          <OAuthSignup />

          {/* Login link */}
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:underline">
              Login →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}