<template>

  <optionButtons ref="optionButtons" :buttons-list="buttonsList" @input="choiceList = $event"/>
  <numInput ref="numInput" @input="inputAmount = $event"/>
  <tagInput ref="tagInput" placeholder="输入tag" :all-choices="allChoices" @input="inputTag = $event"/>
  <commentInput ref="commentInput" @input="comment = $event"/>
  <br>
  <van-button type="success" @click="onSubmit">提交</van-button>
  <br><br>
  <displayList/>

</template>

<script>
import {showFailToast} from 'vant';
import {ref} from 'vue';
import axios from 'axios'
import optionButtons from "@/components/optionButtons.vue";
import numInput from '@/components/numInput.vue'
import tagInput from "@/components/tagInput.vue";
import commentInput from "@/components/commentInput.vue";
import displayList from "@/components/displayList.vue";

export default {
  components: {
    optionButtons,
    numInput,
    tagInput,
    commentInput,
    displayList,
  },
  data() {
    return {
      choiceList: [],
      inputAmount: '0',
      inputTag: '',
      comment: '',
    };
  },
  setup() {
    let buttonsList = ref([]);
    let allChoices = ref([]);

    axios.get(process.env.VUE_APP_SERVER_URL + "/options")
        .then(function (result) {
          buttonsList.value = result.data;
        })
        .catch(function (error) {
          console.log(error);
          showFailToast(error)
        })
    axios.get(process.env.VUE_APP_SERVER_URL + "/tags")
        .then((result) => {
          allChoices.value = result.data;
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
    onSubmit() {
      this.myVibrate();
      // 提交前检查
      if (
          !this.$refs.numInput.checkBeforeSubmit()
          || !this.$refs.tagInput.checkBeforeSubmit()
      ) return;
      // 获取表单数据并提交
      let data = {
        'choice': this.choiceList.join(''),
        'amount': this.inputAmount,
        'tags': this.inputTag,
        'comment': this.comment,
      };
      console.log(data);
      this.myRequestPostWithHandler("/ledger", data)
          .then((ret) => {
            if (!ret) return;
            // 提交成功后清空表单
            this.$refs.optionButtons.clear();
            this.$refs.numInput.clear();
            this.$refs.tagInput.clear();
            this.$refs.commentInput.clear();
          })
    },
  },
};
</script>
