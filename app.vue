<script setup lang="ts">
useHead({
  title: 'InkHub',
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { name: 'description', content: 'Creative space to draw, share, and connect. Simple and expressive visual community.' },
    { property: 'og:title', content: 'InkHub' },
    { property: 'og:description', content: 'Creative space to draw, share, and connect. Simple and expressive visual community.' },
    { property: 'og:image', content: 'https://inkhub.atlaxt.me/og-image.jpg' },
    { property: 'og:url', content: 'https://inkhub.atlaxt.me' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'InkHub' },
    { name: 'twitter:description', content: 'Creative space to draw, share, and connect. Simple and expressive visual community.' },
    { name: 'twitter:image', content: 'https://inkhub.atlaxt.me/og-image.jpg' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
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
