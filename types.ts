import type { Timestamp } from 'firebase/firestore'

export interface DrawingMeta {
  id: string
  uid: string
  imagePath: string
  imageUrl?: string
  displayName?: string
  photoURL?: string
  createdAt: Timestamp
  likes: number
  dislikes: number
  replyTo: string | null
}

export interface DrawingUser {
  displayName?: string
  photoURL?: string
}
