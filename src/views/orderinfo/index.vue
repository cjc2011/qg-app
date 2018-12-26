<template>
  <div class="order expand border-top-1px">
    <div class="order-info">
      <div class="order-code">订单编号：12345644423</div>
      <div class="order-status cancel">取消</div>
    </div>
    <div class="course">
      <div class="course-image">
        <img :src="defaultImage" alt="" srcset="">
      </div>
      <div class="course-content">
        <div class="course-name">小学三年级语文习题精讲</div>
        <div class="course-teacher">老师：王大锤</div>
      </div>
    </div>
    <div class="order-time">
      <img :src="Time" >
      <span class="text">下单时间：2018-04-05 18:25:36</span>
    </div>
    <div class="order-price-wrapper expand border-top-split">
      <div class="order-price ">
        <div class="text">订单金额</div>
        <div class="price">¥1239.00</div>
      </div>
    </div>
    <div class="pay-action-bar border-top-1px">
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

export default {
  data() {
    return {
      defaultImage: defaultImage,
      Time: Time
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
    padding: 0 16px;
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
