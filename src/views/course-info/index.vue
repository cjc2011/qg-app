<template>
  <div class="course-info">
    <div class="header">
      <div class="top-bar">
        <span class="back-icon" @click="$router.back()"><img :src="BackIcon"></span>
        <span class="text">课程详情</span>
        <span class="share-icon">
          <img :src="CollectIcon" alt="收藏" @click="toCollect" v-if="is_collect == 0">
          <img :src="CollectIconActive" alt="收藏" @click="toCancelCollect" v-if="is_collect == 1">
        </span>
      </div>
      <div class="bg-image">
        <img :src="Gb" />
      </div>
      <h1 class="name">{{courseInfoObj.coursename}}</h1>
    </div>
    <h1 class="course-name">{{courseInfoObj.coursename}}</h1>
    <div class="course-box summary">
      <div class="course-box__title">简介</div>
      <div class="course-box__content">
        <P v-html="courseInfoObj.generalize || '暂无简介'"></P>
      </div>
    </div>
    <!-- 1 录播 2直播 -->
    <div class="course-box teacher" v-if="courseInfoObj.coursetype == 2">
      <div class="course-box__title">老师简介</div>
      <div class="course-box__content">
        <div class="teacher-avatar">
          <img class="avatar" :src="courseInfoObj.teacher_imageurl || defaultAvatar">
          <p class="teacher-name">{{courseInfoObj.teachername}}</p>
        </div>
        <p class="text">{{courseInfoObj.teacher_porfile || '暂无简介'}}</p>
      </div>
    </div>
    <div class="course-box noborder evaluate" v-if="courseInfoObj.coursetype == 2">
      <div class="course-box__title">
        <span class="text">课程评论</span>
        <cube-rate class="rate" v-model="avgscore" :justify="true"></cube-rate>
      </div>
      <div v-for="(item,index) in commentData" :key="index">
        <EvaluateItem :data="item"></EvaluateItem>
      </div>
      <div class="no-comment" v-if="!commentData.length">暂无评论</div>
    </div>
    <div class="pay border-top-1px" v-if="courseInfoObj.applystatus === 0">
      <div class="preice">¥{{courseInfoObj.price}}</div>
      <div class="pay-btn" @click="pay">立即购买</div>
    </div>
  </div>
</template>

<script>
import Gb from '^/images/bg.png'
import ShareIcon from '^/images/share.png'
import CollectIcon from '^/images/shoucang.png'
import CollectIconActive from '^/images/shoucang_active.png'
import BackIcon from '^/images/back-white.png'
import TimeIcon from '^/images/time.png'
import defaultAvatar from '^/images/defaultAvatar.png'
import { getCurriculumInfo, getCurriculumComment, courseCollect, cancelCourseCollect, gotoOrder, submitApplyPay, getAppLiveSchedule } from '@/api'
import EvaluateItem from '%/evaluate-item/index.vue'
import { toast } from '../../cube-ui'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      paySelected: '',
      Gb: Gb,
      score: 3.3,
      defaultAvatar: defaultAvatar,
      BackIcon: BackIcon,
      CollectIcon: CollectIcon,
      CollectIconActive: CollectIconActive,
      ShareIcon: ShareIcon,
      TimeIcon: TimeIcon,
      is_collect: undefined,
      courseInfoObj: {},
      commentData: [],
      avgscore: 0
    }
  },
  components: {
    EvaluateItem
  },
  created() {
    this.courseId = this.$route.params.id
    this.getCurriculumInfo()
    this.getCurriculumComment()
  },
  computed: {
    ...mapGetters([
      'organ'
    ])
  },
  methods: {
    getLessionList() {
      getAppLiveSchedule({
        courseid: this.courseId
      }).then( res => {
        if (res.code == 0) {

        }
      })
    },
    pay() {
      gotoOrder({
        courseid: this.courseId,
        ordersource: 2,
        organid: this.organ.organid
      }).then( res => {
        if (res.code === 0) {
          this.$router.push({
            path: `/orderinfo/${res.data.ordernum}`
          })
        } else {
          toast(`${res.info}`)
        }
      })
    },
    // 课程详情
    // 直播需要显示 老师详情 评论列表   
    // 录播显示 课时列表
    getCurriculumInfo() {
      getCurriculumInfo({
        courseid: this.courseId
      }).then(res => {
        if (res.code === 0) {
          this.is_collect = res.data.is_collect
          this.courseInfoObj = res.data
        } else {
          toast(`${res.info}`)
        }
      })
    },
    getCurriculumComment() {
      getCurriculumComment({
        courseid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          this.commentData = res.data.data
          this.avgscore = res.data.avgscore && Number(res.data.avgscore)
        }
      })
    },
    // 收藏
    toCollect() {
      courseCollect({
        courseid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          this.is_collect = 1
        }
      })
    },
    // 取消收藏
    toCancelCollect() {
      cancelCourseCollect({
        courseid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          this.is_collect = 0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.course-info {
  margin: -50px -16px 0;
}
.header {
  .top-bar {
    position: fixed;
    left: 16px;
    right: 16px;
    top: 0;
    display: flex;
    justify-content: space-between;
    .text{
      line-height: 40px;
      color: #ffffff;
    }
    .back-icon,
    .share-icon {
      display: inline-block;
      width: 20px;
      padding: 10px 0;
      .cubeic-back {
        color: #ffffff;
      }
    }
  }
  .name {
    position: absolute;
    top: 100px;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
  }
}
.course-name {
  margin: 0;
  padding: 18px 16px;
  font-size: 15px;
  color: #3c3c41;
  text-align: left;
  border-bottom: 10px solid #f5f6fa;
}
.no-comment{
  margin-top: 20px;
  padding: 0 10px;
  font-size: 13px;
  color: #6e6f80;
}
.course-box {
  padding: 16px;
  text-align: left;
  border-bottom: 10px solid #f5f6fa;
  &.noborder {
    border-bottom: 0px solid #ffffff;
  }
  &__title {
    display: flex;
    margin-bottom: 4px;
    justify-content: space-between;
    font-size: 15px;
    color: #3c3c41;
    .text{
      width: 100px;
    }
    .rate{
      width: 100px;
    }
  }
  &__content {
    padding: 10px;
    font-size: 13px;
    color: #6e6f80;
    line-height: 26px;
  }
}
.teacher-avatar {
  text-align: center;
  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 22px;
  }
  .teacher-name {
    font-size: 14px;
    color: #3c3c41;
  }
}
.pay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #ffffff;
  .preice {
    color: #f20b0b;
    font-size: 17px;
    font-weight: 600;
    flex: 1;
  }
  &-btn {
    height: 34px;
    width: 80px;
    line-height: 34px;
    font-size: 15px;
    color: #ffffff;
    background: linear-gradient(
      90deg,
      rgba(39, 249, 180, 1),
      rgba(11, 204, 150, 1)
    );
    box-shadow: 0px 8px 13px 0px rgba(8, 175, 128, 0.2);
    border-radius: 4px;
  }
}
.pay-block{
  background: #ffffff;
}
.pay-header{
  position: relative;
  line-height: 44px;
  padding: 0 10px;
  .cubeic-close{
    position: absolute;
    left: 10px;
  }
}
.pay-item{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B505A;
  font-size: 17px;
  .pay-icon{
    width: 25px;
    height: 25px;
    margin-right: 20px;
  }
}
.pay-footer{
  padding: 32px 16px;
  .pay-btn {
    width: 100%;
    height: 44px;
    line-height: 44px;
  }
}
</style>
