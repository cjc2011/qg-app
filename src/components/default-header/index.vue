<template>
  <div class="default-header">
    <span class="back-icon" @click="$router.back()">
      <img :src="BackIcon" alt="返回">
    </span>  
    <h1 class="text">{{title}}</h1>
  </div>
</template>

<script>
import BackIcon from '^/images/back.png'

export default {
  data() {
    return {
      BackIcon: BackIcon
    }
  },
  methods: {
    
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.default-header{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  line-height: 50px;
  background: #ffffff;
  z-index: 10;
  .back-icon{
    position: absolute;
    left: 16px;
    width: 20px;
    img {
      max-width: 100%;
      vertical-align: middle;
    }
  }
  .text {
    margin: 0 40px;;
    color: #2E2F37;
    font-size: 18px;
  }
}
</style>

