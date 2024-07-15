<script setup lang="ts">
const links = [
  [{
    label: 'Open',
    icon: 'i-heroicons-folder-open',
  }, {
    label: 'Pin To Os Bar',
    icon: 'i-heroicons-bookmark',
  }, {
    label: 'Rename',
    icon: 'i-heroicons-pencil',
  }, {
    label: 'Settings',
    icon: 'i-heroicons-cog',
  }, {
    class: 'text-red-400',
    label: 'Delete',
    icon: 'i-heroicons-trash',
  }],
]
</script>

<template>
  <div class="py-2 px-1">
    <UVerticalNavigation :links="links" />
  </div>
</template>
