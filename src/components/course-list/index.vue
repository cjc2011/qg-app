<template>
  <div class="course">
    <div class="course-title">
      <span class="course-title__text">{{title}}</span>
      <span class="course-title__more">更多</span>
    </div>
    <Grid /> 
    <div class="course-title">
      <span class="course-title__text">{{title}}</span>
      <span class="course-title__more">更多</span>
    </div>
    <CourseItem type="course-show" />
    <CourseItem type="course-show" />
    <CourseItem type="course-show" />
    <CourseItem type="course-show" />
  </div>
</template>

<script>
import Grid from '../grid'
import CourseItem from '../course-item'

export default {
  name: 'course-list',
  props: {
    title: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'row'
    }
  },
  components: {
    Grid,
    CourseItem
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.course{
  &-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 24px;
    &__text{
      color: #323747;
      font-size: 14px;
    }
    &__more{
      padding-left: 20px;
      color: #0BCC96;
      font-size: 12px;
    }
  }
  
}
</style>
