<template>
  <div class="home">
    <home-bar></home-bar>
    <div class="banner-wrapper">
      <cube-slide :data="banners"/>
    </div>
    <div class="course-box">
      <div class="course-box__title">
        <div class="course-box__name">智慧琴童</div>
        <div class="course-box__more" @click="recommentMore">更多</div>
      </div>
      <Grid v-if="recommentCourseList.length" :courseData="recommentCourseList" @click="gridClick" />
    </div>
    <div class="course-box">
      <div class="course-box__title">
        <div class="course-box__name">钢琴培训</div>
        <div class="course-box__more" @click="courseMore">更多</div>
      </div>
      <CourseItem />
    </div>
    <div class="teacher-carousel">
      <div class="title">名师推荐</div>
      <div class="teacher-wrapper">
        <cube-slide :data="teachers"> 
          <cube-slide-item v-for="(item, index) in teachers" :key="index">
            <div class="teachers-block">
              <div class="teacher-item" v-for="(sub_item, sub_index) in item" :key="sub_index" @click="teacherInfo(sub_item)">
                <img class="teacher-avatar" :src="sub_item.avatar">
                <p class="name">{{sub_item.name}}</p>
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

import { mapGetters } from 'vuex'
import { getRecommendCourser, getSlideList, getRecommendTeacher } from '@/api'

export default {
  data() {
    return {
      title: '智慧琴童',
      banners: [],
      recommentCourseList: [],
      teachers: [
        [
          {
            name: 'teacher1',
            id: 3,
            avatar: "https://avatars0.githubusercontent.com/u/17289716?s=180&v=4"
          },
          {
            name: 'teacher1',
            id: 3,
            avatar: "https://avatars0.githubusercontent.com/u/17289716?s=180&v=4"
          },
          {
            name: 'teacher1',
            id: 3,
            avatar: "https://avatars0.githubusercontent.com/u/17289716?s=180&v=4"
          }
        ],
        [
          {
            name: 'teacher1',
            id: 3,
            avatar: "https://avatars0.githubusercontent.com/u/17289716?s=180&v=4"
          },
          {
            name: 'teacher1',
            id: 3,
            avatar: "https://avatars0.githubusercontent.com/u/17289716?s=180&v=4"
          },
          {
            name: 'teacher1',
            id: 3,
            avatar: "https://avatars0.githubusercontent.com/u/17289716?s=180&v=4"
          }
        ]
      ]
    }
  },
  created() {
    this.id = this.$route.name == 'official' ? 1 : this.organid
    this.getSlide()
    this.getRecommentCourse()
    this.getTeacher()
  },
  computed: {
    ...mapGetters([
      'organid'
    ])
  },
  watch: {
    '$route' (to, from) {
      this.id = to.name == 'official' ? 1 : this.organid
    }
  },
  methods: {
    courseMore() {
      if ( this.$route.name == 'official') {
        // this.$rout
      }
    },
    recommentMore() {
      let path = null
      if ( this.$route.name == 'official') {
        path = {
          path: '/course',
          query: {
             organid: this.id
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
        path: `/courseinfo/${course.id}`
      })
    },
    teacherInfo(teacher) {
      this.$router.push({
        path: `/teacherinfo/275`
        // path: `/teacherinfo/${teacher.id}`
      })
    },
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
    getRecommentCourse() {
      getRecommendCourser({
        organid: 1,
        limit: 4
      }).then( res => {
        if (res.code == 0) {
          this.recommentCourseList = res.data
        }
      })
    },
    getTeacher() {
      getRecommendTeacher({
        organid: this.id,
        limit: 10
      }).then( res=> {
        // this.
        // console.log(res, 'res')
      })
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
