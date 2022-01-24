<template>
  <div>
    <window-control></window-control>
    <show-list
      v-show="showlist"
    ></show-list>
    <router-view
      class="all-views"
      :class="{ 'gameslist-hidden': !showlist }"
      :count="count"
      :buys="buys"
      :result="result"
      :message="message"
      @clear-data="closeScript"
    ></router-view>
  </div>
</template>
<style>
html,
body,
div,
ul,
li,
nav,
header,
footer,
input,
section,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  border: 0;
}
ul,
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
body {
  overflow: hidden;
}
#app {
  width: 1000px;
  height: 626px;
  user-select: none;
  font-family: Arial, "宋体", "微软雅黑";
  font-size: 14px;
  text-align: center;
  color: rgb(131, 131, 131);
  background-color: #f5f5f5;
}

.all-views {
  position: absolute;
  top: 26px;
  left: 70px;
  right: 0px;
  width: 930px;
  height: 600px;
}
.gameslist-hidden {
  left: 35px;
  right: 35px;
  transition: left ease 0.5s;
}
</style>
<script>
import WindowBar from "./components/WindowBar.vue";
import ShowList from "./components/ShowList.vue";

export default {
  data() {
    return {
      showlist: true,
      count: 0,
      buys: 0,
      result: 0,
      message: "",
    };
  },
  methods: {
    classifyData(code, data) {
      switch (code) {
        case 1:
          this.count = data;
          break;
        case 2:
          this.buys = data;
          break;
        case 3:
          this.result = data;
          break;
        case 4:
          this.message = data + "  —— " + new Date();
          break;
        default:
          console.log("非法端口");
          break;
      }
    },
    closeScript() {
      setTimeout(() => {
        this.count = 0;
        this.buys = 0;
        this.result = 0;
        this.message = 0;
      }, 1000);
    },
  },
  components: {
    "window-control": WindowBar,
    "show-list": ShowList,
  },
  mounted() {
    //count=1,buys=2,result=3,message=4
    window.api.receive("toRender", ({code,data}) => this.classifyData(code, data));
  },
};
</script>
