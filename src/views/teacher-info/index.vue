<template>
  <div>
    <div class="top-bar-action">
      <div class="img-wrapper">
        <img :src="CollectIcon" @click="toCollect" v-if="is_collect == 0">
        <img :src="CollectIconActive" @click="toCancelCollect" v-if="is_collect == 1">
      </div>
    </div>
    <div class="teacher">
      <img class="teacher-avatar" :src="teacherInfoObj.imageurl || DefaultAvatar">
      <div class="teacher-name">
        <span class="text">{{teacherInfoObj.teachername}}</span>
        <img  v-if="teacherInfoObj.sex" class="icon" :src="teacherInfoObj.sex == 1 ? BoyIcon : GrilIcon" />
      </div>
      <div class="teacher-info">
        <div class="birthday">
          <img class="icon" :src="BirthdayIcon" />
          <span class="text">{{teacherInfoObj.age}}岁</span>
        </div>
        <div class="aaddress">
          <img class="icon" :src="Address" />
          <span class="text">
            <span v-if="teacherInfoObj.province || teacherInfoObj.city">
              {{teacherInfoObj.province}} &nbsp; {{teacherInfoObj.city}}
            </span>
            <span v-else>未知</span>
          </span>
        </div>
      </div>
      <div class="teacher-summary">
        <div class="summary-title">老师简介</div>
        <div class="summary-text" v-if="teacherInfoObj.profile">{{teacherInfoObj.profile}}</div>
        <div class="summary-text" v-else>暂无</div>
      </div>
    </div>
    <div class="teacher-course">
      <div :class="['title',courseData ? '' :'hide']">他的课程</div>
      <div v-for="(item, index) in courseData" :key="index" @click="toMyEvaluate(item)">
        <CourseItem type="course-show" :data="item"  :courseorigin="item.coursetype == 2 ? 'organ' : 'official' "/>
      </div>
    </div>
  </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'
import ShareIcon from '^/images/share-black.png'
import BoyIcon from '^/images/boy_icon.png'
import GrilIcon from '^/images/gril_icon.png'
import BirthdayIcon from '^/images/birthday.png'
import Address from '^/images/address.png'
import CollectIcon from '^/images/shoucang.png'
import CollectIconActive from '^/images/shoucang_active.png'
import DefaultAvatar from '^/images/defaultAvatar.png'

import ColleIcon from '^/images/shoucang.png'
import ColleIconActive from '^/images/shoucang_active.png'
import { mapMutations } from 'vuex'
import { getTeacherDetail, getTeacherCourse, teacherCollect, cancelTeacherCollect } from '@/api'
export default {
  data() {
    return {
      CollectIcon: CollectIcon,
      CollectIconActive: CollectIconActive,
      DefaultAvatar: DefaultAvatar,
      ColleIcon: ColleIcon,
      ColleIconActive: ColleIconActive,
      ShareIcon: ShareIcon,
      BirthdayIcon: BirthdayIcon,
      BoyIcon: BoyIcon,
      GrilIcon: GrilIcon,
      Address: Address,
      is_collect: undefined,
      teacherInfoObj: {},
      courseData: []
    }
  },
  components: {
    CourseItem
  },
  created() {
    this.getTeacherDetail()
    this.getTeacherCourse()
  },
  methods: {    
    ...mapMutations({
      'setCourseInfo': 'SET_COURSEINFO',
    }),
    // 老师详情 个人信息
    getTeacherDetail() {
      getTeacherDetail({
        teacherid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          // 是否收藏
          this.is_collect = res.data.is_collect
          this.teacherInfoObj = res.data
        }
      })
    },
    // 老师详情 课程
    getTeacherCourse() {
      getTeacherCourse({
        teacherid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          this.courseData = res.data.data
        }
      })
    },
    // 收藏
    toCollect() {
      teacherCollect({
        teacherid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          this.is_collect = 1
        }
      })
    },
    // 取消收藏
    toCancelCollect() {
      cancelTeacherCollect({
        teacherid: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          this.is_collect = 0
        }
      })
    },
    // 个人点评
    toMyEvaluate(item) {
      this.$router.push({
        path: `/courseinfo/${item.curriculumid}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher {
  .icon {
    width: 12px;
    height: 12px;
  }
  .text {
    display: inline-block;
    font-size: 16px;
    color: #3c3c41;
    vertical-align: middle;
  }
  &-avatar {
    height: 56px;
    width: 56px;
    border-radius: 28px;
  }
  &-name {
    margin-top: 10px;
  }
  &-info {
    margin-top: 10px;
    width: 200px;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    .text {
      margin-left: 2px;
      display: inline-block;
      font-size: 12px;
      color: #61636f;
    }
  }
  &-summary {
    padding: 16px;
    text-align: left;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 18px 0px rgba(205, 205, 217, 0.5);
    border-radius: 8px;
    .summary-title {
      font-size: 15px;
      color: #3c3c41;
      margin-bottom: 20px;
    }
    .summary-text {
      font-size: 13px;
      line-height: 22px;
      color: #6e6f80;
    }
  }
  &-course {
    margin-top: 20px;
    .title {
      padding: 16px;
      font-size: 15px;
      color: #474a51;
      text-align: left;
    }
  }
}
</style>
