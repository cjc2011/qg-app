<template>
    <div class="modify-phone">
        <div class="form">
            <div class="item use-phone border-bottom-1px">
                <div class="name">当前手机号</div>
                <div class="content">
                    <p class="text">{{userinfo.mobile}}</p>
                </div>
            </div>
            <div class="item new-phone border-bottom-1px">
                <div class="name">新手机号</div>
                <div class="content">
                    <span class="pre-num">+86</span>
                    <cube-input class="new-phone-input" v-model="NewPhone" type="tel" placeholder="请输入手机号"></cube-input>
                    <div v-if="VerificationStatus == 1 || VerificationStatus == 3" class="verification-code" @click="getverification">获取验证码</div>
                    <countdown v-if="VerificationStatus == 2" :value=60 @on-finish="CountDownEnd" />
                </div>
            </div>
            <div class="item verification border-bottom-1px">
                <div class="name">输入验证码</div>
                <div class="content">
                    <cube-input class="new-phone-input" v-model="verification" type="tel" placeholder="验证码"></cube-input>
                </div>
            </div>
            <cube-button class="sure-btn" :disabled="disabled" @click="updateMobile">确定</cube-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as types from '@/store/mutation-type'
import { sendMobileMsg, updateMobile } from '@/api'
import * as rule from '^/js/verification'
import { toast } from '../../cube-ui'
import countdown from '%/countdown'
export default {
    data() {
        return {
            NewPhone: '',
            VerificationStatus: 1,
            verification: '',
        }
    },
    computed: {
        ...mapGetters([
            'userinfo'
        ]),
        disabled() {
            if (this.NewPhone != '' && this.verification != '') {
                return !this.NewPhone && !this.verification
            } else {
                // 第一次默认是true
                return true
            }
        }
    },
    components: {
        countdown
    },
    methods: {
        // 获取验证码
        getverification() {
            if (!rule.mobile(this.NewPhone)) {
                return toast('请输入正确手机号')
            }
            this.VerificationStatus = 2
            sendMobileMsg({
                'mobile': this.NewPhone,
                'type': 2
            }).then(res => {
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
        // 修改密码
        updateMobile() {
            if (!rule.mobile(this.NewPhone)) {
                return toast('请输入正确手机号')
            } else {
                updateMobile({
                    'prphone': '86',
                    'newmobile': this.NewPhone,
                    'code': this.verification
                }).then(res => {
                    if (res.code === 0) {
                        return toast('修改成功')
                    } else {
                    }
                })
            }
        }
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

