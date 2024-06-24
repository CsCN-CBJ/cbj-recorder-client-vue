<template>

  <van-config-provider v-for="(buttons, level) in filteredButtonsList" :theme-vars="themeVars[level]" :key="level">
    <van-button round
                v-for="(button, index) in buttons" :class="choiceList[level] === button.value ? 'button-selected' : ''"
                :key="index" @click="handleTypeChoice(level, button.value)">
      {{ button.text }}
    </van-button>
  </van-config-provider>

</template>

<script>

import {ref} from "vue";
import axios from "axios";
import {showFailToast} from "vant";

export default {
  data() {
    return {
      choiceList: new Array(parseInt(process.env.VUE_APP_DEF_TYPE_LENGTH)).fill(process.env.VUE_APP_DEF_DEFAULT),
      themeVars: [
        {
          buttonDefaultBackground: '#ecbdb4',
          buttonDefaultBorderColor: '#ecbdb4',
        },
        {
          buttonDefaultBackground: '#ecb4d0',
          buttonDefaultBorderColor: '#ecb4d0',
        },
        {
          buttonDefaultBackground: '#d9b4ec',
          buttonDefaultBorderColor: '#d9b4ec',
        },
      ],
    };
  },
  props: {
    page: String,
  },
  setup(props) {
    let buttonsList = ref([]);
    axios.get(process.env.VUE_APP_SERVER_URL + "/options?p=" + props.page)
        .then(function (result) {
          buttonsList.value = result.data;
        })
        .catch(function (error) {
          console.log(error);
          showFailToast(error)
        })
    return {
      buttonsList,
    };
  },
  computed: {
    filteredButtonsList() {
      // 将原始的 buttonsList 转换为一个二维数组, 以便在模板中使用
      let ret = [this.buttonsList] // 由于上面的 v-for 中不会使用children字段, 所以这个可以看作是第一行
      for (let i = 0; i < this.choiceList.length; i++) {

        let choice = this.choiceList[i]
        if (choice === process.env.VUE_APP_DEF_DEFAULT) break

        // 寻找匹配项及其children
        let find = ret[i].find(item => item.value === choice)
        if (!find || !find.children) break
        ret.push(find.children)

      }
      return ret
    }
  },
  methods: {
    handleTypeChoice(index, value) {
      this.myVibrate();
      // 阻止其超过长度
      if (index >= this.choiceList.length - 1) return;

      // 清空后面的选项
      for (let i = index + 1; i < process.env.VUE_APP_DEF_TYPE_LENGTH; i++) {
        this.choiceList[i] = process.env.VUE_APP_DEF_DEFAULT;
      }
      this.choiceList[index] = value;
    },

    // 供父组件调用
    clear() {
      this.choiceList = new Array(parseInt(process.env.VUE_APP_DEF_TYPE_LENGTH)).fill(process.env.VUE_APP_DEF_DEFAULT);
    },
    getValue() {
      return this.choiceList.join('');
    },
  },
};

</script>

<style scoped>
.button-selected {
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>
