<template>
  <div class="my-message">
    <cube-tab-bar v-model="selectedLabel" show-slider>
      <cube-tab v-for="(item) in tabs" :icon="item.icon" :label="item.label" :key="item.label">
      </cube-tab>
    </cube-tab-bar> 
    <div class="sys-message message-block" v-show="currentIndex == 0">
      <cube-scroll
        v-if="sysData.length"
        :data="sysData"
        :options="scrollOptions"
        ref="sysscroll"
        @pulling-up="onPullingUp"
        >
        <div class="list-wrapper" >
          <van-swipe-cell :right-width="65" v-for="(item, index) in sysData" :key="index" @click.native="jump(item)">
            <div class="message border-bottom-1px">
              <div class="message-img fl">
                <img :src="MessageIcon">
              </div>
              <div class="message-content">
                <div class="message-head">
                  <span class="message-name">{{item.title}}</span>
                  <span class="message-time">{{item.addtime}}</span>
                </div>
                <p class="message-text">{{item.content}}</p>
              </div>
            </div>
            <span slot="right" @click="delte(item, index)">删除</span>
          </van-swipe-cell>
        </div>
      </cube-scroll>
      <div class="no-data" v-if="!sysData.length && sysParams.loaded">
        <img :src="NoDataImage" alt="暂无数据">
        <p>暂无数据</p>
      </div>
    </div>
    <div class="push-message message-block" v-show="currentIndex == 1">
      <cube-scroll
        v-if="pushData.length"
        :data="pushData"
        :options="scrollOptions"
        ref="pushscroll"
        @pulling-up="onPullingUp"
        >
        <div class="list-wrapper" >
          <van-swipe-cell :right-width="65" v-for="(item, index) in pushData" :key="index">
            <div class="message border-bottom-1px">
              <div class="message-img fl">
                <img :src="MessageIcon">
              </div>
              <div class="message-content">
                <div class="message-head">
                  <span class="message-name">{{item.title}}</span>
                  <span class="message-time">{{item.addtime}}</span>
                </div>
                <p class="message-text">{{item.content}}</p>
              </div>
            </div>
            <span slot="right" @click="delte(item, index)">删除</span>
          </van-swipe-cell>
        </div>
      </cube-scroll>
      <div class="no-data" v-if="!pushData.length && pushParams.loaded">
        <img :src="NoDataImage" alt="暂无数据">
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>   

import { findIndex } from "^/js/util.js";
import CourseItem from '%/course-item'
import { messageList, deleteMsg } from '@/api'

import MessageIcon from '^/images/message.png'
import NoDataImage from '^/images/nodata.png'
import { toast } from '../../cube-ui';

export default {
  data() {
    return {
      selectedLabel: '系统消息',
      tabs: [
        {
          label: '系统消息'
        }, 
        {
          label: '推送消息'
        }
      ],
      NoDataImage: NoDataImage,
      MessageIcon: MessageIcon,
      sysData: [],
      pushData: [],
      sysParams: {
        pagenum: 1,
        type: 1,
        nomore: false,
        loaded: false
      },
      pushParams: {
        pagenum: 1,
        type: 2,
        nomore: false,
        loaded: false
      },
      scrollOptions: {
        directionLockThreshold: 0,
        pullUpLoad: {
          threshold: 10
        }
      }
    }
  },
  created() {
    this.getData()
  },  
  methods: {
    jump(item) {
      /**
       * type = 1 订单提醒 => 订单详情 @param ordernum 订单好
       * type = 2 上课提醒 => 我的陪练 @param 
       * type = 3 评论提醒 => 课时回放 @param toteachid 课时id
       * type = 4 预约提醒 => 课时详情 @param curriculumid 课程id
       */
      switch (item.type) {
        case 1: 
          this.$router.push({
            path: `/orderinfo/${item.externalid}`
          })
          break;
        case 2: 
          this.$router.push({
            path: '/curriculum'
          })
          break;
        case 3: 
          this.$router.push({
            path: '/playback',
            query: {
              toteachid: item.externalid
            }
          })
          break;
        case 4: 
          this.$router.push({
            path: `/reservationdetail/${item.externalid}`
          })
          break;    
      }
    },
    delte(item, index) {
      let type = this.currentType 
      this.$createDialog({
        type: 'confirm',
        title: '温馨提示',
        content: '确认删除该条消息吗？',
        onConfirm: () => {
          deleteMsg({
            messageids: [item.id]
          }).then( res => {
            if ( res.code == 0) {
              toast('删除成功')
              this[`${type}Data`].splice(index, 1)
            } else {
              toast(`${res.info}`)
            }
          })
        }
      }).show()
    },
    onPullingUp() {
      let type = this.currentType
      let params = this[`${type}Params`]
      if(params.nomore) {
        this.$refs[`${type}scroll`].forceUpdate()
        return 
      }
      params.pagenum++
      this.getData()
    },
    getData() {
      let type = this.currentType
      let params = this[`${type}Params`]
      messageList(params).then( res => {
        if (res.code == 0) {
          if (params.pagenum == 1) {
            this[`${type}Data`] = res.data.data
            params.loaded = true
          } else {
            this[`${type}Data`] = this[`${type}Data`].concat(res.data.data)
          }
          let len = this[`${type}Data`].length 
          params.nomore = len >= res.data.pageinfo.total ? true : false
        }
      })
    }
  },
  watch: {
    currentIndex() {
      let type = this.currentType
      let params = this[`${type}Params`]
      if(params.loaded) {
        this.$refs[`${type}scroll`] && this.$refs[`${type}scroll`].forceUpdate()
        return 
      }
      console.log('watch currentIndex')
      this.getData()
    }
  },
  computed: {
    currentIndex() {
      let index = -1
      index = findIndex(
        this.tabs,
        item => item.label === this.selectedLabel
      );
      return index
    },
    currentType() {
      let type = this.currentIndex == 0 ? 'sys' : 'push'
      return type
    }
  },
  components: {
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.message-block{
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 10;
}
.message{
  padding: 14px 16px;
  &-img{
    width: 52px;
    height: 52px;
    border-radius: 26px;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      max-width: 100%;
    }
  }
  &-content{
    margin-left: 62px;
    text-align: left;
  }
  &-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  &-name{
    font-size: 17px;
    color: #34363C;
  }
  &-time{
    font-size: 12px;
    color: #999999;
  }
  &-text{
    width: 100%;
    font-size: 13px;
    line-height: 18px;
    color: #999999;
    overflow: hidden;
  }
}
</style>
