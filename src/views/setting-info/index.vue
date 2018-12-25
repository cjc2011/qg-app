<template>
  <div class="settings expand border-top-1px">
    <div class="setting-item expand border-bottom-1px border-top-1px">
      <div class="setting-item__left">当前版本</div>
      <div class="setting-item__right">1.0.0</div>
    </div>
    <div class="setting-item expand border-bottom-1px">
      <div class="setting-item__left">用户协议</div>
      <div class="setting-item__right">
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <div class="setting-item expand border-bottom-1px">
      <div class="setting-item__left">清除缓存</div>
      <div class="setting-item__right">
        <span class="text">1.3M</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <div class="login-out" @click="out">退出</div>
  </div>
</template>

<script>
import { logout } from '@/api'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  methods: {
    out() {
      logout({
        "token": this.userinfo.token
      }).then( res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings{
  border-top: 10px solid #F5F6FA;
}
.setting-item{
  display: flex;
  padding: 16px;
  justify-content: space-between;
  font-size: 16px;
  background: #ffffff;
  &__left{
    color: #4B505A;
  }
  &__right{
    color: #83868C;
    .cubeic-arrow{
      color: #666B76;
    }
  }
}
.login-out{
  margin-top: 30px;
  line-height: 40px;
  font-size: 16px;
  background: #0BCC96;
  color: #ffffff;
  border-radius: 4px;
}
</style>
