<template>
  <div class="order">
    <div class="order-title border-bottom-1px">订单编号：123456789</div>
    <div class="order-body">
      <div class="order-image">
        <img src="http://51menke-1253417915.cosgz.myqcloud.com/logo/official/201810241821486996.jpg" >
      </div>
      <div class="order-content">
        <div class="order-name">课程名称</div>
        <div class="order-teacher">老师：teacher</div>
        <div class="order-footer">
          <div class="order-price">总价：222.00</div>
          <div class="order-status">已取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
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
  }
}

</style>
