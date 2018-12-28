<template>
  <div class="search-result expand border-top-1px">
    <CourseItem v-if="courseData.length"  :data="item"  v-for="item in courseData" :key="item.id"/>
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
        pagenum: 1
      },
      courseData: []
    }
  },
  created() {
    this.params.organid = this.$route.query.organid
    this.courseorigin = this.params.organid == 1 ? 'official' : 'organ'
    this.params.search = this.$route.query.search_key
    this.searchCourse()
  },
  methods: {
    searchCourse() {
      searchCourseByCname(this.params).then( res => {
        if (res.code == 0) {
          this.courseData = res.data.data
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
.search-result{
  border-top: 10px solid #F5F6FA;
}
</style>
