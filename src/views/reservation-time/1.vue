<template>
  <div>
    <div class="top-bar-action">
      <div class="img-wrapper"><img :src="ReservationEdit" alt="编辑"></div>
    </div>
    <div class="teadcher-info border-top-1px expand">
      <img src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4" class="avatar">
      <span class="teacher-name">王大锤</span>
    </div>
    <div class="weeks border-bottom-1px expand">
      <span v-for="(item,index) in weeks" :key="index" @click="changeTab(index)" :class="['week',activeWeekIndex == index+1 ? ( 'active border-bottom-1px') :'']">{{item}}</span>
    </div>
    <div class="reservation-box">
      <div class="title">上午预约</div>
      <div class="reservation-times">
        <div :key="index" v-for="(item,index) of timeNum">
          <div class="box">
            <!-- 选中 selectedNum    默认 time     不能选 grayBg -->
            <div v-if="item.grayBlock" class="time grayBg">{{item.time}}</div>
            <div v-else :class="['time',item.active?'selectedNum':'']">{{item.time}}</div>
          </div>
          <div class="title title1" v-if="item.time=='12:30'">下午预约</div>
          <div class="title title1" v-if="item.time=='17:30'">晚上预约</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ReservationEdit from '^/images/reservation-edit.png';
import { getAppTeacherFreeTime } from '@/api'

export default {
  data() {
    return {
      ReservationEdit: ReservationEdit,
      grayArr: [],  //占用的星期数组
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      activeWeekIndex: 1,
      timeNum: [
        { time: "08:00", active: false, grayBlock: false, key: 16 }, { time: "08:30", active: false, grayBlock: false, key: 17 },
        { time: "09:00", active: false, grayBlock: false, key: 18 }, { time: "09:30", active: false, grayBlock: false, key: 19 },
        { time: "10:00", active: false, grayBlock: false, key: 20 }, { time: "10:30", active: false, grayBlock: false, key: 21 },
        { time: "11:00", active: false, grayBlock: false, key: 22 }, { time: "11:30", active: false, grayBlock: false, key: 23 },
        { time: "12:00", active: false, grayBlock: false, key: 24 }, { time: "12:30", active: false, grayBlock: false, key: 25 },
        { time: "13:00", active: false, grayBlock: false, key: 26 }, { time: "13:30", active: false, grayBlock: false, key: 27 },
        { time: "14:00", active: false, grayBlock: false, key: 28 }, { time: "14:30", active: false, grayBlock: false, key: 29 },
        { time: "15:00", active: false, grayBlock: false, key: 30 }, { time: "15:30", active: false, grayBlock: false, key: 31 },
        { time: "16:00", active: false, grayBlock: false, key: 32 }, { time: "16:30", active: false, grayBlock: false, key: 33 },
        { time: "17:00", active: false, grayBlock: false, key: 34 }, { time: "17:30", active: false, grayBlock: false, key: 35 },
        { time: "18:00", active: false, grayBlock: false, key: 36 }, { time: "18:30", active: false, grayBlock: false, key: 37 },
        { time: "19:00", active: false, grayBlock: false, key: 38 }, { time: "19:30", active: false, grayBlock: false, key: 39 },
        { time: "20:00", active: false, grayBlock: false, key: 40 }, { time: "20:30", active: false, grayBlock: false, key: 41 },
        { time: "21:00", active: false, grayBlock: false, key: 42 }, { time: "21:30", active: false, grayBlock: false, key: 43 },
        { time: "22:00", active: false, grayBlock: false, key: 44 }, { time: "22:30", active: false, grayBlock: false, key: 45 },
        { time: "23:00", active: false, grayBlock: false, key: 46 }, { time: "23:30", active: false, grayBlock: false, key: 47 }
      ],
    }
  },
  created() {
    this.getAppTeacherFreeTime();
  },
  methods: {
    changeTab(index) {
      this.activeWeekIndex = index
    },
    getAppTeacherFreeTime() {
      getAppTeacherFreeTime({ 'courseid': 172 }).then(res => {
        // console.log(res.data, res.data[0])
        // 占用的星期数组
        this.grayArr = res.data;
        // 给timeNum初始化占用状态
        this.defaultGrayType(res.data[0])
      })
    },
    // 给timeNum初始化占用状态
    defaultGrayType(info) {
      // 初始化num占用状态转为false
      // this.falseTimeNumGray();
      console.log(info)
      this.activeWeekIndex = info.week
      if (info.datelist.length != 0) {
       info.datelist.map(item=>{
         console.log(2222,item)
         for (let i of item) {
           console.log(i)
         }
       })
      //   let obj = info.split(',');
      //   for (let item of obj) {
      //     for (let info of this.timeNum) {
      //       // 筛选时间点初始化占用
      //       if (info.key == item) {
      //         info.grayBlock = true
      //       }
      //     }
      //   }
      }
    },
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
.reservation-box {
  text-align: left;
  margin-bottom: 10px;
  padding-top: 20px;
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
  .title1 {
    clear: both;
    margin-bottom: 36px;
    position: relative;
    top: 20px;
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
        color: #ffffff;
      }
      &.grayBg {
        background-color: buttonface;
      }
    }
  }
}
</style>
