import * as types from './mutation-type'

const mutations = {
  [types.SET_PAGETITLE](state, title){
    state.title = title
  },
  [types.SET_PUBLICKEY](state, key){
    let val = key === null ? '' : key
    state.publickey = val
    localStorage.setItem('publickey', val)
  },
  [types.SET_USERINFO](state, obj){
    let val = obj === null ? '' : JSON.stringify(obj)
    state.userinfo = obj
    localStorage.setItem('userinfo', val)
  },
  [types.SET_ENCRYPTIONKEY](state, key){
    let val = key === null ? '' : key
    state.encryptionkey = val
    localStorage.setItem('encryptionkey', val)
  }
}

export default mutations