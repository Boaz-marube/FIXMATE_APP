import { apiClient } from './api-client.service';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  userType: string;
  role?: string;
  permissions?: string[];
}

interface AdminStats {
  totalCustomers: number;
  totalFixers: number;
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  activeFixers: number;
}

interface FixerManagement {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experienceYears: number;
  serviceArea: string;
  status: 'active' | 'inactive' | 'suspended';
  rating: number;
  completedJobs: number;
  joinedDate: string;
}

interface CustomerManagement {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  status: 'active' | 'inactive' | 'suspended';
  totalBookings: number;
  joinedDate: string;
}

interface BookingManagement {
  id: string;
  customerId: string;
  customerName: string;
  fixerId: string;
  fixerName: string;
  service: string;
  status: string;
  scheduledDate: string;
  price: number;
  createdAt: string;
}

interface Claim {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  fixerId: string;
  fixerName: string;
  type: 'refund' | 'complaint' | 'damage' | 'other';
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  createdAt: string;
  resolvedAt?: string;
}

class AdminService {
  async getProfile(adminId: string): Promise<AdminProfile | null> {
    try {
      return await apiClient.get<AdminProfile>('/auth/profile');
    } catch (error) {
      console.error('Failed to fetch admin profile:', error);
      return null;
    }
  }

  async getDashboardStats(): Promise<AdminStats | null> {
    try {
      return await apiClient.get<AdminStats>('/admin/stats');
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      return null;
    }
  }

  // Fixer Management
  async getAllFixers(): Promise<FixerManagement[]> {
    try {
      return await apiClient.get<FixerManagement[]>('/admin/fixers');
    } catch (error) {
      console.error('Failed to fetch fixers:', error);
      return [];
    }
  }

  async updateFixerStatus(fixerId: string, status: FixerManagement['status']): Promise<boolean> {
    try {
      await apiClient.patch(`/admin/fixers/${fixerId}`, { status });
      return true;
    } catch (error) {
      console.error('Failed to update fixer status:', error);
      return false;
    }
  }

  async suspendFixer(fixerId: string): Promise<boolean> {
    return this.updateFixerStatus(fixerId, 'suspended');
  }

  async activateFixer(fixerId: string): Promise<boolean> {
    return this.updateFixerStatus(fixerId, 'active');
  }

  // Customer Management
  async getAllCustomers(): Promise<CustomerManagement[]> {
    try {
      return await apiClient.get<CustomerManagement[]>('/admin/customers');
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      return [];
    }
  }

  async updateCustomerStatus(customerId: string, status: CustomerManagement['status']): Promise<boolean> {
    try {
      await apiClient.patch(`/admin/customers/${customerId}`, { status });
      return true;
    } catch (error) {
      console.error('Failed to update customer status:', error);
      return false;
    }
  }

  // Booking Management
  async getAllBookings(): Promise<BookingManagement[]> {
    try {
      return await apiClient.get<BookingManagement[]>('/admin/bookings');
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      return [];
    }
  }

  async getBookingById(bookingId: string): Promise<BookingManagement | null> {
    try {
      return await apiClient.get<BookingManagement>(`/admin/bookings/${bookingId}`);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
      return null;
    }
  }

  // Claims Management
  async getAllClaims(): Promise<Claim[]> {
    try {
      return await apiClient.get<Claim[]>('/admin/claims');
    } catch (error) {
      console.error('Failed to fetch claims:', error);
      return [];
    }
  }

  async updateClaimStatus(claimId: string, status: Claim['status']): Promise<boolean> {
    try {
      await apiClient.patch(`/admin/claims/${claimId}`, { status });
      return true;
    } catch (error) {
      console.error('Failed to update claim status:', error);
      return false;
    }
  }

  async resolveClaim(claimId: string): Promise<boolean> {
    return this.updateClaimStatus(claimId, 'resolved');
  }

  async rejectClaim(claimId: string): Promise<boolean> {
    return this.updateClaimStatus(claimId, 'rejected');
  }

  // Reports
  async getRevenueReport(startDate: string, endDate: string): Promise<any> {
    try {
      return await apiClient.get(`/admin/reports/revenue?start=${startDate}&end=${endDate}`);
    } catch (error) {
      console.error('Failed to fetch revenue report:', error);
      return null;
    }
  }

  async getBookingsReport(startDate: string, endDate: string): Promise<any> {
    try {
      return await apiClient.get(`/admin/reports/bookings?start=${startDate}&end=${endDate}`);
    } catch (error) {
      console.error('Failed to fetch bookings report:', error);
      return null;
    }
  }

  async getFixersReport(): Promise<any> {
    try {
      return await apiClient.get('/admin/reports/fixers');
    } catch (error) {
      console.error('Failed to fetch fixers report:', error);
      return null;
    }
  }
}

export const adminService = new AdminService();