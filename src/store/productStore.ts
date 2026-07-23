import { create } from 'zustand'
import { Product } from '@/types'

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  isLoading: boolean
  setProducts: (products: Product[]) => void
  setSelectedProduct: (product: Product | null) => void
  setLoading: (loading: boolean) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,

  setProducts: (products) => set({ products }),

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  setLoading: (loading) => set({ isLoading: loading }),
}))
