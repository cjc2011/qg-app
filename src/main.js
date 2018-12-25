import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { getPublicKey } from '@/api'
import { PublicKey } from '^/js/util'
import '^/style/base.scss'
import 'normalize.css'

Vue.config.productionTip = false

let joinPages = ['/login', '/registered']

router.beforeEach((to, from, next) => {
  let userinfo = store.getters.userinfo
  let title = to.meta && to.meta.title
  store.commit('SET_PAGETITLE', title)
  if (userinfo) {
    next()
  } else {
    if (joinPages.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }    
  }
})

new Vue({
  router,
  store,
  created: function() {
    !store.getters.publickey && PublicKey()    
  },
  render: h => h(App)
}).$mount('#app')



