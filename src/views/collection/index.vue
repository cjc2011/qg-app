<template>
  <div class="collection">
    <cube-tab-bar v-model="selectedLabel" show-slider :data="tabLabels" ref="tabNav"></cube-tab-bar>
    <div class="tab-slide-container">
      <cube-slide ref="slide" :loop="loop" :initial-index="initialIndex" :auto-play="autoPlay" :show-dots="showDots" :options="slideOptions" @scroll="scroll" @change="changePage">
        <cube-slide-item>
          <cube-scroll 
            v-if="courseData.length"
            :options="scrollOptions"
            :data="courseData"
            ref="coursescroll"
            @pulling-up="onPullingUp">
            <div class="list-wrapper">
              <CourseItem type="course-show" v-for="(item,index) in courseData" @click="click(item)" :key="index" :data="item" />
            </div>
          </cube-scroll>
          <div class="no-data" v-else>
            <img :src="NoDataImage" alt="暂无数据">
            <p>暂无数据</p>
          </div>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll 
            v-if="teacherData.length"
            :options="scrollOptions"
            :data="teacherData"
            ref="teacherscroll"
            @pulling-up="onPullingUp"
            >
            <div class="list-wrapper">
              <div class="teacher-item expand border-top-1px" v-for="(item,index) in teacherData" :key="index" @click="teacherInfo(item)">
                <div class="avatar">
                  <img :src="item.imageurl || DefaultAvatar" />
                </div>
                <div class="content">
                  <p class="content-name">{{item.teachername}}</p>
                  <p class="content-text">{{item.profile}}</p>
                </div>
                <i class="cubeic-arrow"></i>
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
import { courseCollectList, teacherCollectList } from '@/api'
import NoDataImage from '^/images/nodata.png'
import DefaultAvatar from '^/images/defaultAvatar.png'

export default {
  data() {
    return {
      DefaultAvatar: DefaultAvatar,
      courseData: [],
      teacherData: [],
      selectedLabel: '课程',
      tabLabels: [
        {
          label: '课程'
        },
        {
          label: '老师'
        }
      ],
      NoDataImage: NoDataImage,
      postParams: {
        course: {
          pagenum: 1,
          nomore: false,
          loaded: false
        },
        teacher: {
          pagenum: 1,
          nomore: false,
          loaded: false
        }
      },
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        click: false,
        pullUpLoad: {
          txt: {
            noMore: '已加载全部'
          }
        },
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
    },
    currentType() {
      let type = this.initialIndex === 0 ? 'course' : 'teacher' 
      return type
    }
  },
  created() {
    this.getData()
  },
  methods: {
    click(item) {
      this.$router.push({
        path: `/courseinfo/${item.curriculumid}`
      })
    },
    // 上拉加载更多
    onPullingUp() {
      let type = this.currentType
      let params = this.postParams[type]
      if(params.nomore) {
        this.$refs[`${type}scroll`].forceUpdate()
        return 
      }
      params.pagenum++ 
      this.getData()
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
      let params = this.postParams[type]
      if (!params.loaded) {
        this.getData()
      }
    },
    getData() {
      let ajax = this.currentType == 'course' ? courseCollectList : teacherCollectList
      let type = this.currentType
      let params = this.postParams[type]
      ajax(params).then( res => {
        if (res.code == 0 && res.data.data) {
          // 判断是否为第一次获取数据还是加载更多 直接复制 or concat
          if (params.pagenum == 1) {
            this[`${type}Data`] = res.data.data
            params.loaded = true
          } else {
            this[`${type}Data`] =  this[`${type}Data`].concat(res.data.data)
          }
          let len = this[`${type}Data`].length 
          this.postParams[type].nomore = len >= res.data.pageinfo.total ? true : false
        }
      })
    },
    teacherInfo(teacher) {
      this.$router.push({
        path: `/teacherinfo/${teacher.teacherid}`
      })
    },
  },
  components: {
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  padding: 0 16px;
}
.teacher-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  .avatar {
    width: 44px;
    height: 44px;
    margin-right: 10px;
    border-radius: 22px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
    }
  }
  .content {
    text-align: left;
    flex: 1;
    &-name {
      font-size: 14px;
      line-height: 20px;
      color: #34363c;
    }
    &-text {
      margin-top: 10px;
      color: #999999;
      font-size: 12px;
    }
  }
}
</style>
