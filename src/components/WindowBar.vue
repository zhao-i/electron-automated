<template>
  <div id="control">

      <ul id="menu">
        <li @click.self="redirectPage('/zone')">用户</li>
        <li @click.self="redirectPage('/config')">设置</li>
        <li @click.self="redirectPage('/bug')">反馈</li>
        <li @click.self="redirectPage('/about')">关于</li>
      </ul>

    <div id="title">{{}}</div>
    <ul class="window-button">
      <li class="icon-tray" @click="toMain(2)">
        <svg width="15" height="15" viewBox="0 0 15 15" class="icon-svg">
          <line x1="8" y1="0" x2="8" y2="13"></line>
          <line x1="0" y1="13" x2="15" y2="13"></line>
          <polyline points="5,5 8,13 11,5"></polyline>
        </svg>
      </li>
      <li class="icon-min" @click="toMain(1)">
        <svg width="15" height="15" viewBox="0 0 15 15" class="icon-svg">
          <line x1="0" y1="8" x2="15" y2="8"></line>
        </svg>
      </li>
      <li class="icon-close" @click="toMain(0)">
        <svg width="15" height="15" viewBox="0 0 15 15" class="icon-svg">
          <line x1="2" y1="2" x2="13" y2="13"></line>
          <line x1="13" y1="2" x2="2" y2="13"></line>
        </svg>
      </li>
    </ul>
  </div>
</template>
<style scoped>
#control {
  position: relative;
  -webkit-app-region: drag;
  width: 1000px;
  height: 26px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  z-index: 100;
}
#control li {
  -webkit-app-region: no-drag;
}
#menu > li {
  box-sizing: border-box;
  padding: 0px 10px;
  line-height: 26px;
  float: left;
}
#menu > li:hover {
  color: black;
  background-color: rgb(161, 202, 255);
  border-bottom: 1px solid rgb(110, 110, 255);
}
#title {
  position: absolute;
  left: 300px;
  top: 0;
  width: 400px;
  height: 26px;
  line-height: 26px;
  color: #afafaf;
}
.icon-tray {
  background-color: rgba(50, 255, 50, 0.8);
}
.icon-min {
  background-color: rgba(255, 255, 50, 0.8);
}
.icon-close {
  background-color: rgba(255, 50, 50, 0.8);
}
.window-button {
  -webkit-app-region: no-drag;
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  width: 100px;
  height: 26px;
}
.window-button > li {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgb(150, 150, 150);
  margin: auto;
}
.window-button > li:hover {
  cursor: pointer;
  box-shadow: 0px 0px 1px 1px rgb(170, 170, 170);
}
.window-button > li:active {
  box-shadow: none;
}
.icon-svg {
  opacity: 0;
  width: 10px;
  height: 10px;
  stroke: rgb(0, 0, 0, 0.55);

  stroke-width: 1px;
}
.window-button:hover .icon-svg {
  opacity: 1;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toMain(code) {
      window.api.send("control", code);
    },
    redirectPage(path){
      this.$router.push(path)
    }
  },
};
</script>