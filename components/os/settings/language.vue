<script setup lang="ts">
// const osStore = useOsStore()
const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col items-end gap-2">
    <div class="w-full flex justify-start">
      {{ t('settings.language.name') }}
    </div>
    <SelectLanguage />
  </div>
</template>
