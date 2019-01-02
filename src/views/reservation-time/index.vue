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
      <span v-for="item in weeks" :key="item.key" @click="changeTab(item.key)" :class="['week',activeWeekIndex == item.key ? ( 'active border-bottom-1px') :'']">{{item.value}}</span>
    </div>
    <div class="reservation-box-wrapper">
      <div class="reservation-box">
        <div class="title">上午预约</div>
        <div class="reservation-times">
          <div class="box" v-for="(item,index) in timeNum0" :key="index" @click="toSelect(item)">
            <!-- status 1代表该时间不可用,需要禁用0代表可选  选中 selectedNum   不能选 grayBg -->
            <div v-if="item.status" class="time grayBg">{{item.time}}</div>
            <div v-else :class="['time',item.active?'selectedNum':'']">{{item.time}}</div>
          </div>
        </div>
      </div>
      <div class="reservation-box">
        <div class="title">下午预约</div>
        <div class="reservation-times">
          <div class="box" v-for="(item,index) in timeNum1" :key="index" @click="toSelect(item)">
            <div v-if="item.status" class="time grayBg">{{item.time}}</div>
            <div v-else :class="['time',item.active?'selectedNum':'']">{{item.time}}</div>
          </div>
        </div>
      </div>
      <div class="reservation-box">
        <div class="title">晚上预约</div>
        <div class="reservation-times">
          <div class="box" v-for="(item,index) in timeNum2" :key="index" @click="toSelect(item)">
            <div v-if="item.status" class="time grayBg">{{item.time}}</div>
            <div v-else :class="['time',item.active?'selectedNum':'']">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
    <cube-button class="sure-btn" @click="commit">同步所选时间</cube-button>
    <cube-popup type="my-popup" :position="position" :mask-closable="true" ref="popup">
      <div class="checkboxs">
        <cube-checkbox-group v-model="checkList" :options="options" />
      </div>
    </cube-popup>
  </div>
</template>

<script>
import ReservationEdit from '^/images/reservation-edit.png';
import { getAppTeacherFreeTime } from '@/api'
export default {
  data() {
    return {
      ReservationEdit: ReservationEdit,
      activeWeekIndex: 1,
      position: 'bottom',
      checkList: [1,4],
      options: [
        {
          label: '1',
          value: '1'
        },
        {
          label: '2',
          value: '2'
        },
        {
          label: '3',
          value: '3'
        },
        {
          label: '4',
          value: '4'
        }
      ],
      weeks: [
        { key: 1, value: '周一' },
        { key: 2, value: '周二' },
        { key: 3, value: '周三' },
        { key: 4, value: '周四' },
        { key: 5, value: '周五' },
        { key: 6, value: '周六' },
        { key: 7, value: '周日' },
      ],
      grayArr: [],//占用的星期数组
      timeNum0: [
        // { time: "08:00", active: false, grayBlock: false, key: 16 }, { time: "08:30", active: false, grayBlock: false, key: 17 },
        // { time: "09:00", active: false, grayBlock: false, key: 18 }, { time: "09:30", active: false, grayBlock: false, key: 19 },
        // { time: "10:00", active: false, grayBlock: false, key: 20 }, { time: "10:30", active: false, grayBlock: false, key: 21 },
        // { time: "11:00", active: false, grayBlock: false, key: 22 }, { time: "11:30", active: false, grayBlock: false, key: 23 },
        // { time: "12:00", active: false, grayBlock: false, key: 24 }, { time: "12:30", active: false, grayBlock: false, key: 25 },
      ],
      timeNum1: [
        // { time: "13:00", active: false, grayBlock: false, key: 26 }, { time: "13:30", active: false, grayBlock: false, key: 27 },
        // { time: "14:00", active: false, grayBlock: false, key: 28 }, { time: "14:30", active: false, grayBlock: false, key: 29 },
        // { time: "15:00", active: false, grayBlock: false, key: 30 }, { time: "15:30", active: false, grayBlock: false, key: 31 },
        // { time: "16:00", active: false, grayBlock: false, key: 32 }, { time: "16:30", active: false, grayBlock: false, key: 33 },
        // { time: "17:00", active: false, grayBlock: false, key: 34 }, { time: "17:30", active: false, grayBlock: false, key: 35 },
      ],
      timeNum2: [
        // { time: "18:00", active: false, grayBlock: false, key: 36 }, { time: "18:30", active: false, grayBlock: false, key: 37 },
        // { time: "19:00", active: false, grayBlock: false, key: 38 }, { time: "19:30", active: false, grayBlock: false, key: 39 },
        // { time: "20:00", active: false, grayBlock: false, key: 40 }, { time: "20:30", active: false, grayBlock: false, key: 41 },
        // { time: "21:00", active: false, grayBlock: false, key: 42 }, { time: "21:30", active: false, grayBlock: false, key: 43 },
        // { time: "22:00", active: false, grayBlock: false, key: 44 }, { time: "22:30", active: false, grayBlock: false, key: 45 },
        // { time: "23:00", active: false, grayBlock: false, key: 46 }, { time: "23:30", active: false, grayBlock: false, key: 47 }
      ],
    }
  },
  created() {
    this.getAppTeacherFreeTime();
    
  },
  mounted() {
    this.popup = this.$refs[`popup`]
    this.popup.show() 
  },
  methods: {
    changeTab(key) {
      // 给timeNum初始化占用状态
      let obj = {}
      this.grayArr.map(e => {
        if (e.week == key) {
          obj = e
        }
      })
      this.defaultGrayType(obj);
    },
    getAppTeacherFreeTime() {
      getAppTeacherFreeTime({ 'courseid': 172 }).then(res => {
        // 占用的星期数组
        this.grayArr = res.data;
        // 给timeNum初始化占用状态
        this.defaultGrayType(res.data[0])
      })
    },
    defaultGrayType(info) {
      // 周几
      this.activeWeekIndex = info.week
      // 上午预约
      this.timeNum0 = info.datelist[0]
      this.timeNum0.map(e => {
        this.$set(e, 'active', false)
      })
      // 下午预约
      this.timeNum1 = info.datelist[1]
      this.timeNum1.map(e => {
        this.$set(e, 'active', false)
      })
      // 晚上预约
      this.timeNum2 = info.datelist[2]
      this.timeNum2.map(e => {
        this.$set(e, 'active', false)
      })
    },
    toSelect(item) {
      item.active = !item.active
    },
    commit() {

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
