<template>
  <!-- 深色模式 https://vant-contrib.gitee.io/vant/#/zh-CN/config-provider#shen-se-mo-shi -->
  <van-config-provider :theme="theme"></van-config-provider>
  <van-row justify="space-around">

    <van-col>
      <VanButton color="#426579" @click="onNavigate('/home')">Home</VanButton>
    </van-col>

    <van-col>
      <VanButton color="#D69090" @click="onNavigate('/ledger')">记账</VanButton>
    </van-col>

    <van-col>
      <VanButton color="#F4606C" @click="onNavigate('/time')">时间</VanButton>
    </van-col>

    <van-col>
      <VanButton color="#D1BA74" @click="onNavigate('/login')">登录</VanButton>
    </van-col>

  </van-row>
  <van-space wrap size="20vw">

  </van-space>

  <!-- 放具体路由页面的内容 -->
  <RouterView></RouterView>
</template>

<script>
import router from './router';


export default {
  beforeCreate() {
    document
        .querySelector('body')
        .setAttribute('style', 'background-color:#6C99C2')
  },

  data() {
    return {
      theme: 'light'
    }
  },
  methods: {
    onSwapTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    },
    onNavigate(path) {
      this.myVibrate();
      router.replace(path);
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

:root:root {
  --van-white: #f3f2e0;
  --van-gray-1: #BEE7E9;

  --van-field-placeholder-text-color: #b0b0b0;

  --van-button-default-color: #606060;
  --van-button-default-background: #ECBDB4;
  --van-button-default-border-color: #ECBDB4;
  --van-button-success-background: #8CC7B5;

  --van-number-keyboard-background: #ECBDB4;
  --van-number-keyboard-button-background: #8CC7B5;

  --van-list-text-color: #000000;
}

</style>
