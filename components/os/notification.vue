<script setup lang="ts">
const notificationBarIsOpen = ref(false)
</script>

<template>
  <div>
    <UButton variant="ghost" icon="i-heroicons-bell" @click="notificationBarIsOpen = true" />

    <USlideover v-model="notificationBarIsOpen">
      <div class="w-full h-full flex p-3 justify-center items-center">
        <div class="rounded h-20 w-20 bg-primary-400" />
      </div>
    </USlideover>
  </div>
</template>
