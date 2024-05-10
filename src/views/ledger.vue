<template>

  <buttonGroup v-for="(buttons, id) in filteredButtonsList" :key="id" :buttons="buttons"
               @buttonClicked="handleTypeChoice(id, $event)"/>

  <numInput @input="inputAmount = $event"/>
  <div>{{ typeStr }}</div>
  <div>{{ inputAmount }}</div>

</template>

<script>
import {showToast} from 'vant';
import {ref} from 'vue';
import axios from 'axios'
import buttonGroup from '../components/buttonGroup.vue'
import numInput from '../components/numInput.vue'

export default {
  components: {
    buttonGroup,
    numInput,
  },
  computed: {
    filteredButtonsList() {
      return this.buttonsList.filter((item) => item != 0 || item.length);
    }
  },
  data() {
    return {
      typeStr: new Array(parseInt(process.env.VUE_APP_DEF_TYPE_LENGTH)).fill(process.env.VUE_APP_DEF_DEFAULT),
      inputAmount: '0',
    };
  },
  setup() {
    // 初始化buttonsList
    let buttonsList = ref(Array.from({length: process.env.VUE_APP_DEF_TYPE_LENGTH}, () => ([])));
    let options = [];
    axios.get(process.env.VUE_APP_SERVER_URL + "/options?index=1")
        .then(function (result) {
          options = result.data;
          console.log(options);
          buttonsList.value[0] = options;
        })
        .catch(function (error) {
          console.log(error);
          showToast(error)
        })

    return {
      buttonsList,
    };
  },

  methods: {
    getOptions(index, choice) {
      return axios.get(process.env.VUE_APP_SERVER_URL + "/options", {
        params: {
          'index': index,
          'choice': choice
        }
      });
    },

    handleTypeChoice(index, value) {
      // 阻止其超过长度
      if (index >= this.typeStr.length) return;

      // 清空后面的选项
      for (let i = index + 1; i < process.env.VUE_APP_DEF_TYPE_LENGTH; i++) {
        this.typeStr[i] = process.env.VUE_APP_DEF_DEFAULT;
        this.buttonsList[i] = [];
      }
      this.typeStr[index] = value;
      console.log(this.typeStr.join(''));

      // 获取下一级选项
      this.getOptions(index + 2, value)
          .then((result) => {
            this.buttonsList[index + 1] = result.data;
            console.log(result.data);
          })
          .catch((error) => {
            console.log(error);
            showToast(error)
          })
    },
  },
};
</script>
