import type { User } from 'firebase/auth'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import type { DrawingCreateRequest, DrawingMeta } from '~/types'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  // doc,
  getDocs,
  getFirestore,
  // increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  // updateDoc,
  where,
} from 'firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadString } from 'firebase/storage'

export const useDrawingsStore = defineStore('drawings', () => {
  const drawings = ref<DrawingMeta[]>([])
  const lastVisible = ref<QueryDocumentSnapshot | null>(null)
  const loading = ref(false)
  const limitPerPage = 50

  const createDrawing = async (drawingCreateRequest: DrawingCreateRequest) => {
    const uuid = crypto.randomUUID()
    const path = `images/${drawingCreateRequest.user.uid}/${uuid}.png`

    const storage = getStorage()
    const imageRef = storageRef(storage, path)
    await uploadString(imageRef, drawingCreateRequest.draw.base64, 'data_url')

    const db = getFirestore()
    await addDoc(collection(db, 'drawings'), {
      uid: drawingCreateRequest.user.uid,
      imagePath: path,
      likes: 0,
      dislikes: 0,
      replyTo: drawingCreateRequest.draw.replyTo,
      displayName: drawingCreateRequest.user.displayName,
      photoURL: drawingCreateRequest.user.photoURL,
      createdAt: serverTimestamp(),
    })
  }

  const resetDrawings = () => {
    lastVisible.value = null
    drawings.value = []
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

  const fetchDrawingsByUid = async (uid: User['uid']) => {
    if (!uid) {
      console.warn('UID geçersiz')
      return
    }

    const db = getFirestore()
    const q = query(
      collection(db, 'drawings'),
      where('uid', '==', uid),
      orderBy('createdAt', 'desc'),
    )

    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      console.warn('Kullanıcıya ait hiç çizim bulunamadı.')
      drawings.value = []
      return
    }

    const storage = getStorage()
    const drawingsWithUrls = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data()

      let imageUrl = ''
      if (data.imagePath) {
        try {
          const imageRef = storageRef(storage, data.imagePath)
          imageUrl = await getDownloadURL(imageRef)
        }
        catch (error) {
          console.warn(`Resim yüklenemedi: ${data.imagePath}`, error)
        }
      }

      return {
        id: doc.id,
        ...data,
        imageUrl,
      } as DrawingMeta
    }))

    drawings.value = drawingsWithUrls
  }

  const deleteDrawing = async (drawingId: string, imagePath: string) => {
    const db = getFirestore()
    const storage = getStorage()

    await deleteDoc(doc(db, 'drawings', drawingId))

    const imageRef = storageRef(storage, imagePath)
    await deleteObject(imageRef)
  }

  return {
    loading,
    drawings,
    resetDrawings,
    createDrawing,
    fetchDrawings,
    fetchDrawingsByUid,
    deleteDrawing,
  }
})
