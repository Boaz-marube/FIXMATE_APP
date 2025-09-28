import Link from "next/link";
import { LoginForm } from "@/app/components/auth/LoginForm";
import { OAuthSection } from "@/app/components/auth/OAuthSection";
import AuthHeader from "@/app/components/auth/AuthHeader";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthHeader/>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto border-2 rounded-2xl p-6">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-orange-600">
            Welcome Back 
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-xl ">
            Sign in to your account to book trusted fixers
            </p>
          </div>
          <LoginForm />
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
              OR
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <OAuthSection />

          {/* Signup Link */}
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-orange-400 hover:underline">
              Signup →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
