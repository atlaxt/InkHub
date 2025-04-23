<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const { $auth, $signInWithPopup, $provider } = useNuxtApp()
const auth = useAuthStore()

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
          disabled: !auth.isAuth,
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
        <UDropdownMenu
          v-else
          :items="[
            [
              {
                label: auth.user.displayName,
                avatar: {
                  src: auth.user.photoURL,
                },
                type: 'label',
              },
            ],
            [
              {
                label: 'Logout',
                icon: 'i-lucide-log-out',
                onSelect: () => {
                  $auth.signOut()
                  navigateTo({ name: 'home' })
                },
              },
            ],
          ]"
          :ui="{
            content: 'w-48',
          }"
        >
          <UAvatar
            v-if="auth.user.photoURL"
            :src="auth.user.photoURL"
            :alt="auth.user.displayName"
            size="sm"
            class="cursor-pointer"
          />
        </UDropdownMenu>
      </template>
    </UNavigationMenu>
  </header>
</template>
