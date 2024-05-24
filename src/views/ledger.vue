<template>

  <van-config-provider v-for="(buttons, level) in filteredButtonsList" :theme-vars="themeVars[level]" :key="level">
    <van-button round
                v-for="(button, index) in buttons" :class="typeStr[level] === button.value ? 'button-selected' : ''"
                :key="index" @click="handleTypeChoice(level, button.value)">
      {{ button.text }}
    </van-button>
  </van-config-provider>

  <numInput ref="numInput" @input="inputAmount = $event"/>
  <tagInput ref="tagInput" placeholder="输入tag" :all-choices="allChoices" @input="inputTag = $event"/>
  <van-row type="flex" justify="center">
    <van-col span="16">
      <van-field label-width="10vw" placeholder="comment" v-model="comment"/>
    </van-col>
  </van-row>
  <br>
  <van-button type="success" @click="onSubmit">提交</van-button>
  <br><br>
  <displayList/>

</template>

<script>
import {showFailToast} from 'vant';
import {ref} from 'vue';
import axios from 'axios'
import numInput from '@/components/numInput.vue'
import tagInput from "@/components/tagInput.vue";
import displayList from "@/components/displayList.vue";

export default {
  components: {
    numInput,
    tagInput,
    displayList,
  },
  computed: {
    filteredButtonsList() {
      return this.buttonsList.filter((item) => item.length);
    }
  },
  data() {
    return {
      typeStr: new Array(parseInt(process.env.VUE_APP_DEF_TYPE_LENGTH)).fill(process.env.VUE_APP_DEF_DEFAULT),
      inputAmount: '0',
      inputTag: '',
      comment: '',
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
          buttonDefaultBackground:'#d9b4ec',
          buttonDefaultBorderColor:'#d9b4ec',
        },
      ],
    };
  },
  setup() {
    // 初始化buttonsList
    let buttonsList = ref(Array.from({length: process.env.VUE_APP_DEF_TYPE_LENGTH}, () => ([])));
    let options = ref([]);
    let allChoices = ref([]);
    axios.get(process.env.VUE_APP_SERVER_URL + "/options")
        .then(function (result) {
          options = result.data;
          console.log(options);
          buttonsList.value[0] = options;
        })
        .catch(function (error) {
          console.log(error);
          showFailToast(error)
        })
    axios.get(process.env.VUE_APP_SERVER_URL + "/tags")
        .then((result) => {
          allChoices.value = result.data;
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
          showFailToast(error)
        })

    return {
      buttonsList,
      allChoices,
    };
  },

  methods: {
    handleTypeChoice(index, value) {
      this.myVibrate();
      // 阻止其超过长度
      if (index >= this.typeStr.length - 1) return;

      // 清空后面的选项
      for (let i = index + 1; i < process.env.VUE_APP_DEF_TYPE_LENGTH; i++) {
        this.typeStr[i] = process.env.VUE_APP_DEF_DEFAULT;
        this.buttonsList[i] = [];
      }
      this.typeStr[index] = value;

      // 获取下一级选项
      let choice = this.typeStr.filter(i => i !== process.env.VUE_APP_DEF_DEFAULT).join('');
      this.myRequestGet("/options", {'choice': choice})
          .then((result) => {
            this.buttonsList[index + 1] = result.data;
            console.log(result.data);
          })
          .catch((error) => {
            console.log(error);
            showFailToast(error)
          })
    },
    onSubmit() {
      // 提交前检查
      if (
          !this.$refs.numInput.checkBeforeSubmit()
          || !this.$refs.tagInput.checkBeforeSubmit()
      ) return;
      // 获取表单数据并提交
      let data = {
        'choice': this.typeStr.join(''),
        'amount': this.inputAmount,
        'tags': this.inputTag,
        'comment': this.comment,
      };
      console.log(data);
      if (!this.myRequestPostWithHandler("/ledger", data)) return;
      // 提交成功后清空表单
      this.$refs.numInput.clear();
      this.$refs.tagInput.clear();
      this.buttonsList = this.buttonsList.map((elem, index) => index === 0 ? elem : []); // 保留第一行选项按钮
      this.typeStr = this.typeStr.map(() => process.env.VUE_APP_DEF_DEFAULT);
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