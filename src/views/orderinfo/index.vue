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
      <div class="course-content">
        <div class="course-name">{{orderInfo.coursename}}</div>
        <div class="course-teacher" v-if="orderInfo.coursetype == 2">老师：{{orderInfo.teachername || '匿名老师'}}</div>
        <div class="course-teacher" v-if="orderInfo.coursetype == 1">班型：录播1</div>
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
    <div class="pay-action-bar border-top-1px" v-if="orderInfo.orderstatus === 0">
      <div class="preice">
        <span>应付金额</span> 
        ¥{{orderInfo.amount}}</div>
      <div class="pay-btn" @click="showPayPop">立即支付</div>
    </div>
    <!--机构课并且订单状态为0-->
    <div class="checker-wrapper" v-if="payCode && orderInfo && orderInfo.coursetype == 2 && orderInfo.orderstatus === 0 && orderInfo.amount !== 0">
      <cube-checker
        v-model="PayCheckerValue"
        :options="PayCodeOptions"
        type="radio" >
      </cube-checker>
    </div>
    <div class="pay-code" v-if="payCode && orderInfo && orderInfo.coursetype == 2 && orderInfo.orderstatus === 0 && orderInfo.amount !== 0">
      <img v-show="PayCheckerValue == 3" :src="payCode.alipayqrcode" alt="支付宝" />
      <img v-show="PayCheckerValue == 2" :src="payCode.wxpayqrcode" alt="微信" />
    </div>
    <cube-popup v-if="orderInfo" type="my-popup" position="bottom" ref="paypop" :maskClosable="true">
      <div class="pay-block">
        <div class="pay-header">
          <i class="cubeic-close" @click="hide"></i>
          <span class="text">选择支付方式</span>  
        </div>
        <cube-radio-group>
          <cube-radio
            class="radio-expand"
            position="right"
            v-model="paySelected"
            v-for="(option, index) in options"
            :key="index"
            :option="option"
            :value="option.value"
            :hollow-style="true">
            <div class="pay-item">
              <img class="pay-icon" :src="option.src" />
              <p>{{option.label}}</p>
            </div>
          </cube-radio>
        </cube-radio-group>
        <div class="pay-footer">
          <div class="pay-btn" @click="pay">确认支付¥{{orderInfo.amount}}</div>
        </div>
      </div>
    </cube-popup>
  </div>
</template>

<script>
import defaultImage from '^/images/defaultImage.png'
import WeChatIcon from '^/images/weixin.png'
import aliPayIcon from '^/images/zhifubao.png'
import Time from '^/images/time.png'
import { toast } from '../../cube-ui';
import { queryOrderInfo, submitApplyPay, getOrderPayQrcode, getPayPriceList, appleNotify } from '@/api'

