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
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import VueHighcharts from 'vue-highcharts';
import stockInit from 'highcharts/modules/stock'
// load these modules as your need
import loadStock from 'highcharts/modules/stock.js';
import loadMap from 'highcharts/modules/map.js';
import loadGantt from 'highcharts/modules/gantt.js';
import loadDrilldown from 'highcharts/modules/drilldown.js';
// some charts like solid gauge require `highcharts-more.js`, you can find it in official document.
import loadHighchartsMore from 'highcharts/highcharts-more.js';
import loadSolidGauge from 'highcharts/modules/solid-gauge.js';
import mapppy from 'highcharts/modules/treemap'
mapppy(Highcharts)
loadStock(Highcharts);
loadMap(Highcharts);
loadGantt(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);

stockInit(Highcharts)

library.add(faUserSecret, faUser, faAngleDoubleUp, faAngleDoubleDown, faTrashAlt, faArrowAltCircleDown, faArrowAltCircleUp, faChartLine, faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Notifications)
Vue.use(HighchartsVue)
Vue.use(VueHighcharts, { Highcharts });

import "@/css/style.css"

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
