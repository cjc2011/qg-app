<template>
  <div class="evaluate-item">
    <div class="evaluate-item__header">
      <div class="evaluate-item__user">
        <img :src="data.imageurl || DefaultAvatar" class="evaluate-item__avatar">
        <span class="evaluate-item__name">{{data.nickname || '匿名'}}</span>
      </div>
      <div class="evaluate-item__time">
        <span class="evaluate-item__timetext">{{data.addtime}}</span>
      </div>
    </div>
    <div class="evaluate-item__content">{{data.content}}</div>
  </div>
</template>

<script>
import DefaultAvatar from "^/images/defaultAvatar.png";
import Time from "^/images/time.png";
export default {
  name: "",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      DefaultAvatar: DefaultAvatar,
      Time: Time
    };
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.evaluate-item {
  padding: 10px 0;
  margin-bottom: 10px;
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__avatar {
    width: 28px;
    height: 28px;
    margin-right: 6px;
    border-radius: 14px;
  }
  &__name {
    font-size: 14px;
    color: #34363c;
  }
  &__icon {
    height: 14px;
    width: 14px;
    margin-right: 6px;
  }
  &__timetext {
    font-size: 12px;
    color: #999999;
  }
  &__content {
    margin-top: 10px;
    font-size: 14px;
    color: #6e6f80;
    padding: 12px;
    background: #f6f6f8;
    border-radius: 2px;
  }
}
</style>
