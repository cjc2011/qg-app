import api from './http'
import qs from 'qs'
/**
 * @api 登录||注册||登出
 * @param {Object} 
 */

// 获取公钥
export const getPublicKey = () => api.post('index/Login/getPublicKey')
    // 验证码
export const sendMobileMsg = params => api.post('student/Homepage/sendMobileMsg', params)
    // 注册 
export const register = params => api.post('student/Homepage/register.html', params)
    // 登录
export const login = params => api.post('index/Login/login', params)
    // 登出
export const logout = params => api.post('index/Login/exitLogin', params)
    // 搜索机构
export const searchDomain = params => api.post('student/Homepage/searchDomain', params)

/**
 * 个人中心
 * 
 */
export const upload = params => api.post('teacher/Uploadfile/Upload', params, 'file')
    // 个人资料 - 个人信息
export const getStudentInfo = params => api.post('student/User/getStudentInfo', params)
    //  个人资料 - 修改手机号
export const updateMobile = params => api.post('student/User/updateMobile', params)
    // 个人资料 - 修改密码
export const updateUserPass = params => api.post('student/User/updateUserPass', params)
    // 个人资料 - 编辑资料
export const updateStudentInfo = params => api.post('student/User/updateStudentInfo', params)
    // 找回密码
export const updatePass = params => api.post('student/Homepage/updatePass', params)    

/**
 * 我的收藏
 */
// 老师收藏列表
export const teacherCollectList = params => api.post('student/User/teacherCollectList', params)
    // 课程收藏列表
export const courseCollectList = params => api.post('student/User/courseCollectList', params)
    // 我的消息
export const messageList = params => api.post('/student/User/messageList', params)

/**
 * 老师详情
 */
export const getTeacherDetail = params => api.post('student/Teacherdetail/getTeacherDetail', params)
    // 老师详情 - 课程
export const getTeacherCourse = params => api.post('/student/Teacherdetail/getTeacherCourse', params)
    // 老师详情 - 评价
export const getTeacherComment = params => api.post('student/Teacherdetail/getTeacherComment', params)
    // 收藏老师
export const teacherCollect = params => api.post('student/User/teacherCollect', params)
    // 取消收藏老师
export const cancelTeacherCollect = params => api.post('student/User/cancelTeacherCollect', params)

/**
 * 课程详情
 */
export const getCurriculumInfo = params => api.post('student/Curriculumdetail/getCurriculumInfo', params)
    // 课程详情 - 评价
export const getCurriculumComment = params => api.post('student/Curriculumdetail/getCurriculumComment', params)
    // 收藏课程
export const courseCollect = params => api.post('student/User/courseCollect', params)
    // 取消收藏课程
export const cancelCourseCollect = params => api.post('student/User/cancelCourseCollect', params)

/**
 * 机构首页
 */
//知识付费课程推荐
export const getRecommendCourser = params => api.post('student/HomePage/getRecommendCourser', params)
    // 分类及分类课程
export const getRecommendCategory = params => api.post('student/HomePage/getRecommendCategory', params)
    //首页轮播
export const getSlideList = params => api.post('student/Homepage/getSlideList', params)
    // 老师推荐 
export const getRecommendTeacher = params => api.post('student/Homepage/getRecommendTeacher', params)
    //分类列表
export const getCategoryList = params => api.post('student/Homepage/getCategoryList', params)
    // 根据分类获取课程
export const getFilterCourserList = params => api.post('student/Homepage/getFilterCourserList', params)
    // 搜索课程
export const searchCourseByCname = params => api.post('student/Homepage/searchCourseByCname', params)

/**
 * 陪练
 */
export const getLessonsByDate = params => api.post('student/Mycourse/getLessonsByDate', params)
    // 查询课程状态
export const getAppReserveStatus = params => api.post('student/Mycourse/getAppReserveStatus', params)
    // 查询我的预约列表
export const getAppReserveList = params => api.post('student/Mycourse/getAppReserveList', params)
    // 查询待上课或已结束的课时
export const getAppWaitOrEndLessons = params => api.post('student/Mycourse/getAppWaitOrEndLessons', params)
    // 去评价
export const gotoComment = params => api.post('student/Mycourse/gotoComment', params)
    // 进教室
export const intoClassroom = params => api.post('student/Mycourse/intoClassroom', params)
    // 查询老师一周内的时间表
export const getAppTeacherFreeTime = params => api.post('student/Mycourse/getAppTeacherFreeTime', params)
    // 我的课程
export const getMyCurriculum = params => api.post('student/Mycourse/getMyCurriculum', params)
    // 直播课课时安排 
// export const getLiveSchedule = params => api.post('student/Mycourse/getLiveSchedule', params)    
    // 回放
export const getAppLivePlayback = params => api.post('student/Mycourse/getAppLivePlayback', params)    
    // 直播课课时安排 
export const getAppLiveSchedule = params => api.post('student/Mycourse/getAppLiveSchedule', params)
    // 录播课课时信息和视频url 
export const getRecordSchedule = params => api.post('student/Mycourse/getRecordSchedule', params)    
    // 约课
export const batchAddReserveLessons = params => api.post('student/Mycourse/batchAddReserveLessons', params)    
    // 修改约课时间
export const addEdit = params => api.post('student/Mycourse/addEdit', params)

    // 我的订单
export const getMyOrderList = params => api.post('student/Myorder/getMyOrderList', params)  
    // 订单详情
export const queryOrderInfo = params => api.post('student/Myorder/queryOrderInfo', params)
    // 下单
export const gotoOrder = params => api.post('student/Myorder/gotoOrder', params)
    // 确认订单
export const submitApplyPay = params => api.post('student/Myorder/submitApplyPay', params)
    // 获取支付二维码
export const getOrderPayQrcode = params => api.post('student/Myorder/getOrderPayQrcode', params)    
    // apple原生支付
export const appleNotify = params => api.post('student/Myorder/appleNotify', params)    
    // 绑定极光ID
export const bindingUser = params => api.post('student/User/bindingUser', params)    
    // 删除消息
export const deleteMsg = params => api.post('student/User/deleteMsg', params)    
    // getPayPriceList 
export const getPayPriceList = params => api.post('student/Myorder/getPayPriceList', params)