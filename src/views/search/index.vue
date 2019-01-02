<template>
  <div class="search">
    <div class="top-bar">
      <div class="search-box-wrapper">
        <SearchBox v-model="searchKey" @update="searchKeyUpdate"  @search="search"/>
      </div>
      <div class="action-btn" v-show="searchKey" @click="search">搜索</div>
      <div class="action-btn" v-show="!searchKey" @click="$router.back()">取消</div>
    </div>
    <div class="search-content">
      <div class="history-bar">
        <span class="history">搜索历史</span>
        <span class="history clearn" @click="clearHistory">清除搜索历史</span>
      </div>
      <div class="history-list" v-if="searchHistory">
        <span class="history-item" v-for="item in searchHistory" :key="item" @click="$router.push({ path:'/searchresult', query: {search_key: item, organid: organid}})">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '%/search-box/index.vue'


export default {
  data() {
    return {
      searchKey:'',
      searchHistory: null
    }
  },
  created() {
    let searchHistory = localStorage.getItem('searchkey')
    this.searchHistory = searchHistory ? JSON.parse(searchHistory) : null
    this.organid = this.$route.query.organid
  },
  components: {
    SearchBox
  },
  methods: {
    clearHistory() {
      localStorage.setItem('searchkey', '')
      this.searchHistory = null
    },
    searchKeyUpdate(val) {
      this.searchKey = val
    },
    search(val) {
      let search = val.type ? this.searchKey : val 
      this.$router.push({
        path: `/searchresult`,
        query: {
          search_key: search,
          organid: this.organid
        }
      })
      let searchHistory = localStorage.getItem('searchkey')
      if (!searchHistory) {
        searchHistory = [search]
      } else {
        searchHistory = JSON.parse(searchHistory)
        searchHistory.indexOf(search) == -1 && searchHistory.push(search)
      }
      localStorage.setItem('searchkey',JSON.stringify(searchHistory))
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
