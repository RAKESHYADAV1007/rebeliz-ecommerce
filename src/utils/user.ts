import { User, Address } from '@/types'

// Get user full name
export const getUserFullName = (user: User): string => {
  return user.displayName || user.email.split('@')[0]
}

// Format user address
export const formatAddress = (address: Address): string => {
  return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`
}

// Check if address is complete
export const isCompleteAddress = (address: Address): boolean => {
  return (
    Boolean(address.street) &&
    Boolean(address.city) &&
    Boolean(address.state) &&
    Boolean(address.postalCode) &&
    Boolean(address.country)
  )
}

// Mask email for privacy
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@')
  const maskedLocal =
    localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1)
  return `${maskedLocal}@${domain}`
}

// Mask phone number for privacy
export const maskPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  return `***-***-${digits.slice(-4)}`
}
