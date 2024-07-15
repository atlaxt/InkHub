<script setup lang="ts">
const osStore = useOsStore()
const links = [
  [
    {
      label: 'Refresh',
      icon: 'i-heroicons-arrow-path',
      click: () => {
        osStore.refreshPage()
      },
    },
    {
      label: 'New File',
      icon: 'i-heroicons-plus',
      click: () => {
      },
    },
    {
      label: 'Display Settings',
      icon: 'i-heroicons-cog',
      click: () => {
      },
    },
    {
      label: 'Theme Settings',
      icon: 'i-heroicons-paint-brush',
      click: () => {
      },
    },
    {
      label: 'Open Terminal',
      icon: 'i-heroicons-command-line',
      click: () => {
      },
    },
  ],
]
</script>

<template>
  <div class="py-2 px-1">
    <UVerticalNavigation :links="links" />
  </div>
</template>
