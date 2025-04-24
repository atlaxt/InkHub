import type { QueryDocumentSnapshot } from 'firebase/firestore'
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
  where,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref as storageRef, uploadString } from 'firebase/storage'

export const useDrawingsStore = defineStore('drawings', () => {
  const drawings = ref<DrawingMeta[]>([])
  const myDrawings = ref<DrawingMeta[]>([])
  const replyDrawings = ref<DrawingMeta[]>([])
  const lastVisible = ref<QueryDocumentSnapshot | null>(null)
  const loading = ref(false)
  const limitPerPage = 12

  const createDrawing = async (uid: string, base64: string, user: DrawingUser, replyTo: string | null = null) => {
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
      replyTo: replyTo ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      createdAt: serverTimestamp(),
    })
  }

  const resetDrawings = () => {
    drawings.value = []
    lastVisible.value = null
    myDrawings.value = []
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
      const storage = getStorage()
      const newDocs = await Promise.all(snapshot.docs.map(async (doc) => {
        const data = doc.data()
        const imageUrl = await getDownloadURL(storageRef(storage, data.imagePath))
        return { id: doc.id, ...data, imageUrl } as DrawingMeta
      }))
      drawings.value.push(...newDocs)
      lastVisible.value = snapshot.docs[snapshot.docs.length - 1]
    }

    loading.value = false
  }

  const fetchMyDrawings = async (uid: string | null | undefined) => {
    if (!uid)
      return

    const db = getFirestore()
    const q = query(collection(db, 'drawings'), where('uid', '==', uid), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    const storage = getStorage()
    const drawingsWithUrls = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data()

      let imageUrl = ''
      try {
        if (data.imagePath) {
          const imageRef = storageRef(storage, data.imagePath)
          imageUrl = await getDownloadURL(imageRef)
        }
      }
      catch (error) {
        console.warn(`Resim yüklenemedi: ${data.imagePath}`, error)
      }

      return {
        id: doc.id,
        ...data,
        imageUrl,
      } as DrawingMeta
    }))

    myDrawings.value = drawingsWithUrls
  }

  const fetchReplies = async (drawingId: string) => {
    const db = getFirestore()
    const q = query(collection(db, 'drawings'), where('replyTo', '==', drawingId), orderBy('createdAt', 'asc'))
    const snapshot = await getDocs(q)

    const storage = getStorage()
    replyDrawings.value = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data()
      const imageUrl = await getDownloadURL(storageRef(storage, data.imagePath))
      return { id: doc.id, ...data, imageUrl } as DrawingMeta
    }))
  }

  const likeDrawing = async (id: string) => {
    const db = getFirestore()
    const docRef = doc(db, 'drawings', id)
    await updateDoc(docRef, { likes: increment(1) })

    const target = drawings.value.find(d => d.id === id)
    if (target)
      target.likes++
  }

  const dislikeDrawing = async (id: string) => {
    const db = getFirestore()
    const docRef = doc(db, 'drawings', id)
    await updateDoc(docRef, { dislikes: increment(1) })

    const target = drawings.value.find(d => d.id === id)
    if (target)
      target.dislikes++
  }

  return {
    drawings,
    myDrawings,
    replyDrawings,
    loading,
    resetDrawings,
    createDrawing,
    fetchDrawings,
    fetchMyDrawings,
    fetchReplies,
    likeDrawing,
    dislikeDrawing,
  }
})
