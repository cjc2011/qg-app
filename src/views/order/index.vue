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
            <ul>
                <OrderItem v-for="item in [1,2,3,4,5,6,7,8]" :key="item" />
            </ul>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <ul>
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

export default {
  data() {
    return {
      selectedLabel: "课程",
      tabLabels: [
        {
          label: "课程"
        },
        {
          label: "智慧琴童"
        }
      ],
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
  computed: {
    initialIndex() {
      let index = 0;
      index = findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      );
      return index;
    }
  },
  methods: {
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
