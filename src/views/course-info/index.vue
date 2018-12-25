<template>
  <div class="course-info">
    <div class="header">
      <div class="top-bar">
        <span class="back-icon" @click="$router.back()"><img :src="BackIcon" ></span> 
        <span class="share-icon"><img :src="ShareIcon" ></span>
      </div>
      <div class="bg-image">
        <img :src="Gb" />
      </div>
      <h1 class="name">小学三年级高级编程</h1>
    </div>
    <h1 class="course-name">小学三年级高级编程</h1>
    <div class="course-box summary">
      <div class="course-box__title">简介</div>
      <div class="course-box__content">
        <p> 本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。 本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。 本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。 本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。</p> 
      </div>
    </div>
    <div class="course-box teacher">
      <div class="course-box__title">老师简介</div>
      <div class="course-box__content">
        <div class="teacher-avatar">
          <img class="avatar" src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4" >
          <p class="teacher-name">王大锤</p>
        </div>
        <p class="text">本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。 本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。 本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。 本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的学习打下夯实的基础。</p>
      </div>
    </div>
    <div class="course-box noborder evaluate">
      <div class="course-box__title">老师点评</div>
      <div class="course-box__content">
        <div class="evaluate-item">
          <div class="evaluate-item__header">
            <div class="evaluate-item__user">
              <img src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4" class="evaluate-item__avatar">
              <span class="evaluate-item__name">李大美</span>
            </div>
            <div class="evaluate-item__time">
              <img :src="TimeIcon" class="evaluate-item__icon">
              <span class="evaluate-item__timetext">2018-04-05 18:25:36</span>
            </div>
          </div>
          <div class="evaluate-item__content">学习很努力jixujiayou</div>
        </div>
      </div>
    </div>
    <div class="pay border-top-1px">
      <div class="preice">¥19999</div>
      <div class="pay-btn">立即支付</div>
    </div>
  </div>
</template>

<script>
import Gb from '^/images/bg.png'
import ShareIcon from '^/images/share.png'
import BackIcon from '^/images/back-white.png'
import TimeIcon from '^/images/time.png'

export default {
  data() {
    return {
      Gb: Gb,
      BackIcon: BackIcon,
      ShareIcon: ShareIcon,
      TimeIcon: TimeIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.course-info{
  margin: -50px -16px 0;
}
.header{
  .top-bar{
    position: fixed;
    left: 16px;
    right: 16px;
    top: 0;
    display: flex;
    justify-content: space-between;
    .back-icon,
    .share-icon{
      display: inline-block;
      width: 20px;
      padding: 10px 0;
      .cubeic-back{
        color: #ffffff;
      }
    }
  }
  .name{
    position: absolute;
    top: 100px;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
  }
}
.course-name{
  margin: 0;
  padding: 18px 16px;
  font-size: 15px;
  color: #3C3C41;
  text-align: left;
  border-bottom: 10px solid #F5F6FA;
}
.course-box{
  padding: 16px;
  text-align: left;
  border-bottom: 10px solid #F5F6FA;
  &.noborder{
    border-bottom: 0px solid #ffffff;
  }
  &__title{
    font-size: 15px;
    color: #3C3C41;
  }
  &__content{
    padding: 10px;
    font-size: 13px;
    color: #6E6F80;
    line-height: 26px;
  }
}
.teacher-avatar{
  text-align: center;
  .avatar{
    width: 44px;
    height: 44px;
    border-radius: 22px;
  }
  .teacher-name{
    font-size: 14px;
    color: #3C3C41;
  }
}
.evaluate-item{
  margin-bottom: 10px;
  &__header{
    display: flex;
    justify-content: space-between;
  }
  &__avatar{
    width: 28px;
    height: 28px;
    margin-right: 6px;
    border-radius: 14px;
  }
  &__name{
    font-size: 14px;
    color: #34363C;
  }
  &__icon{
    height: 14px;
    width: 14px;
    margin-right: 6px;
  }
  &__timetext{
    font-size: 12px;
    color: #999999;
  }
  &__content{
    margin-top: 10px;
    font-size: 14px;
    color: #6E6F80; 
    padding: 12px;
    background: #F6F6F8;
    border-radius: 2px;
  }
}
.pay{
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
    color: #F20B0B;
    font-size: 17px;
    font-weight: 600;
    flex: 1;
  }
  &-btn{
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
