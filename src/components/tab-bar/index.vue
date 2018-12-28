<template>
  <div class="tab-bar">
    <div  @click="jumpLink(item)" class="tab-item" :class="{'active': path == item.path}" v-for="(item,index) in tabs" :key="index" replace>
      <span class="icon">
        <img :src="path == item.path ? item.active : item.icon" :alt="item.text">
      </span>
      <p class="text">{{item.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  computed: {
    path() {
      return this.$route.path
    }
  },
  methods: {
    jumpLink(item) {
      this.$router.replace({
        path: item.path,
        query: item.query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  border-top: 1px solid #eeeeee;
  .tab-item{
    flex: 1;
    padding-top: 8px;
    font-size: 10px;
    color: #999999;
    .icon {
      display: block;
    }
    .text {
      margin-top: 2px;
    }
    &.active .text{
      color: #0BCC96;
    }
  }
  img {
    width: 22px;
    height: 22px;
  }
}

</style>

