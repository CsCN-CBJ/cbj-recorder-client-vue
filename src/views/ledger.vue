<template>

  <optionButtons ref="optionButtons" :buttons-list="buttonsList"/>
  <numInput ref="numInput"/>
  <tagInput ref="tagInput" :all-choices="allChoices"/>
  <commentInput ref="commentInput"/>
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
        'choice': this.$refs.optionButtons.getValue(),
        'amount': this.$refs.numInput.getValue(),
        'tags': this.$refs.tagInput.getValue(),
        'comment': this.$refs.commentInput.getValue(),
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
          .catch((error) => {
            console.log(error);
            showFailToast(error)
          })
    },
  },
};
</script>
