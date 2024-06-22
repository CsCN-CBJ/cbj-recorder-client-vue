<template>

  <van-row type="flex" justify="center">
    <van-col span="16">
      <van-field readonly clickable label="￥" label-width="10vw" placeholder="请输入金额"
                 v-model="showValue" @click="show = true"/>
      <van-number-keyboard theme="custom"
                           :show="show" :title="'￥'+value" :hide-on-click-outside="false" :maxlength="maxlength"
                           extra-key="." close-button-text="确定"
                           @input="handleInput" @delete="handleDelete" @close="handleClose" @blur="show = false">
      </van-number-keyboard>
    </van-col>
  </van-row>

</template>

<script>
import {Field, NumberKeyboard, showFailToast} from 'vant';

export default {
  data() {
    return {
      value: '',
      show: false,
      showValue: '',
      maxlength: 8,
    }
  },
  components: {
    [Field.name]: Field,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  methods: {
    handleInput(key) {
      this.myVibrate();
      if (this.value === '' && key === '.') {
        // 第一个输入是小数点
        this.value = '0.';
      } else if (
          this.value.length === this.maxlength || // value过长
          (this.value.indexOf('.') !== -1 && key === '.') || // 已经有小数点了
          (this.value.indexOf('0') !== -1 && this.value.length === 1 && key === 0) || // 重复输入前缀0
          (/\.\d{2}$/.test(this.value)) //
      ) {
        // do noting
      } else if (this.value === '0' && key !== '.') {
        // 第一个输入是0，后面只能输入小数点
        this.value = '' + key;
      } else {
        this.value += key;
      }
    },
    handleDelete() {
      this.myVibrate();
      if (!this.value) {
        return;
      }
      this.value = this.value.substring(0, this.value.length - 1);
    },
    handleClose() {
      this.myVibrate();
      // 去掉结尾的小数点
      if (this.value.indexOf('.') === this.value.length - 1) {
        this.value = this.value.substring(0, this.value.length - 1);
      }
      // 设置显示的值
      this.show = false;
      this.showValue = this.value;
    },

    // 供父组件调用
    clear() {
      this.value = '';
      this.showValue = '';
      this.show = false;
    },
    getValue() {
      return this.value;
    },
    checkBeforeSubmit() {
      if (this.value !== this.showValue) {
        showFailToast('请点击确定按钮');
        return false;
      }
      if (this.value === '') {
        showFailToast('请输入金额');
        return false;
      }
      return true;
    },
  }
}
</script>
