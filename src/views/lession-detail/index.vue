<template>
  <div>
    <div class="course-info" v-if="courseInfo">
      <div class="course-name">{{courseInfo.coursename}}</div>
      <div class="course-type">
        <img :src="LuboIcon" alt="录播">
        <span class="text"> {{courseInfo.coursetype == 2 ? `老师：${courseInfo.teachername || '匿名'}` : '班型：录播'}}</span>
      </div>
    </div>
    <div class="border-top-split expand"></div>
    <div class="lession-wrapper" v-if="lessionInfo">
      <div class="title">{{type == 'organ' ? lessionInfo.periodnum : lessionInfo.count}}个课时</div>
      <div class="lession-list">
        <div class="lession-item expand border-bottom-1px" v-for="(item, index) in  lessionInfo[type == 'organ' ? 'data' : 'lessonarr']" :key="item.toteachid">
          <div class="lession-left">
            <img :src="LessonIcon" class="lession-icon" />
            <div class="lession-name">课时{{index + 1}}{{type == 'official' && `——${item.periodname}`}}</div>
          </div>
          <img :src="PlayIcon" class="lession-play" @click="getPlayBack(item)" />
        </div>
      </div>
      <div class="no-data" v-if="!nodata">
        <img :src="NoDataImage" >
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import LessonIcon from '^/images/lession.png'
import PlayIcon from '^/images/play.png'
import LuboIcon from '^/images/lubo.png'
import NoDataImage from '^/images/nodata.png'

import { toast } from '../../cube-ui'
import { getAppLiveSchedule, getCurriculumInfo, getAppLivePlayback, getRecordSchedule} from '@/api'

export default {
  data() {
    return {
      NoDataImage: NoDataImage,
      PlayIcon: PlayIcon,
      LessonIcon: LessonIcon,
      LuboIcon: LuboIcon,
      lessionInfo: null,
      courseInfo: null,
      nodata: false
    }
  },
  created() {
    this.courseId = this.$route.params.id
    this.type = this.$route.query.type
    let getLession = this.type == 'official' ? getRecordSchedule : getAppLiveSchedule;
    this.getCourseInfo()
    getLession({
      courseid: this.courseId
    }).then( res => {
      if (res.code == 0) {
        this.lessionInfo = res.data
        this.nodata = this.type == 'official' ? this.lessionInfo['lessonarr'].length : this.lessionInfo['data'].length
      }
    })
  },
  methods: {
    getCourseInfo() {
      getCurriculumInfo({
        courseid: this.courseId
      }).then( res => {
        if (res.code == 0) {
          this.courseInfo = res.data
        }
      })
    },
    // 获取回放
    getPlayBack(item) {
      // 直播回放
      if (item.toteachid) {
        this.$router.push({
          path: '/playback',
          query: {
            toteachid: item.toteachid
          }
        })
        return
        getAppLivePlayback({
          toteachid: item.toteachid
        }).then( res => {
          if (res.code == 0) {
            if (res.data.playbacklist.duration == 0) {
              toast(`暂无回放数据`)
            }
          } else {
            toast(`${res.info}`)
          }
        })
      } else {
      // 录播回放
        this.$router.push({
          path: `/playbackofficial`,
          query: {
            url: item.cosurl
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-info{
  text-align: left;
  margin-bottom: 20px;
  .course-name{
    line-height: 28px;
    padding: 20px 20px 10px;
    font-size: 16px;
    color: #3c3c41;
  }
  .course-type{
    margin-left: 36px;
    img{
      width: 16px;
      margin-right: 4px;
    }
    .text{
      display: inline-block;
      font-size: 13px;
      color: #61636F;
      vertical-align: middle;
    }
  }
}
.lession-wrapper{
  text-align: left;
  padding: 20px 0;
  .title{
    font-size: 16px;
    line-height: 30px;
    color: #3C3C41;
  }
  .lession{
    &-list{
      // margin-left: 20px;
    }
    &-item{
      display: flex;
      padding: 10px 16px 10px 26px;
      align-items: center;
      justify-content: space-between;
    }
    &-left{
      flex: 1;
      font-size: 14px;
      color: #61636F;
    }
    &-icon{
      margin-right: 6px;
      width: 16px;
    }
    &-name{
      display: inline-block;
      vertical-align: middle;
    }
    &-play{
      width: 23px;
    }
  }
}
</style>
