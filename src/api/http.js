import axios from 'axios'
import qs from 'qs';
import store from '../store'
import { getStr } from '@/assets/js/util.js'
import { toast } from '../cube-ui'

// request
axios.defaults.baseURL = 'http://test.wisdom.com/';

// 请求
axios.interceptors.request.use(
  config => {
    let starttime = Date.parse(new Date());
    let userInfo = store.getters.userinfo
    if (userInfo) {
      let { token } = userInfo
      let data = qs.parse(config.data);
      let key =  store.getters.userinfo
      config.headers.common['sign'] = getStr(data, key, starttime, token)
      config.headers.common['token'] = String(token)
      config.headers.common['starttime'] = String(starttime)
    }
    return config
  }, 
  error => {
    return Promise.error(error)
  }
);

// 响应
axios.interceptors.response.use(
  response => {
    let ResData = response.data
    if (ResData.code === -40666) {
      toast('当前账号在其他设备登录, 请重新登录')
      router.push('/login')
    }
    return Promise.resolve(ResData); 
  },
  error => {
    if (error.response) {
      let status = error.response.status
      switch (status) {
        case 400: 
          Toast('数据错误');
        case 403:
          Toast('您没有权限操作');
        case 404: 
          Toast('对象不存在！');
        case 500: 
          Toast('服务器发生了一些错误')  
        default: 
          Toast(`${error.response.data.message}`)
      }
    }
    return Promise.reject(error);
  }
)

let api = {
  get(url, params) {
    return new Promise( (resolve, reject) => {
      axios.get(url, {
        params: params
      }).then( res => {
        resolve(res)
      }).catch( err => {
        reject(err.data)
      })
    })
  },
  post(url,params) {
    return new Promise( (resolve, reject) => {
      axios.post(url, qs.stringify(params))
        .then( res => {
          resolve(res)
        })
        .catch( err => {
          reject(err)
        })
    })
  }
}

export default api
