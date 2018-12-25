<template>
  <div class="app-cantainer">
    <div class="header">
      <default-header v-if="headerType != 'rewrite'" :title="title"></default-header>
    </div>
    <div class="content">
      <router-view/>
    </div>
    <div v-if="TabShow" class="footer">
      <tab-bar :tabs="tabs" />
    </div>
  </div>
</template>

<script>
import Home from '^/images/home.png'
import HomeActive from '^/images/home-active.png'
import Course from '^/images/course.png'
import CourseActive from '^/images/course-active.png'
import Curriculum from '^/images/curriculum.png'
import CurriculumActive from '^/images/curriculum_active.png'
import User from '^/images/user.png'
import UserActive from '^/images/user-active.png'
import DefaultHeader from "%/default-header/index.vue";
import TabBar from "%/tab-bar"

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tabs: [
        { 
          text: '首页',
          icon: Home,
          active: HomeActive,
          path: '/'
        },
        { 
          text: '课程',
          icon: Course,
          active: CourseActive,
          path: '/course'
        },
        { 
          text: '陪练',
          icon: Curriculum,
          active: CurriculumActive,
          path: '/curriculum'
        },
        { 
          text: '我的',
          icon: User,
          active: UserActive,
          path: '/userhome'
        },
      ],
      TabShow: false,
      headerType: ''
    };
  },
  computed: {
    ...mapGetters([
      'title'
    ])
  },
  created() {
    this.setTabBar()
  },
  watch: {
    $route() {
      this.setTabBar()
    }
  },
  methods: {
    setTabBar() {
      // 判断headerType == 'rewrite'
      this.headerType = this.$route.meta && this.$route.meta.header
      // this.title = this.$route.meta && this.$route.meta.title
      // 底部tabbar是否显示
      this.TabShow = this.tabs.some( item => {
        return item.path == this.$route.path
      })
    }
  },
  components: {
    TabBar,
    DefaultHeader
  }
};
</script>


<style lang="scss" scoped>
.header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.content{
  position: relative;
  margin: 50px 16px;
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #ffffff;
}
</style>