export default {
  data() {
    return {
      defaultImage: defaultImage,
      Time: Time,
      orderInfo: null,
      paySelected: '3',
      PayCheckerValue: '3',
      payCode: null,
      PayCodeOptions: [
        {
          value: '3',
          text: '支付宝'
        },
        {
          value: '2',
          text: '微信'
        }
      ],
      options: [
        {
          label: '支付宝',
          value: '3',
          src: aliPayIcon
        },
        {
          label: '微信',
          value: '2',
          src: WeChatIcon
        }
      ]
    }
  },
  created() {
    let u = navigator.userAgent
    this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    this.orderid = this.$route.params.id           
    this.getOrderInfo()
    this.getPayCode()
  },
  methods: {
    getPriceList() {
      getPayPriceList().then(res=>{
        if (res.code == 0) {
          this.priceList = res.data
          let selectPayPrice = this.priceList.filter( item => {
            return Number(item.price) === this.orderInfo.amount
          })
          this.selectPayId = selectPayPrice[0].goodssn
        }
      })
    },
    getOrderInfo() {
      queryOrderInfo({
        ordernum: this.orderid
      }).then( res => {
        if (res.code == 0) {
          this.orderInfo = res.data
          this.orderInfo.amount = Number(this.orderInfo.amount)
          if (this.isIos && this.orderInfo.coursetype == 1) {
            this.getPriceList()
          }
        }
      })
    },
    getPayCode() {
      getOrderPayQrcode().then( res => {
        if (res.code == 0) {
          this.payCode = res.data
        }
      })
    },
    pay() {
      let paytype = this.orderInfo.coursetype == 2 ? this.PayCheckerValue : this.paySelected
      let type = this.orderInfo.coursetype == 2 ? 1 : 2
      let AliPay = null
      let WxPay = null
      if (!this.isIos) {
        AliPay = AlipaydevCall.startAlipay
        WxPay = WeChatpayCall.startWechatpay
      }
      if (this.isIos && type == 2) {
        this.loading.hide()
        plugins.IAPPay.startIapPay((res)=> {
          // 成功的回调
          appleNotify({
            'receipt': res.sendString,
            'ordernum': this.orderid
          }).then( res => {
            if (res.code == 0) {
              toast('支付成功')
              this.$router.push({
                path: '/payresult/ok'
              })
            } else {
              toast(`${res.info}`)
            }
          })
        }, () => {
          // 失败的回调
          toast('支付失败')
        }, {
          product_id: this.selectPayId,
          order_num: this.orderid
        })
      } else {
        let aliSuccess = () => {
          toast('支付宝支付成功')
          this.$router.push({
            path: '/payresult/ok'
          })
        }
        let aliFail = () => {
          toast('支付宝支付失败')
          this.$router.push({
            path: '/payresult/fail'
          })
        }
        let wxSuccess = () => {
          toast('微信支付成功')
          this.$router.push({
            path: '/payresult/ok'
          })
        }
        let wxFail = () => {
          toast('微信支付失败')
          this.$router.push({
            path: '/payresult/fail'
          })
        }
        // 0元课特殊处理
        if (this.orderInfo.amount === 0) {
          paytype = 0
        }
        submitApplyPay({
          ordernum: this.orderid,
          paytype: paytype,
          type: type
        }).then( res => {
          if (res.code === 0) {
            switch (res.data.type) {
              case 7: 
                this.$router.push({
                  path: '/payresult/ok'
                })
                break;
              case 4:
                /**
                 * 微信支付
                 * @Author qyh
                 * @DateTime 2018-08-09
                 * @version  2.0
                 * @param appid     appid
                 * @param partnerid 商户号
                 * @param prepayid  预支付交易会话ID
                 * @param noncestr  随机字符串
                 * @param signStr   签名
                 * @param timestamp (10位时间戳)
                 */
                let params = {
                  appid: res.data.data.appid,
                  partnerid: res.data.data.partnerid,
                  prepayid: res.data.data.prepayid,
                  noncestr: res.data.data.noncestr,
                  signStr: res.data.data.sign,
                  timestamp: res.data.data.timestamp
                }
                WxPay(wxSuccess, wxFail, params)
                break;
              case 5:
                /**
                 * 支付宝支付 
                 * @param 订单号
                 */
                AliPay(aliSuccess, aliFail, res.data.data)
                break;
            }
          }
        })
      }
    },
    showPayPop() {
      if (this.orderInfo.coursetype == 2 || this.isIos) {
        this.loading = this.$createToast({
          time: 1000
        })
        this.loading.show()
        this.pay()
        return
      }
      let paypop = this.$refs.paypop
      paypop.show()
    },
    hide() {
      let paypop = this.$refs.paypop
      paypop.hide()
    },
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
.checker-wrapper{
  margin-top: 30px;
  text-align: left;
}
.pay-code{
  margin-top: 20px;
  img{
    width: 200px;
  }
}
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
.pay-block{
  background: #ffffff;
}
.pay-header{
  position: relative;
  line-height: 44px;
  padding: 0 10px;
  .cubeic-close{
    position: absolute;
    left: 10px;
  }
}
.pay-item{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B505A;
  font-size: 17px;
  .pay-icon{
    width: 25px;
    height: 25px;
    margin-right: 20px;
  }
}
.pay-footer{
  padding: 32px 16px;
  .pay-btn {
    width: 100%;
    height: 44px;
    line-height: 44px;
  }
}
</style>
