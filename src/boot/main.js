import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import VueTheMask from "vue-the-mask"
import Vuelidate from "vuelidate"
import VueMoment from "vue-moment"
const moment = require('moment')
require('moment/locale/pt-br')
import axios from 'axios'

Vue.use(VueI18n)
Vue.use(VueTheMask)
Vue.use(VueMoment,{moment})
Vue.use(Vuelidate)

Vue.prototype.$axios = axios.create({baseURL:process.env.API_URL})

const i18n = new VueI18n({
  locale: 'pt-br',
  fallbackLocale: 'pt-br',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }