<script setup lang="ts">
definePageMeta({
  name: 'home',
  path: '/',
})
</script>

<template>
  <NuxtLayout>
    <div class="justify-center flex items-center flex-col gap-4">
      <UButton icon="lucide:arrow-right" label="Go Draw" variant="link" @click="navigateTo({ name: 'draw' })" />
    </div>
  </NuxtLayout>
</template>
