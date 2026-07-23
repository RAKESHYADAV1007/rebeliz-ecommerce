export const PRODUCT_CATEGORIES = [
  'T-Shirts',
  'Shirts',
  'Hoodies',
  'Jackets',
  'Pants',
  'Shorts',
  'Accessories',
  'Shoes',
]

export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRODUCT_COLORS = [
  'Black',
  'White',
  'Navy',
  'Gray',
  'Brown',
  'Olive',
  'Red',
  'Blue',
]

export const PRICE_RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: '$500+', min: 500, max: Infinity },
]

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'processing', label: 'Processing', color: 'blue' },
  { value: 'shipped', label: 'Shipped', color: 'purple' },
  { value: 'delivered', label: 'Delivered', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
]

export const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'failed', label: 'Failed', color: 'red' },
]

export const TAX_RATE = 0.08
export const SHIPPING_COST = 9.99
export const FREE_SHIPPING_THRESHOLD = 100

export const ITEMS_PER_PAGE = 12
export const REVIEWS_PER_PAGE = 5

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
]
