<script setup lang="ts">
const osStore = useOsStore()
const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col items-end gap-2">
    <div class="w-full flex justify-start">
      {{ t('settings.display.name') }}
    </div>
    <URange
      v-model="osStore.desktopUi.folder.size.value" class="w-36"
      :min="osStore.desktopUi.folder.size.options.min" :max="osStore.desktopUi.folder.size.options.max"
    />
  </div>
</template>
