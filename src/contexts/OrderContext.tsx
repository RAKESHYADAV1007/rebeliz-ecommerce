import React, { createContext, useContext, ReactNode } from 'react'
import { Order } from '@/types'

interface OrderContextType {
  orders: Order[]
  isLoading: boolean
  error: string | null
  fetchUserOrders: (userId: string) => Promise<void>
  createOrder: (order: any) => Promise<void>
  updateOrderStatus: (orderId: string, status: string) => Promise<void>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const value: OrderContextType = {
    orders,
    isLoading,
    error,
    fetchUserOrders: async (userId: string) => {
      // Fetch orders logic here
    },
    createOrder: async (order: any) => {
      // Create order logic here
    },
    updateOrderStatus: async (orderId: string, status: string) => {
      // Update status logic here
    },
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within OrderProvider')
  }
  return context
}
