<template>
    <div>
        <div class="user-info">
            <div class="user-img">
                <img :src="data.imageurl || DefaultAvatar" alt="">
            </div>
            <div class="user-username">{{data.nickname}}</div>
            <div class="user-date">
                <img :src="Time" alt="">
                <p>{{data.addtime}}</p>
            </div>
        </div>
        <p class="user-evaluate">{{data.content}}</p>
    </div>
</template>

<script>
import DefaultAvatar from '^/images/defaultAvatar.png'
import Time from '^/images/time.png'
export default {
    name: '',
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            DefaultAvatar: DefaultAvatar,
            Time: Time
        }
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
.user-info {
  display: flex;
  margin: 20px 0 10px;

  .user-img {
    vertical-align: middle;
    flex-grow: 1;
    img {
      width: 36px;
    }
  }
  .user-username {
    flex-grow: 4;
    text-align: left;
    line-height: 36px;
  }
  .user-date {
    flex-grow: 5;
    text-align: right;
    img {
      width: 13px;
      margin-right: 5px;
    }
    p {
      display: inline-block;
      line-height: 36px;
      color: rgba(153, 153, 153, 1);   
    }
  }
}
.user-evaluate {
  min-height: 22px;
  padding: 5px 0;
  line-height: 32px;
  background: rgba(246, 246, 248, 1);
  border-radius: 4px; 
//   text-align: left;
//   text-indent:35px
}
</style>
