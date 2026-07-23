import React, { createContext, useContext, ReactNode } from 'react'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        // Get current user logic here
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    login: async (email: string, password: string) => {
      // Login logic here
    },
    register: async (email: string, password: string, displayName: string) => {
      // Register logic here
    },
    logout: async () => {
      // Logout logic here
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
