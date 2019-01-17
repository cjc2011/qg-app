<template>
  <div>
    <router-link tag="div" to="/userinfo" class="user-top expand">
      <div class="user-avatar">
        <img :src="userinfo.imageurl || DefaultAvatar" alt="用户头像">
      </div>
      <p class="user-name">{{userinfo.nickname}}</p>
      <span class="arrow-icon">
        <img :src="ArrowIcon" alt=">">
      </span>
    </router-link>
    <div class="user-menu">
      <router-link tag="div" :to="item.path" class="menu-item" v-for="(item, index) in menus" :key="index">
        <span class="right-icon">
          <img :src="item.icon" :alt="item.text">
        </span>
        <div class="content border-bottom-1px">
          <span class="text">{{item.text}}</span>
          <span class="arrow-icon">
            <img :src="ArrowIcon" alt=">">
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
import ArrowIcon from '^/images/arrow.png'
import OrderIcon from '^/images/order-icon.png'
import DefaultAvatar from '^/images/defaultAvatar.png'
import FeedbackIcon from '^/images/feedback-icon.png'
import SettingIcon from '^/images/setting-icon.png'
import SaveIcon from '^/images/save-icon.png'
import MessageIcon from '^/images/message-icon.png'
import CourseIcon from '^/images/course-icon.png'

import { mapGetters } from 'vuex'
 
export default {
  data() {
    return {
      ArrowIcon: ArrowIcon,
      OrderIcon: OrderIcon,
      CourseIcon: CourseIcon,
      MessageIcon: MessageIcon,
      SaveIcon: SaveIcon,
      SettingIcon: SettingIcon,
      FeedbackIcon: FeedbackIcon,
      DefaultAvatar: DefaultAvatar,
      menus: [
        {
          icon: OrderIcon,
          text: '我的订单',
          path: '/order?status=0'
        },
        {
          icon: CourseIcon,
          text: '我的课程',
          path: '/mycourse?status=0'
        },
        {
          icon: SaveIcon,
          text: '我的收藏',
          path: '/collection?status=0'
        },
        {
          icon: MessageIcon,
          text: '我的消息',
          path: '/message'
        },
        {
          icon: SettingIcon,
          text: '设置',
          path: '/setting_info'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
.user-top{
  padding: 14px 16px;
  display: flex;
  border-bottom: 9px solid #F5F6FA;
  .user-avatar{
    width: 50px;
    height: 50px;
    border-radius: 25px;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
      max-width: 100%;
    }
  }
  .user-name{
    flex: 1;
    margin: 0 10px;
    font-size: 16px;
    line-height: 50px;
    color: #4B505A;
    text-align: left;
  }
}
.arrow-icon {
  line-height: 50px;
  width: 20px;
  img{
    width: 12px;
  }
}
.user-menu{
  .menu-item{
    display: flex;
    align-items: center;
    margin-right: -16px;
    .right-icon {
      width: 34px;
      text-align: left;
      img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .content{
      flex: 1;
      display: flex;
      justify-content: space-between;
      line-height: 44px;
      .arrow-icon{
        margin-right: 16px;
        line-height: 44px;
      }
    }
    
  }
}
</style>
