<template>
  <div>
    <van-button round type="primary"
                v-for="(button, index) in buttons"
                :key="index" @click="handleButtonClick(button)">
      {{ button.text }}
    </van-button>
  </div>
</template>

<script>

export default {
  props: {
    buttons: {
      type: Array,
      required: true,
    }
  },
  methods: {
    handleButtonClick(button) {
      // 把按钮的值传递给父组件
      this.$emit('buttonClicked', button.value);
      this.myVibrate();
    },
  },
};
</script>
  