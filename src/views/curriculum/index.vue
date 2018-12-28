<template>
  <div class="curriculum-container">
    <div class="top-bar-action">
      <span class="img-wrapper" @click="$router.push('/mycurriculum')">
        <img :src="ClockIcon">
      </span>
    </div>
    <div class="tips">
      <div class="content">
        <img class="important-icon" :src="ExclamationIcon" />
        <span class="text">您还有未预约的课程，立即预约</span>
      </div>
      <i class="cubeic-arrow icon"></i>
    </div>
    <div class="curriculum-list">
      <div class="curriculum-card" v-for="(item, index) in lessonsData" :key="index" @click="toCourse(item)">
        <div class="curriculum-card__title expand">{{date}}&nbsp;&nbsp;{{day}}</div>
        <CourseItem type="curriculum" border="bottom" :data="item" />
      </div>
    </div>
  </div>
</template>


<script>
import ExclamationIcon from '^/images/exclamation.png'
import ClockIcon from '^/images/clock.png'
import CourseItem from '%/course-item'
import { getLessonsByDate } from '@/api'
import { formatDateTime } from '@/assets/js/util.js'
export default {
  data() {
    return {
      ExclamationIcon: ExclamationIcon,
      ClockIcon: ClockIcon,
      day: '周' + '日一二三四五六'.charAt(new Date().getDay()),  //周几
      date: formatDateTime(new Date()),  //年-月-日
      lessonsData: []
    }
  },
  components: {
    CourseItem
  },
  created() {
    this.getLessonsByDate()
  },
  methods: {
    // 陪练列表
    getLessonsByDate() {
      getLessonsByDate({
        'date': '2018-12-28'
      }).then(res => {
        if (res.code === 0) {
          this.lessonsData = [
            {
              "starttime": "课时开始时间",
              "endtime": "课时结束时间",
              "coursename": "课程名称",
              "imageurl": "课程图片",
              "teachername": "老师名称",
              "toteachid": "上课的课时id",
              "curriculumid": "11",
              "buttonstatus": 2,
              // "buttonstatus": "定义按钮状态  0 未开始 1去APP上课 2 去评价 回放 3回放",
              "sort": "1,,课时顺序,当前是第几课时"
            },
            {
              "starttime": "课时开始时间",
              "endtime": "课时结束时间",
              "coursename": "课程名称11",
              "imageurl": "课程图片",
              "teachername": "老师名称",
              "toteachid": "上课的课时id",
              "curriculumid": "22",
              "buttonstatus": 1,
              // "buttonstatus": "定义按钮状态  0 未开始 1去APP上课 2 去评价 回放 3回放",
              "sort": "1,,课时顺序,当前是第几课时"
            }
          ]
        }
      })
    },
    // 课程详情
    toCourse(course) {
      this.$router.push({
        path: `/courseinfo/${course.curriculumid}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  position: fixed;
  font-size: 14px;
  height: 44px;
  left: 0;
  right: 0;
  line-height: 44px;
  color: #ffffff;
  background-color: #0cce97;
  z-index: 10;
  .text {
    vertical-align: middle;
  }
  .important-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .icon {
    position: absolute;
    right: 16px;
    top: 0;
  }
}
.curriculum-list {
  padding-top: 44px;
}
.curriculum-card {
  &__title {
    text-align: left;
    font-size: 13px;
    color: #474a51;
    line-height: 37px;
  }
}
</style>

