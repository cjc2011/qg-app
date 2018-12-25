<template>
  <div>
    <div class="form expand border-top-1px">
      <div class="form-item border-bottom-1px">
        <div class="form-item__left">+86</div>
        <input class="form-item__input" type="text" placeholder="请输入手机号"> 
      </div>
      <div class="form-item border-bottom-1px">
        <div class="form-item__left">验证码</div>
        <input class="form-item__input" type="text" placeholder="短信验证码">
        <div class="form-item__right">获取验证码</div>
      </div>
      <div class="form-item border-bottom-1px">
        <div class="form-item__left">新密码</div>
        <input class="form-item__input" type="text" placeholder="请输入手机号">
        <div class="form-item__right">
          <img :src="EyeClose" />
        </div>
      </div>
    </div>
    <cube-button class="sure-btn">确定</cube-button>
  </div>
</template>

<script>
import EyeClose from '^/images/eye-close.png'

export default {
  data() {
    return {
      EyeClose: EyeClose
    }
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
.sure-btn{
  margin-top: 20px;
}
</style>
