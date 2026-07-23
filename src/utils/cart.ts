import { Cart, CartItem, Product } from '@/types'
import { TAX_RATE, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/config/constants'

// Add item to cart
export const addToCart = (
  cart: Cart,
  product: Product,
  quantity: number,
  size: string,
  color: string
): Cart => {
  const existingItem = cart.items.find(
    (item) =>
      item.productId === product.id &&
      item.selectedSize === size &&
      item.selectedColor === color
  )

  let updatedItems: CartItem[]
  if (existingItem) {
    updatedItems = cart.items.map((item) =>
      item.id === existingItem.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    )
  } else {
    updatedItems = [
      ...cart.items,
      {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        productId: product.id,
        product,
        quantity,
        selectedSize: size,
        selectedColor: color,
        addedAt: new Date(),
      },
    ]
  }

  return recalculateCart({ ...cart, items: updatedItems })
}

// Remove item from cart
export const removeFromCart = (cart: Cart, itemId: string): Cart => {
  const updatedItems = cart.items.filter((item) => item.id !== itemId)
  return recalculateCart({ ...cart, items: updatedItems })
}

// Update cart item quantity
export const updateCartItemQuantity = (
  cart: Cart,
  itemId: string,
  quantity: number
): Cart => {
  const updatedItems = cart.items.map((item) =>
    item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
  )
  return recalculateCart({
    ...cart,
    items: updatedItems.filter((item) => item.quantity > 0),
  })
}

// Clear cart
export const clearCart = (): Cart => {
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    lastUpdated: new Date(),
  }
}

// Recalculate cart totals
export const recalculateCart = (cart: Cart): Cart => {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const totalPrice = Math.round((subtotal + tax + shipping) * 100) / 100

  return {
    ...cart,
    totalItems,
    totalPrice,
    lastUpdated: new Date(),
  }
}

// Get cart summary
export const getCartSummary = (
  cart: Cart
): {
  subtotal: number
  tax: number
  shipping: number
  total: number
} => {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = Math.round((subtotal + tax + shipping) * 100) / 100

  return { subtotal, tax, shipping, total }
}

// Check if cart is empty
export const isCartEmpty = (cart: Cart): boolean => {
  return cart.items.length === 0
}

// Get cart item count
export const getCartItemCount = (cart: Cart): number => {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}
