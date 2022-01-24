f<template>
  <div>
    <!-- 第一页 -->
    <div v-show="code === 0">
      <div class="title">运行检测</div>
      <hr class="hr" />

      <div>
        <ul class="check-list-left">
          <li>屏幕分辨率:</li>
          <li>管理员权限:</li>
          <li>应用授权状态:</li>
          <li>是否最新版本:</li>
        </ul>
        <ul class="check-result-left">
          <li>{{ width + " × " + height }}</li>
          <li>已获取</li>
          <li>试用版</li>
          <li>是</li>
        </ul>
      </div>
    </div>

    <!-- 第二页: 参数设置 -->
    <div class="box" v-show="code === 1">
      <div>
        <label for="inputbox">限制价格:</label>
        <input
          id="inputbox"
          class="input"
          type="number"
          v-model="price"
          min="1"
          max="999999999"
        />
      </div>
      <div>
        <label for="inputboxtwo">刷新间隔:</label>
        <input
          id="inputboxtwo"
          class="input-right"
          type="number"
          v-model="interval"
          min="0"
          max="10000"
        />
        <span class="input-title">ms</span>
      </div>
      <div>
        <label for="inputboxthree">延迟识别:</label>
        <input
          id="inputboxthree"
          class="input-right"
          type="number"
          v-model="delay"
          min="0"
          max="10000"
        />
        <span class="input-title">ms</span>
      </div>
      <div>
        <label for="inputboxfour">添加随机:</label>
        <input
          id="inputboxfour"
          class="input-right"
          type="number"
          v-model="randomDelay"
          min="0"
          max="10000"
        />
        <span class="input-title">ms</span>
      </div>
    </div>

    <ul class="box" v-show="code === 2">
      <li>第一步，以<span>全屏窗口模式</span>运行游戏</li>
      <li>第二步，打开交易行，保持交易行窗口的<span>默认位置</span>不变</li>
      <li>第三步，在交易行搜索需要监视的材料名，并<span>以最低价排序</span></li>
      <li>最后，点击<span>运行</span>按钮，并松开鼠标</li>
    </ul>

    <ul class="button">
      <li class="button-main" @click="toRunning">
        {{ text[code] }}
      </li>
      <li class="comeback" v-show="code === 1 || code === 2" @click="comeback">
        返回首页
      </li>
    </ul>

    <!-- 遮罩层 -->
    <div class="top-show-status" v-show="running">
      <svg
        class="quit"
        @click="toStop"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <line x1="0" y1="0" x2="16" y2="16"></line>
        <line x1="16" y1="0" x2="0" y2="16"></line>
      </svg>

      <ul class="mini-message">
        <li>价格识别: {{ result }}</li>
        <li>已刷新: {{ count }} 次</li>
        <li>尝试购买: {{ buys }} 次</li>
        <li>来自后台的系统信息: {{ message }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.title {
  margin: 50px auto auto 50px;
  width: 100px;
  height: 30px;
  line-height: 30px;
}
.hr {
  margin: 0 0 50px 70px;
  width: 790px;
}
.check-list-left > li {
  margin: 0 0 50px 100px;
  font-size: 12px;
  text-align: left;
}
.check-result-left {
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 132px;
  left: 200px;
  width: 100px;
  color: rgb(99, 166, 253);
}
.check-result-left > li {
  margin: 0 0 50px 0;
}

.button {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100px;
}
.button-main {
  position: absolute;
  top: 35px;
  left: 425px;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background: gainsboro;
}
.button-main:hover {
  background: rgb(161, 202, 255);
}
.comeback {
  position: absolute;
  top: 46px;
  left: 490px;
  width: 180px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  text-decoration: underline;
}
.box {
  position: relative;
  top: 80px;
  left: 0;
  width: 700px;
  height: 350px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  align-items: center;
}
.box > div {
  width: 300px;
  height: 120px;
  text-align: center;
  line-height: 100px;
  border: none;
  color: #000;
}
.box > li {
  width: 600px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  font-size: 14px;
}
.box li > span {
  color: red;
  font-weight: bold;
}
.box input {
  margin-left: 16px;
  width: 120px;
  height: 20px;
  outline: none;
  color: #49a4f8;
  letter-spacing: 1px;
  text-align: center;
  box-shadow: 0 0 1px 0px #a8a8a8;
  border-radius: 3px;
}
.input-right {
  width: 100px !important;
  padding-right: 20px;
}
.input-title {
  margin-left: -20px;
  color: #969696;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.top-show-status {
  -webkit-app-region: drag;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #49a4f8;
  z-index: 1000;
}
.quit {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  padding: 5px 10px;
  stroke: #ffffff;
  stroke-width: 1px;
  z-index: 1001;
}
.quit:hover {
  background: rgb(255, 0, 0);
}
.mini-message {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  color: white;
}
.mini-message li {
  margin-left: 20px;
}
</style>
<script>
export default {
  data() {
    return {
      code: 0,
      text: ["开始", "继续", "运行"],
      width: "",
      height: "",
      price: 25,
      interval: 1000,
      delay: 100,
      randomDelay: 100,
      running: false,
    };
  },
  methods: {
    toRunning() {
      if (this.code === 0) {
        this.code += 1;
      } else if (this.code === 1) {
        window.api.send("setdata", {
          price: this.price,
          interval: this.interval,
          delay: this.delay,
          randomDelay: this.randomDelay,
        });
        this.code += 1;
      } else {
        this.running = true;
        window.api.send("toMain", true);
        window.api.send("control", 3);
      }
    },
    toStop() {
      window.api.send("toMain", false);
      window.api.send("control", 4);
      this.running = false;
      this.$emit('clear-data')
    },
    comeback() {
      this.$router.push({ name: "home" });
    },
  },
  props: {
    result: [String, Number],
    count: Number,
    buys: Number,
    message: String,
  },
  emits: ["clear-data"],
  created() {
    this.width = window.screen.width;
    this.height = window.screen.height;
  },
};
</script>