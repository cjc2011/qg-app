<template>
  <div class="my-message">
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
            <div class="list-wrapper">
              <div class="message expand border-top-1px border-bottom-1px">
                <div class="message-img fl">
                  <img src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4">
                </div>
                <div class="message-content">
                  <div class="message-head">
                    <span class="message-name">上课提醒</span>
                    <span class="message-time">2018-04-05</span>
                  </div>
                  <p class="message-text">您报名的课程，将于5分钟后开始,balbalbalblabalblablalbalbalendbalbalbalblabalblablalbalbalend</p>
                </div>
              </div>
            </div>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <div class="list-wrapper">
              智慧琴童
            </div>
          </cube-scroll>
        </cube-slide-item>
      </cube-slide>
    </div>  
  </div>
</template>

<script>
import { findIndex } from "^/js/util.js";
import CourseItem from '%/course-item'

export default {
  data() {
    return {
      selectedLabel: '课程',
      tabLabels: [
        {
          label: '课程'
        },
        {
          label: '智慧琴童'
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
    }
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
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper{
  padding: 0 16px;
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
    font-size: 16px;
    line-height: 18px;
    color: #999999;
    overflow: hidden;
  }
}
</style>
