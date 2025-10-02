import { apiClient } from './api-client.service';

interface FixerProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  skills: string[];
  experienceYears: number;
  serviceArea: string;
  nationalId?: string;
  description?: string;
  userType: string;
  rating?: number;
  completedJobs?: number;
}

interface FixerBooking {
  id: string;
  customerId: string;
  customerName: string;
  service: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  description: string;
  price: number;
  customerAddress: string;
  customerPhone: string;
}

interface FixerStats {
  totalJobs: number;
  completedJobs: number;
  pendingJobs: number;
  totalEarnings: number;
  averageRating: number;
}

class FixerService {
  async getProfile(fixerId: string): Promise<FixerProfile | null> {
    try {
      return await apiClient.get<FixerProfile>('/auth/profile');
    } catch (error) {
      console.error('Failed to fetch fixer profile:', error);
      return null;
    }
  }

  async updateProfile(fixerId: string, data: Partial<FixerProfile>): Promise<FixerProfile | null> {
    try {
      return await apiClient.put<FixerProfile>('/auth/profile', data);
    } catch (error) {
      console.error('Failed to update fixer profile:', error);
      return null;
    }
  }

  async getBookings(fixerId: string): Promise<FixerBooking[]> {
    try {
      return await apiClient.get<FixerBooking[]>(`/bookings/fixer/${fixerId}`);
    } catch (error) {
      console.error('Failed to fetch fixer bookings:', error);
      return [];
    }
  }

  async updateBookingStatus(bookingId: string, status: FixerBooking['status']): Promise<boolean> {
    try {
      await apiClient.patch(`/bookings/${bookingId}`, { status });
      return true;
    } catch (error) {
      console.error('Failed to update booking status:', error);
      return false;
    }
  }

  async acceptBooking(bookingId: string): Promise<boolean> {
    return this.updateBookingStatus(bookingId, 'confirmed');
  }

  async startJob(bookingId: string): Promise<boolean> {
    return this.updateBookingStatus(bookingId, 'in-progress');
  }

  async completeJob(bookingId: string): Promise<boolean> {
    return this.updateBookingStatus(bookingId, 'completed');
  }

  async getStats(fixerId: string): Promise<FixerStats | null> {
    try {
      return await apiClient.get<FixerStats>(`/fixers/${fixerId}/stats`);
    } catch (error) {
      console.error('Failed to fetch fixer stats:', error);
      return null;
    }
  }

  async updateAvailability(fixerId: string, isAvailable: boolean): Promise<boolean> {
    try {
      await apiClient.patch(`/fixers/${fixerId}/availability`, { isAvailable });
      return true;
    } catch (error) {
      console.error('Failed to update availability:', error);
      return false;
    }
  }
}

export const fixerService = new FixerService();