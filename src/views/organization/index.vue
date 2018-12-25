<template>
  <div class="organization">
    <div class="log-wrapper">
      <img :src="Logo" alt="拓课云">
    </div>
    <div class="search-wrapper">
      <input type="text" placeholder="输入机构域名">
      <div class="search-box">
        <img :src="SearchIcon" alt="">
        <span>搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '^/images/logo.png'
import SearchIcon from '^/images/organization-search.png'

export default {
  data() {
    return {
      Logo: Logo,
      SearchIcon: SearchIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.organization{
  padding-top: 50px;
  .log-wrapper{
    width: 175px;
    margin: 50px auto;
  }
  .search-wrapper{
    margin: 0 30px;
    height: 50px;
    position: relative;
    line-height: 50px;
    border-radius: 25px;
    background: #F1F2F3;
    text-align: left;
    padding: 0 25px;
    input{
      background: #F1F2F3;
      &::-webkit-input-placeholder{
        font-size: 17px;
        color: #B3B3B7;
      }
    }
  }
  .search-box{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    min-width: 90px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    font-size: 17px;
    background:linear-gradient(90deg,rgba(39,249,180,1),rgba(11,204,150,1));
    box-shadow:0px 8px 13px 0px rgba(8,175,128,0.2);
    box-sizing: border-box;
    border-radius: 25px;
    img{
      width: 20px;
      height: 20px;
    }
  }
}

</style>

