<script setup>
const { locale, setLocale } = useI18n()
</script>

<template>
  <USelectMenu
    v-model="locale"
    class="w-36"
    option-attribute="label"
    value-attribute="id"
    :options="[
      {
        label: 'Türkçe',
        id: 'tr',
        click: () => setLocale('tr'),
      },
      {
        label: 'English',
        id: 'en',
        click: () => setLocale('en'),
      },
    ]"
  />
</template>
