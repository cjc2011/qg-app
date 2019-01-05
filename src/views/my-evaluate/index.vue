<template>
  <div>
    <div class="teacher-score">
      <p>课程评分</p>
      <div class="rate-wrapper">
        <cube-rate v-model="score" :justify="true"></cube-rate>
      </div>
    </div>
    <div class="teacher-evaluate">
      <p>评价</p>
      <div class="textarea-wrapper">
        <cube-textarea v-model="evaluate" :maxlength=100></cube-textarea>
      </div>
    </div>
    <div class="submit-btn" @click="post">提交</div>
  </div>
</template>

<script>
import EvaluateItem from "%/evaluate-item/index.vue";
import { gotoComment } from "@/api";
import { toast } from '../../cube-ui';

export default {
  data() {
    return {
      score: 0,
      evaluate: '',
      courseInfo: null,
      commentData: []
    };
  },
  components: {
    EvaluateItem
  },
  created() {
    this.toteachid = this.$route.params.id 
  },
  methods: {
    selectScore(index) {
      this.score = index;
    },
    post() {
      if (!this.score) {
        return toast('请为课程评分')
      }
      if (!this.evaluate) {
        return toast('请输入评论')
      }
      gotoComment({
        content: this.evaluate,
        score: this.score,
        toteachid: this.toteachid
      }).then( res => {
        if(res.code === 0) {
          toast('评论成功').then( () => {
            this.$router.back()
          })
        }
      })
    }
  }
};
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
    text-align: left;
    margin-top: 20px;
    p {
      font-size: 15px;
      color: rgba(60, 60, 65, 1);
    }
  }
  &-evaluate {
    text-align: left;
    margin-top: 40px;
    p { 
      font-size: 15px;
      color: rgba(60, 60, 65, 1);
    }
  }
}
.textarea-wrapper{
  margin: 20px 0;
}
.cube-textarea_active:after {
  border-color: #04BD8A;
}
.rate-wrapper{
  width: 200px;
  margin: 10px auto;
}
.submit-btn{
  color: #ffffff;
  line-height: 40px;
  font-size: 17px;
  background: linear-gradient(90deg,rgba(39,249,180,1),rgba(11,204,150,1));
  box-shadow: 0px 4px 6px 0px rgba(8,175,128,0.2);
  border-radius: 4px;
}
.teacher-summary /deep/ .course-item {
  padding: 0 !important;
  &:before {
    height: 0px;
  }
}
</style>
