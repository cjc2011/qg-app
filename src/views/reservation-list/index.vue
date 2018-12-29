<template>
    <div>
        <div class="course-list-wrapper" ref="wrapper" v-show="courseData.length">
            <div class="list-container">
                <div class="list-content">
                    <course-item type="reservation" @click="courseClick" :data="item" v-for="(item,index) in courseData" :key="index"></course-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CourseItem from '%/course-item/index.vue'
import { getAppReserveList } from '@/api'
export default {
    name: '',

    data() {
        return {
            courseData: []
        }
    },
    components: {
        CourseItem
    },
    created() {
        this.getAppReserveList()
    },
    methods: {
        courseClick() {
            this.$router.push({
                path: '/reservationdetail'
                // path: '/reservationdetail/' + this.$route.params.id
            })
        },
        getAppReserveList() {
            getAppReserveList().then(res => {
                if (res.code === 0) {
                    this.courseData = res.data.data
                    this.courseData = [
                        {
                            "coursename": "课程名称",
                            "teachername": "老师昵称",
                            "imageurl": "课程封面url",
                            "closingstatus": "0",
                            "curriculumid": "课程id",
                            "periodnum": "课程数量",
                            "surplusnum": "2"
                        },
                        {
                            "coursename": "课程名称",
                            "teachername": "老师昵称",
                            "imageurl": "课程封面url",
                            "closingstatus": "1",
                            "curriculumid": "课程id",
                            "periodnum": "课程数量",
                            "surplusnum": "2"
                        }
                    ]

                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
/deep/ .course {
  &-item {
    &__content {
      justify-content: space-around;
    }
  }
}
</style>
