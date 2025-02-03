<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <div
    :class="{
      'flex-col-reverse': osStore.bar.position === 'top',
      'flex-col': osStore.bar.position === 'bottom',
      'flex-row': osStore.bar.position === 'right',
      'flex-row-reverse': osStore.bar.position === 'left',
    }" class="flex animation-all duration-100 delay-100 fixed top-0 left-0 w-screen h-screen"
  >
    <img class="-z-10 brightness-75 absolute left-0 top-0 w-full h-full" :src="osStore.wallpaper">
    <div class="w-full h-full">
      <slot />
    </div>
    <Bar />
  </div>
</template>
