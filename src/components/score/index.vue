<template>
    <div class="score">
        <div @click="bb(num)" v-for="num of 5" :class="['star',num<=score?'starBg':'starBorder']"></div>
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

    methods: {
        bb(index){
            this.$emit('selectScore',index)
        }
    }
}
</script>

<style lang='scss' scoped>
.score {
  display: flex;
  width: 210px;
  margin: 20px auto;
  .star {
    height: 28px;
    width: 28px;
    margin-right: 15px;
  }
  .star:last-child {
    margin-right: 0px;
  }
  .starBg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("../../assets/images/icon_starBg@2x.png");
  }
  .starBorder {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("../../assets/images/icon_starBorder@2x.png");
  }
}
</style>
