import type { QueryDocumentSnapshot,
} from 'firebase/firestore'
import type { DrawingMeta, DrawingUser } from '~/types'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
} from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadString } from 'firebase/storage'

export const useDrawingsStore = defineStore('drawings', () => {
  const drawings = ref<DrawingMeta[]>([])
  const lastVisible = ref<QueryDocumentSnapshot | null>(null)
  const loading = ref(false)
  const limitPerPage = 12

  const createDrawing = async (uid: string, base64: string, user: DrawingUser) => {
    const uuid = crypto.randomUUID()
    const path = `images/${uid}/${uuid}.png`

    const storage = getStorage()
    const imageRef = storageRef(storage, path)
    await uploadString(imageRef, base64, 'data_url')

    const db = getFirestore()
    await addDoc(collection(db, 'drawings'), {
      uid,
      imagePath: path,
      likes: 0,
      dislikes: 0,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      createdAt: serverTimestamp(),
    })
  }

  const fetchDrawings = async () => {
    if (loading.value)
      return
    loading.value = true

    const db = getFirestore()
    const drawingsRef = collection(db, 'drawings')

    const q = lastVisible.value
      ? query(drawingsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible.value), limit(limitPerPage))
      : query(drawingsRef, orderBy('createdAt', 'desc'), limit(limitPerPage))

    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const newDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      drawings.value.push(...newDocs as DrawingMeta[])
      lastVisible.value = snapshot.docs[snapshot.docs.length - 1]
    }

    loading.value = false
  }

  const resetDrawings = () => {
    drawings.value = []
    lastVisible.value = null
  }

  const likeDrawing = async (id: string) => {
    const db = getFirestore()
    const docRef = doc(db, 'drawings', id)
    await updateDoc(docRef, {
      likes: increment(1),
    })

    const target = drawings.value.find(d => d.id === id)
    if (target)
      target.likes++
  }

  const dislikeDrawing = async (id: string) => {
    const db = getFirestore()
    const docRef = doc(db, 'drawings', id)
    await updateDoc(docRef, {
      dislikes: increment(1),
    })

    const target = drawings.value.find(d => d.id === id)
    if (target)
      target.dislikes++
  }

  return {
    drawings,
    createDrawing,
    fetchDrawings,
    resetDrawings,
    loading,
    likeDrawing,
    dislikeDrawing,
  }
})
