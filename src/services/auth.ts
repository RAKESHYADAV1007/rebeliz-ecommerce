import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  AuthError,
  User as FirebaseUser,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import { User } from '@/types'

// Auth error messages
const getAuthErrorMessage = (error: AuthError): string => {
  const errorCode = error.code
  const messages: Record<string, string> = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
    'auth/email-already-in-use': 'Email already in use',
    'auth/weak-password': 'Password is too weak',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Operation not allowed',
    'auth/too-many-requests': 'Too many login attempts, try again later',
  }
  return messages[errorCode] || error.message
}

// Register user
export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Update profile
    await updateProfile(firebaseUser, { displayName })

    // Create user document in Firestore
    const user: User = {
      id: firebaseUser.uid,
      email,
      displayName,
      photoURL: firebaseUser.photoURL || undefined,
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await setDoc(doc(db, 'users', firebaseUser.uid), user)
    return user
  } catch (error) {
    throw new Error(getAuthErrorMessage(error as AuthError))
  }
}

// Login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
    if (!userDoc.exists()) {
      throw new Error('User profile not found')
    }

    return userDoc.data() as User
  } catch (error) {
    throw new Error(getAuthErrorMessage(error as AuthError))
  }
}

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error('Failed to logout')
  }
}

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          resolve(userDoc.data() as User)
        } catch (error) {
          resolve(null)
        }
      } else {
        resolve(null)
      }
      unsubscribe()
    })
  })
}

// Watch auth state
export const watchAuthState = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        callback(userDoc.data() as User)
      } catch (error) {
        callback(null)
      }
    } else {
      callback(null)
    }
  })
}

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: new Date(),
    })
  } catch (error) {
    throw new Error('Failed to update profile')
  }
}

// Update email
export const updateUserEmail = async (
  newEmail: string,
  userId: string
): Promise<void> => {
  try {
    const firebaseUser = auth.currentUser
    if (!firebaseUser) throw new Error('User not authenticated')

    await updateEmail(firebaseUser, newEmail)
    await updateDoc(doc(db, 'users', userId), {
      email: newEmail,
      updatedAt: new Date(),
    })
  } catch (error) {
    throw new Error('Failed to update email')
  }
}

// Update password
export const updateUserPassword = async (newPassword: string): Promise<void> => {
  try {
    const firebaseUser = auth.currentUser
    if (!firebaseUser) throw new Error('User not authenticated')

    await updatePassword(firebaseUser, newPassword)
  } catch (error) {
    throw new Error('Failed to update password')
  }
}

// Send password reset email
export const sendResetEmail = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw new Error('Failed to send reset email')
  }
}

// Get user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    return userDoc.exists() ? (userDoc.data() as User) : null
  } catch (error) {
    return null
  }
}
