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
          <van-swipe-cell :right-width="65" v-for="item in sysData" :key="item.addtime">
            <div class="message border-bottom-1px">
              <div class="message-img fl">
                <img src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4">
              </div>
              <div class="message-content">
                <div class="message-head">
                  <span class="message-name">{{item.title}}</span>
                  <span class="message-time">{{item.addtime}}</span>
                </div>
                <p class="message-text">{{item.content}}</p>
              </div>
            </div>
            <span slot="right">删除</span>
          </van-swipe-cell>
        </div>
      </cube-scroll>
      <div class="no-data" v-if="sysData.length && sysParams.loaded">
        暂无数据
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
        <div>暂无数据</div>
      </cube-scroll>
      <div class="no-data" v-if="pushData.length && pushParams.loaded">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>   

import { findIndex } from "^/js/util.js";
import CourseItem from '%/course-item'
import { messageList } from '@/api'

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
        pullUpLoad: {
          txt: {
            noMore: '已加载全部'
          }
        },
        directionLockThreshold: 0
      }
    }
  },
  created() {
    this.getData()
  },  
  methods: {
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
