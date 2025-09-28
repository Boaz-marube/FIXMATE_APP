import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../theme/mode-toggle'
import  '../../../public/fix-logo.svg'

const AuthHeader = () => {
  return (
    <>
     
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm dark:bg-gray-800">
        <div className="flex items-center">
          <Link href="/" className="mr-4 text-orange-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z" />
            </svg>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-0.5">
              <img
                src="fix-logo.svg"
                alt="Health Bridge Logo"
                className="w-full h-full object-cover rounded-full bg-transparent"
              />
            </div>
            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-[Poppins]">
            
            </span>
          </div>
        </div>
        <ModeToggle />
      </div>
     
    </>
  )
}

export default AuthHeader