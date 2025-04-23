export interface DrawingMeta {
  id?: string
  uid: string
  imagePath: string
  likes: number
  dislikes: number
  displayName?: string | null
  photoURL?: string | null
  createdAt: any
}

export interface DrawingUser {
  displayName?: string
  photoURL?: string
}
