<template>
  <div class="user-info">
    <div class="content border-top-split">
      <div class="msg-item border-top-1px" @click="jump(item)" v-for="(item, index) in UserData" :key="index">
        <span class="msg-item__left">{{item.name}}</span>
        <div class="msg-item__content">
          <cube-upload
            class="upload"
            v-if="item.image"
            action="//jsonplaceholder.typicode.com/photos/"
            :simultaneous-uploads="1"
            @files-added="filesAdded" >
            <div class="clear-fix">
              <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
              <cube-upload-btn :multiple="false">
                <div>
                  <img class="user-avatar" :src="item.image" />
                </div>
              </cube-upload-btn>
            </div>
          </cube-upload>
          <p v-if="item.value" class="msg-item__text">{{item.value}}</p>
          <span class="arrow-icon">
            <img :src="ArrowIcon" >
          </span>
        </div>
      </div>
      <p class="motto">我想我还是不够成熟，没办法为自己那颗烦躁的心波澜不惊地
掌舵我想我还是不够成熟，没办法为自......</p>
      <!-- <cube-button >Date Picker</cube-button> -->
    </div>
  </div>
</template>

<script>
import ArrowIcon from '^/images/arrow.png'

export default {
  data() {
    return {
      ArrowIcon: ArrowIcon,
      files: [],
      sexs: [
        {
          text: '男',
          value: '男'
        },
        {
          text: '女',
          value: '女'
        }
      ],
      UserData: [
        {
          name: '头像',
          image: 'https://wx.qlogo.cn/mmopen/PiajxSqBRaEK22Q42iaW7KTpTsDvpLfQ6C6jBtDp30qzpEiay4qQygTvBzr88ctv93RONvMofG0egK4MIMvlVqELw/0'
        },
        {
          name: '昵称',
          value: 'Bulehead',
          type: 'nikename'
        },
        {
          name: '性别',
          value: 'Bulehead',
          action: 'sex'
        },
        {
          name: '生日',
          value: '1994-01-27',
          action: 'date-picker'
        },
        {
          name: '手机号',
          value: '17701088888',
          type: 'phone'
        },
        {
          name: '修改密码',
          type: 'password'
        },
        {
          name: '个性签名',
          type: 'motto'
        }
      ]
    }
  },
  methods: {
    jump(item) {
      item.type && this.$router.push({
        path: `/useredit/${item.type}`
      })
      switch(item.action) {
        case 'date-picker':
          this.showDatePicker()
          break;
        case 'sex':  
          this.showPicker()
          break;
      }
    },
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: 'Picker',
          data: [this.sexs],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: 'Date Picker',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.show()
    },
    filesAdded() {

    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  margin: 0 -16px;
  .msg-item{
    padding: 10px 16px;
    min-height: 44px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    &__left{
      max-width: 80px;
      font-size: 15px;
      color: #4B505A;
    }
    &__content{
      flex: 1;
      text-align: right;
      .upload{
        display: inline-block;
        vertical-align: middle;
      }
    }
    &__text{
      display: inline-block;
      margin-right: 20px;
      color: #999999;
      font-size: 14px;
      vertical-align: middle;
    }
  }
  .motto{
    padding: 0 16px;
    text-align: left;
    color: #939997;
    font-size: 12px;
  }
}
.arrow-icon{
  display: inline-block;
  position: relative;
  width: 12px;
  img {
    max-width: 100%;
    vertical-align: middle;
  }
}
.user-avatar{
  width: 56px;
  height: 56px;
  margin-right: 20px;
  border-radius: 28px;
  vertical-align: middle;
}
</style>

