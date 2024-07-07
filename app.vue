<script setup lang="ts">
useHead({
  title: 'OS',
  meta: [
    {
      name: 'description',
      content: 'template',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <ClientOnly fallback-tag="span">
    <Wallpaper class="z-10 relative" />
    <div class="z-20 absolute top-0 left-0 w-full h-full">
      <NuxtPage />
      <NuxtLayout>
        <Taskbar />
      </NuxtLayout>
    </div>
    <template #fallback>
      <PageProcess />
    </template>
  </ClientOnly>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur();
}
</style>
