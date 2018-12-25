<template>
  <div class="course-container" :class="border">
    <div class="course-item row" v-for="item in [1,23,9,4,5]" :key="item">
      <div class="course-item__body">
        <div class="course-item__cover">
          <img src="http://51menke-1253417915.cosgz.myqcloud.com/logo/official/201811021643337705.jpg" alt="课程图片">
        </div>
        <span class="course-item__type">录播</span>
      </div>
      <div class="course-item__name">小学四年级数学小学学</div>
      <div class="course-item__price">2000.00</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: String,
      default: 'bottom'
    }
  }
}

</script>


<style lang="scss" scoped>
@import '^/style/course-list.scss'

</style>
