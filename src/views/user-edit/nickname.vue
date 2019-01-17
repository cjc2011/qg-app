<template>
  <div class="fix border-top-split expand">
    <div class="top-bar-action">
      <span class="img-wrapper" @click="toSave">保存</span>
    </div>
    <div class="content-fixed">
      <cube-input v-model="nickname" :clearable="true" placeholder="昵称"></cube-input>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "@/store/mutation-type";
import { updateStudentInfo } from "@/api";
import { toast } from "../../cube-ui";

export default {
  data() {
    return {
      nickname: ""
    };
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  created() {
    this.nickname = this.userinfo.nickname;
  },
  methods: {
    toSave() {
      updateStudentInfo({
        nickname: this.nickname
      }).then(res => {
        if (res.code === 0) {
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-fixed{
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #F5F6FA;
}
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

