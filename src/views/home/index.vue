<template>
  <div class="home">
    <home-bar :organid="id"></home-bar>
    <div class="banner-wrapper">
      <cube-slide :data="banners"/>
    </div>
    <div class="course-box" v-if="recommentCourseList.length">
      <div class="course-box__title">
        <div class="course-box__name">智慧琴童</div>
        <div class="course-box__more" @click="recommentMore">更多</div>
      </div>
      <Grid v-if="recommentCourseList.length" :courseData="recommentCourseList" @click="gridClick" />
    </div>
    <template v-if="CategoryCorse.length">
      <div class="course-box expand bottom-slit-line" v-for="(item, index) in CategoryCorse" :key="index">
        <div class="course-box__title">
          <div class="course-box__name">{{item.categoryname}}</div>
          <div class="course-box__more" @click="courseMore(item.category_id)">更多</div>
        </div>
        <CourseItem :data="sub_item" :courseorigin="id == 1 ? 'official' : 'organ' " @click="courseClick" v-for="(sub_item, sub_index) in item.data"  :key="sub_index" />
      </div>
    </template>
    <div class="teacher-carousel" v-if="teachers.length">
      <div class="title">名师推荐</div>
      <div class="teacher-wrapper">
        <cube-slide :data="teachers" :showDots="false"> 
          <cube-slide-item v-for="(item, index) in teachers" :key="index">
            <div class="teachers-block">
              <div class="teacher-item" v-for="(sub_item, sub_index) in item" :key="sub_index" @click="teacherInfo(sub_item)">
                <img class="teacher-avatar" :src="sub_item.imageurl || DefaultAvatar" @error="teacherAvatarError" >
                <p class="name">{{sub_item.teachername || '匿名'}}</p>
              </div>
            </div>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBar from "%/home-bar"
import Grid from '%/grid'
import CourseItem from '%/course-item'
import DefaultAvatar from '^/images/defaultAvatar.png'

import { mapGetters } from 'vuex'
import { getRecommendCourser, getSlideList, getRecommendTeacher, getRecommendCategory } from '@/api'

export default {
  data() {
    return {
      DefaultAvatar: DefaultAvatar,
      title: '智慧琴童',
      banners: [],
      recommentCourseList: [],
      teachers: [],
      CategoryCorse: []
    }
  },
  created() {
    this.id = this.$route.name == 'official' ? 1 : this.organ.organid
    this.getSlide()
    this.getRecommentCourse()
    this.getCategoryCorse()
    this.getTeacher()
  },
  computed: {
    ...mapGetters([
      'organ'
    ])
  },
  watch: {
    '$route' (to, from) {
      this.id = to.name == 'official' ? 1 : this.organ.organid
      this.getCategoryCorse()
      this.getTeacher()
    }
  },
  methods: {
    courseClick(item) {
      this.$router.push({
        path: `/courseinfo/${item.curriculumid}`
      })
    },
    courseMore(id) {
      let query = {
        organid: this.id,
        category_id: id
      }
      this.$router.push({
        path: '/course',
        query
      })
    },
    recommentMore() {
      let path = null
      if ( this.id == 1) {
        path = {
          path: '/course',
          query: {
             organid: this.id,
             category_id: '全部'
          }
        }
      } else {
        path = {
          path: '/official'
        }
      }
      this.$router.push(path)
    },
    gridClick(course) {
      this.$router.push({
        path: `/courseinfo/${course.curriculumid}`
      })
    },
    teacherInfo(teacher) {
      this.$router.push({
        path: `/teacherinfo/${teacher.teacherid}`
      })
    },
    // banner图
    getSlide() {
      getSlideList({
        organid: 1
      }).then( res => {
        if (res.code == 0) {
          this.banners = res.data.map(item => {
            return {
              image: item.imagepath,
              url: item.url,
              id: item.id
            }
          });
        }
      })
    },
    // 官方推荐课程
    getRecommentCourse() {
      getRecommendCourser({
        organid: 1,
        limit: 4,
        type: 1
      }).then( res => {
        if (res.code == 0) {
          this.recommentCourseList = res.data
        }
      })
    },
    // 分类课程
    getCategoryCorse() {
      let organid = this.$route.name == 'official' ? 1 : this.organ.organid
      getRecommendCategory({
        organid:  organid,
        limit: 4
      }).then( res => {
        if (res.code === 0) {
          this.CategoryCorse = res.data
        }
      })
    },
    getTeacher() {
      let organid = this.$route.name == 'official' ? 1 : this.organ.organid
      getRecommendTeacher({
        organid: organid,
        limit: 10
      }).then( res=> {
        if (res.code == 0) {
          this.teachers = this.arrTrans(3,res.data)
        }
      })
    },
    // 一维数组转换为二维数组
    arrTrans(num, arr) {
      const iconsArr = [];
      arr.forEach((item, index) => {
        const page = Math.floor(index / num)
        if (!iconsArr[page]) {
          iconsArr[page] = []
        }
        iconsArr[page].push(item)
      })
      return iconsArr
    },
    teacherAvatarError(ev) {
      ev.target.src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4"
    }
  },
  components: {
    HomeBar,
    Grid,
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
}
.banner-wrapper {
  height: 164px;
  border-radius: 6px;
  overflow: hidden;
}
.course-list-wrapper {
  margin-top: 10px;
}
.course-box {
  &__title {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 24px;
  }
  &__name {
    color: #323747;
    font-size: 14px;
  }
  &__more {
    padding-left: 20px;
    color: #0bcc96;
    font-size: 12px;
  }
}
.teacher-carousel{
  padding-bottom: 20px;
  .title{
    margin: 20px 0;
    line-height: 30px;
  }
}
.teacher-wrapper{
  margin: 0 10px;
  .teachers-block{
    display: flex;
  }
  .teacher-item{
    flex: 1;
    .name{
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .teacher-avatar{
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
}

  
</style>
