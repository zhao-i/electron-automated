<template>
  <div class="home-page">
    <div class="wrap-left">
      <p>停止运行脚本</p>
      <p>选择主题</p>
      <p>管理游戏列表</p>
      <p>隐藏 / 显示侧边栏</p>
    </div>
    <div class="wrap-right">
      <p>Alt + S</p>
      <p>Alt + F1</p>
      <p>Alt + F2</p>
      <p>Alt + F3</p>
    </div>
    <component-disclaimer></component-disclaimer>
  </div>
</template>
<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-left {
  width: 200px;
  height: 200px;
  margin-right: 30px;
  text-align: right;
}
.wrap-right {
  width: 200px;
  height: 200px;
  text-align: left;
}
</style>
<script>
import Disclaimer from '../components/Disclaimer.vue'
export default {
  components:{
  'component-disclaimer': Disclaimer,
  }
}
</script>