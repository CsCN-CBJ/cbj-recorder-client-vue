<template>
    <div>
    <van-field readonly label="￥" clickable v-model="showValue" @click="show = true" placeholder="请输入金额" />
    <van-number-keyboard theme="custom" 
        :show="show" :title="'￥'+value" :hide-on-click-outside="false" :maxlength="maxlength" extra-key="."
        @input="handleInput"  @delete="handleDelete" @close="handleClose"  close-button-text="确定"
        @blur="show = false" >
    </van-number-keyboard>
    <div>{{ value }}</div>
    </div>

</template>

<script>
import { Field, NumberKeyboard } from 'vant';
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
            if (this.value === '' && key === '.') {
                // 第一个输入是小数点
                this.value = '0.';
            } else if (this.value.indexOf('.') !== -1 && key === '.') {
                // 已经有小数点了
                return;
            } else if (this.value.indexOf('0') !== -1 && this.value.length === 1 && key === 0) {
                // 重复输入前缀0
                return;
            } else if (this.value === '0' && key !== '.') {
                // 第一个输入是0，后面只能输入小数点
                this.value = '' + key;
            } else if (/\.\d{2}$/.test(this.value)) {
                return;
            } else {
                this.value += key;
            }
        },
        handleDelete(){
            if(!this.value) {
                return;
            }
            this.value = this.value.substring(0, this.value.length - 1);
        },
        handleClose() {
            // 去掉结尾的小数点
            if (this.value.indexOf('.') === this.value.length - 1) {
                this.value = this.value.substring(0, this.value.length - 1);
            }
            // 设置显示的值
            this.show = false;
            this.showValue = this.value;
            this.$emit('input', this.value);
        }
    }
  }
</script>
