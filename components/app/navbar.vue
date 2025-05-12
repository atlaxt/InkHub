<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const { $auth, $signInWithPopup, $provider, $signOut } = useNuxtApp()
const auth = useAuthStore()

async function loginWithGitHub() {
  await $signInWithPopup($auth, $provider)
  await refreshNuxtData()
  reloadNuxtApp()
}

async function logout() {
  await $signOut($auth)
  await refreshNuxtData()
  reloadNuxtApp()
}

const items = computed<NavigationMenuItem[][]>(() => {
  if (!mounted.value) {
    return []
  }
  else {
    return [
      [
        // {
        //   icon: isDark.value ? 'i-lucide-sun' : 'i-lucide-moon',
        //   onSelect: toggleDark,
        // },
        {
          label: 'Draws',
          icon: 'lucide:images',
          active: route.name === 'home',
          to: { name: 'home' },
          class: '',
        },
        // {
        //   label: 'Best Draws',
        //   disabled: true,
        //   icon: 'lucide:star',
        //   class: '',
        // },

      ],
      [{ slot: 'beta' }],
      [{ slot: 'auth' }],
    ]
  }
})
</script>

<template>
  <header class="flex justify-center items-center min-h-16 max-h-16">
    <UNavigationMenu variant="link" :items="items" class="w-full">
      <template #beta>
        <UBadge color="neutral" variant="subtle">
          beta v.0.1
        </UBadge>
      </template>
      <template #auth>
        <div class="flex flex-row items-center gap-4">
          <UButton
            v-if="!auth.isAuth" color="neutral" variant="solid" icon="mdi:github" label="Sign in GitHub"
            @click="loginWithGitHub"
          />
          <UButton
            v-if="auth.isAuth"
            color="success"
            variant="subtle"
            :disabled="!auth.isAuth || route.name === 'draw'"
            label="Draw"
            icon="lucide:brush"
            :to="{ name: 'draw' }"
          />
          <UDropdownMenu
            v-if="auth.isAuth"
            :items="[
              [
                {
                  label: auth.user?.displayName,
                  avatar: {
                    src: auth.user?.photoURL,
                  },
                  type: 'label',
                },
              ],
              [
                {
                  disabled: true,
                  label: 'My Draws',
                  to: { name: 'myDraws' },
                  icon: 'lucide:book-image',
                },
              ],
              [
                {
                  label: 'Logout',
                  icon: 'i-lucide-log-out',
                  onSelect: async () => {
                    await logout()
                    navigateTo({ name: 'home' })
                  },
                },
              ],
            ]"
            :ui="{
              content: 'w-48',
            }"
            :content="{
              align: 'end',
              side: 'bottom',
            }"
          >
            <UAvatar
              v-if="auth.user?.photoURL"
              :src="auth.user?.photoURL"
              :alt="auth.user.displayName ?? 'User Avatar'"
              size="sm"
              class="cursor-pointer"
            />
          </UDropdownMenu>
          <UButton color="neutral" variant="link" size="xl" :icon="isDark ? 'lucide:moon' : 'lucide:sun'" @click="toggleDark" />
        </div>
      </template>
    </UNavigationMenu>
  </header>
</template>
