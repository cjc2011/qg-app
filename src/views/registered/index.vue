<template>
  <div class="registered">
    <div class="user-avatar">
      <img :src="UserAvatar" alt="">
    </div>
    <p class="prompt-text">用户注册</p>
    <div class="form">
      <div class="form-item">
        <span class="pre-text">+86</span>
        <input v-model.trim="Phone" type="text">
      </div>
      <div class="form-item">
        <img class="input-icon" :src="VerificationIcon" >
        <input class="input" v-model.trim="VerificationCode" type="text" placeholder="短信验证码">
        <span v-if="VerificationStatus == 1 || VerificationStatus == 3" class="getverification" @click="getverification">{{VerificationStatus == 1 ? '发送验证码' : '再次发送验证码'}}</span>
        <countdown v-if="VerificationStatus == 2" :value=60 @on-finish="CountDownEnd"/>
      </div>
      <div class="form-item">
        <img class="input-icon" :src="PassWordIcon" >
        <input class="input" v-model.trim="PassWord" type="text" placeholder="设置登录密码">
        <i @click="EyeClose = !EyeClose" :class="EyeClose ? 'cubeic-eye-invisible' : 'cubeic-eye-visible'"></i>
      </div>
    </div>
    <div class="login-btn"><span @click="$router.replace('/login')">返回登录</span></div>
    <div class="read-user-agreement">
      <cube-checkbox v-model.trim="checked">
        <span>已阅读并同意</span>
      </cube-checkbox>
      <span @click="$router.push('/useragreement')">《用户服务协议》</span>
    </div>
    <div class="registered-btn" @click="registered">注册</div>
  </div>
</template>

<script>
import UserAvatar from '^/images/user-active.png'
import VerificationIcon from '^/images/verification.png'
import PassWordIcon from '^/images/password.png'
import countdown from '%/countdown'
import { getStr, randomString } from '^/js/util'
import { JSEncrypt } from 'jsencrypt'

import * as rule from '^/js/verification'
import { toast } from '../../cube-ui'

import { sendMobileMsg, register, getPublicKey } from '@/api'

export default {
  data() {
    return {
      UserAvatar: UserAvatar,
      VerificationIcon: VerificationIcon,
      PassWordIcon: PassWordIcon,
      EyeClose: true,
      checked: false,
      Phone: '',
      VerificationCode: '',
      VerificationStatus: 1,
      PassWord: '',
      PublicKey: ''
    }
  },
  created() {
    getPublicKey().then( res => {
      this.PublicKey = res.key
    })
  },
  methods: {
    // 获取验证码
    getverification() {
      if (!rule.mobile(this.Phone)) {
        return toast('请输入正确手机号')
      }
      this.VerificationStatus = 2 
      sendMobileMsg({
        'mobile': this.Phone,
        'type': 2
      }).then( res => {
        if (res.code == 0) {
          toast('验证码已发送')
        } else {
          toast('获取失败')
        }
      })
    },
    // 倒计时结束
    CountDownEnd(index) {
      this.VerificationStatus = 3
    },
    // 注册
    registered() {
      if (!rule.mobile(this.Phone)) {
        return toast('请输入正确手机号')
      }
      if (!rule.password(this.PassWord)) {
        return toast('字母 数字 下划线')
      }
      if (this.VerificationStatus == 1 || !this.VerificationCode) {
        return toast('获取验证码')
      }
      if (!this.checked) {
        return toast('请同意用户服务协议')
      }
      let key = randomString(10)
      let starttime = Date.parse(new Date());
      let params = {
        "mobile": this.Phone,
        "code": this.VerificationCode,
        "password": this.PassWord,
        "prphone": "86",
        "organid": 74,
        "key": key
      }
      let data = this.wrap_encrypt(JSON.stringify(params))
      register({data}).then( res => {
        if (res.code === 0) {
          toast(`登录成功`).then( () => {
            this.$router.replace('/')
          })
        } else {
          toast(`${res.info}`)
        }
      })
    },
    wrap_encrypt(content) {
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
  },
  components: {
    countdown
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
    .pre-text{
      margin-right: 10px;
    }
    .input-icon{
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .input{
      flex: 1;
      line-height: 28px;
      font-size: 14px;
      color: #333;
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
.login-btn{
  text-align: right;
  font-size: 13px;
  margin: 10px;
  span{
    display: inline-block;
  }
}
.read-user-agreement{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666666;
}
.cube-checkbox{
  padding: 0;
}
.registered-btn{
  margin-top: 20px;
  height: 44px;
  line-height: 44px;
  background: linear-gradient(90deg,rgba(39,249,180,1),rgba(11,204,150,1));
  box-shadow: 0px 10px 26px 0px rgba(8,175,128,0.28);
  border-radius: 22px;
  color: #ffffff;
}

</style>
