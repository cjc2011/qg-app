<template>
  <div class="my-course">
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
            :options="scrollOptions"
            :data="officialData">
            <div class="course-list" v-if="officialData.length">
              <div class="course-card" v-for="(item, index) in officialData" :key="index">
                <CourseItem :data="item" @click="$router.push(`/courseinfo/${item.curriculumid}`)" type="course-show"/>
              </div>
            </div>
            <div class="no-data" v-else>
              <img :src="NoDataImage" alt="暂无数据">
              <p>暂无数据</p>
            </div>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll
            :options="scrollOptions"
            :data="organData">
            <div class="course-list" v-if="organData.length">
              <div class="course-card" v-for="(item, index) in organData" :key="index">
                <CourseItem :data="item" courseorigin="organ" type="course-show"/>
              </div>
            </div>
            <div class="no-data" v-else>
              <img :src="NoDataImage" alt="暂无数据">
              <p>暂无数据</p>
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
import NoDataImage from '^/images/nodata.png'

import { getMyCurriculum } from '@/api'

export default {
  data() {
    return {
      NoDataImage: NoDataImage,
      selectedLabel: '智慧琴童',
      tabLabels: [
        {
          label: '智慧琴童'
        },
        {
          label: '机构课'
        }
      ],
      organParams: {
        pagenum: 1,                       //1录播 2直播
        coursetype: 1,
      },
      officialParams: {
        pagenum: 1,
        coursetype: 2
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
    }
  },
  created() {
    this.getdata()
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
      this.getdata()
    }
  },
  methods: {
    getdata() {
      getMyCurriculum(this.currentParams).then( res => {
        if (res.code == 0) {
          switch(this.initialIndex) {
            case 0: 
              this.officialData = res.data.data
              break; 
            case 1:
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
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.course-list{
  padding: 0 16px;
}
.course-card{
  &__title{
    text-align: left;
    font-size: 13px;
    color: #474A51;
    line-height: 37px;
  }
}
</style>
