<template>
  <div class="user-edit">
    <div v-if="type == 'profile'" class="motto border-top-split expand">
      <profile></profile>
    </div>
    <div v-if="type == 'nickname'" class="border-top-split expand">
      <nickname></nickname>
    </div>
    <div v-if="type == 'mobile'" class="modify-phone">
      <mobile></mobile>
    </div>
    <div v-if="type == 'password'" class="modify-password">
      <password></password>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as types from '@/store/mutation-type'
import mobile from './mobile'
import password from './password'
import nickname from './nickname'
import profile from './profile'
const typeName = {
  'nickname': '修改昵称',
  'mobile': '修改手机号',
  'password': '修改密码',
  'profile': '修改个性签名'
}
export default {
  data() {
    return {
      type: this.$route.params.type
    }
  },
  components: {
    mobile,
    password,
    nickname,
    profile
  },
  methods: {
    ...mapMutations({
      'setTitle': types.SET_PAGETITLE
    }),
  },
  beforeRouteEnter: (to, from, next) => {
    let type = to.params.type
    next(vm => {
      vm.setTitle(typeName[type])
    })
  }
}
</script>

<style lang="scss" scoped>
.cube-textarea_active:after {
  border-color: #f5f6fa;
}
.cube-input::after {
  border-color: #ffffff;
}
.modify-phone,
.modify-password {
  .form {
    padding: 10px 0;
    .item {
      display: flex;
      align-items: center;
      padding: 15px 0;
      font-size: 14px;
      .name {
        width: 80px;
        text-align: left;
        margin-right: 20px;
        color: #34363c;
      }
      .content {
        flex: 1;
        display: flex;
        align-items: center;
        text-align: left;
        color: #777777;
        .pre-num {
          color: #34363c;
        }
        .new-phone-input {
          flex: 1;
          /deep/ .cube-input-field {
            padding: 0 0 0 10px;
          }
        }
        .text {
          line-height: 20px;
        }
        .verification-code {
          width: 80px;
          line-height: 20px;
          color: #04bd8a;
        }
      }
    }
  }
  .sure-btn {
    margin-top: 30px;
  }
  .tips {
    margin-top: 20px;
    text-align: left;
    color: #999999;
    font-size: 12px;
  }
}
</style>

