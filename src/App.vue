<template>
  <!-- 深色模式 https://vant-contrib.gitee.io/vant/#/zh-CN/config-provider#shen-se-mo-shi -->
  <van-config-provider :theme="theme" ></van-config-provider>
  <VanButton type="primary" color="linear-gradient(to right, #ffffff, #000000)" block size="large" @click=onSwapTheme>深/浅</VanButton>
  <br><br>
  <VanButton type="primary" block size="large" @click=handleClick2>Home</VanButton>
  <br><br>
  <VanButton type="primary" block size="large" @click=handleClick1>Swap</VanButton>

  <!-- 放具体路由页面的内容 -->
  <RouterView></RouterView>
</template>

<script>
import router from './router';


export default {
  data() {
    return {
      theme: 'dark'
    }
  },
  methods: {
    onSwapTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      console.log(process.env.VUE_APP_LEDGER_TOP_COMMON_MEALS)
      console.log(process.env.VUE_APP_LEDGER_TOP_SNACKS)
    },
    handleClick1() {
      router.replace('/about');
    },
    handleClick2() {
      router.replace('/home');
    },
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>
