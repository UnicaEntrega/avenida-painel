import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import VueTheMask from "vue-the-mask"
import Vuelidate from "vuelidate"
import VueMoment from "vue-moment"
const moment = require('moment')
require('moment/locale/pt-br')
import axios from 'axios'
import Geocoder from "@pderas/vue2-geocoder"
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueI18n)
Vue.use(VueTheMask)
Vue.use(VueMoment,{moment})
Vue.use(Vuelidate)
Vue.use(Geocoder,{defaultCountryCode:'BR',defaultLanguage:'pt-BR',defaultMode:'address',googleMapsApiKey:'AIzaSyCWTvPGIC5ZBhjuhpkKavofii0mkTQwZIo'})
Vue.use(VueGoogleMaps,{load:{region:'BR',language:'pt-BR',key:'AIzaSyCWTvPGIC5ZBhjuhpkKavofii0mkTQwZIo',libraries:'places'},installComponents:true})

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