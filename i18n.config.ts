export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'tr',
  lazy: true,
  messages: {
    en: {
      restart: 'Restart',
      exit: 'Exit',
      welcome: 'Welcome',
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
      },
      settings: {
        name: 'Settings',
        theme: {
          name: 'Customize',
          save: 'Save Theme',
        },
        font: {
          name: 'Font Styles',
          save: 'Save Font Style',
        },
        language: {
          name: 'Language Options',
          save: 'Save Language Options',
        },
        osBar: {
          name: 'Taskbar Settings',
          save: 'Save Taskbar',
        },
      },
    },
    tr: {
      restart: 'Yeniden Başlat',
      exit: 'Çıkış',
      welcome: 'Merhaba',
      months: {
        january: 'Ocak',
        february: 'Şubat',
        march: 'Mart',
        april: 'Nisan',
        may: 'Mayıs',
        june: 'Haziran',
        july: 'Temmuz',
        august: 'Ağustos',
        september: 'Eylül',
        october: 'Ekim',
        november: 'Kasım',
        december: 'Aralık',
      },
      settings: {
        name: 'Ayarlar',
        theme: {
          name: 'Kişiselleştir',
          save: 'Temayı Kaydet',
        },
        font: {
          name: 'Yazı Tipi Stilleri',
          save: 'Yazı Tipi Stilini Kaydet',
        },
        language: {
          name: 'Dil Seçenekleri',
          save: 'Dil Seçeneklerini Kaydet',
        },
        display: {
          name: 'Masaüstü Ayarları',
          save: 'Masaüstünü Kaydet',
        },
        osBar: {
          name: 'Görev Çubuğu Ayarları',
          save: 'Görev Çubuğunu Kaydet',
        },
      },
    },
  },
}))
