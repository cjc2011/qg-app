<template>
    <div class="collection">
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
              <CourseItem type="course-show" v-for="item in [1,2,3,4,5,6,7,8,9]" :key="item"/>
            </div>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <div class="list-wrapper">
              <div class="teacher-item expand border-top-1px" v-for="item in [1,2,3,4,5,6,7,8,9]" :key="item">
                <div class="avatar">
                  <img src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4" />
                </div>
                <div class="content">
                  <p class="content-name">老师名称</p>
                  <p class="content-text">老师介绍老师介绍</p>
                </div>
                <i class="cubeic-arrow"></i>
              </div>
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
          label: '老师'
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
.teacher-item{
  padding: 12px 16px;
  display: flex;
  align-items: center;
  .avatar{
    width: 44px;
    height: 44px;
    margin-right: 10px;
    border-radius: 22px;
    overflow: hidden;
    img{
      max-width: 100%;
    }
  }
  .content{
    text-align: left;
    flex: 1;
    &-name{
      font-size: 14px;
      line-height: 20px;
      color: #34363C;
    }
    &-text{
      margin-top: 10px;
      color: #999999;
      font-size: 12px;
    }
  }
}
</style>
