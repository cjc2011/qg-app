<template>
  <div class="order expand border-top-1px" v-if="orderInfo">
    <div class="order-info" >
      <div class="order-code">订单编号：{{orderInfo.ordernum}}</div>
      <div class="order-status cancel" :class="orderstatusClass">{{orderstatusText}}</div>
    </div>
    <div class="course">
      <div class="course-image">
        <img :src="orderInfo.imageurl || defaultImage">
      </div>
      <div class="course-content" >
        <div class="course-name">{{orderInfo.coursename}}</div>
        <div class="course-teacher" v-if="orderInfo.teachername">老师：{{orderInfo.teachername}}</div>
        <div class="course-teacher" v-else>班型：录播</div>
      </div>
    </div>
    <div class="order-time">
      <img :src="Time" >
      <span class="text">下单时间：{{orderInfo.ordertime}}</span>
    </div>
    <div class="order-price-wrapper expand border-top-split" v-if="orderInfo">
      <div class="order-price ">
        <div class="text">订单金额</div>
        <div class="price">¥{{orderInfo.amount}}</div>
      </div>
    </div>
    <div class="pay-action-bar border-top-1px" v-if="orderInfo">
      <div class="preice">
        <span>应付金额</span> 
        ¥19999</div>
      <div class="pay-btn">立即支付</div>
    </div> 
  </div>
</template>

<script>
import defaultImage from '^/images/defaultImage.png'
import Time from '^/images/time.png'
import { queryOrderInfo } from '@/api'

export default {
  data() {
    return {
      defaultImage: defaultImage,
      Time: Time,
      orderInfo: null
    }
  },
  created() {
    this.orderid = this.$route.params.id 
    queryOrderInfo({
      ordernum: this.orderid
    }).then( res => {
      if (res.code == 0) {
        this.orderInfo = res.data
      }     
    })
  },
  computed: {
    orderstatusClass() {
      let color = ''
      switch(this.orderInfo.orderstatus) {
        case 20:
          color = 'payed'
          break;
        case 10:
          color = 'cancel'
          break;
        case 0: 
          color = 'wait'  
      }
      return color
    },
    orderstatusText() {
      let text = ''
      switch(this.orderInfo.orderstatus) {
        case 0: 
          text = '待支付'
          break;
        case 1:
          text = '待确认'
          break;  
        case 20:
          text = '已支付'
          break;
        case 10:
          text = '已取消'
          break;
      }
      return text 
    }
  }
}
</script>


<style lang="scss" scoped>
.order{
  padding-top: 20px;
  &-info{
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    margin-bottom: 20px;
    font-size: 15px;
    color: #3C3C41;
  }
  &-status {
    font-size: 15px;
    color: #3C3C41;
    &.cancel{
      color: #999;
    }
    &.payed{
      color: #04BD8A;
    }
    &.wait{
      color: #F31919;
    }
  }
  &-time{
    padding: 0 16px;
    margin: 20px 0;
    text-align: left;
    font-size: 13px;
    color: #999999;
    img{
      width: 13px;
      margin-right: 4px;
    }
  }
  &-price{
    display: flex;
    justify-content: space-between;
    color: #6E6F80;
    font-size: 14px;
    margin-top: 20px;
  }
}
.course{
  padding: 16px;
  display: flex;
  background: rgba(255,255,255,1);
  box-shadow: 0px 0px 9px 0px rgba(205,205,217,0.5);
  border-radius:4px;
  &-image{
    width: 98px;
    height: 74px;
    margin-right: 14px;
    border-radius: 4px;
    overflow: hidden;
    img{
      height: 100%;
    }
  }
  &-content{
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &-name{
    margin-bottom: 10px;
    font-size: 15px;
    color: #4B505A;
  }
  &-teacher{
    font-size: 13px;
    color: #6E6F80;
  }
}
.pay-action-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #ffffff;
  .preice{
    color: #00CEAD;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
    span {
      color: #999;
      font-size: 12px;
    }
  }
  .pay-btn{
    height: 34px;
    width: 80px;
    line-height: 34px;
    font-size: 15px;
    color: #ffffff;
    background: linear-gradient(90deg,rgba(39,249,180,1),rgba(11,204,150,1));
    box-shadow: 0px 8px 13px 0px rgba(8,175,128,0.2);
    border-radius: 4px;
  }
}
</style>
