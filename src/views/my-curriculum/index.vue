<template>
  <div class="my-curriculum">
    <cube-tab-bar v-model="selectedLabel" show-slider :data="tabLabels" ref="tabNav"></cube-tab-bar>
    <div class="tab-slide-container">
      <cube-slide ref="slide" :loop="loop" :initial-index="initialIndex" :auto-play="autoPlay" :show-dots="showDots" :options="slideOptions" @scroll="scroll" @change="changePage">
        <cube-slide-item>
          <cube-scroll
            v-if="waitData.length"
            :options="scrollOptions"
            :data="waitData"
            >
            <div class="course-list">
              <div class="course-card" v-for="(item, index) in waitData" :key="index">
                <div class="course-card__title expand">{{item.intime}} 周{{weekTxt[item.week - 1]}}</div>
                <CourseItem courseorigin="organ" type="curriculum" border="bottom" :data="item" />
              </div>
            </div>
          </cube-scroll>
          <div class="no-data" v-else>
            <img :src="NoDataImage" alt="暂无数据">
            <p>暂无数据</p>
          </div>
        </cube-slide-item>
        <cube-slide-item >
          <cube-scroll
            v-if="endData.length"
            :options="scrollOptions"
            :data="endData">
            <div class="course-list">
              <div class="course-card" v-for="(item, index) in endData" :key="index">
                <div class="course-card__title expand">{{item.intime}} 周{{weekTxt[item.week - 1]}}</div>
                <CourseItem courseorigin="organ" type="curriculum" @toreplay="toreplay" border="bottom" :data="item" @toEvaluate="evaluate"/>
              </div>
            </div>
          </cube-scroll>
          <div class="no-data" v-else>
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
import { getAppWaitOrEndLessons, getAppLivePlayback } from '@/api'
import NoDataImage from '^/images/nodata.png'
import { toast } from '../../cube-ui';

export default {
  data() {
    return {
      selectedLabel: '待上课',
      tabLabels: [
        {
          label: '待上课'
        },
        {
          label: '已结束'
        }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      weekTxt: ['一', '二', '三', '四', '五', '六', '日'],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0,
        click: false
      },
      waitData: [],
      endData: [],
      NoDataImage: NoDataImage,
      waitParams: {
        status: 0,
        pagenum: 1,
        loaded: false,
        nomore: false
      },
      endParams: {
        status: 1,
        pagenum: 1,
        loaded: false,
        nomore: false
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
    },
    currentType() {
      let type = this.initialIndex === 0 ? 'wait' : 'end' 
      return type
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    // 回放
    toreplay(item) {
      getAppLivePlayback({
        toteachid: item.toteachid
      }).then( res => {
        if (res.code === 0) {
          if (res.data.playbacklist.duration == 0) {
              toast(`暂无数据`)
            }
        } else {
          toast(`${res.info}`)
        }
      })
    },
    // 评价
    evaluate(item) {
      this.$router.push(`/myevaluate/${item.toteachid}`)
    },
    onPullingUp() {
      let type = this.currentType
      let params = this.postParams[type]
      if(params.nomore) {
        this.$refs[`${type}scroll`].forceUpdate()
        return 
      }
      params.pagenum++
      this.getdata()
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
      let type = this.currentType
      let params = this[`${type}Params`]
      if (!params.loaded) {
        this.getdata()
      }
    },
    getdata() {
      let type = this.currentType
      let params = this[`${type}Params`]
      getAppWaitOrEndLessons(params).then(res => {
        if (res.code === 0) {
          let data = [].concat.apply([], res.data.data)
          if (params.pagenum == 1) {
            this[`${type}Data`] = data ? data : []
            params.loaded = true
          } else {
            this[`${type}Data`] =  this[`${type}Data`].concat(data ? data : [])
          }
          let len = this[`${type}Data`].length 
          params.nomore = len >= res.data.pageinfo.total ? true : false
        }
      })
    }
  },
  components: {
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.course-list {
  padding: 0 16px;
}
.course-card {
  &__title {
    text-align: left;
    font-size: 13px;
    color: #474a51;
    line-height: 37px;
  }
}
</style>
