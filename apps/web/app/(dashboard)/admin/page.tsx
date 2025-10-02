import React from 'react'
import { ProtectedRoute } from '@/app/components/auth/ProtectedRoute'
import { DashboardHeader } from '@/app/components/dashboard/DashboardHeader'
import { Sidebar } from '@/app/components/dashboard/sidebar'

const AdminDashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-background flex">
        <Sidebar userType="admin" />
        <div className="flex-1">
          <DashboardHeader />
          <div className="p-6 md:ml-0">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
                  <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-2">Total Fixers</h2>
                  <p className="text-3xl font-bold text-green-600">0</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-2">Active Bookings</h2>
                  <p className="text-3xl font-bold text-orange-600">0</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
                  <p className="text-3xl font-bold text-purple-600">KSh 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AdminDashboard