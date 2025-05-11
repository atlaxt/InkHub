<script setup lang="ts">
useHead({
  title: 'InkHub',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/svg+xml',
    },
  ],
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
div {
  font-family: 'Poppins', sans-serif;
}
</style>
