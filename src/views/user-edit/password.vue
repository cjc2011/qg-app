<template>
  <div class="modify-password">
    <div class="form">
      <div class="item use-phone border-bottom-1px">
        <div class="name">当前手机号</div>
        <div class="content">
          <p class="text">{{userinfo.mobile}}</p>
        </div>
      </div>
      <div class="item new-phone border-bottom-1px">
        <div class="name">输入验证码</div>
        <div class="content">
          <cube-input class="new-phone-input" v-model="Code" type="tel" placeholder="验证码"></cube-input>
          <div
            v-if="VerificationStatus == 1 || VerificationStatus == 3"
            class="verification-code"
            @click="getverification"
          >获取验证码</div>
          <countdown v-if="VerificationStatus == 2" :value="60" @on-finish="CountDownEnd"/>
          <!-- <cube-input class="new-phone-input" v-model="Code" type="tel" placeholder="验证码"></cube-input>
          <div class="verification-code">获取验证码</div>-->
        </div>
      </div>
      <div class="item new-phone border-bottom-1px">
        <div class="name">新密码</div>
        <div class="content">
          <cube-input class="new-phone-input" v-model="Pwd" type="tel" placeholder="输入新密码"></cube-input>
        </div>
      </div>
      <div class="item new-phone border-bottom-1px">
        <div class="name">确认密码</div>
        <div class="content">
          <cube-input class="new-phone-input" v-model="NewPwd" type="tel" placeholder="再次输入新密码"></cube-input>
        </div>
      </div>
      <div class="tips">密码至少为6位，支持中英文字母、数字、特殊字符</div>
      <cube-button class="sure-btn" :disabled="disabled" @click="updateUserPass">确定</cube-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as types from "@/store/mutation-type";
import { sendMobileMsg, updateUserPass } from "@/api";
import * as rule from "^/js/verification";
import { toast } from "../../cube-ui";
import countdown from "%/countdown";

export default {
  data() {
    return {
      Code: "", // 验证码
      Pwd: "", // 新密码
      NewPwd: "", // 确认新密码
      VerificationStatus: 1
    };
  },
  computed: {
    ...mapGetters(["userinfo", "organ"]),
    disabled() {
      if (this.Code != "" && this.Pwd != "" && this.NewPwd != "") {
        if (this.Pwd === this.NewPwd) {
          return false;
        } else {
          return true;
        }
      } else {
        // 第一次默认是true
        return true;
      }
    }
  },
  components: {
    countdown
  },
  methods: {
    // 获取验证码
    getverification() {
      this.VerificationStatus = 2;
      sendMobileMsg({
        mobile: this.userinfo.mobile,
        organid: this.organ.organid,
        prphone: 86,
        type: 3
      }).then(res => {
        if (res.code == 0) {
          toast("验证码已发送");
        } else {
          toast("获取失败");
        }
      });
    },
    // 倒计时结束
    CountDownEnd(index) {
      this.VerificationStatus = 3;
    },
    // 修改密码
    updateUserPass() {
      if (this.Pwd != "" && this.NewPwd != "") {
        if (this.Pwd === this.NewPwd) {
          updateUserPass({
            mobile: this.userinfo.mobile,
            code: this.Code,
            newpass: this.Pwd
          }).then(res => {
            if (res.code === 0) {
              toast("修改密码成功");
            } else {
              toast(`${res.info}`);
            }
          });
        } else {
          toast("2次输入的密码不一样");
        }
      }
    }
  }
};
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

