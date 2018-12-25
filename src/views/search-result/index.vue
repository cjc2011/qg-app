<template>
  <div class="search-result expand border-top-1px">
    <CourseItem  />
    <CourseItem  />
    <CourseItem  />
    <CourseItem  />
    <CourseItem  />
  </div>
</template>

<script>
import CourseItem from '%/course-item'

export default {
  mounted() {
    console.log(this.$route.params)
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
