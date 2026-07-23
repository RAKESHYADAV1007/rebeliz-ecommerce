import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Review } from '@/types'

// Add review
export const addReview = async (
  productId: string,
  review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const reviewsRef = collection(db, 'reviews')
    const docRef = await addDoc(reviewsRef, {
      productId,
      ...review,
      helpful: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    throw new Error('Failed to add review')
  }
}

// Get product reviews
export const getProductReviews = async (productId: string): Promise<Review[]> => {
  try {
    const reviewsRef = collection(db, 'reviews')
    const q = query(reviewsRef, where('productId', '==', productId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Review, 'id'>),
      id: doc.id,
    }))
  } catch (error) {
    throw new Error('Failed to fetch reviews')
  }
}

// Get user reviews
export const getUserReviews = async (userId: string): Promise<Review[]> => {
  try {
    const reviewsRef = collection(db, 'reviews')
    const q = query(reviewsRef, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Review, 'id'>),
      id: doc.id,
    }))
  } catch (error) {
    throw new Error('Failed to fetch reviews')
  }
}

// Delete review
export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'reviews', reviewId))
  } catch (error) {
    throw new Error('Failed to delete review')
  }
}
