<template>
  <div class="home">
    <home-bar></home-bar>
    <div class="banner-wrapper">
      <cube-slide :data="items" />
    </div>
    <div class="course-box">
      <div class="course-box__title">
        <div class="course-box__name">智慧琴童</div>
        <div class="course-box__more">更多</div>
      </div>
      <Grid />
    </div>
    <div class="course-box">
      <div class="course-box__title">
        <div class="course-box__name">钢琴培训</div>
        <div class="course-box__more">更多</div>
      </div>
      <CourseItem />
    </div>
  </div>
</template>

<script>
import HomeBar from "%/home-bar"
import Grid from '%/grid'
import CourseItem from '%/course-item'
import { getRecommendCourser } from '@/api'

export default {
  data() {
    return {
      title: '智慧琴童',
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: 'http://51menke-1253417915.cosgz.myqcloud.com/headimg/teacher/201808142209252982.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: 'http://51menke-1253417915.cosgz.myqcloud.com/headimg/teacher/201808142209252982.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: 'http://51menke-1253417915.cosgz.myqcloud.com/headimg/teacher/201808142209252982.png'
        }
      ]
    }
  },
  created() {
    getRecommendCourser({
      organid: '74',
      limit: 4
    })
  },
  methods: {
    toast() {
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true
      })
      toast.show()
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
</style>
