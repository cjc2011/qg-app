<template>
  <div class="reservation-detail">
    <div class="reservation-info">
      <div class="title"> 是第三方第三方</div>
      <div class="teacher">
        <div class="img"><img :src="UserName" alt=""></div>
        <div class="info"> 老师：六块腹肌的身份</div>
      </div>
      <div class="teacher padding-bottom-20">
        <div class="img"><img :src="Lesson" alt=""></div>
        <div class="info"> 课时数：565</div>
      </div>

    </div>
    <div class="reservation-content">
      <div class="title">
        课程安排
        <div class="residue">
          剩余
          <span class="color">333</span>课时</p>
        </div>
      </div>
      <div class="lesson">
        <div class="lesson-img">
          <img :src="Lesson1" alt="">
        </div>
        <div class="lesson-index">
          课时1
        </div>
        <div class="lesson-date">
          2018-04-20 18:00:00
        </div>
        <div class="lesson-update">
          修改
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserName from '^/images/username@2x.png'
import Lesson from '^/images/lesson@2x.png'
import Lesson1 from '^/images/lesson1@2x.png'
export default {
  name: '',

  data() {
    return {
      UserName: UserName,
      Lesson: Lesson,
      Lesson1: Lesson1
    }
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
.reservation {
  &-info:after {
    content: "";
    position: absolute;
    right: -16px;
    left: -16px;
    height: 10px;
    background: #f5f6fa;
  }
  &-info {
    text-align: left;
    .title {
      line-height: 28px;
      padding: 20px 20px 10px;
      font-size: 16px;
      //   font-weight: bold;
      color: rgba(60, 60, 65, 1);
    }
    .teacher {
      line-height: 28px;
      font-size: 13px;
      margin-left: 36px;
      img {
        width: 16px;
      }
      .img {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        top: -1px;
      }
      .info {
        display: inline-block;
        margin-left: 4px;
      }
    }
    .padding-bottom-20 {
      padding-bottom: 20px;
    }
  }
  &-content {
    padding-top: 10px;
    .title {
      text-align: left;
      line-height: 28px;
      padding: 20px 20px 10px;
      font-size: 16px;
      //   font-weight: bold;
      color: rgba(60, 60, 65, 1);
    }
    .residue {
      display: inline-block;
      position: absolute;
      right: 20px;
      font-size: 12px;
      .color {
        color: #04bd8a;
      }
    }
    .lesson {
      display: flex;
      padding-left: 36px;
      height: 43px;
      line-height: 43px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 43px;
        left: -16px;
        right: -16px;
        height: 1px;
        background: #eeeeee;
      }
      &-img {
        width: 16px;
        vertical-align: middle;
        img {
          position: relative;
          top: -2px;
        }
      }
      &-index {
        color: rgba(97, 99, 111, 1);
        font-size: 14px;
        margin-left: 4px;
        flex-grow: 2;
        text-align: left;
      }
      &-date {
        font-size: 12px;
        color: rgba(138, 139, 144, 1);
        flex-grow: 2;
      }
      &-update {
        font-size: 14px;
        color: rgba(11, 204, 150, 1);
        flex-grow: 2;
      }
    }
  }
}
</style>
