<template>
  <div class="search">
    <div class="top-bar">
      <div class="search-box-wrapper">
        <SearchBox  @search="search"/>
      </div>
      <div class="action-btn" @click="$router.back()">取消</div>
    </div>
    <div class="search-content">
      <div class="history-bar">
        <span class="history">搜索历史</span>
        <span class="history clearn">清除搜索历史</span>
      </div>
      <div class="history-list">
        <span class="history-item" @click="$router.push('/searchresult/ssss')">英语</span>
        <span class="history-item">计算机</span>
        <span class="history-item">会计</span>
        <span class="history-item">数学</span>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '%/search-box/index.vue'


export default {
  created() {
    this.organid = this.$route.query.organid
  },
  components: {
    SearchBox
  },
  methods: {
    search(val) {
      this.$router.push({
        path: `/searchresult`,
        query: {
          search_key: val,
          organid: this.organid
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 50px;
  background: #ffffff;
  .search-box-wrapper{
    flex: 1;
  }
  .action-btn{
    width: 50px;
    text-align: right;
    font-size: 17px;
    color: #04BD8A;
  }
}
.search-content{
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: #F5F6FA;
}
.history-bar{
  padding: 20px 16px 0;
  display: flex;
  color: #61636F;
  font-size: 12px;
  align-items: center;
  justify-content: space-between;
  .history{
    padding: 10px 0;
    &.clearn{
      color: #A8AAB4;
    }
  }
}
.history-list{
  padding: 30px 30px;
  text-align: left;
  .history-item{
    font-size: 12px;
    display: inline-block;
    line-height: 22px;
    margin: 0 14px 20px;
    color: #4B505A;
  }
}
</style>
