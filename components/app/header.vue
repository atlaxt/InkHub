<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
const items = computed<NavigationMenuItem[][]>(() => {
  if (!mounted.value) {
    return []
  }
  else {
    return [
      // [
      //   {
      //     slot: 'logo',
      //   },
      // ],
      [
        {
          label: 'Draws',
          icon: 'lucide:book-image',
          active: route.name === 'home',
          to: { name: 'home' },
          class: '',
        },
        // {
        //   label: 'Best Draws',
        //   icon: 'lucide:star',
        // },
      ],
      [
        {
          label: 'GitHub Login',
          icon: 'i-simple-icons-github',
        },
        {
          icon: isDark.value ? 'i-lucide-sun' : 'i-lucide-moon',
          onSelect: toggleDark,
        },

      ],
    ]
  }
})
</script>

<template>
  <header class="w-full flex justify-center">
    <UNavigationMenu variant="link" :items="items" class="w-full">
      <template #logo>
        <div class="flex text-xl gap-2 items-center">
          <h1>
            InkHub
          </h1>
        </div>
      </template>
    </UNavigationMenu>
  </header>
</template>
