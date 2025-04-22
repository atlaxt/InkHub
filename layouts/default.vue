<script setup lang="ts">
const app = useApp()
const scrollContainer = ref<HTMLElement>()

function handleScroll() {
  if (scrollContainer.value) {
    app.scrollY = scrollContainer.value.scrollTop
  }
}

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="flex flex-col fixed left-0 top-0 w-screen h-screen items-center"
  >
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-900/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr dark:from-[#ffffff] from-[#000000] dark:to-[#ffffff] to-[#000000] dark:opacity-10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div class="relative left-[calc(50%+3rem)] aspect-1500/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr dark:from-[#ffffff] from-[#000000] dark:to-[#ffffff] to-[#000000] dark:opacity-10 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="flex flex-col h-full gap-12 w-3xl">
      <AppHeader />
      <slot />
    </div>
  </div>
</template>
