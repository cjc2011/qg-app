<template>
  <div class="course-container" :class="border">
    <div class="course-item column" v-for="item in [1]" :key="item" @click="trigger(item)">
      <div class="course-item__cover normal">
        <img src="http://51menke-1253417915.cosgz.myqcloud.com/logo/official/201811021643337705.jpg" alt="课程图片">
      </div>
      <div class="course-item__content">
        <div class="course-item__name normal">{{data.coursename}}</div>
        <div class="course-item__teacher" v-if="courseorigin == 'official'">班型：录播</div>
        <div class="course-item__teacher" v-else>老师：{{data.teachername || '未传名字'}}</div>
        <div v-if="type == 'course-show'" class="course-item__price">{{data.price}}</div>
        <div v-if="type == 'curriculum'" class="course-item__footer">
          <span class="course-item__time">
            {{data.starttime && data.starttime.substring(11)}} 11--11 {{data.endtime && data.endtime.substring(11)}}</span>
          <span class="course-item__status wait">
            <span v-if="data.buttonstatus == 0">待上课</span>
            <span v-if="data.buttonstatus == 1" class="intoclassroom">进教室</span>
            <span v-if="data.buttonstatus == 2">去评价</span>
            <span v-if="data.buttonstatus == 3">回放</span>
            <!-- 0 未开始 1去APP上课 2 去评价 回放 3回放 -->
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    border: {
      type: String,
      default: ''
    },
    // official || organ
    courseorigin: {
      type: String,
      default: 'official'
    },
    // 设置是否显示进教室
    type: {
      type: String,
      default: 'course-show'
    }
  },
  methods: {
    trigger() {
      this.$emit('click', this.data)
    }
  },
  data() {
    return {

    }
  }
}

</script>

<style lang='scss' scoped>
@import "^/style/course-list.scss";
.course-item__status {
  position: relative;
  .intoclassroom {
    position: absolute;
    right: 0;
    bottom: -12px;
    display: block;
    width: 57px;
    text-align: center;
    height: 28px;
    line-height: 28px;
    background: rgba(55, 210, 151, 1);
    border-radius: 4px;
    color: white;
  }
}
</style>