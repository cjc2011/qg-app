<template>
  <div>
    <div class="course-list-wrapper" ref="wrapper" v-show="courseData.length">
      <div class="list-container">
        <div class="list-content" v-if="courseData">
          <course-item
            type="reservation"
            @click="courseClick(item)"
            :data="item"
            courseorigin="organ"
            v-for="(item,index) in courseData"
            :key="index"
          ></course-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseItem from "%/course-item/index.vue";
import { getAppReserveList } from "@/api";
export default {
  data() {
    return {
      courseData: []
    };
  },
  components: {
    CourseItem
  },
  created() {
    this.getAppReserveList();
  },
  methods: {
    courseClick(item) {
      this.$router.push({
        path: "/reservationdetail/" + item.curriculumid
      });
    },
    getAppReserveList() {
      getAppReserveList().then(res => {
        if (res.code === 0) {
          this.courseData = res.data;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.course-list-wrapper /deep/ .course {
  &-item {
    &__content {
      justify-content: space-around;
    }
  }
}
</style>
