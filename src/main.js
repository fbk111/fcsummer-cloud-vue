import Vue from 'vue'
import App from './App.vue'
import elmentInnner from './elementInner/index'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
