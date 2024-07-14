<script setup lang="ts">
const osStore = useOsStore()

const osFontInnerClass = computed(() => {
  const name = osStore.fontUi.value.name
  const style = osStore.fontUi.value.style
  const weight = osStore.fontUi.value.weight
  const size = osStore.fontUi.value.size
  return `${name}-${weight}-${style} ${size}`
})

const scrollBarStyle = `
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(37, 46, 59);
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`

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
  style: [
    {
      children: scrollBarStyle,
    },
  ],
})
</script>

<template>
  <ClientOnly fallback-tag="span">
    <Wallpaper class="z-10 relative" />
    <div
      :class="osFontInnerClass"
      class="z-20 absolute top-0 left-0 w-full h-full"
    >
      <NuxtPage />
      <OsBar />
    </div>
    <template #fallback>
      <PageProcess />
    </template>
  </ClientOnly>
</template>

<style>
@import './assets/fonts.css';
</style>
