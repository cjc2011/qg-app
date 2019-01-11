import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import { SwipeCell, CellGroup, Cell } from 'vant';
import router from './router/index'
import store from './store/index'
import { getPublicKey } from '@/api'
import { PublicKey } from '^/js/util'
import '^/style/base.scss'
import 'normalize.css'
import 'vant/lib/index.css';

Vue.use(SwipeCell);
Vue.use(CellGroup)
Vue.use(Cell)

Vue.config.productionTip = false

let joinPages = ['/login', '/registered', '/domain', '/retrievepassword']

router.beforeEach((to, from, next) => {
  let userinfo = store.getters.userinfo
  let title = to.meta && to.meta.title
  store.commit('SET_PAGETITLE', title)
  let isLoginPage = joinPages.indexOf(to.path) > -1
  if (userinfo) {
    isLoginPage ? next('/') : next()
  } else {
    isLoginPage ? next() : next('/domain')  
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



