<script setup lang="ts">
// const osStore = useOsStore()
const fileStore = useFileStore()
const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col items-end gap-2">
    <div class="w-full flex justify-start">
      {{ t('settings.display.name') }}
    </div>
    <URange
      v-model="fileStore.fileUi.folder.size.value"
      class="w-36"
      :min="fileStore.fileUi.folder.size.options.min"
      :max="fileStore.fileUi.folder.size.options.max"
    />
  </div>
</template>
