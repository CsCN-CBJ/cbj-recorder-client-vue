<template>

  <van-row type="flex" justify="center">
    <van-col span="16">
      <van-field label-width="10vw" placeholder="comment" v-model="comment" @input="onInput" @blur="onInput"/>
    </van-col>
  </van-row>
  <div>{{comment}}</div>

</template>

<script>

export default {
  data() {
    return {
      comment: '',
    };
  },
  methods: {
    onInput() {
      this.$emit('input', this.comment);
    },
    clear() {
      this.comment = '';
      this.$emit('input', this.comment);
    },
  },
};

</script>
