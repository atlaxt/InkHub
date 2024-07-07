<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <img
    :src="osStore.currentWallpaper.img"
    class="fixed top-0 left-0 w-screen h-screen object-cover"
  >
</template>
