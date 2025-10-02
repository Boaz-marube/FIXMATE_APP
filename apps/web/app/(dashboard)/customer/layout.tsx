import React from 'react'
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute'
import { DashboardHeader } from '@/app/components/dashboard/DashboardHeader'
import { Sidebar } from '@/app/components/dashboard/sidebar'

interface CustomerLayoutProps {
  children: React.ReactNode
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="min-h-screen bg-background flex">
        <Sidebar userType="customer" />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default CustomerLayout