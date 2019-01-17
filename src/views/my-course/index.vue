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
            @pulling-up="onPullingUp"
            v-if="officialData.length"
            ref="officialscroll"
            :options="scrollOptions"
            :data="officialData">
            <div class="course-list">
              <div class="course-card" v-for="(item, index) in officialData" :key="index">
                <CourseItem :data="item" @click="$router.push({path: `/lession_detail/${item.curriculumid}`, query: {type: 'official'}})" type="course-show"/>
              </div>
            </div>
          </cube-scroll>
          <div class="no-data" v-if="!officialData.length && officialParams.loaded">
            <img :src="NoDataImage" alt="暂无数据">
            <p>暂无数据</p>
          </div>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll
            v-if="organData.length"
            @pulling-up="onPullingUp"
            ref="organscroll"
            :options="scrollOptions"
            :data="organData">
            <div class="course-list">
              <div class="course-card" v-for="(item, index) in organData" :key="index">
                <CourseItem :data="item" courseorigin="organ" type="course-show" @click="$router.push({path:`/lession_detail/${item.curriculumid}`, query: {type: 'organ'}})"/>
              </div>
            </div>
          </cube-scroll>
          <div class="no-data" v-if="!organData.length && organParams.loaded">
            <img :src="NoDataImage" alt="暂无数据">
            <p>暂无数据</p>
          </div>
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
        coursetype: 2,
        loaded: false,
        nomore: false
      },
      officialParams: {
        pagenum: 1,
        coursetype: 1,
        loaded: false,
        nomore: false
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
        pullUpLoad: {
          threshold: 10
        },
        directionLockThreshold: 0
      }
    }
  },
  created() {
    this.selectedLabel = this.$route.query.status == 0 ? '智慧琴童' : '机构课' ;
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
    currentType() {
      return this.initialIndex === 1 ? 'organ' : 'official'
    }
  },
  methods: {
    onPullingUp() {
      let type = this.currentType
      let params = this[`${type}Params`]
      if(params.nomore) {
        this.$refs[`${type}scroll`] && this.$refs[`${type}scroll`].forceUpdate()
        return 
      }
      params.pagenum++ 
      this.getdata()
    },
    getdata() {
      let type = this.currentType 
      let params = this[`${type}Params`]
      getMyCurriculum(params).then( res => {
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
      this.$router.replace({
        query: {
          status: current
        }
      })
      this.selectedLabel = this.tabLabels[current].label;
      let type = this.currentType
      let params = this[`${type}Params`]
      if(params.nomore) {
        this.$refs[`${type}scroll`] && this.$refs[`${type}scroll`].forceUpdate()
        return 
      }
      this.getdata()
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
