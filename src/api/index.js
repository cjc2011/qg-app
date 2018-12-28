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

/**
 * 我的收藏
 */
// 老师收藏列表
export const teacherCollectList = params => api.post('student/User/teacherCollectList', params)
    // 课程收藏列表
export const courseCollectList = params => api.post('student/User/courseCollectList', params)

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
    //首页轮播
export const getSlideList = params => api.post('student/Homepage/getSlideList', params)
    // 老师推荐 
export const getRecommendTeacher = params => api.post('student/Homepage/getRecommendTeacher', params)