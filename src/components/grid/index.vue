<template>
  <div class="course-container" :class="border">
    <div
      class="course-item row"
      @click="clickCourse(item)"
      v-for="(item, index) in courseData"
      :key="index"
    >
      <div class="course-item__body">
        <div class="course-item__cover">
          <img
            :src="item.imageurl ||  'http://51menke-1253417915.cosgz.myqcloud.com/logo/official/201811021643337705.jpg'"
            alt="课程图片"
          >
        </div>
        <span class="course-item__type">{{item.coursetype == 1 ? '录播' : '一对一直播'}}</span>
      </div>
      <div class="course-item__name">{{item.coursename}}</div>
      <div class="course-item__price">{{item.totalprice}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: String,
      default: "bottom"
    },
    courseData: {
      type: Array,
      default: []
    }
  },
  methods: {
    clickCourse(item) {
      this.$emit("click", item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "^/style/course-list.scss";
</style>
