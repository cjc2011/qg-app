<template>
  <div>
    <div class="scroll-nav-bar-wrapper">
      <cube-scroll-nav-bar :labels="labels" @change="changeHandler" />
    </div>
    <div class="course-list-wrapper">
      <course-item type="course-show" border="top"></course-item>
    </div>
  </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'

export default {
  data() {
    return {
      labels: ['全部', '学前', '小学', '初中', '高中', '大学', '成人', '飞升']
    }
  },
  methods: {
    changeHandler(cur) { 
      console.log(cur)
    }
  },
  components: {
    CourseItem
  }
}
</script>


<style lang="scss" scoped>

.scroll-nav-bar-wrapper{
  margin: 0 -16px;
  padding: 0 16px;
}
/deep/ .cube-scroll-nav-bar-item_active{
  color: #0BCC96;
}

</style>
