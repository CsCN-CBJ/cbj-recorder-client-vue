<template>
  <!-- 深色模式 https://vant-contrib.gitee.io/vant/#/zh-CN/config-provider#shen-se-mo-shi -->
  <van-config-provider :theme="theme"></van-config-provider>
  <van-row justify="space-around">

    <van-col>
      <VanButton type="primary" color="linear-gradient(to right, #000000, #ffffff)" block size="large"
                 @click=onSwapTheme>深/浅
      </VanButton>
    </van-col>

    <van-col>
      <VanButton type="primary" color="green" @click=handleClick2>Home</VanButton>
    </van-col>

    <van-col>
      <VanButton type="primary" color="purple" @click=handleClick1>记账</VanButton>
    </van-col>


    <van-col>
      <VanButton type="primary" color="red" @click=handleClick3>Test</VanButton>
    </van-col>
    <van-col>
      <VanButton type="primary" color="red">Swap</VanButton>
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
  data() {
    return {
      theme: 'dark'
    }
  },
  methods: {
    onSwapTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    },
    handleClick1() {
      this.myVibrate();
      router.replace('/ledger');
    },
    handleClick2() {
      this.myVibrate();
      router.replace('/home');
    },
    handleClick3() {
      this.myVibrate();
      router.replace('/about');
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
