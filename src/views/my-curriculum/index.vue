<template>
  <div class="my-curriculum">
    <cube-tab-bar v-model="selectedLabel" show-slider :data="tabLabels" ref="tabNav"></cube-tab-bar>
    <div class="tab-slide-container">
      <cube-slide ref="slide" :loop="loop" :initial-index="initialIndex" :auto-play="autoPlay" :show-dots="showDots" :options="slideOptions" @scroll="scroll" @change="changePage">
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <div class="course-list">
              <div class="course-card" v-for="(item, index) in lessonData" :key="index">
                <div class="course-card__title expand">{{item.intime}} {{item.week}}</div>
                <CourseItem type="curriculum" border="bottom" :data="item" />
              </div>
            </div>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll :options="scrollOptions">
            <div class="course-list">
              <div class="course-card" v-for="(item, index) in lessonData" :key="index">
                <div class="course-card__title expand">{{item.intime}} {{item.week}}</div>
                <CourseItem type="course-show" border="bottom" :data="item" />
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
import { getAppWaitOrEndLessons } from '@/api'

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
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0
      },
      pagenum: 1,
      lessonData: []
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
  created() {
    this.getAppWaitOrEndLessons(this.$route.query.status)
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
      this.getAppWaitOrEndLessons(current)
    },
    getAppWaitOrEndLessons(status) {
      getAppWaitOrEndLessons({
        'status': status,
        'pagenum': this.pagenum
      }).then(res => {
        if (res.code === 0) {
          this.lessonData = res.data.data
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
