// User Types
export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  address?: Address
  createdAt: Date
  updatedAt: Date
  role: 'customer' | 'admin'
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault?: boolean
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  size: string[]
  color: string[]
  material?: string
  rating: number
  reviews: number
  inStock: boolean
  sku: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductFilter {
  category?: string
  priceRange?: [number, number]
  colors?: string[]
  sizes?: string[]
  rating?: number
  inStock?: boolean
  search?: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  lastUpdated: Date
}

// Order Types
export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  selectedSize: string
  selectedColor: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: string
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'completed' | 'failed'
  trackingNumber?: string
  createdAt: Date
  updatedAt: Date
  estimatedDelivery?: Date
}

// Review Types
export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userPhoto?: string
  rating: number
  title: string
  comment: string
  helpful: number
  createdAt: Date
  updatedAt: Date
}

// Wishlist Types
export interface WishlistItem {
  id: string
  productId: string
  product: Product
  addedAt: Date
}

// Payment Types
export interface PaymentInfo {
  method: 'card' | 'paypal' | 'wallet'
  cardDetails?: {
    cardNumber: string
    expiryDate: string
    cvv: string
    holderName: string
  }
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'order' | 'promotion' | 'system' | 'review'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: Date
}

// Analytics Types
export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  ordersTrend: Array<{ date: string; count: number }>
  topProducts: Array<{ id: string; name: string; sales: number }>
}
