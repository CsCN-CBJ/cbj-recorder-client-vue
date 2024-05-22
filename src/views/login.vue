<template>
  <van-field label-width="10vw" placeholder="请输入口令" v-model="input"/>
  <br>
  <van-button type="success" @click="onSubmitToken">提交</van-button>
  <div>{{ status }}</div>
</template>

<script>
import axios from "axios";
import {showFailToast} from "vant";

export default {
  data() {
    return {
      input: '',
      status: 0,
    }
  },
  methods: {
    onSubmitToken() {
      console.log(this.input)
      this.$cookies.set('token', this.input, '30d')
      axios.post(process.env.VUE_APP_SERVER_URL + "/login", {
        passwd: this.input
      }).then(res => {
        if (res.data === 'success') {
          this.status = 1
        } else {
          this.status = 2
        }
      }).catch(err => {
        console.log(err)
        showFailToast(err)
        this.status = 3
      })
    }
  }
}
</script>
