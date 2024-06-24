<template>

  <van-row type="flex" justify="center">
    <van-col span="16">
      <van-field label-width="10vw" placeholder="time" v-model="input"/>
    </van-col>
  </van-row>

</template>

<script>

import {showFailToast} from "vant";

export default {
  data() {
    return {
      input: this.getCurrentTimeFormatted(),
    };
  },
  methods: {
    getCurrentTimeFormatted() {
      const now = new Date()
      return `${now.getDate().toString().padStart(2, '0')}`
          + `${now.getHours().toString().padStart(2, '0')}`
          + `${now.getMinutes().toString().padStart(2, '0')}`
    },
    // 供父组件调用
    clear() {
      this.input = this.getCurrentTimeFormatted()
    },
    getValue() {
      return this.input
    },
    checkBeforeSubmit() {
      if (this.input.length !== 6) {
        showFailToast('时间长度必须为6')
        return false
      }
      return true
    }
  },
};

</script>
