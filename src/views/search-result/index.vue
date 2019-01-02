<template>
  <div class="search-result border-top-1px">
    <div class="border-top-split "></div>
    <div class="result-container">
      <cube-scroll
        v-if="courseData.length"
        :options="options"
        :data="courseData"
        @pulling-up="onPullingUp"
        ref="scroll">
        <div class="course-container expand">
          <CourseItem  :data="item"  v-for="item in courseData" @click="courseInfo" :key="item.id"/>
        </div>
      </cube-scroll>
      
      <div v-if="!courseData.length" class="no-data"></div>
    </div>
  </div>
</template>

<script>
import CourseItem from '%/course-item'
import { searchCourseByCname } from '@/api'

export default {
  data() {
    return {
      params: {
        organid: '',
        search: '',
        pagenum: 1,
        noMore: false
      },
      courseData: [],
      options: {
        pullUpLoad: {
          txt: {
            noMore: '没有更多的课程' 
          }
        }
      }
    }
  },
  created() {
    this.params.organid = this.$route.query.organid
    this.courseorigin = this.params.organid == 1 ? 'official' : 'organ'
    this.params.search = this.$route.query.search_key
    this.searchCourse()
  },
  methods: {
    courseInfo(data) {
      this.$router.push(`/courseinfo/${data.curriculumid}`)
    },
    onPullingUp() {
      if (this.noMore) {
        this.$refs.scroll.forceUpdate()
        return
      } 
      this.params.pagenum++
      this.searchCourse()
    },
    searchCourse() {
      searchCourseByCname(this.params).then( res => {
        if (res.code == 0) {
          let data = res.data.data
          if (this.params.pagenum == 1) {
            this.courseData = data
          } else {
            this.courseData = this.courseData.concat(data)
          }
          let len = this.courseData.length 
          this.noMore = len >= res.data.pageinfo.total ? true : false
          this.$refs.scroll && this.$refs.scroll.forceUpdate()
        }
      })
    }
  },
  components: {
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.search-result,
.result-container{
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
.result-container{
  top: 60px;
}
.course-container{
  padding: 0 16px;
}
</style>
