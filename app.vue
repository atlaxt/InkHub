<script setup lang="ts">
const osStore = useOsStore()

const osFontInnerClass = computed(() => {
  const name = osStore.fontUi.value.name
  const style = osStore.fontUi.value.style
  const weight = osStore.fontUi.value.weight
  return `${name}-${weight}-${style}`
})

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
    <div :class="osFontInnerClass" class="z-20 absolute top-0 left-0 w-full h-full text-md">
      <NuxtPage />
      <NuxtLayout>
        <OsBar />
      </NuxtLayout>
    </div>
    <template #fallback>
      <PageProcess />
    </template>
  </ClientOnly>
</template>

<style>
@import './assets/fonts.css';

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
