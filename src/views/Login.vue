<template>
  <div>
    <form class="user-login" @keyup.enter="login('login')">
      <label for="">账号</label>
      <input type="text" v-model="this.user.phone" />
      <label for="">密码</label>
      <input type="password" v-model="this.user.password" />
      <button @click="login('login')">login</button>
      {{ this.message }}
    </form>
    
  </div>
</template>
<style scoped>
.user-login {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(199, 199, 199);
}
</style>
<script>
export default {
  data() {
    return {
      user: {
        phone: "18215558307",
        password: "admin",
      },
      message: null,
    };
  },
  methods: {
    async login(path) {
      try {
        const res = await fetch(`http://www.zhaozone.link:520/${path}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            phone: this.user.phone,
            password: this.user.password,
          }),
        });
        const { key, data } = await res.json();

        if (!key) window.localStorage.setItem("token", key);
        this.message = data;
        console.log({ code: "登陆成功", data });
      } catch (e) {
        this.message = e;
        console.log({ code: "登陆失败", e });
      }
    },
  },
};
</script>