<template>
  <div class="courses">
    <div class="scroll-nav-bar-wrapper">
      <cube-scroll-nav-bar v-if="categoryids.length" :current="category_id" :txts="categorynames" :labels="categoryids" @change="changeHandler" />
    </div>
    <div class="course-list-wrapper" ref="wrapper" v-show="courseData.length">
      <div class="list-container">
        <div class="list-content">
          <course-item @click="courseClick" :data="item" :courseorigin="item.coursetype == 1 ? 'official' : 'organ'" v-for="(item,index) in courseData" :key="index" type="course-show"></course-item> 
        </div>
      </div>
    </div>
    <div class="course-list-wrapper" v-show="!courseData.length">
      <img class="nodata" :src="NoDataImage">
      <p class="nodata-text">该分类下暂无课程</p>
    </div>  
  </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'
import BScroll from 'better-scroll'
import NoDataImage from '^/images/nodata.png'
import { getCategoryList, getFilterCourserList } from '@/api'

export default {
  data() {
    return {
      NoDataImage: NoDataImage,
      category_id: null,
      categoryids: [],
      categorynames: [],
      CategoryData: [],
      courseData: [],
      currentIndex: null,
      organid: 1,
      pagenum: 1,
      pagesize: 20,
      bscroll: null
    }
  },
  created() {
    this.organid = this.$route.query.organid
    this.category_id = (this.$route.query.category_id && Number(this.$route.query.category_id)) || 0
    this.currentIndex = this.category_id === 0 ? 0 : null
    this.getCategory()
  },
  methods: {
    courseClick(item) {
      this.$router.push({
        path: `/courseinfo/${item.curriculumid}`
      })
    },
    changeHandler(current) {
      this.category_id = current
      this.currentIndex = this.CategoryData.findIndex( item => {
        return item.category_id == current
      })
      if (this.CategoryData[this.currentIndex].nodata) {
        this.courseData = this.CategoryData[this.currentIndex].courseData
        this.$nextTick( () => {
          this.bscroll.refresh()
        })
        return
      }
      this.getCourse()
    },
    getCategory() {
      let temCategory = {
        category_id: 0,
        categoryname: '全部',
        pagenum: 1
      }
      getCategoryList({
        organid: this.organid
      }).then( res => {
        res.data.unshift(temCategory)
        res.data.forEach( (item, index) => {
          if (this.currentIndex === null && item.category_id == this.category_id) {
            this.currentIndex = index
          }
          this.categorynames.push(item.categoryname)
          this.categoryids.push(item.category_id)
          item.coursedata = []
          item.pagenum = 1
        })
        this.CategoryData = res.data
        this.pagenum = 1
        this.getCourse()
      })
    },
    getCourse() {
      getFilterCourserList({
        organid: this.organid,
        pagenum: this.pagenum,
        category_id: this.category_id
      }).then( res => {
        // 第一次获取数据时直接赋值
        if (this.pagenum == 1) {
          this.CategoryData[this.currentIndex].courseData = res.data.data
          this.courseData = res.data.data
          if (res.data.data.length == 0) {
            this.CategoryData[this.currentIndex].nodata = true
          }
        } else {
        // 多页获取数据时concat数据
          let CategoryData = this.CategoryData[this.currentIndex].courseData
          this.CategoryData[this.currentIndex].courseData = CategoryData.concat(res.data.data)
          this.courseData = this.CategoryData[this.currentIndex].courseData
        }
        // 是否有更多数据
        if(this.CategoryData[this.currentIndex].courseData.length >= res.data.pageinfo.total) {
          this.CategoryData[this.currentIndex].nodata = true
        }
        this.$nextTick( ()=> {
          if (!this.bscroll) {
            this.scrollInit()
          } else {
            this.bscroll.finishPullUp()
            this.bscroll.refresh()
            let y = this.CategoryData[this.currentIndex].y
            y ? this.bscroll.scrollTo(0 ,y, 100) : this.bscroll.scrollTo(0, 0, 100)
          }
        })
        
      })
    },
    scrollInit(){
      this.bscroll = new BScroll(this.$refs.wrapper, {
        pullUpLoad: {
          threshold: 50
        },
        click: true
      })
      this.bscroll.on('pullingUp', () => {
        let CategoryData = this.CategoryData
        let index = this.currentIndex
        if (CategoryData[index].nodata) return  this.bscroll.finishPullUp() 
        let pagenum = CategoryData[index].pagenum++
        this.pagenum = pagenum
        this.getCourse()
      })
      this.bscroll.on('scroll', (pos) => {
        this.CategoryData[this.currentIndex].y = pos.y
      })
    }
  },
  components: {
    CourseItem
  }
}
</script>


<style lang="scss" scoped>

.scroll-nav-bar-wrapper{
  margin: 0 -16px;
  padding: 0 16px;
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  background: #ffffff;
  z-index: 10;
}
.course-list-wrapper{
  position: fixed;
  top: 97px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: hidden;
}
.list-content{
  padding: 0 16px;
}
.nodata{
  width: 200px;
  margin-top: 40px;
  &-text{
    text-align: center;
    color: #666666;
    line-height: 50px;
  }
}

.courses /deep/ .cube-scroll-nav-bar-item_active{
  color: #0BCC96;
}

</style>
