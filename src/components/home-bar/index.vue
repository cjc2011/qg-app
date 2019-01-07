<template>
  <div class="top-bar">
    <div class="logo">
      <img class="logo-img" :src=" organid == 1 ? Logo : organ.imageurl" alt="Logo">
    </div>
    <div class="search-box-wrapper" @click="click">
      <SearchBox />
    </div>
  </div>
</template>

<script>
import SearchIcon from "^/images/serach-icon.png";
import Logo from "^/images/logo.png";
import SearchBox from '../search-box/index.vue'

import { mapGetters } from 'vuex'

export default {
  props: {
    organid: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters([
      'organ'
    ])
  },
  data() {
    return {
      Logo: Logo,
      SearchIcon: SearchIcon
    };
  },
  created() {
    console.log(this.organ, 'organ')
  },
  methods: {
    click() {
      this.$router.push({
        path: '/search',
        query: {
          organid: this.organid
        }
      })
    }
  },
  components: {
    SearchBox
  }
};
</script>

<style lang="scss" scoped>
.top-bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  height: 50px;
  display: flex;
  line-height: 50px;
  align-items: center;
  background: #ffffff;
  justify-content: space-between;
  z-index: 10;
  .logo{
    width: 95px;
    height: 38px;
    margin-right: 15px;
    line-height: 38px;
    .logo-img{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }

}
</style>

