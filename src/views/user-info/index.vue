<template>
  <div class="user-info">
    <div class="content border-top-split">
      <div class="msg-item border-top-1px">
        <span class="msg-item__left">头像</span>
        <cube-upload class="upload" :auto="false" action="/" :simultaneous-uploads="1" @files-added="filesAdded">
          <div class="clear-fix">
            <cube-upload-btn :multiple="false">
              <img class="user-avatar" :src="userinfo.imageurl || DefaultAvatar" />
            </cube-upload-btn>
          </div>
        </cube-upload>
      </div>
      <div class="msg-item border-top-1px" @click="jump(item)" v-for="(item, index) in UserData" :key="index">
        <span class="msg-item__left">{{item.name}}</span>
        <div class="msg-item__content">
          <p v-if="item.value && item.type!= 'profile'" class="msg-item__text">{{item.value}}</p>
          <span class="arrow-icon">
            <img :src="ArrowIcon">
          </span>
        </div>
      </div>
      <p class="motto">{{this.profile}}</p>
      <!-- <cube-button >Date Picker</cube-button> -->
    </div>
  </div>
</template>

<script>
import compress from '^/js/image.js'
import ArrowIcon from '^/images/arrow.png'
import DefaultAvatar from '^/images/defaultAvatar.png'
import { mapGetters, mapMutations } from 'vuex'
import { upload, getStudentInfo, updateStudentInfo } from '@/api'
import { toast } from '../../cube-ui'
export default {
  data() {
    return {
      profile: '',
      ArrowIcon: ArrowIcon,
      files: [],
      DefaultAvatar: DefaultAvatar,
      sexs: [{
        text: '未知',
        value: '未知'
      },
      {
        text: '男',
        value: '男'
      },
      {
        text: '女',
        value: '女'
      }],
      sexIndex: 0, // 性别 下拉框 默认选中
      date: new Date(),// 生日 下拉框 默认选中
      UserData: [
        {
          name: '昵称',
          value: '',
          type: 'nickname'
        },
        {
          name: '性别',
          value: '',
          action: 'sex',
        },
        {
          name: '生日',
          value: '',
          action: 'date-picker',
        },
        {
          name: '手机号',
          value: '',
          type: 'mobile'
        },
        {
          name: '修改密码',
          type: 'password'
        },
        {
          name: '个性签名',
          value: '',
          type: 'profile'
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ]),
  },
  methods: {
    ...mapMutations({
      'setUserInfo': 'SET_USERINFO',
    }),
    getData() {
      getStudentInfo().then(res => {
        if (res.code == 0) {
          for (let i in res.data) {
            this.userinfo[i] = res.data[i]
            this.UserData.map(e => {
              if (e.type && e.type == i) {
                e.value = res.data[i]
                if (e.type == 'profile') {
                  this.profile = res.data[i]
                }
              }
              if (e.action && e.action == 'date-picker') {
                if (res.data['birth']) {
                  e.value = res.data['birth']
                  let date = res.data['birth'].split('-')
                  this.date = new Date(date[0], date[1] - 1, date[2])
                }else{
                   e.value = '未知'
                }
              }
              if (e.action && e.action == 'sex') {
                this.sexIndex = +res.data['sex']
                if (res.data['sex'] == 1) {
                  e.value = '男'
                } else if (res.data['sex'] == 2) {
                  e.value = '女'
                } else {
                  e.value = '未知'
                }
              }
            })
          }
          this.setUserInfo(this.userinfo)
        } else {
          toast(`${res.info}`)
        }

      })
    },
    jump(item) {
      item.type && this.$router.push({
        path: `/useredit/${item.type}`
      })
      switch (item.action) {
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
          title: '性别',
          data: [this.sexs],
          selectedIndex: [this.sexIndex],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex) {
      this.UserData[1].value = selectedVal[0]
      updateStudentInfo({
        sex: selectedIndex[0]
      }).then(res => {
        if (res.code === 0) {
          
        }
      })
    },
    selectHandle1(selectedVal, selectedIndex, selectedText) {
      this.UserData[2].value = selectedIndex.join('-')
      updateStudentInfo({
        birth: this.UserData[2].value
      }).then(res => {
        if (res.code === 0) {
          let userinfo = this.userinfo 
          userinfo.birth = this.UserData[2].value
          this.setUserInfo(userinfo)
        }
      })
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '生日',
          value: this.date,
          min: new Date(1970, 7, 8),
          max: new Date(),
          onSelect: this.selectHandle1,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.show()
    },
    filesAdded(file) {
      let fromData = new FormData()
      fromData.append('uploadFile', file[0])
      fromData.append('allpathnode', '1,1,6')
      console.log(file[0], 'file')
      console.log(file[0].toString(), 'file')
      upload(fromData).then(res => {
        console.log(res, 'res')
        if ( res.code == 0) {
          let userinfo = this.userinfo 
          userinfo.imageurl = res.data.data.source_url
          this.setUserInfo(userinfo)
          updateStudentInfo({
            imageurl: userinfo.imageurl
          }).then( res => {
            
          })
        } else {
          toast(`${res.info}`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 0 -16px;
  .msg-item {
    padding: 10px 16px;
    min-height: 44px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    &.reverse{
      flex-flow: row-reverse;
    }
    &__left {
      max-width: 80px;
      font-size: 15px;
      color: #4b505a;
    }
    &__content {
      flex: 1;
      text-align: right;
      .upload {
        display: inline-block;
        vertical-align: middle;
      }
    }
    &__text {
      display: inline-block;
      margin-right: 20px;
      color: #999999;
      font-size: 14px;
      vertical-align: middle;
    }
  }
  .motto {
    padding: 0 16px;
    text-align: left;
    color: #939997;
    font-size: 12px;
    line-height: 16px;
  }
}
.arrow-icon {
  display: inline-block;
  position: relative;
  width: 12px;
  img {
    max-width: 100%;
    vertical-align: middle;
  }
}
.user-avatar {
  width: 56px;
  height: 56px;
  margin-right: 20px;
  border-radius: 28px;
  vertical-align: middle;
}
</style>

