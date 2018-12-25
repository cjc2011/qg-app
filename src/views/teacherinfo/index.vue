<template>
  <div>
    <div class="top-bar-action">
      <div class="img-wrapper"><img :src="ShareIcon" alt="编辑"></div>
    </div>
    <div class="teacher">
      <img class="teacher-avatar" src="https://avatars0.githubusercontent.com/u/17289716?s=180&v=4">
      <div class="teacher-name">
        <span class="text">王小锤</span>
        <img class="icon" :src="BoyIcon" />
      </div>
      <div class="teacher-info">
        <div class="birthday">
          <img class="icon" :src="BirthdayIcon" />
          <span class="text">18岁</span>
        </div>
        <div class="aaddress">
          <img class="icon" :src="BirthdayIcon" />
          <span class="text">湖北 武汉</span>
        </div>
      </div>
      <div class="teacher-summary">
        <div class="summary-title">老师简介</div>
        <div class="summary-text">本课程从实际生产环境应用MyCAT入手，讲解MyCAT的基础知识和MyCAT的基本应用操作，本课程的目标就是“看得懂、学得会、做得出”，为后续的 </div>
      </div>
    </div>
    <div class="teacher-course">
      <div class="title">他的课程</div>
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
    </div>
  </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'
import ShareIcon from '^/images/share-black.png'
import BoyIcon from '^/images/boy.png'
import BirthdayIcon from '^/images/birthday.png'
import Address from '^/images/address.png'

export default {
  data() {
    return {
      ShareIcon: ShareIcon,
      BirthdayIcon: BirthdayIcon,
      BoyIcon: BoyIcon,
      Address: Address
    }
  },
  components: {
    CourseItem
  }
}
</script>

<style lang="scss" scoped>
.teacher{
  .icon{
    width: 12px;
    height: 12px;
  }
  .text{
    display: inline-block;
    font-size: 16px;
    color: #3C3C41;
    vertical-align: middle;
  }
  &-avatar{
    height: 56px;
    width: 56px;
    border-radius: 28px;
  }
  &-name{
    margin-top: 10px;
  }
  &-info{
    margin-top: 10px;
    width: 200px;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    .text{
      margin-left: 2px;
      display: inline-block;
      font-size: 12px;
      color: #61636F;
    }
  }
  &-summary{
    padding: 16px;
    text-align: left;
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 18px 0px rgba(205,205,217,0.5);
    border-radius: 8px;
    .summary-title{
      font-size: 15px;
      color: #3C3C41;
      margin-bottom: 20px;
    }
    .summary-text{
      font-size: 13px;
      line-height: 22px;
      color: #6E6F80;
    }
  }
  &-course{
    margin-top: 20px;
    .title{
      padding: 16px;
      font-size: 15px;
      color: #474A51;
      text-align: left;
    }
  }
}
</style>
