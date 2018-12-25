<template>
  <div class="course-container" :class="border">
    <div class="course-item column" v-for="item in [1]" :key="item">
        <div class="course-item__cover normal">
          <img src="http://51menke-1253417915.cosgz.myqcloud.com/logo/official/201811021643337705.jpg" alt="课程图片">
        </div>
        <div class="course-item__content">
          <div class="course-item__name normal">小学四年级数学小学学</div>
          <div class="course-item__teacher">老师：王大锤</div>
          <div v-if="type == 'course-show'" class="course-item__price">2000.00</div>
          <div v-if="type == 'curriculum'"  class="course-item__footer">
            <span class="course-item__time">18:00:45-19:45</span>
            <span class="course-item__status wait">进教室</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'course-show'
    }
  },
  data() {
    return {
      
    }
  }
}

</script>

<style lang='scss' scoped>
@import '^/style/course-list.scss';


</style>