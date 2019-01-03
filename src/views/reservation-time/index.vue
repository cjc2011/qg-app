<template>
  <div>
    <div class="top-bar-action">
      <div class="img-wrapper">
        <img  v-show="!EditStatus" :src="ReservationEdit" alt="编辑" @click="EditStatus = true">
        <span v-show="EditStatus" @click="UpdateTime" class="text">保存</span>
      </div>
    </div>
    <div class="teadcher-info border-top-1px expand">
      <img :src="teacher.imageurl || 'https://avatars0.githubusercontent.com/u/17289716?s=180&v=4'" class="avatar">
      <span class="teacher-name">{{teacher.name || '匿名'}}</span>
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
import { getAppTeacherFreeTime, batchAddReserveLessons, getCurriculumInfo, addEdit } from '@/api'
import { toast } from '../../cube-ui'

export default {
  data() {
    return {
      EditStatus: false,
      ReservationEdit: ReservationEdit,
      activeWeekIndex: 1,
      weeks: [
        { key: 1, value: '周一' },
        { key: 2, value: '周二' },
        { key: 3, value: '周三' },
        { key: 4, value: '周四' },
        { key: 5, value: '周五' },
        { key: 6, value: '周六' },
        { key: 7, value: '周日' }
      ],
      TimeNames: ['上午', '中午', '下午'],
      TimeData: [],
      SelectTime: {},
      teacher: {},
      type: 'add'                         //add || update 约课或者是修改
    }
  },
  created() {
    this.courseid = this.$route.params.id
    this.type = this.$route.query.select_time ? 'update' : 'add'
    this.getCourseInfo()
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
      console.log('UpdateTime')
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
      // 添加约课
      if (this.type == 'add') {
        batchAddReserveLessons({
          data: params,
          courseid: this.courseid
        }).then( res => {
          if (res.code == 0) {
            toast('预约成功').then( () => {
              this.$router.back()
            })
          } else {
            toast(`${res.info}`)
          }
        })
      } else {
        let lessionId = this.$route.query.toteachid
        let time = params[0]
        addEdit({
          intime: time.intime,
          timekey: time.timekey,
          toteachid: lessionId,
          courseid: this.courseid
        }).then( res=> {
          if (res.code == 0) {
            toast('修改成功').then( () => {
              this.$router.back()
            })
          }
        })
      }
    },
    changeTab(index) {
      this.activeWeekIndex = index + 1
    },
    getAppTeacherFreeTime() {
      getAppTeacherFreeTime({ 'courseid': this.courseid }).then(res => {
        this.TimeData = res.data;
        this.inintSeleKeys()
        // 修改预约时间 设置默认选中
        if (this.type == 'update') {
          this.setSelect()
        }
      })
    },
    inintSeleKeys() {
      this.TimeData.forEach( item => {
        this.SelectTime[item.date] = []
      })
    },
    setSelect() {
      let time  = this.$route.query.select_time.split(' ');
      let key = time[0]
      let val = time[1].slice(0, 5)
      this.TimeData.forEach( item => {
        item.datelist.forEach( list => {
          list.forEach( time_item => {
            if (time_item.time == val && item.date == key) {
              time_item.status = 0
              this.SelectTime[key] = [time_item]
            }
          })
        })
      })
    },
    getCourseInfo() {
      getCurriculumInfo({
        courseid: this.courseid
      }).then( res => {
        if (res.code == 0) {
          this.teacher.imageurl = res.data.teacher_imageurl
          this.teacher.name = res.data.teachername
        } else {
          toast(`${res.info}`)
        }
      })
    },  
    clearSelect() {
      this.TimeData.forEach( item => {
        item.datelist.forEach( list => {
          list.forEach( time_item => {
            time_item.select = false
          })
        })
      })
    },
    toSelect(item) {
      if (item.status == 1 || !this.EditStatus) return
      let CurrentDate = this.CurrentDate
      if (this.type == 'add') {
        item.select = !item.select
        let index = this.SelectTime[CurrentDate].findIndex( el => {
          return el.timekey == item.timekey
        })
        index > -1 ? this.SelectTime[CurrentDate].splice(index, 1) : this.SelectTime[CurrentDate].push(item)
      } else {
        this.clearSelect()
        for (var key in this.SelectTime) {
          this.SelectTime[key] = []
        }
        item.select = !item.select
        this.SelectTime[CurrentDate] = [item]
      }
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
