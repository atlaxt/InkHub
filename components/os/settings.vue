<script setup lang="ts">
const osStore = useOsStore()
</script>

<template>
  <UCard>
    <template #header>
      <label class="flex w-full justify-center"> SETTINGS </label>
    </template>
    <div class="w-full h-full flex flex-col">
      <USelectMenu v-model="osStore.taskBarUi.position.justify.value" :disabled="!osStore.taskBarUi.minimal" class="w-36" :options="osStore.taskBarUi.position.justify.options" />
      <USelectMenu v-model="osStore.taskBarUi.position.align.value" class="w-36" :options="osStore.taskBarUi.position.align.options" />
      <URange v-model="osStore.taskBarUi.rounded" class="w-36" :min="0" :max="8" />
      <URange v-model="osStore.taskBarUi.opacity" class="w-36" :min="0" :max="12" />
      <UCheckbox v-model="osStore.taskBarUi.minimal" label="minimal" @click="osStore.taskBarUi.minimal = !osStore.taskBarUi.minimal" />
      <UCheckbox v-model="osStore.taskBarUi.hover" label="hover" @click="osStore.taskBarUi.hover = !osStore.taskBarUi.hover" />
    </div>
  </UCard>
</template>
