<template>
 
  <div class="login">
     <div class="select-domain" @click="$router.replace('/domain')">选择域名</div>
    <div class="user-avatar">
      <img :src="UserAvatar" alt="">
    </div>
    <p class="prompt-text">用户登录</p>
    <div class="form">
      <div class="form-item">
        <span class="pre-text">+86</span>
        <input class="input" v-model.trim="phone" type="text" placeholder="请输入手机号">
      </div>
      <div class="form-item">
        <img class="input-icon" :src="PassWordIcon" >
        <input class="input" v-model.trim="password" :type="EyeClose ? 'password' : 'text'" placeholder="请输入登录密码">
        <i @click="EyeClose = !EyeClose" :class="EyeClose ? 'cubeic-eye-invisible' : 'cubeic-eye-visible'"></i>
      </div>
    </div>
    <div class="action-bar">
      <div class="registered fl">
        <span>立即</span>
        <span class="active" @click="jump">注册</span>
      </div>
      <div class="forget fr" @click="$router.push('/retrievepassword')">忘记密码</div>
    </div>
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>

<script>
import UserAvatar from '^/images/user-active.png'
import VerificationIcon from '^/images/verification.png'
import PassWordIcon from '^/images/password.png'
import EyeClose from '^/images/eye-close.png'
import { getPublicKey, login, bindingUser } from '@/api'
import { toast } from '../../cube-ui'
import { getStr, randomString } from '^/js/util'
import * as rule from '^/js/verification'

import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      UserAvatar: UserAvatar,
      VerificationIcon: VerificationIcon,
      PassWordIcon: PassWordIcon,
      phone: '',
      password: '',
      EyeClose: true,
      PublicKey: '',
      onoff: true
    }
    
  },
  beforeCreate() {
    getPublicKey().then( res => {
      this.PublicKey = res.key
    })
  },
  computed: {
    ...mapGetters([
      'organ'
    ])
  },
  methods: {
    ...mapMutations({
      'setUserInfo': 'SET_USERINFO',
      'setkey': 'SET_ENCRYPTIONKEY'
    }),
    jump() {
      this.$router.replace('/registered')
    },
    login(){
      if (!rule.mobile(this.phone)) {
        return toast('请输入正确手机号')
      }
      if (!this.password) {
        return toast('请输入密码')
      }
      if (!this.onoff)  return 
      this.onoff = false
      let key = randomString(10)
      let starttime = Date.parse(new Date());
      // let getRegistrationId = JoinRoomCall.getRegistrationID
      let params = {
        "key": key,
        "username": this.phone,
        "password": this.password,
        "type": 3,
        "source": "app",
        "organid": this.organ.organid
      }
      this.setkey(key)
      let data = this.wrapEncrypt(JSON.stringify(params))
      login({data}).then( res => {
        if (res.code == 0) {
          toast('登录成功', 'txt', 500).then( ()=> {
            this.$router.push('/')
          })
          this.setUserInfo(res.data)
          // 登录后 绑定极光推送和用户
          getRegistrationId( [], res => {
            bindingUser({
              registrationid: res
            }).then( () => {

            })
          }, () => {

          })
        } else {
          toast(`${res.info}`)
        }
        this.onoff = true
      })
    },
    wrapEncrypt(content) {
      let encryptobj = new JSEncrypt();
      encryptobj.setPublicKey(this.PublicKey);
      let result = "";
      let step = 117;
      let strlen = content.length;
      let count = Math.ceil(strlen / step);
      for (let i = 0; i < count; i++) {
        let chunk = content.substring(step * i, step * (1 + i));
        result += encryptobj.encrypt(chunk);
      }
      return result;
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avatar{
  width: 80px;
  height: 80px;
  padding: 7px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #E0E1E5;
  border-radius: 50%;
  img{
    width: 66px;
    height: 66px;
    border-radius: 50%;
  }
}
.prompt-text{
  margin: 15px 0;
  color: #2E2F37;
  font-size: 16px;
  text-align: center;
}
.form{
  margin: 15px 0;
  &-item{
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 15px;
    height: 44px;
    line-height: 44px;
    text-align: left;
    border: 1px solid #DEDFEB;
    box-sizing: border-box;
    border-radius: 22px;
    box-shadow:0px 3px 16px 0px rgba(197,204,220,0.2);
    .input-icon{
      display: inline-block;
      width: 20px;
      height: 20px;
      font-size: 12px;
      margin-right: 10px;
    }
    .pre-text{
      @extend.input-icon;
      line-height: 20px;
      color: #333333;
    }
    .input{
      flex: 1;
      line-height: 28px;
      font-size: 14px;
      &::-webkit-input-placeholder{
        color:#C1C2C8;
      }
    }
    .getverification{
      font-size: 13px;
      color: #07C994;
    }
  }
}
.action-bar{
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  color: #98999C;
  .registered{
    display: inline-block;
    .active{
      color: #07C994;
    }
  }
}
.login-btn{
  margin-top: 20px;
  height: 44px;
  line-height: 44px;
  background: linear-gradient(90deg,rgba(39,249,180,1),rgba(11,204,150,1));
  box-shadow: 0px 10px 26px 0px rgba(8,175,128,0.28);
  border-radius: 22px;
  color: #ffffff;
}
.select-domain{
  position: absolute;
  right: -20px;
  top: -40px;
  padding: 20px;
  font-size: 14px;
  color: #07C994;
}
</style>
