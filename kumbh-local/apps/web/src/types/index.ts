export type UserRole = 'VISITOR' | 'PROVIDER' | 'ADMIN';

export type ProviderType = 
  | 'DRIVER' 
  | 'HOMESTAY' 
  | 'RESTAURANT' 
  | 'FARMER' 
  | 'GUIDE' 
  | 'VILLAGE_HOST' 
  | 'FULFILLMENT_PARTNER';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  personaTitle?: string;
  badge?: string;
  cityOrZone?: string;
  rating?: number;
  earningsOrSpend?: string;
  statLabel?: string;
  statsSummary?: string;
  createdAt?: string;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  businessName: string;
  providerType: ProviderType;
  description: string;
  phone: string;
  location: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  rating: number;
  reviewsCount: number;
  joinedDate: string;
}

export type SectorCategory = 'mobility' | 'stays' | 'food' | 'products' | 'guides' | 'experiences';

export interface BaseListing {
  id: string;
  providerId: string;
  providerName: string;
  providerType: ProviderType;
  category: SectorCategory;
  title: string;
  description: string;
  price: number;
  unit?: string; // e.g. "per night", "per person", "per box", "per seat"
  location: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  badges?: string[];
  shippingAvailable?: boolean;
  metadata?: {
    capacity?: number;
    duration?: string;
    languages?: string[];
    amenities?: string[];
    vehicleType?: string;
    pickupPoint?: string;
    destination?: string;
    departureTimes?: string[];
    prepTime?: string;
    stock?: number;
    origin?: string;
  };
}

export interface CartItem {
  id: string;
  listingId: string;
  title: string;
  category: SectorCategory;
  price: number;
  quantity: number;
  providerName: string;
  providerType: ProviderType;
  image?: string;
  bookingDate?: string;
  bookingTime?: string;
  selectedSeats?: number;
  isBoxHome?: boolean;
}

export interface Booking {
  id: string;
  visitorId: string;
  visitorName: string;
  visitorPhone?: string;
  providerId: string;
  providerName: string;
  serviceType: SectorCategory;
  serviceTitle: string;
  bookingDate: string;
  bookingTime?: string;
  amount: number;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PAID' | 'PENDING';
  passengersOrGuests?: number;
  pickupPoint?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  visitorId: string;
  visitorName: string;
  visitorAddress?: string;
  items: CartItem[];
  totalAmount: number;
  isBoxHome: boolean;
  fulfillmentPartnerName?: string;
  deliveryStatus: 'RECEIVED' | 'PACKED_AT_HUB' | 'IN_TRANSIT' | 'DELIVERED';
  trackingNumber?: string;
  createdAt: string;
}

export interface EconomicImpactMetrics {
  totalRevenueGenerated: number; // in INR
  totalBookingsCompleted: number;
  totalServiceJobsCreated: number;
  registeredProvidersCount: number;
  providersByCategory: {
    mobility: number;
    stays: number;
    food: number;
    products: number;
    guides: number;
    experiences: number;
    fulfillment: number;
  };
}
