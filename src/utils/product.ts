import { Product, ProductFilter } from '@/types'

// Filter products by criteria
export const filterProducts = (
  products: Product[],
  filters: ProductFilter
): Product[] => {
  return products.filter((product) => {
    // Filter by search term
    if (
      filters.search &&
      !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !product.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Filter by category
    if (filters.category && product.category !== filters.category) {
      return false
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      if (product.price < min || product.price > max) {
        return false
      }
    }

    // Filter by colors
    if (filters.colors && filters.colors.length > 0) {
      if (!filters.colors.some((color) => product.color.includes(color))) {
        return false
      }
    }

    // Filter by sizes
    if (filters.sizes && filters.sizes.length > 0) {
      if (!filters.sizes.some((size) => product.size.includes(size))) {
        return false
      }
    }

    // Filter by rating
    if (filters.rating && product.rating < filters.rating) {
      return false
    }

    // Filter by stock status
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false
    }

    return true
  })
}

// Sort products
export const sortProducts = (
  products: Product[],
  sortBy: string
): Product[] => {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'popular':
      return sorted.sort((a, b) => b.reviews - a.reviews)
    default:
      return sorted
  }
}

// Get product recommendations based on category
export const getRecommendations = (
  products: Product[],
  currentProduct: Product,
  limit = 4
): Product[] => {
  return products
    .filter(
      (p) =>
        p.category === currentProduct.category &&
        p.id !== currentProduct.id
    )
    .slice(0, limit)
}

// Check product availability
export const isProductAvailable = (
  product: Product,
  size?: string,
  color?: string
): boolean => {
  if (!product.inStock) return false
  if (size && !product.size.includes(size)) return false
  if (color && !product.color.includes(color)) return false
  return true
}

// Calculate product rating stats
export const calculateRatingStats = (
  ratings: number[]
): { avg: number; total: number; distribution: Record<number, number> } => {
  if (ratings.length === 0) {
    return { avg: 0, total: 0, distribution: {} }
  }

  const total = ratings.length
  const sum = ratings.reduce((a, b) => a + b, 0)
  const avg = Math.round((sum / total) * 10) / 10

  const distribution = {}
  for (let i = 1; i <= 5; i++) {
    distribution[i] = ratings.filter((r) => Math.floor(r) === i).length
  }

  return { avg, total, distribution }
}
