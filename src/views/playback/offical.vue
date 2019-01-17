<template>
  <div v-if="url">
    <video :src="url" controls></video>
  </div>
  <div class="no-data" v-else>
    <img :src="NoDataImage" >
    <p>暂无回放</p>
  </div>
</template>

<script>
import NoDataImage from '^/images/nodata.png'

export default {
  data() {
    return {
      url: '',
      NoDataImage: NoDataImage
    }
  },
  mounted() {
    this.url = this.$route.query.url
  }
}
</script>

<style lang="scss" scoped>
video{
  max-width: 100%;
}
</style>
