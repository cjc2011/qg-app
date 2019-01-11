<template>
  <div v-if="url">
    <video :src="url" controls></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '11'
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
