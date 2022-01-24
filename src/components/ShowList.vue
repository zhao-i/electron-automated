<template>
  <div id="wrap">
    <template v-for="(game, index) in games" :key="index">
      <router-link :to="game.path" class="nav-list">
        <img :src="game.src" class="icon-position" />
        <span class="icon-title">{{ game.name }}</span>
        <div class="scroll-bar"></div>
      </router-link>
    </template>

    <svg width="100" height="100" viewBox="0 0 100 100" class="svg-position">
      <line x1="30" y1="50" x2="70" y2="50"></line>
      <line x1="50" y1="30" x2="50" y2="70"></line>
    </svg>
  </div>
</template>
<style scoped>
#wrap {
  position: absolute;
  top: 26px;
  left: 0;
  width: 70px;
  height: 600px;
  background: whitesmoke;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
}
.icon-position {
  display: block;
  margin: 15px auto 0px auto;
  width: 50px;
  height: 50px;
  background-size: cover;
  border-radius: 20%;
  box-shadow: 0 0 5px 5px rgba(160, 160, 160, 0.25);
}
.icon-title {
  display: block;
  overflow: hidden;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}
.nav-list {
  display: block;
  position: relative;
  color: rgb(141, 141, 141);
}
.scroll-bar {
  position: absolute;
  top: 8px;
  left: 0;
  width: 4px;
  height: 34px;
  background: rgb(99, 166, 253);
  opacity: 0;
  transition: opacity 0.3s ease-out 0s;
}
.nav-list:hover .scroll-bar,
.nav-list:hover .icon-title {
  opacity: 1;
  color: black;
}
.nav-list.router-link-exact-active .scroll-bar,
.nav-list.router-link-exact-active .icon-title {
  opacity: 1;
  color: rgb(99, 166, 253);
}
.svg-position {
  margin: 20px 0px;
  width: 40px;
  height: 40px;
  fill: none;
  stroke-width: 4px;
  stroke: rgb(141, 141, 141);
  border-radius: 50%;
  box-shadow: 0px 0px 1px 1px rgb(141, 141, 141);
  opacity: 0;
  transition: opacity 0.3s ease-out 0s;
}
.svg-position:hover {
  stroke: rgb(99, 166, 253);
  box-shadow: 0px 0px 1px 1px rgb(99, 166, 253);
}
#wrap:hover .svg-position {
  opacity: 1;
}
</style>
<script>
export default {
  data() {
    return {
      games: [
        {
          name: "超激斗梦境",
          path: "/f",
          src: require("../assets/fight.png"),
        },
        {
          name: "逆水寒",
          path: "/n",
          src: require("../assets/n.png"),
        },
        {
          name: "天下3",
          path: "/tx3",
          src: require("../assets/tx3.png"),
        },
        {
          name: "原神",
          path: "/ys",
          src: require("../assets/ys.png"),
        },
        {
          name: "英雄联盟",
          path: "/lol",
          src: require("../assets/lol.png"),
        },
      ],
      other: undefined,
    };
  },
};
</script>