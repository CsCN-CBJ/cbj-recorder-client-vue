<template>

  <van-row type="flex" justify="center">
    <van-col span="16">
      <van-field label-width="10vw" placeholder="comment" v-model="comment"/>
    </van-col>
  </van-row>

</template>

<script>

export default {
  data() {
    return {
      comment: '',
    };
  },
  methods: {
    // 供父组件调用
    clear() {
      this.comment = '';
    },
    getValue() {
      return this.comment;
    },
  },
};

</script>
