import { apiClient } from './api-client.service';

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  userType: string;
}

interface Booking {
  id: string;
  fixerId: string;
  fixerName: string;
  service: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  description: string;
  price: number;
}

interface FixListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedPrice: number;
  estimatedDuration: string;
}

class CustomerService {
  async getProfile(customerId: string): Promise<CustomerProfile | null> {
    try {
      return await apiClient.get<CustomerProfile>('/auth/profile');
    } catch (error) {
      console.error('Failed to fetch customer profile:', error);
      return null;
    }
  }

  async updateProfile(customerId: string, data: Partial<CustomerProfile>): Promise<CustomerProfile | null> {
    try {
      return await apiClient.put<CustomerProfile>('/auth/profile', data);
    } catch (error) {
      console.error('Failed to update customer profile:', error);
      return null;
    }
  }

  async getBookings(customerId: string): Promise<Booking[]> {
    try {
      return await apiClient.get<Booking[]>(`/bookings/customer/${customerId}`);
    } catch (error) {
      console.error('Failed to fetch customer bookings:', error);
      return [];
    }
  }

  async createBooking(bookingData: Omit<Booking, 'id'>): Promise<Booking | null> {
    try {
      return await apiClient.post<Booking>('/bookings', bookingData);
    } catch (error) {
      console.error('Failed to create booking:', error);
      return null;
    }
  }

  async cancelBooking(bookingId: string): Promise<boolean> {
    try {
      await apiClient.patch(`/bookings/${bookingId}`, { status: 'cancelled' });
      return true;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      return false;
    }
  }

  async getFixList(): Promise<FixListItem[]> {
    try {
      return await apiClient.get<FixListItem[]>('/services/fixlist');
    } catch (error) {
      console.error('Failed to fetch fix list:', error);
      return [];
    }
  }

  async getFixProtectPlans(): Promise<any[]> {
    try {
      return await apiClient.get<any[]>('/services/fixprotect');
    } catch (error) {
      console.error('Failed to fetch FixProtect plans:', error);
      return [];
    }
  }

  async getFixTips(): Promise<any[]> {
    try {
      return await apiClient.get<any[]>('/services/fixtips');
    } catch (error) {
      console.error('Failed to fetch FixTips:', error);
      return [];
    }
  }
}

export const customerService = new CustomerService();