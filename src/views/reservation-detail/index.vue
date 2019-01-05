<template>
  <div class="reservation-detail">
    <div class="top-bar-action" v-if="LessonCount">
      <div class="img-wrapper">
        <img :src="updateTime" @click="toUpdate">
      </div>
    </div>
    <div class="reservation-info" v-if="courseInfo">
      <div class="title"> {{courseInfo.coursename}}</div>
      <div class="teacher">
        <div class="img"><img :src="UserName" alt=""></div>
        <div class="info"> 老师：{{courseInfo.teachername || '匿名'}}</div>
      </div>
      <div class="teacher padding-bottom-20">
        <div class="img"><img :src="Lesson" alt=""></div>
        <div class="info"> 课时数：{{courseInfo.periodnum}}</div>
      </div>
    </div>
    <div class="reservation-content" v-if="LessonData.length">
      <div class="title">
        课程安排
        <div class="residue" v-if="LessonCount > 0">
          剩余<span class="color">{{LessonCount}}</span>课时
        </div>
        <div class="residue" v-else>
          已约满
        </div>
      </div>
      <div class="lesson" v-for="(item, index) in LessonData" :key="item.starttime">
        <div class="lesson-img">
          <img :src="LessonIcon" alt="icon">
        </div>
        <div class="lesson-index">
           课时{{index}}
        </div>
        <div class="lesson-date">
          {{item.starttime}}
        </div>
        <div class="lesson-update" @click="toUpdate(item)">
          {{item.overstatus > 0 ? '' : '修改'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserName from '^/images/username@2x.png'
import Lesson from '^/images/lesson@2x.png'
import LessonIcon from '^/images/lession.png'
import updateTime from '^/images/updateTime.png'

import { getAppLiveSchedule, getCurriculumInfo } from '@/api'

export default {
  data() {
    return {
      CourseId: '',
      updateTime: updateTime,
      UserName: UserName,
      Lesson: Lesson,
      LessonIcon: LessonIcon,
      LessonData: [],
      courseInfo: null,
      LessonCount: 0
    }
  },
  created() {
    this.CourseId = this.$route.params.id
    this.getCourseInfo()
    this.getLessionList()
  },
  methods: {
    getLessionList() {
      getAppLiveSchedule({
        courseid: this.CourseId
      }).then( res => {
        if (res.code == 0) {
          this.LessonData = res.data.data
          this.LessonCount = res.data.periodnum - res.data.count
        }
      })
    },
    getCourseInfo() {
      getCurriculumInfo({
        courseid: this.CourseId
      }).then( res => {
        if ( res.code === 0) {
          this.courseInfo = res.data
        }
      })
    },
    toUpdate(item) {
      let query = item.type ? {} : {select_time: item.starttime, toteachid: item.toteachid}
      if (item.overstatus && query.select_time) return
      this.$router.push({
        path: `/reservationtime/${this.$route.params.id}`,
        query
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.reservation {
  &-info:after {
    content: "";
    position: absolute;
    right: -16px;
    left: -16px;
    height: 10px;
    background: #f5f6fa;
  }
  &-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 14px;
    line-height: 26px;
    color: #0bcc96;
  }
  &-info {
    text-align: left;
    .title {
      line-height: 28px;
      padding: 20px 20px 10px;
      font-size: 16px;
      color: rgba(60, 60, 65, 1);
    }
    .teacher {
      line-height: 28px;
      font-size: 13px;
      margin-left: 36px;
      img {
        width: 16px;
      }
      .img {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        top: -3px;
      }
      .info {
        display: inline-block;
        margin-left: 4px;
      }
    }
    .padding-bottom-20 {
      padding-bottom: 20px;
    }
  }
  &-content {
    padding-top: 10px;
    .title {
      text-align: left;
      line-height: 28px;
      padding: 20px 20px 10px;
      font-size: 16px;
      //   font-weight: bold;
      color: rgba(60, 60, 65, 1);
    }
    .residue {
      display: inline-block;
      position: absolute;
      right: 20px;
      font-size: 12px;
      .color {
        color: #04bd8a;
      }
    }
    .lesson {
      display: flex;
      padding-left: 36px;
      height: 43px;
      line-height: 43px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 43px;
        left: -16px;
        right: -16px;
        height: 1px;
        background: #eeeeee;
      }
      &-img {
        width: 16px;
        vertical-align: middle;
        img {
          position: relative;
          top: -2px;
        }
      }
      &-index {
        color: rgba(97, 99, 111, 1);
        font-size: 14px;
        margin-left: 4px;
        flex-grow: 2;
        text-align: left;
      }
      &-date {
        font-size: 12px;
        color: rgba(138, 139, 144, 1);
        flex-grow: 2;
      }
      &-update {
        font-size: 14px;
        color: rgba(11, 204, 150, 1);
        flex-grow: 2;
        min-width: 40px;
      }
    }
  }
}
</style>
