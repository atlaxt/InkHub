<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <div class="w-full h-full flex flex-col items-end gap-2">
    <div class="w-full flex justify-start">
      Text
    </div>
    <USelectMenu v-model="osStore.fontUi.value.name" :options="osStore.fontUi.options.name" />
    <USelectMenu v-model="osStore.fontUi.value.weight" :options="osStore.fontUi.options.weight" />
    <USelectMenu v-model="osStore.fontUi.value.style" :options="osStore.fontUi.options.style" />
  </div>
</template>
