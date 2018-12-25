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
      <span class="week active border-bottom-1px">周一</span>
      <span class="week">周二</span>
      <span class="week">周三</span>
      <span class="week">周四</span>
      <span class="week">周五</span>
      <span class="week">周六</span>
      <span class="week">周七</span>
    </div>
    <div class="reservation-box-wrapper">
      <div class="reservation-box">
        <div class="title">上午预约</div>
        <div class="reservation-times">
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time active">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
        </div>
      </div>
      <div class="reservation-box">
        <div class="title">下午预约</div>
        <div class="reservation-times">
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time active">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
        </div>
      </div>
      <div class="reservation-box">
        <div class="title">晚上预约</div>
        <div class="reservation-times">
          <div class="time">08:00</div>
          <div class="time">08:00</div>
          <div class="time active">08:00</div>
          <div class="time">08:00</div>
          <div class="time">08:00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationEdit from '^/images/reservation-edit.png';

export default {
  data() {
    return {
      ReservationEdit: ReservationEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.teadcher-info{
  padding: 16px; 
  text-align: left;
  font-size: 16px;
  color: #4B505A;
  border-bottom: 10px solid  #F5F6FA;
  img{
    width: 44px;
    height: 44px;
    margin-right: 10px;
    border-radius: 22px;
  }
}
.weeks{
  display: flex;
  height: 42px;
  line-height: 42px;
  .week{
    flex: 1;
    font-size: 14px;
    color: #61636F;
    &.active.border-bottom-1px{
      color: #04BD8A;
      border-bottom: 1px solid #04BD8A;
      border: none;
    }
  }
}
.reservation-box-wrapper{
  padding-top: 20px;
}
.reservation-box{
  text-align: left;
  margin-bottom: 10px;
  .title{
    position: relative;
    padding-left: 10px;
    line-height: 14px;
    margin-bottom: 16px;
    &::before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: #04BD8A;
    }
  }
  .reservation-times{
    padding: 8px;
    .time{
      display: inline-block;
      width: 20%;
      padding: 10px 0;
      margin: 0 3% 10px 0;
      font-size: 14px;
      color: #71747F;
      text-align: center;
      border-radius: 2px;
      border: 1px solid #E3DFDF;
      &.active{
        background: #0BCC96;
        color: #ffffff;
      }
    }
  }
  
}
</style>
