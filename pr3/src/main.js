import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faUser, faAngleDoubleUp, faAngleDoubleDown, faTrashAlt, faArrowAltCircleDown, faArrowAltCircleUp, faChartLine, faEdit} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from 'vue-notification'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(faUserSecret, faUser, faAngleDoubleUp, faAngleDoubleDown, faTrashAlt, faArrowAltCircleDown, faArrowAltCircleUp, faChartLine, faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Notifications)
import "@/css/style.css"

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
