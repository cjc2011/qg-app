<template>
    <div>
        <div class="teacher-summary">
            <CourseItem :data="courseinfo"></CourseItem>
        </div>
        <div class="teacher-score">
            <p>课程评分</p>
            <Score :score="score" @selectScore="selectScore"></Score>
        </div>
        <div class="teacher-evaluate">
            <p>课程评分</p>
            <cube-textarea v-model="content" placeholder="please edit here..."></cube-textarea>
        </div>
        <cube-button class="sure-btn" @click="gotoComment">提交</cube-button>
    </div>

</template>

<script>
import CourseItem from '%/course-item/index.vue'
import Score from '%/score/index.vue'
import EvaluateItem from '%/evaluate-item/index.vue'
import { mapGetters } from 'vuex'
import { gotoComment } from '@/api'
import { toast } from '../../cube-ui'
export default {
    name: '',

    data() {
        return {
            score: 0,
            commentData: [],
            content: ''
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
    methods: {
        selectScore(index) {
            this.score = index
        },
        gotoComment() {
            gotoComment({
                'toteachid': this.$route.params.id,
                'score': this.score,
                'content': this.content
            }).then(res => {
                if (res.code === 0) {
                    toast(`${res.info}`)
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
      margin-bottom: 20px;
    }
  }
}
.sure-btn {
  margin-top: 30px;
}
/deep/ .cube-textarea-wrapper {
  height: 153px;
}
/deep/ .cube-textarea {
  background: rgba(246, 246, 248, 1);
}
.teacher-summary /deep/ .course-item {
  padding: 0 !important;
  &:before {
    height: 0px;
  }
}
</style>
