<template>
  <div>
    <div class="top-bar-action">
      <div class="img-wrapper"><img :src="ReservationEdit" alt="编辑" @click="UpdateTime"></div>
    </div>
    <div class="teadcher-info border-top-1px expand">
      <img src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4" class="avatar">
      <span class="teacher-name">王大锤</span>
    </div>
    <div class="weeks border-bottom-1px expand" v-if="TimeData.length">
      <span v-for="(item, index) in TimeData" :key="item.week" @click="changeTab(index)" :class="['week',activeWeekIndex == index + 1 ? ( 'active border-bottom-1px') :'']">{{weeks[Number(item.week) - 1].value}}</span>
    </div>
    <div class="reservation-box-wrapper">
      <div class="reservation-box" v-for="(item, index) in TimeGroup" :key="index">
        <div class="title">{{TimeNames[index]}}预约</div>
        <div class="reservation-times">
          <div class="box" v-for="(sub_item) in item" :key="sub_item.timekey" @click="toSelect(sub_item)">
            <!-- status 1代表该时间不可用,需要禁用0代表可选  选中 selectedNum   不能选 grayBg -->
            <div class="time" :class="[sub_item.status && 'grayBg', sub_item.select && 'selectedNum']">{{sub_item.time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationEdit from '^/images/reservation-edit.png';
import { getAppTeacherFreeTime, batchAddReserveLessons } from '@/api'


export default {
  data() {
    return {
      ReservationEdit: ReservationEdit,
      activeWeekIndex: 1,
      weeks: [
        { key: 1, value: '周一' },
        { key: 2, value: '周二' },
        { key: 3, value: '周三' },
        { key: 4, value: '周四' },
        { key: 5, value: '周五' },
        { key: 6, value: '周六' },
        { key: 7, value: '周日' },
      ],
      TimeNames: ['上午', '中午', '下午'],
      TimeData: [],
      SelectTime: {}
    }
  },
  created() {
    this.courseid = this.$route.params.id
    this.getAppTeacherFreeTime();
  },
  computed: {
    TimeGroup() {
      if (!this.TimeData.length) return null
      this.TimeData[this.activeWeekIndex-1].datelist.forEach( item => {
        item.forEach( sub_item => {
          let CurrentDate = this.CurrentDate
          let index = this.SelectTime[CurrentDate].findIndex( el => {
            return el.timekey == sub_item.timekey
          })
          this.$set(sub_item, 'select', index > -1)
        })
      });
      return this.TimeData[this.activeWeekIndex-1].datelist
    },
    CurrentDate() {
      if (!this.TimeData.length) return null
      return this.TimeData[this.activeWeekIndex-1].date
    }
  },
  methods: {
    UpdateTime() {
      let keys = Object.keys(this.SelectTime)
      let params = []
      keys.forEach( key => {
        if (!this.SelectTime[key].length) {
          delete this.SelectTime[key]
        } else {
          this.SelectTime[key].forEach(  time => {
            let param = {}
            param.intime = key
            param.timekey = time.timekey
            params.push(param)
          })
        }
      })
      batchAddReserveLessons({
        data: params,
        courseid: this.courseid
      }).then( res => {
        console.log(res, 'res')
      })
    },
    changeTab(index) {
      this.activeWeekIndex = index + 1
    },
    getAppTeacherFreeTime() {
      getAppTeacherFreeTime({ 'courseid': this.courseid }).then(res => {
        this.TimeData = res.data;
        this.inintSeleKeys()
      })
    },
    inintSeleKeys() {
      this.TimeData.forEach( item => {
        this.SelectTime[item.date] = []
      })
    },
    toSelect(item) {
      if (item.status == 1) return
      item.select = !item.select
      let CurrentDate = this.CurrentDate
      let index = this.SelectTime[CurrentDate].findIndex( el => {
        return el.timekey == item.timekey
      })
      index > -1 ? this.SelectTime[CurrentDate].splice(index, 1) : this.SelectTime[CurrentDate].push(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.teadcher-info {
  padding: 16px;
  text-align: left;
  font-size: 16px;
  color: #4b505a;
  border-bottom: 10px solid #f5f6fa;
  img {
    width: 44px;
    height: 44px;
    margin-right: 10px;
    border-radius: 22px;
  }
}
.weeks {
  display: flex;
  height: 42px;
  line-height: 42px;
  .week {
    flex: 1;
    font-size: 14px;
    color: #61636f;
    &.active.border-bottom-1px {
      color: #04bd8a;
      border-bottom: 1px solid #04bd8a;
      // border: none;
    }
  }
}
.reservation-box-wrapper {
  padding-top: 20px;
  .reservation-box {
    text-align: left;
    margin-bottom: 10px;
    .title {
      position: relative;
      padding-left: 10px;
      line-height: 14px;
      margin-bottom: 16px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background: #04bd8a;
      }
    }
    .reservation-times {
      padding: 8px;
      overflow: hidden;
      .box {
        width: 25%;
        float: left;
        display: flex;
      }
      .time {
        width: 100%;
        padding: 10px 0;
        margin: 5px 5% 5px;
        font-size: 14px;
        color: #71747f;
        text-align: center;
        border-radius: 2px;
        border: 1px solid #e3dfdf;
        box-sizing: border-box;
        &.selectedNum {
          background: #0bcc96;
          border: 1px solid #0bcc96;
          color: #ffffff;
        }
        &.grayBg {
          background-color: buttonface;
        }
      }
    }
  }
}
.sure-btn {
  margin-top: 30px;
}
</style>
