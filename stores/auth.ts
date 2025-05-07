import type { User } from 'firebase/auth'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref<boolean>(true)

  const auth = useNuxtApp().$auth
  const provider = useNuxtApp().$provider

  function init() {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        user.value = u
      }
      else {
        user.value = null
      }
      loading.value = false
    })
  }

  async function login() {
    try {
      await signInWithPopup(auth, provider)
    }
    catch (err) {
      console.error('Login Error:', err)
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      user.value = null
    }
    catch (err) {
      console.error('Logout Error:', err)
    }
  }

  return {
    user,
    loading,
    init,
    login,
    logout,
    isAuth: computed(() => !!user.value),
  }
})
