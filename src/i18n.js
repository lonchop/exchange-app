import { createI18n } from 'vue-i18n'
import es from './languages/es.json'
import en from './languages/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})

export default i18n
