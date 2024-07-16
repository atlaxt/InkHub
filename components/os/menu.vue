<script setup lang="ts">
const osSotore = useOsStore()
const { t } = useI18n()
const links = ref([{
  label: t('settings.name'),
  icon: 'i-heroicons-cog',
  click: () => osSotore.osMenuSelectedWindow = 'settings',
}, {
  label: t('settings.theme.name'),
  icon: 'i-heroicons-paint-brush',
  click: () => osSotore.osMenuSelectedWindow = 'theme',
}])
</script>

<template>
  <div
    style="height: 600px; width: 900px;"
    class="flex flex-col justify-between gap-2 p-2 select-none"
  >
    <div class="flex w-full gap-2">
      <UVerticalNavigation
        :ui="{
          active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
          inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
        }"
        class="mr-6 w-64"
        :links="links"
      />
      <div class="w-full overflow-auto h-[500px]">
        <OsSettings v-if="osSotore.osMenuSelectedWindow === 'settings'" />
        <OsTheme v-if="osSotore.osMenuSelectedWindow === 'theme'" />
      </div>
    </div>
    <div class="flex w-full justify-end gap-2">
      <UButton
        :label="t('restart')"
        variant="ghost"
        icon="i-heroicons-arrow-path"
        @click="refreshOs"
      />
      <UButton
        :label="t('exit')"
        variant="ghost"
        icon="i-heroicons-x-circle"
      />
    </div>
  </div>
</template>
