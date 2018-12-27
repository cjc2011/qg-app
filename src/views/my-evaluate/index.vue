<template>
    <div>
        <div class="teacher-summary">
            <CourseItem></CourseItem>
        </div>

        <div class="teacher-score">
            <p>课程评分</p>
            <Score></Score>
        </div>
    </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'
import Score from '%/score/index.vue'
export default {
    name: '',

    data() {
        return {
        }
    },
    components: {
        CourseItem,
        Score
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
.teacher {
  &-summary {
    padding: 16px;
    text-align: left;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 18px 0px rgba(205, 205, 217, 0.5);
    border-radius: 8px;
  }
  &-score {
    margin-top: 20px;
    p {
      text-align: left;
      font-size: 15px;
      font-family: PingFangSC-Light;
      color: rgba(60, 60, 65, 1);
    }
  }
}
.teacher-summary /deep/ .course-item {
  padding: 0 !important;
  &:before {
    height: 0px;
  }
}
</style>
