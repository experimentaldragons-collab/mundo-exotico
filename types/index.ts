import { UserRole, UserStatus, SellerStatus, ListingStatus, ListingType, OrderStatus } from '@prisma/client';

export type { User, Seller, Country, Category, Species, Listing, Order, Review } from '@prisma/client';

export type UserWithSeller = any; // To be expanded

export interface AuthContext {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export interface ListingFilters {
  categoryId?: string;
  speciesId?: string;
  countryId?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ListingStatus;
  sellerId?: string;
  search?: string;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'popular';
  page?: number;
  limit?: number;
}

export interface SearchResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
