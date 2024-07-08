<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <UCard>
    <template #header>
      <label class="flex w-full justify-center"> THEME </label>
    </template>
    <div v-if="osStore.wallpapers" class="w-full flex flex-col gap-2 h-full">
      <SelectTheme />
      <div class="grid grid-cols-2 gap-2 items-center justify-center">
        <NuxtImg
          v-for="wallpaper in osStore.wallpapers"
          :key="wallpaper.id"
          :src="wallpaper.img"
          class="rounded-xl cursor-pointer"
          loading="lazy"
          @click="osStore.currentWallpaper = wallpaper"
        />
      </div>
    </div>
  </UCard>
</template>
