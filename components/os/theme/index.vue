<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <UCard>
    <template #header>
      <label class="flex w-full justify-center"> THEME </label>
    </template>
    <div class="w-full flex flex-col gap-2 h-full">
      <SelectTheme />
      <div class="w-full flex flex-wrap gap-2">
        <img
          v-for="wallpaper in osStore.wallpapers"
          :key="wallpaper.id" class="w-64 rounded-xl cursor-pointer"
          :src="wallpaper.img" @click="osStore.currentWallpaper = wallpaper"
        >
      </div>
      <div class="w-64 h-32 border rounded-xl flex justify-center items-center opacity-50 hover:border-primary-400 hover:text-primary-400 cursor-pointer">
        <UIcon name="i-heroicons-plus-circle text-3xl" />
      </div>
    </div>
  </UCard>
</template>
