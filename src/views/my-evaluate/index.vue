<template>
    <div>
        <div class="teacher-summary">
            <CourseItem :data="courseinfo"></CourseItem>
        </div>

        <div class="teacher-score">
            <p>课程评分</p>
            <Score :score="score"></Score>
            <!-- <Score :score="score" @selectScore="selectScore"></Score> -->
        </div>
        <div class="teacher-evaluate">

            <p>课程评分</p>
            <div v-for="(item,index) in commentData" :key="index">
                <EvaluateItem :data="item"></EvaluateItem>
            </div>

        </div>
    </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'
import Score from '%/score/index.vue'
import EvaluateItem from '%/evaluate-item/index.vue'
import { getTeacherComment } from '@/api'
import { mapGetters } from 'vuex'
export default {
    name: '',

    data() {
        return {
            score: 0,
            commentData: []
        }
    },
    components: {
        CourseItem,
        Score,
        EvaluateItem
    }, 
    computed: {
        ...mapGetters([
            'courseinfo'
        ])
    },
    created() {
        this.getTeacherComment()
    },
    methods: {
        selectScore(index) {
            this.score = index
        },
        getTeacherComment() {
            getTeacherComment({
                'teacherid': this.$route.params.id
            }).then(res => {
                if (res.code === 0) {
                    this.commentData = res.data.data
                    this.score = this.commentData[0].score
                }
            })
        }
    }
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
  &-evaluate {
    margin-top: 40px;
    p {
      text-align: left;
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
