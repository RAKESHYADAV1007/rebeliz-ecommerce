import React, { createContext, useContext, ReactNode } from 'react'
import { Product } from '@/types'

interface ProductContextType {
  products: Product[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  fetchProductsByCategory: (category: string) => Promise<void>
  searchProducts: (term: string) => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const value: ProductContextType = {
    products,
    isLoading,
    error,
    fetchProducts: async () => {
      // Fetch products logic here
    },
    fetchProductsByCategory: async (category: string) => {
      // Fetch by category logic here
    },
    searchProducts: async (term: string) => {
      // Search logic here
    },
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}
