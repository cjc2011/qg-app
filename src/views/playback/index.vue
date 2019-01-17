<template>
  <div>
    <div class="video-wrapper" v-if="playback">
      <video v-if="playback.endtime" :src="playback.mp4url" controls></video>
      <div class="no-data" v-else>
        <img :src="NoDataImage" >
        <p>暂无回放</p>
      </div>
    </div>
    <div class="evaluate-wrapper" v-if="teachercommentlist && hasCommon">
      <div class="evaluate-title">老师点评</div>
      <div class="evaluate-item">
        <div class="evaluate-item__header">
          <div class="evaluate-item__user">
            <cube-rate class="rate" v-model="teachercommentlist.score" disabled :justify="true"></cube-rate>
          </div>
          <div class="evaluate-item__time">
            <img class="evaluate-item__icon" :src="Time">
            <span class="evaluate-item__timetext">{{teachercommentlist.addtime}}</span>
          </div>
        </div>
        <div class="evaluate-item__content">{{teachercommentlist.comment}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAppLivePlayback } from '@/api'
import Time from "^/images/time.png";
import NoDataImage from '^/images/nodata.png'
import EvaluateItem from '%/evaluate-item/index.vue'

export default {
  data() {
    return {
      Time: Time,
      courseInfo: null,
      playback: null,
      NoDataImage: NoDataImage,
      teachercommentlist: null
    }
  },
  created() {
    this.toteachid = this.$route.query.toteachid
    getAppLivePlayback({
      toteachid: this.toteachid
    }).then( res => {
      if (res.code === 0) {
        this.courseInfo = res.data.courselist
        this.playback = res.data.playbacklist 
        this.teachercommentlist = res.data.teachercommentlist
      }
    })
  },
  computed: {
    hasCommon() {
      if (!this.teachercommentlist) {
        return false 
      }
      if (this.teachercommentlist instanceof Array) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.url = this.$route.query.url
  },
  components: {
    EvaluateItem
  }
}
</script>

<style lang="scss" scoped>
video{
  max-width: 100%;
}
.evaluate{
  &-wrapper{
    margin-top: 30px;
    text-align: left;
  }
  &-title{
    font-size: 15px;
  }
}
.rate{
  width: 100px;
}
.evaluate-item {
  padding: 10px 0;
  margin-bottom: 10px;
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__avatar {
    width: 28px;
    height: 28px;
    margin-right: 6px;
    border-radius: 14px;
  }
  &__name {
    font-size: 14px;
    color: #34363c;
  }
  &__icon {
    height: 14px;
    width: 14px;
    margin-right: 6px;
  }
  &__timetext {
    font-size: 12px;
    color: #999999;
  }
  &__content {
    margin-top: 10px;
    font-size: 14px;
    color: #6e6f80;
    padding: 12px;
    background: #f6f6f8;
    border-radius: 2px;
  }
}
</style>
