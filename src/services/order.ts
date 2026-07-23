import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Order, OrderItem } from '@/types'

// Create order
export const createOrder = async (
  userId: string,
  order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const ordersRef = collection(db, 'orders')
    const docRef = await addDoc(ordersRef, {
      userId,
      ...order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    throw new Error('Failed to create order')
  }
}

// Get user orders
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Order, 'id'>),
      id: doc.id,
    }))
  } catch (error) {
    throw new Error('Failed to fetch orders')
  }
}

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId))
    return orderDoc.exists()
      ? ({
          ...(orderDoc.data() as Omit<Order, 'id'>),
          id: orderDoc.id,
        } as Order)
      : null
  } catch (error) {
    throw new Error('Failed to fetch order')
  }
}

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: Order['orderStatus']
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      orderStatus: status,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    throw new Error('Failed to update order status')
  }
}

// Update payment status
export const updatePaymentStatus = async (
  orderId: string,
  status: Order['paymentStatus']
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      paymentStatus: status,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    throw new Error('Failed to update payment status')
  }
}

// Get all orders (Admin)
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(ordersRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Order, 'id'>),
      id: doc.id,
    }))
  } catch (error) {
    throw new Error('Failed to fetch orders')
  }
}
