<template>
  <div>
    <div class="form expand border-top-1px">
      <div class="form-item border-bottom-1px">
        <div class="form-item__left">+86</div>
        <input class="form-item__input" v-model.trim="Phone" type="text" placeholder="请输入手机号"> 
      </div>
      <div class="form-item border-bottom-1px">
        <div class="form-item__left">验证码</div>
        <input class="form-item__input" v-model.trim="VerificationCode" type="text" placeholder="短信验证码">
        <div v-if="VerificationStatus == 1 || VerificationStatus == 3" @click="getverification" class="form-item__right">{{VerificationStatus == 1 ? '发送验证码' : '再次发送验证码'}}</div>
        <countdown v-if="VerificationStatus == 2" :value=60 @on-finish="CountDownEnd"/>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="form-item__left">新密码</div>
        <input class="form-item__input" v-model.trim="PassWord" :type="EyeClose ? 'password' : 'text' " placeholder="请输入新密码">
        <div class="form-item__right">
          <i @click="EyeClose = !EyeClose" :class="EyeClose ? 'cubeic-eye-invisible' : 'cubeic-eye-visible'"></i>
        </div>
      </div>
    </div>
    <cube-button class="sure-btn" @click="save">确定</cube-button>
  </div>
</template>

<script>
import countdown from '%/countdown'
import * as rule from '^/js/verification'
import { toast } from '../../cube-ui'
import { sendMobileMsg, register, updatePass } from '@/api'
import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      EyeClose: true,
      Phone: '',
      VerificationCode: '',
      VerificationStatus: 1,
      PassWord: '',
    }
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'organ'
    ])
  },
  methods: {
    save() {
      if (!rule.mobile(this.Phone)) {
        return toast('请输入正确手机号')
      }
      if (!rule.password(this.PassWord)) {
        return toast('字母 数字 下划线')
      }
      if (this.VerificationStatus == 1 || !this.VerificationCode) {
        return toast('请先获取验证码')
      }
      updatePass({
        mobile: this.Phone,
        code: this.VerificationCode,
        newpass: this.PassWord,
        organid: this.organ.organid
      }).then( res => {
        if (res.code == 0) {
          toast('修改成功').then( ()=>{
            this.$router.back()
          })
        } else {
          toast(`${res.info}`)
        }
      })
    },
    getverification() {
      if (!rule.mobile(this.Phone)) {
        return toast('请输入正确手机号')
      }
      this.VerificationStatus = 2 
      sendMobileMsg({
        'mobile': this.Phone,
        'type': 1,
        'organid': this.organ.organid,
        'prphone': 86
      }).then( res => {
        if (res.code == 0) {
          toast('验证码已发送')
        } else {
          this.VerificationStatus = 3
          toast('获取失败')
        }
      })
    },
    CountDownEnd() {
      this.VerificationStatus = 3
    }
  },
  components: {
    countdown
  }
}
</script>

<style lang="scss" scoped>
.form{
  &-item{
    display: flex;
    height: 49px;
    align-items: center;
    &__left{
      width: 45px;
      margin-right: 10px;
      text-align: left;
      font-size: 14px;
      color: #34363C;
    }
    &__input{
      flex: 1;
      font-size: 14px;
      color: #34363C;
      &::-webkit-input-placeholder{
        color:#C1C2C8;
      }
    }
    &__right{
      font-size: 14px;
      color: #04BD8A;
      img{
        width: 20px;
      }
    }
  }
}
.cubeic-eye-visible,
.cubeic-eye-invisible{
  color: #34363C;
}
.sure-btn{
  margin-top: 20px;
}
</style>
