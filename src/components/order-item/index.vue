<template>
  <div class="order">
    <div class="order-title border-bottom-1px">订单编号：{{order.ordernum}}</div>
    <div class="order-body" @click="click">
      <div class="order-image">
        <img :src="order.imageurl || 'http://51menke-1253417915.cosgz.myqcloud.com/logo/official/201810241821486996.jpg'" >
      </div>
      <div class="order-content">
        <div class="order-name">{{order.coursename}}</div>
        <div class="order-teacher" v-if="orderOrigin == 'organ'">老师：{{order.teachername || '匿名老师'}}</div>
        <div class="order-teacher" v-else>班型：录播</div>
        <div class="order-footer">
          <div class="order-price">总价：{{order.amount}}</div>
          <div class="order-status" :class="orderstatusClass">{{orderstatusText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      default: () => {
        return {}
      }
    },
    orderOrigin: {
      type: String,
      default: 'official'
    }
  }, 
  methods: {
    click() {
      this.$router.push(`/orderinfo/${this.order.orderid}`)
    }
  },
  computed: {
    /**
     * orderstatus
     * 
     * 机构 => 0:待支付  1:待确认
     * 官方 => 10:已取消 20:已支付
     */
     orderstatusClass() {
      let color = ''
      switch(this.order.orderstatus) {
        case 20:
          color = 'payed'
          break;
        case 10:
          color = 'cancel'
          break;
      }
      return color
    },
    orderstatusText() {
      let text = ''
      switch(this.order.orderstatus) {
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
  padding: 0 16px;
  text-align: left;
  border-top: 10px solid #F5F6FA;
  &-title{
    line-height: 37px;
    font-size: 13px;
    color: #474A51;
  }
  &-body{
    display: flex;
    align-items: center;
    padding: 15px 0;
  }
  &-image{
    width: 108px;
    height: 72px;
    margin-right: 15px;
    border-radius: 4px;
    overflow: hidden;
    img{
      max-width: 100%;
      height: 100%;
    }
  }
  &-content{
    flex: 1;
    display: flex;
    height: 72px;
    flex-direction: column;
    justify-content: space-between;
  }
  &-name{
    color: #4B505A;
  }
  &-teacher{
    color: #999999;
    font-size: 12px;
  }
  &-price,
  &-status{
    display: inline-block;
  }
  &-price{
    color: #04BD8A;
  }
  &-status{
    float: right;
    font-size: 13px;
    &.cancel{
      color: #999999;
    }
    &.payed{
      color: #04BD8A;
    }
    &.wait{
      color: #F31919;
    }
  }
}
// 待支付 color #F31919
// 已取消 color #999999
// 已支付 colr #04BD8A
</style>
