<script setup lang="ts">
const links = [
  [{
    label: 'New Folder',
    icon: 'i-heroicons-chart-bar',
  }, {
    label: 'Display Settings',
    icon: 'i-heroicons-cog',
  }, {
    label: 'Theme Settings',
    icon: 'i-heroicons-paint-brush',
  }, {
    label: 'Open Terminal',
    icon: 'i-heroicons-command-line',
  }],
]
</script>

<template>
  <div class="py-2 px-1">
    <UVerticalNavigation :links="links" />
  </div>
</template>
