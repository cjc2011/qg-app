<template>
  <div>
    <div class="course-info" v-if="courseInfo">
      <div class="course-name">{{courseInfo.coursename}}</div>
      <div class="course-type">
        <img :src="LuboIcon" alt="录播">
        <span class="text"> {{courseInfo.coursetype == 2 ? `老师：${courseInfo.teachername || '匿名'}` : '班型：录播'}}</span>
      </div>
    </div>
    <div class="border-top-split expand"></div>
    <div class="lession-wrapper" v-if="lessionInfo">
      <div class="title">{{lessionInfo.periodnum}}个课时</div>
      <div class="lession-list">
        <div class="lession-item expand border-bottom-1px" v-for="(item, index) in lessionInfo.data" :key="item.toteachid">
          <div class="lession-left">
            <img :src="LessonIcon" class="lession-icon" />
            <div class="lession-name">课时{{index + 1}}</div>
          </div>
          <img :src="PlayIcon" class="lession-play" @click="getPlayBack(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LessonIcon from '^/images/lession.png'
import PlayIcon from '^/images/play.png'
import LuboIcon from '^/images/lubo.png'

import { getAppLiveSchedule, getCurriculumInfo, getAppLivePlayback } from '@/api'

export default {
  data() {
    return {
      PlayIcon: PlayIcon,
      LessonIcon: LessonIcon,
      LuboIcon: LuboIcon,
      lessionInfo: null,
      courseInfo: null
    }
  },
  created() {
    this.courseId = this.$route.params.id 
    this.getCourseInfo()
    this.getLessionList()
  },
  methods: {
    getCourseInfo() {
      getCurriculumInfo({
        courseid: this.courseId
      }).then( res => {
        if (res.code == 0) {
          this.courseInfo = res.data
        }
      })
    },
    getLessionList() {
      getAppLiveSchedule({
        courseid: this.courseId
      }).then( res => {
        if (res.code == 0) {
          this.lessionInfo = res.data
        }
      })
    },
    // 获取回放
    getPlayBack(item) {
      console.log(item.toteachid)
      getAppLivePlayback({
        toteachid: item.toteachid
      }).then( res => {
        console.log(res, 'res')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.course-info{
  text-align: left;
  margin-bottom: 20px;
  .course-name{
    line-height: 28px;
    padding: 20px 20px 10px;
    font-size: 16px;
    color: #3c3c41;
  }
  .course-type{
    margin-left: 36px;
    img{
      width: 16px;
      margin-right: 4px;
    }
    .text{
      display: inline-block;
      font-size: 13px;
      color: #61636F;
      vertical-align: middle;
    }
  }
}
.lession-wrapper{
  text-align: left;
  padding: 20px 0;
  .title{
    font-size: 16px;
    line-height: 30px;
    color: #3C3C41;
  }
  .lession{
    &-list{
      // margin-left: 20px;
    }
    &-item{
      display: flex;
      padding: 10px 16px 10px 26px;
      align-items: center;
      justify-content: space-between;
    }
    &-left{
      flex: 1;
      font-size: 14px;
      color: #61636F;
    }
    &-icon{
      margin-right: 6px;
      width: 16px;
    }
    &-name{
      display: inline-block;
      vertical-align: middle;
    }
    &-play{
      width: 23px;
    }
  }
}
</style>
