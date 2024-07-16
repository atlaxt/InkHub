<script setup lang="ts">
const notificationBarIsOpen = ref(false)
</script>

<template>
  <div>
    <UButton
      variant="ghost"
      icon="i-heroicons-bell"
      @click="notificationBarIsOpen = true"
    />

    <USlideover v-model="notificationBarIsOpen">
      <div class="flex flex-col px-3 py-2">
        <div class="flex justify-end">
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            padded
            @click="notificationBarIsOpen = false"
          />
        </div>
      </div>
    </USlideover>
  </div>
</template>
