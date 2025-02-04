<script setup lang="ts">
useHead({
  title: 'Foxian',
})
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-full p-2 flex flex-col gap-2 overflow-hidden">
      <File v-for="(file, key) in 6" :key />
    </div>
  </NuxtLayout>
</template>
