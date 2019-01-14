<template>
  <div>
    <cube-tab-bar 
      v-model="selectedLabel" 
      show-slider
      :data="tabLabels"
      ref="tabNav"></cube-tab-bar>
    <div class="tab-slide-container">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <cube-slide-item>
          <cube-scroll 
            v-if="officialData.length"
            @pulling-up="onPullingUp"
            ref="officialscroll"
            :data="officialData"
            :options="scrollOptions">
            <ul>
              <OrderItem :order="item" order-origin='official' v-for="item in officialData" :key="item.ordernum" />
            </ul>
            <div class="no-data" v-if="!officialData.length && officialParams.loaded">
              <img :src="NoDataImage" alt="暂无数据">
              <p>暂无订单</p>
            </div>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll 
            :options="scrollOptions"
            :data="organData"
            @pulling-up="onPullingUp"
            ref="organscroll"
            v-if="organData.length"
            >
            <ul>
              <OrderItem :order="item" order-origin='organ' v-for="item in organData" :key="item.ordernum" />
            </ul>
            <div class="no-data" v-if="!organData.length && organParams.loaded">
              <img :src="NoDataImage" alt="暂无数据">
              <p>暂无订单</p>
            </div>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import { findIndex } from "^/js/util.js";
import OrderItem from '%/order-item'
import NoDataImage from '^/images/nodata.png'

import { getMyOrderList } from '@/api'

export default {
  data() {
    return {
      selectedLabel: "智慧琴童",
      tabLabels: [
        {
          label: "智慧琴童"
        },
        {
          label: "直播课程"
        }
      ],
      organParams: {
        pagenum: 1,
        ordertype: 2,
        loaded: false,
        nomore: false
      },
      officialParams: {
        pagenum: 1,
        ordertype: 1,
        loaded: false,
        nomore: false
      },
      NoDataImage: NoDataImage,
      officialData: [],
      organData: [],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        pullUpLoad: {
          threshold: 10
        },
        directionLockThreshold: 0
      }
    };
  },
  created() {
    this.getOrder()
  },
  computed: {
    initialIndex() {
      let index = 0;
      index = findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      );
      return index;
    },
    currentType() {
      return this.initialIndex === 1 ? 'organ' : 'official'
    }
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
      this.getOrder()
    },
    getOrder() {
      let type = this.currentType 
      let params = this[`${type}Params`]
      getMyOrderList(params).then( res => {
        if (res.code == 0) {
          let data = res.data.data 
          if (params.pagenum == 1) {
            this[`${type}Data`] = data ? data : []
            params.loaded = true
          } else {
            this[`${type}Data`] = this[`${type}Data`].concat(data ? data : [])
          }
          let len = this[`${type}Data`].length
          params.nomore = len >= res.data.pageinfo.total ? true : false
        }
      })
    },
    scroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      let type = this.currentType
      let params = this[`${type}Params`]
      if(params.nomore) {
        this.$refs[`${type}scroll`].forceUpdate()
        return 
      }
      this.getOrder()
    }
  },
  components: {
    OrderItem
  }
};
</script>

<style lang="scss" scoped>
  
</style>
