<template>
  <div class="course-info">
    <div class="header">
      <div class="top-bar">
        <span class="back-icon" @click="$router.back()"><img :src="BackIcon"></span>
        <span class="share-icon">
          <!-- <img :src="ShareIcon"> -->
          <img :src="ShareIcon" alt="编辑" @click="toCollect" v-if="is_collect == 0">
          <img :src="TimeIcon" alt="编辑" @click="toCancelCollect" v-if="is_collect == 1">
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
        <P>{{courseInfoObj.generalize}}</P>
      </div>
    </div>
    <!-- 1 录播 2直播 -->
    <div class="course-box teacher" v-if="courseInfoObj.coursetype == 2">
      <div class="course-box__title">老师简介</div>
      <div class="course-box__content">
        <div class="teacher-avatar">
          <img class="avatar" :src="courseInfoObj.teacher_imageurl">
          <p class="teacher-name">{{courseInfoObj.teachername}}</p>
        </div>
        <p class="text">{{courseInfoObj.teacher_porfile}}</p>
      </div>
    </div>
    <div class="course-box noborder evaluate" v-if="courseInfoObj.coursetype == 1">
      <div class="course-box__title">老师点评</div>
      <div v-for="(item,index) in commentData" :key="index">
        <EvaluateItem :data="item"></EvaluateItem>
      </div>
      <!-- <div class="course-box__content">
        <div class="evaluate-item">
          <div class="evaluate-item__header">
            <div class="evaluate-item__user">
              <img src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4" class="evaluate-item__avatar">
              <span class="evaluate-item__name">李大美</span>
            </div>
            <div class="evaluate-item__time">
              <img :src="TimeIcon" class="evaluate-item__icon">
              <span class="evaluate-item__timetext">2018-04-05 18:25:36</span>
            </div>
          </div>
          <div class="evaluate-item__content">学习很努力jixujiayou</div>
        </div>
      </div> -->
    </div>
    <div class="pay border-top-1px">
      <div class="preice">¥19999</div>
      <div class="pay-btn">立即购买</div>
    </div>
  </div>
</template>

<script>
import Gb from '^/images/bg.png'
import ShareIcon from '^/images/share.png'
import BackIcon from '^/images/back-white.png'
import TimeIcon from '^/images/time.png'
import { getCurriculumInfo, getCurriculumComment, courseCollect, cancelCourseCollect } from '@/api'
import EvaluateItem from '%/evaluate-item/index.vue'
import { toast } from '../../cube-ui'
export default {
  data() {
    return {
      Gb: Gb,
      BackIcon: BackIcon,
      ShareIcon: ShareIcon,
      TimeIcon: TimeIcon,
      is_collect: undefined,
      courseInfoObj: {},
      commentData: []
    }
  },
  components: {

    EvaluateItem
  },
  created() {
    this.getCurriculumInfo()
    this.getCurriculumComment()
  },
  methods: {
    // 课程详情
    getCurriculumInfo() {
      getCurriculumInfo({
        courseid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          // 是否收藏
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
          // this.commentData = res.data.data
          this.commentData = [
            {
              "imageurl": null,
              "nickname": "学生头像",
              "addtime": "评论时间",
              "score": "评分",
              "content": "评论内容",
              "commentid": "评论id"
            }
          ]
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
    },

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
.course-box {
  padding: 16px;
  text-align: left;
  border-bottom: 10px solid #f5f6fa;
  &.noborder {
    border-bottom: 0px solid #ffffff;
  }
  &__title {
    font-size: 15px;
    color: #3c3c41;
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
// .evaluate-item {
//   margin-bottom: 10px;
//   &__header {
//     display: flex;
//     justify-content: space-between;
//   }
//   &__avatar {
//     width: 28px;
//     height: 28px;
//     margin-right: 6px;
//     border-radius: 14px;
//   }
//   &__name {
//     font-size: 14px;
//     color: #34363c;
//   }
//   &__icon {
//     height: 14px;
//     width: 14px;
//     margin-right: 6px;
//   }
//   &__timetext {
//     font-size: 12px;
//     color: #999999;
//   }
//   &__content {
//     margin-top: 10px;
//     font-size: 14px;
//     color: #6e6f80;
//     padding: 12px;
//     background: #f6f6f8;
//     border-radius: 2px;
//   }
// }
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
</style>
