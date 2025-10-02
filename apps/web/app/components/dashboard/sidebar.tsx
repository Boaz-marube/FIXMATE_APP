"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { customerService } from '../../services/customer.service'
import { fixerService } from '../../services/fixer.service'
import { adminService } from '../../services/admin.service'
import Link from "next/link"
import {
    Calendar,
    Users,
    FileText,
    Pill,
    Heart,
    MessageCircle,
    Settings,
    LogOut,
    Home,
    Bell,
    User,
    Stethoscope,
    ClipboardList,
    UserCheck,
    BarChart3,
    Activity,
    Upload,
    Menu,
    X,
    Shield,
    Wrench,
  } from "lucide-react"
import { formatAdminName, formatCustomerName, formatFixerName } from "@/lib/name-utils"

interface User {
    id: string
    name: string
    email: string
    userType: 'customer' | 'fixer' | 'admin'
}
interface SidebarProps {
userType: 'customer' | 'fixer' | 'admin'
isOpen?: boolean
onToggle?: () => void
}

export function Sidebar({userType}: SidebarProps){
const [user, setUser] = useState<User | null>(null);
const [customerProfile, setCustomerProfile] = useState<any>(null)
const [fixerProfile, setFixerProfile] = useState<any>(null)
const [adminProfile, setAdminProfile] = useState<any>(null)
const router = useRouter()
const pathname = usePathname()

useEffect(()=>{
    const userData = localStorage.getItem('user')
    if (userData) {
        try {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
            
            // Fetch profile based on user type
            if (parsedUser.userType === 'fixer') {
            fetchFixerProfile(parsedUser.id)
            } else if (parsedUser.userType === 'customer') {
            fetchCustomerProfile(parsedUser.id)
            } else if (parsedUser.userType === 'admin') {
            fetchAdminProfile(parsedUser.id)
            }
        } catch (error) {
            console.error('Failed to parse user data:', error)
        }
        }
    
},[])


const fetchFixerProfile = async (fixerId: string) => {
    const profile = await fixerService.getProfile(fixerId)
    if (profile) {
    setFixerProfile(profile)
    }
}

const fetchCustomerProfile = async (customerId: string) => {
    const profile = await customerService.getProfile(customerId)
    if (profile) {
    setCustomerProfile(profile)
    }
}

const fetchAdminProfile = async (adminId: string) => {
    const profile = await adminService.getProfile(adminId)
    if (profile) {
    setAdminProfile(profile)
    } else {
    // Fallback: use user data from localStorage if profile not found
    const userData = localStorage.getItem('user')
    if (userData) {
        const user = JSON.parse(userData)
        setAdminProfile({ name: user.name, email: user.email })
    }
    }
}

const getMenuItems = () => {
    switch (userType) {
        case 'customer':
            return [
                { id:'home' ,label: 'Home',icon:Home , path: '/customer/dashboard' },
                { id:'bookings' ,label: 'Bookings',icon: Calendar, path: '/dashboard/customer/bookings' },
                { id:'fixlist' ,label: 'FixList',icon: Activity, path: '/dashboard/customer/fixlist' },
                { id:'fixprotect' ,label: 'FixProtect',icon: Shield, path: '/dashboard/customer/fixprotect' },
                { id:'fixtips' ,label: 'FixTips',icon: Bell, path: '/dashboard/customer/fixtips' },
                { id:'profile' ,label: 'My Profile',icon: User, path: '/dashboard/customer/profile' },
            ]
        case 'fixer':
            return [
                { id:'home' ,label: 'Home',icon: Home, path: '/fixer/dashboard' },
                { id:'bookings' ,label: 'Bookings',icon: Activity, path: '/dashboard/fixer/bookings' },
                { id:'profile' ,label: 'Profile',icon: User, path: '/dashboard/fixer/profile' },
            ]
        case 'admin':
            return [
                { id:'home' ,label: 'Home',icon: Home, path: '/admin/dashboard' },
                { id:'manage-fixers' ,label: 'Fixer Management',icon: Wrench, path: '/dashboard/admin/fixers' },
                { id: 'customers' ,label: 'Customer Management',icon: User, path: '/dashboard/admin/customers' },
                { id: 'bookings' ,label: 'Bookings',icon: Activity, path: '/dashboard/admin/bookings' },
                { id:'claims' ,label: 'Claims',icon: ClipboardList, path: '/dashboard/admin/claims' },
                { id:'reports' ,label: 'Reports',icon: BarChart3, path: '/dashboard/admin/reports' },
            ]
        default:
            return []
    }
}

const menuItems = getMenuItems()

const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/')

}

const getUserInfo = () => {
    switch (userType) {
        case "customer":
          const customerName = customerProfile?.name || user?.name || 'Loading...'
          if (customerName === 'Loading...') {
            return { name: customerName, icon: User }
          }
          return { name: formatCustomerName(customerName), icon: User }
        case "fixer":
          const fixerName = fixerProfile?.name || user?.name || 'Loading...'
          if (fixerName === 'Loading...') {
            return { name: fixerName, icon: Stethoscope }
          }
          return { name: formatFixerName(fixerName), icon: Stethoscope }
        case "admin":
          const adminName = adminProfile?.name || user?.name || 'Loading...'
          if (adminName === 'Loading...') {
            return { name: adminName, icon: ClipboardList }
          }
          return { name: formatAdminName(adminName), icon: ClipboardList }
        default:
          return { name: user?.name || 'Loading...', icon: User }
      }
}

const userInfo = getUserInfo()
const UserIcon = userInfo.icon

return(
    <>
        <div className='hidden md:flex w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen sticky top-0 flex-col overflow-hidden'>
            <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
                {userType === 'customer' ? (
                    <Link href='/patient/profile' className='flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors'>
                       <div className="bg-blue-500 rounded-full p-2">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {userInfo.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{userType}</p>
              </div>

                    </Link>
                ) :(
                    <div className="flex items-center space-x-3">
              <div className="bg-blue-500 rounded-full p-2">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {userInfo.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{userType}</p>
              </div>
            </div>
                )}
            </div>
                    {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`w-full flex items-center justify-start px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        </div>


      {/* Mobile Icons-Only Sidebar */}
      <div className="md:hidden fixed left-0 top-0 w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col items-center py-4 z-30">
        {/* User Profile Icon */}
        <div className="mb-6">
          <div className="bg-blue-500 rounded-full p-2">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
        </nav>
        </div>

    </>
)
}
