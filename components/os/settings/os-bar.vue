<script setup lang="ts">
const osStore = useOsStore()
const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col items-end gap-2">
    <div class="w-full flex justify-start">
      {{ t('settings.osBar.name') }}
    </div>
    <USelectMenu v-model="osStore.osBarUi.position.justify.value" :disabled="!osStore.osBarUi.minimal" class="w-36" :options="osStore.osBarUi.position.justify.options" />
    <USelectMenu v-model="osStore.osBarUi.position.align.value" class="w-36" :options="osStore.osBarUi.position.align.options" />
    <URange v-model="osStore.osBarUi.rounded" class="w-36" :min="0" :max="8" />
    <URange v-model="osStore.osBarUi.opacity" class="w-36" :min="0" :max="12" />
    <UCheckbox v-model="osStore.osBarUi.minimal" label="minimal" @click="osStore.osBarUi.minimal = !osStore.osBarUi.minimal" />
    <UCheckbox v-model="osStore.osBarUi.hover" label="hover" @click="osStore.osBarUi.hover = !osStore.osBarUi.hover" />
  </div>
</template>
