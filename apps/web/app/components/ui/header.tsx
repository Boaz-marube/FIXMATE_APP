"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "./button"
import { ModeToggle } from "../theme/mode-toggle"
import  '../../../public/fix-logo.svg'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-slate-900 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-0.5">
                <img
                  src="/fix-logo.svg"
                  alt="FixMate Logo"
                  className="w-full h-full object-cover rounded-full bg-none"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-[Poppins]">
                
              </span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="/doctors" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
             Fixers
            </a>
            <a 
              href="/contact" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ModeToggle />
            
            {/* Auth Buttons - Desktop */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  size="sm"
                  style={{
                    backgroundColor: "#FF8C42",
                    backgroundImage: "linear-gradient(276.68deg, #FFB347 20.18%, #FF6B35 94.81%)",
                    color: "white",
                  }}
                  className="shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="text-center px-4 py-4 space-y-3">
            {/* Mobile Navigation Links */}
            <a 
              href="/" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/about" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/doctors" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Fixers
            </a>
            <a 
              href="/contact" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            
            {/* Mobile Auth Buttons */}
            <div className="sm:hidden pt-3 border-t border-gray-200 dark:border-slate-700 space-y-2">
              <Link href="/login" className="block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600 hover:bg-orange-50 dark:hover:bg-slate-800 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="block">
                <Button 
                  size="sm" 
                  style={{
                    backgroundColor: "#FF8C42",
                    backgroundImage: "linear-gradient(276.68deg, #FFB347 20.18%, #FF6B35 94.81%)",
                    color: "white",
                  }}
                  className="w-full cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header