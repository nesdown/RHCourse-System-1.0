import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask'
import { i18n } from './i18n';
import AsyncComputed from 'vue-async-computed'
 

Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(VueTheMask);
Vue.use(AsyncComputed)

// new Vuelidate({validations: {}});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  // validations: {},
}).$mount('#app')
