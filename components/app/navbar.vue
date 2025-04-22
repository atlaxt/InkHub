<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const { $auth, $signInWithPopup, $provider } = useNuxtApp()
const auth = useAuthStore()
const user = ref()

onMounted(() => {
  $auth.onAuthStateChanged((u) => {
    user.value = u
  })
})

function loginWithGitHub() {
  $signInWithPopup($auth, $provider)
}

// function logout() {
//   $signOut($auth)
// }

const items = computed<NavigationMenuItem[][]>(() => {
  if (!mounted.value) {
    return []
  }
  else {
    return [
      [
        {
          icon: isDark.value ? 'i-lucide-sun' : 'i-lucide-moon',
          onSelect: toggleDark,
        },
        {
          label: 'Draws',
          icon: 'lucide:book-image',
          active: route.name === 'home',
          to: { name: 'home' },
          class: '',
        },
        {
          label: 'Draw',
          icon: 'lucide:brush',
          active: route.name === 'draw',
          to: { name: 'draw' },
          class: '',
        },

      ],
      [{ slot: 'auth' }],
    ]
  }
})
</script>

<template>
  <header class="w-full flex justify-center items-center min-h-16">
    <UNavigationMenu variant="link" :items="items" class="w-full">
      <template #auth>
        <UButton v-if="!auth.isAuth" color="neutral" variant="solid" icon="mdi:github" label="Sign in GitHub" @click="loginWithGitHub" />
        <div class="flex flex-row items-center gap-6">
          <div v-if="user" class="flex flex-row gap-2 items-center">
            <UAvatar :src="user.photoURL" size="sm" class="cursor-pointer" @click="$auth.signOut()" />
            <label> {{ user.displayName }} </label>
          </div>
          <UButton v-if="auth.isAuth" color="neutral" variant="link" icon="mdi:logout" @click="$auth.signOut()" />
        </div>
      </template>
    </UNavigationMenu>
  </header>
</template>
