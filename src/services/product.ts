import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import { Product } from '@/types'

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products')
    const snapshot = await getDocs(productsRef)
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Product, 'id'>),
      id: doc.id,
    }))
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

// Get product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId))
    return productDoc.exists()
      ? ({
          ...(productDoc.data() as Omit<Product, 'id'>),
          id: productDoc.id,
        } as Product)
      : null
  } catch (error) {
    throw new Error('Failed to fetch product')
  }
}

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products')
    const q = query(productsRef, where('category', '==', category))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Product, 'id'>),
      id: doc.id,
    }))
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

// Search products
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products')
    const snapshot = await getDocs(productsRef)
    const allProducts = snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Product, 'id'>),
      id: doc.id,
    }))

    const searchLower = searchTerm.toLowerCase()
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  } catch (error) {
    throw new Error('Failed to search products')
  }
}

// Create product (Admin)
export const createProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    const productsRef = collection(db, 'products')
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    throw new Error('Failed to create product')
  }
}

// Update product (Admin)
export const updateProduct = async (
  productId: string,
  updates: Partial<Product>
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'products', productId), {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    throw new Error('Failed to update product')
  }
}

// Delete product (Admin)
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'products', productId))
  } catch (error) {
    throw new Error('Failed to delete product')
  }
}

// Upload product image
export const uploadProductImage = async (
  productId: string,
  file: File
): Promise<string> => {
  try {
    const storageRef = ref(storage, `products/${productId}/${file.name}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  } catch (error) {
    throw new Error('Failed to upload image')
  }
}

// Delete product image
export const deleteProductImage = async (imagePath: string): Promise<void> => {
  try {
    const storageRef = ref(storage, imagePath)
    await deleteObject(storageRef)
  } catch (error) {
    throw new Error('Failed to delete image')
  }
}
