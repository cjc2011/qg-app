import * as types from './mutation-type'

const mutations = {
  [types.SET_PAGETITLE](state, title){
    state.title = title
  },
  [types.SET_PUBLICKEY](state, key){
    state.publickey = key
    localStorage.setItem('publickdy', key)
  },
  [types.SET_USERINFO](state, obj){
    state.userinfo = obj
    localStorage.setItem('userinfo', JSON.stringify(obj))
  }
}

export default mutations