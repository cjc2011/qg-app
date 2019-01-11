<template>
  <div>
    <div class="result-img">
      <img :src="result == 'ok' ? successImg :  ErrorImg" alt="支付结果" />
    </div>
    <div class="title">支付结果</div>
    <div v-if="result == 'ok'" class="content">您已经成功支付订单，我们进行核实后，报名成功将以消息推送告知，请注意查收!</div>
    <div v-else class="content">未知异常，请稍后再试</div>
    <div class="home-btn" @click="$router.replace('/')">返回首页</div>
  </div>
</template>


<script>
import successImg from '^/images/successImg.png'
import ErrorImg from '^/images/ErrorImg.png'

export default {
  data() {
    return {
      successImg: successImg,
      ErrorImg: ErrorImg,
      result: this.$route.params.is_ok
    }
  }
}
</script>

<style lang="scss" scoped>
.result-img{
  padding: 40px 10px 20px;
  text-align: center;
  img{
    width: 160px;
  }
}
.title{
  font-size: 17px;
  line-height: 30px;
  color: #3C3C41;
}
.content{
  padding: 10px 30px;
  font-size: 12px;
  color: #6E6F80;
  line-height: 20px;
}
.home-btn{
  margin-top: 30px;
  font-size: 17px;
  color: #ffffff;
  line-height: 46px;
  background: linear-gradient(90deg,rgba(39,249,180,1),rgba(11,204,150,1));
  box-shadow: 0px 4px 6px 0px rgba(8,175,128,0.2);
  border-radius: 4px;
}
</style>
