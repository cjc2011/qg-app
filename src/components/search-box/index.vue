<template>
  <div class="search-box">
    <input class="search" placeholder="请输入关键字" type="text">
    <img class="search-icon" :src="SearchIcon" alt="搜索">
  </div>
</template>

<script>
import SearchIcon from "^/images/serach-icon.png";

export default {
  data() {
    return {
      SearchIcon: SearchIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box{
  position: relative;
  width: 100%;
  height: 32px;
  border-radius: 16px;
  padding: 6px 36px 6px 16px;
  box-sizing: border-box;
  background: #F1F2F6;
  .search{
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 20px; 
    color: #BDC0C6;
    background: #F1F2F6;
    outline: none;
  }
  .search-icon{
    position: absolute;
    right: 16px;
    top: 6px;
    width: 20px;
    height: 20px;
  }
}
</style>
