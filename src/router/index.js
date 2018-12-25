import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'
import Course from '../views/course/index.vue'
import CourseInfo from '../views/course-info/index.vue'
import Search from '../views/search/index.vue'
import UserHome from '../views/user-home/index.vue'
import UserInfo from '../views/user-info/index.vue'
import UserEdit from '../views/user-edit/index.vue'
import Order from '../views/order/index.vue'
import Curriculum from '../views/curriculum/index.vue'
import MyCurriculum from '../views/my-curriculum/index.vue'
import Collection from '../views/collection/index.vue'
import MyCourse from '../views/my-course/index.vue'
import Message from '../views/message/index.vue'
import Login from '../views/login/index.vue'
import Registered from '../views/registered/index.vue'
import RetrievePassword from '../views/retrieve-password/index.vue'
import Organization from '../views/organization/index.vue'
import SettingInfo from '../views/setting-info/index.vue'
import SearchResult from '../views/search-result/index.vue'
import Reservation from '../views/reservation/index.vue'
import TeacherInfo from '../views/teacherinfo/index.vue'
import UserAgreement from '../views/user-agreement/index.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        header: 'rewrite'
      }
    },
    {
      path: '/course',
      name: 'course',
      component: Course,
      meta: {
        title: '课程列表'
      }
    },
    {
      path: '/courseinfo/:id',
      name: 'courseinfo',
      component: CourseInfo,
      meta: {
        header: 'rewrite'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        header: 'rewrite'
      }
    },
    {
      path: '/userhome',
      name: 'userhome',
      component: UserHome,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: UserInfo,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/useredit/:type',
      name: 'useredit',
      component: UserEdit,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/curriculum',
      name: 'curriculum',
      component: Curriculum,
      meta: {
        title: '陪练'
      }
    },
    {
      path: '/mycurriculum',
      name: 'mycurriculum',
      component: MyCurriculum,
      meta: {
        title: '我的陪练'
      }
    },
    {
      path: '/mycourse',
      name: 'mycourse',
      component: MyCourse
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        header: 'rewrite'
      }
    },
    {
      path: '/registered',
      name: 'registered',
      component: Registered,
      meta: {
        header: 'rewrite'
      }
    },
    {
      path: '/retrievepassword',
      name: 'retrievepassword',
      component: RetrievePassword
    },
    {
      path: '/organization',
      name: 'organization',
      component: Organization,
      meta: {
        header: 'rewrite'
      }
    },
    {
      path: '/setting_info',
      name: 'setting_info',
      component: SettingInfo
    },
    {
      path: '/searchresult/:search_key',
      name: 'searchresult',
      component: SearchResult,
      meta: {
        title: '搜索结果'
      }
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation,
      meta: {
        title: '选择时间'
      }
    },
    {
      path: '/useragreement',
      name: 'useragreement',
      component: UserAgreement,
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/teacherinfo/:id',
      name: 'teacherinfo',
      component: TeacherInfo,
      meta: {
        title: ' '
      }
    }
  ]
})
