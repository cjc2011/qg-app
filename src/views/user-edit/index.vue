<template>
  <div class="user-edit">
    <div v-if="type == 'motto'" class="motto border-top-split expand">
      <cube-textarea v-model="mottoVal" placeholder="please edit here..."></cube-textarea>
    </div>
    <div v-if="type == 'nikename'" class="nikename border-top-split expand">
      <cube-input v-model="nickname" :clearable="true" placeholder="昵称"></cube-input>
    </div>
    <div v-if="type == 'phone'" class="modify-phone">
      <div class="form">
        <div class="item use-phone border-bottom-1px">
          <div class="name">当前手机号</div>
          <div class="content">
            <p class="text">15972112481</p>
          </div>
        </div>
        <div class="item new-phone border-bottom-1px">
          <div class="name">新手机号</div>
          <div class="content">
            <span class="pre-num">+86</span>
            <cube-input class="new-phone-input" v-model="NewPhone" type="tel" placeholder="请输入手机号"></cube-input>
            <div class="verification-code">获取验证码</div>
          </div>
        </div>
        <div class="item verification border-bottom-1px">
          <div class="name">输入验证码</div>
          <div class="content">
            <cube-input class="new-phone-input" v-model="verification" type="tel" placeholder="验证码"></cube-input>
          </div>
        </div>
        <cube-button class="sure-btn" :disabled="true">确定</cube-button>
      </div>
    </div>
    <div v-if="type == 'password'" class="modify-password">
      <div class="form">
        <div class="item use-phone border-bottom-1px">
          <div class="name">当前手机号</div>
          <div class="content">
            <p class="text">15972112481</p>
          </div>
        </div>
        <div class="item new-phone border-bottom-1px">
          <div class="name">输入验证码</div>
          <div class="content">
            <cube-input class="new-phone-input" v-model="NewPhone" type="tel" placeholder="验证码"></cube-input>
            <div class="verification-code">获取验证码</div>
          </div>
        </div>
        <div class="item new-phone border-bottom-1px">
          <div class="name">新密码</div>
          <div class="content">
            <cube-input class="new-phone-input" v-model="NewPhone" type="tel" placeholder="输入新密码"></cube-input>
          </div>
        </div>
        <div class="item new-phone border-bottom-1px">
          <div class="name">确认密码</div>
          <div class="content">
            <cube-input class="new-phone-input" v-model="NewPhone" type="tel" placeholder="再次输入新密码"></cube-input>
          </div>
        </div>
        <div class="tips">密码至少为6位，支持中英文字母、数字、特殊字符</div>
        <cube-button class="sure-btn" :disabled="true">确定</cube-button>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/mutation-type'

const typeName = {
  'nikename': '修改昵称',
  'phone': '修改手机号',
  'password': '修改密码',
  'motto': '修改个性签名'
}

export default {
  data() {
    return {
      mottoVal: '',
      nickname: '',
      NewPhone: '',
      verification: '',
      type: this.$route.params.type
    }
  },
  methods: {
    ...mapMutations({
      'setTitle': types.SET_PAGETITLE
    })
  },
  beforeRouteEnter: (to, from, next) => {
    let type = to.params.type
    next( vm => {
      vm.setTitle(typeName[type])
    })
  }
}
</script>

<style lang="scss" scoped>
.cube-textarea_active:after {
  border-color: #F5F6FA;
}
.cube-input::after{
  border-color: #ffffff;
}
.modify-phone,
.modify-password{
  .form{
    padding: 10px 0;
    .item {
      display: flex;
      align-items: center;
      padding: 15px 0;
      font-size: 14px;
      .name{
        width: 80px;
        text-align: left;
        margin-right: 20px;
        color: #34363C;
      }
      .content{
        flex: 1;
        display: flex;
        align-items: center;
        text-align: left;
        color: #777777;
        .pre-num {
          color: #34363C;
        }
        .new-phone-input{
          flex: 1;
          /deep/ .cube-input-field{
            padding: 0 0 0 10px;
          }
        }
        .text{
          line-height: 20px;
        }
        .verification-code{
          width: 80px;
          line-height: 20px;
          color: #04BD8A;
        }
      }
    }
  }
  .sure-btn{
    margin-top: 30px;
  }
  .tips{
    margin-top: 20px;
    text-align: left;
    color: #999999;
    font-size: 12px;
  }
}

</style>

