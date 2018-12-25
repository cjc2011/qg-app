import * as types from './mutation-type'

const mutations = {
  [types.SET_PAGETITLE](state, title){
    state.title = title
  },
  [types.SET_PUBLICKEY](state, key){
    state.publickey = key
    localStorage.setItem('publickey', key)
  },
  [types.SET_USERINFO](state, obj){
    state.userinfo = obj
    localStorage.setItem('userinfo', JSON.stringify(obj))
  },
  [types.SET_ENCRYPTIONKEY](state, key){
    state.encryptionkey = key
    localStorage.setItem('encryptionkey', key)
  }
}

export default mutations