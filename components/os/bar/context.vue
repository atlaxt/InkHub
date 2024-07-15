<script setup lang="ts">
const links = [
  [{
    label: 'Task Manager',
    icon: 'i-heroicons-chart-bar',
  }, {
    label: 'Os Bar Settings',
    icon: 'i-heroicons-cog',
  }],
]
</script>

<template>
  <div class="py-2 px-1">
    <UVerticalNavigation :links="links" />
  </div>
</template>
