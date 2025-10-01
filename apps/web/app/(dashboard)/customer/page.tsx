import React from 'react'
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute'
import { DashboardHeader } from '@/app/components/dashboard/DashboardHeader'

const customerDash = () => {
  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-6">Customer Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Active Bookings</h2>
                <p className="text-3xl font-bold text-orange-600">0</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Completed Jobs</h2>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Total Spent</h2>
                <p className="text-3xl font-bold text-blue-600">KSh 0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default customerDash