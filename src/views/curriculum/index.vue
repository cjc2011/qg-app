<template>
  <div class="curriculum-container">
    <div class="top-bar-action">
      <span class="img-wrapper" @click="$router.push('/mycurriculum?status=0')">
        <img :src="ClockIcon">
      </span>
    </div>
    <div class="tips" v-if="isShow" @click="toReservationList">
      <div class="content">
        <img class="important-icon" :src="ExclamationIcon" />
        <span class="text">您还有未预约的课程，立即预约</span>
      </div>
      <i class="cubeic-arrow icon"></i>
    </div>
    <div :class="[isShow?'curriculum-list':'']" v-if="lessonsData.length">
      <div class="curriculum-card"  v-for="(item, index) in lessonsData" :key="index" @click="toCourse(item)">
        <div class="curriculum-card__title expand">{{date}}&nbsp;&nbsp;{{day}}</div>
        <CourseItem type="curriculum" border="bottom" courseorigin="organ" :data="item" @intoclassroom="intoclassroom" @toEvaluate="toEvaluate" @toreplay="toreplay" />
      </div>
    </div>
    <div v-else class="curriculum-list">
      <div class="no-data">
        <img :src="NoDataImage" alt="暂无数据">
        <p>今日暂无课程安排</p>
      </div>
    </div>
  </div>
</template>


<script>
import ExclamationIcon from '^/images/exclamation.png'
import ClockIcon from '^/images/clock.png'
import NoDataImage from '^/images/nodata.png'
import CourseItem from '%/course-item'
import { getLessonsByDate, getAppReserveStatus, intoClassroom, getAppLivePlayback } from '@/api'
import { formatDateTime } from '@/assets/js/util.js'
import { toast } from '../../cube-ui';

export default {
  data() {
    let weekTxt = '周' + '日一二三四五六'.charAt(new Date().getDay())
    return {
      NoDataImage: NoDataImage,
      ExclamationIcon: ExclamationIcon,
      ClockIcon: ClockIcon,
      day: weekTxt,
      date: formatDateTime(new Date()),  //年-月-日
      lessonsData: [],
      isShow: undefined
    }
  },
  components: {
    CourseItem
  },
  created() {
    this.getLessonsByDate()
    this.getAppReserveStatus()
  },
  methods: {
    // 陪练列表
    getLessonsByDate() {
      getLessonsByDate({
        'date': this.date
      }).then(res => {
        if (res.code === 0) {
          this.lessonsData = res.data
        }
      })
    },
    // 查询课程状态
    getAppReserveStatus() {
      getAppReserveStatus().then(res => {
        if (res.code === 0) {
          // this.isShow = res.data.status
          this.isShow = res.data.status
        }
      })
    },
    // 课程详情
    toCourse(course) {
      this.$router.push({
        path: `/courseinfo/${course.curriculumid}`
      })
    },
    // 底部按钮状态 0 未开始 1去APP上课 2 评价 回放 3回放
    // 进教室 
    intoclassroom(course) {
      let joinRoom = null
      let OS = navigator.userAgent
      let isAndroid = OS.indexOf('Android') > -1 || OS.indexOf('Adr') > -1
      let err = () => {}
      let success = err
      // if (isAndroid) {
      //   joinRoom = JoinRoomCall.joinroomJs
      // } else {
      //   joinRoom = cordova.plugins.JoinRoomCall.joinroomJs
      // }
      joinRoom = JoinRoomCall.joinroomJs
      // 判断是否是pad端 
      JoinRoomCall.isPad( res => {
        if (res == 'ipad') {
          intoClassroom({ 'toteachid': course.toteachid }).then(res => {
            if (res.code === 0) {
              /**
               * 进教室
               * @param classroomno 教室号
               * @param confuserpwd 学生密码
               * @param userrole 身份 => 'student'
               * @param nickname 昵称
               */
              let params = [{
                meeting: res.data.classroomno,
                nickname: res.data.nickname,
                userrole: 'student',
                password: res.data.confuserpwd
              }]
              joinRoom(params, success, err)
            }
          })
        } else {
          toast('请前往pad端进教室')
        }
      })
    },
    toEvaluate(course) {
      this.$router.push({
        path: `/myevaluate/${course.toteachid}`
      })
    },
    toreplay(item) {
      this.$router.push({
        path: '/playback',
        query: {
          toteachid: item.toteachid
        }
      })
    },
    // 我的预约列表
    toReservationList() {
      this.$router.push({
        path: '/reservationlist'
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

