<template>
    <div>
        <div v-for="num of 5" :class="['studentStar',num<=score?'starBg':'starBorder']"></div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        score: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
        }
    },

    methods: {}
}
</script>

<style lang='scss' scoped>
.studentStar {
  height: 0.29rem;
  width: 0.29rem;
  margin-right: 0.2rem;
}
.starBg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: ("./assets/images/icon_starBg.png");
}
.starBorder {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: ("./assets/images/icon_starBorder.png");
}
</style>
