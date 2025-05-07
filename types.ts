import type { Timestamp } from 'firebase/firestore'

export interface DrawingMeta {
  id: string
  uid: string
  imagePath: string
  imageUrl?: string
  photoURL?: string
  createdAt: Timestamp
  likes: number
  dislikes: number
  replyTo: string | null
  commentCount: number
  displayName?: string
}

export interface DrawingCreateRequest {
  draw: {
    base64: string
    replyTo: string | null
  }
  user: {
    uid: string
    displayName: string
    photoURL: string
  }
}
