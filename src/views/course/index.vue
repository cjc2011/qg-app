<template>
  <div>
    <div class="scroll-nav-bar-wrapper">
      <cube-scroll-nav-bar v-if="labels.length" :current="current" :labels="labels" @change="changeHandler" />
    </div>
    <div class="course-list-wrapper">
      <course-item type="course-show" border="top"></course-item>
    </div>
  </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'
import { getCategoryList, getFilterCourserList } from '@/api'

export default {
  data() {
    return {
      current: '',
      labels: [],
      CategoryData: [],
      organid: 1
    }
  },
  created() {
    this.organid = this.$route.query.organid
    this.current = this.$route.query.current
    this.getCategory()
  },
  methods: {
    changeHandler(cur) {
      
    },
    getCategory() {
      let tem = {
        category_id: 0,
        categoryname: '全部',
        pagenum: 1
      }
      getCategoryList({
        organid: this.organid
      }).then( res => {
        let labels = []
        res.data.unshift(tem)
        res.data.forEach( (item, index) => {
          if ( !this.current && index == 0) {
            this.current = item.categoryname
          }
          labels.push(item.categoryname)
          item.pagenum = 1
        })
        this.labels = labels
        this.CategoryData = res.data
      })
    },
    getCourse() {
      getFilterCourserList({
        organid: this.organid,
        pagenum: this.pagenum,
        category_id: this.category_id
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
}
/deep/ .cube-scroll-nav-bar-item_active{
  color: #0BCC96;
}

</style>
