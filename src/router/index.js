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
import OrderInfo from '../views/orderinfo/index.vue'
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
import ReservationTime from '../views/reservation-time/index.vue'
import TeacherInfo from '../views/teacher-info/index.vue'
import UserAgreement from '../views/user-agreement/index.vue'
import MyEvaluate from '../views/my-evaluate/index.vue'
import ReservationList from '../views/reservation-list/index.vue'
import ReservationDetail from '../views/reservation-detail/index.vue'
import Domain from '../views/domain/index.vue'
import LessionDetail from '../views/lession-detail/index.vue'
import EvaluateCourse from '../views/evaluate-course/index.vue'
import PlayBack from '../views/playback/index.vue'
import PayResult from '../views/pay-result/index.vue'
import PlayBackOfficial from '../views/playback/offical.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      header: 'rewrite'
    }
  },
  {
    path: '/official',
    name: 'official',
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
      header: 'rewrite',
      title: '教师详情'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      header: 'rewrite',
      title: '搜索'
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
    path: '/orderinfo/:id',
    name: 'orderinfo',
    component: OrderInfo,
    meta: {
      title: '订单详情'
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
    component: MyCourse,
    meta: {
      title: '我的课程'
    }
  },
  {
    path: '/lession_detail/:id',
    name: 'lession_detail',
    component: LessionDetail,
    meta: {
      title: '我的课程'
    }
  },
  {
    path: '/playback',
    name: 'playback',
    component: PlayBack,
    meta: {
      title: '回放'
    }
  },
  {
    path: '/playbackofficial',
    name: 'playbackofficial',
    component: PlayBackOfficial,
    meta: {
      title: '回放'
    }
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection,
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/message',
    name: 'message',
    component: Message,
    meta: {
      title: '我的消息'
    }
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
    path: '/domain',
    name: 'domain',
    component: Domain,
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
    path: '/payresult/:is_ok',
    name: 'pay-result',
    component: PayResult,
    meta: {
      title: '支付结果'
    }
  }, 
  {
    path: '/retrievepassword',
    name: 'retrievepassword',
    component: RetrievePassword,
    meta: {
      title: '忘记密码'
    }
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
    component: SettingInfo,
    meta: {
      title: '设置'
    }
  },
  {
    path: '/searchresult',
    name: 'searchresult',
    component: SearchResult,
    meta: {
      title: '搜索结果'
    }
  },
  {
    path: '/reservationtime/:id',
    name: 'reservationtime',
    component: ReservationTime,
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
      title: '老师详情'
    }
  },
  {
    path: '/myevaluate/:id',
    name: 'myevaluate',
    component: MyEvaluate,
    meta: {
      title: '个人点评'
    }
  },
  {
    path: '/reservationlist',
    name: 'reservationlist',
    component: ReservationList,
    meta: {
      title: '我的预约'
    }
  },
  {
    path: '/reservationdetail/:id',
    name: 'reservationdetail',
    component: ReservationDetail,
    meta: {
      title: '我的预约'
    }
  },
  {
    path: '/evaluatecourse/:id',
    name: 'evaluatecourse',
    component: EvaluateCourse,
    meta: {
      title: '评价'
    }
  }
  ]
})