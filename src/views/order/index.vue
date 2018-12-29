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
          <cube-scroll :options="scrollOptions">
            <ul v-if="officialData.length">
              <OrderItem :order="item" order-origin='official' v-for="item in officialData" :key="item.ordernum" />
            </ul>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <ul v-if="organData.length">
              <OrderItem :order="item" order-origin='organ' v-for="item in organData" :key="item.ordernum" />
            </ul>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import { findIndex } from "^/js/util.js";
import OrderItem from '%/order-item'

import { getMyOrderList } from '@/api'

export default {
  data() {
    return {
      selectedLabel: "直播课程",
      tabLabels: [
        {
          label: "直播课程"
        },
        {
          label: "智慧琴童"
        }
      ],
      organParams: {
        pagenum: 1,
        ordertype: 1,
      },
      officialParams: {
        pagenum: 1,
        ordertype: 2
      },
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
    currentParams() {
      return this.initialIndex === 0 ? this.organParams : this.officialParams
    }
  },
  watch: {
    currentParams(newVal, oldVal) {
      this.getOrder()
    }
  },
  methods: {
    getOrder() {
      getMyOrderList(this.currentParams).then( res => {
        if (res.code == 0) {
          switch(this.initialIndex) {
            case 0: 
              this.officialData = res.data.data
              break; 
            case 1:
              console.log(this.organData)
              this.organData = res.data.data
              break;  
          }
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
      this.selectedLabel = this.tabLabels[current].label;
    }
  },
  components: {
    OrderItem
  }
};
</script>

<style lang="scss" scoped>
  
</style>
