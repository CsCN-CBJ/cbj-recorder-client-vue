<template>
  <van-field label-width="10vw" placeholder="请输入口令" v-model="input"/>
  <van-button type="primary" @click="onSubmitToken">提交</van-button>
  <div>{{ status }}</div>
</template>

<script>
import axios from "axios";

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
      axios.post(process.env.VUE_APP_SERVER_URL + "/login", {
        passwd: this.input
      }).then(res => {
        if (res.data === 'success') {
          this.status = 1
          this.$cookies.set('token', this.input, '30d')
        } else {
          this.status = 2
        }
      }).catch(err => {
        console.log(err)
        this.status = 3
      })
    }
  }
}
</script>
