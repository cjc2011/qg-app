<template>
  <div class="curriculum-container">
    <div class="top-bar-action">
      <span class="img-wrapper" @click="$router.push('/mycurriculum')">
        <img :src="ClockIcon">
      </span>
    </div>
    <div class="tips">
      <div class="content">
        <img class="important-icon" :src="ExclamationIcon" /> 
        <span class="text">您还有未预约的课程，立即预约</span>
      </div>
      <i class="cubeic-arrow icon"></i>
    </div>
    <div class="curriculum-list">
      <div class="curriculum-card" v-for="(item, index) in [2,3,3,4,5]" :key="index">
        <div class="curriculum-card__title expand">2018-04-18 周三</div>
        <CourseItem type="curriculum" border="bottom" />
      </div>
    </div>
  </div>
</template>


<script>
import ExclamationIcon from '^/images/exclamation.png'
import ClockIcon from '^/images/clock.png'
import CourseItem from '%/course-item'

export default {
  data() {
    return {
      ExclamationIcon: ExclamationIcon,
      ClockIcon: ClockIcon
    }
  },
  components: {
    CourseItem
  }
}
</script>

<style lang="scss">
.tips{
  position: fixed;
  font-size: 14px;
  height: 44px;
  left: 0;
  right: 0;
  line-height: 44px;
  color: #ffffff;
  background-color: #0CCE97;
  z-index: 10;
  .text{
    vertical-align: middle;
  }
  .important-icon{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .icon{
    position: absolute;
    right: 16px;
    top: 0;
  }
}
.curriculum-list{
  padding-top: 44px;
}
.curriculum-card{
  &__title{
    text-align: left;
    font-size: 13px;
    color: #474A51;
    line-height: 37px;
  }
}
</style>

