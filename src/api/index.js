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

/**
 * 机构首页
 */
//知识付费课程推荐
export const getRecommendCourser = params => api.post('student/HomePage/getRecommendCourser', params)
//首页轮播
export const getSlideList = params => api.post('student/Homepage/getSlideList', params)
// 老师推荐 
export const getRecommendTeacher = params => api.post('student/Homepage/getRecommendTeacher', params)