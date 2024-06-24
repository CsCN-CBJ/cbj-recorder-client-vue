<template>

  <optionButtons ref="optionButtons" :buttons-list="buttonsList"/>
  <timeInput ref="timeInput"/>
  <tagInput ref="tagInput" :all-choices="allChoices"/>
  <commentInput ref="commentInput"/>
  <br>
  <van-space size="10vw">
    <van-button type="success" @click="onSubmit('break')">断点</van-button>
    <van-button type="success" @click="onSubmit('start')">开始</van-button>
    <van-button type="success" @click="onSubmit('end')">结束</van-button>
  </van-space>
  <br><br>
  <displayList
      :title-list="['开始日期', '结束日期', '种类', '标签 备注']"
      :column-width-list="[4, 4, 3, 12]"
      api-path="/get/time"
  />

</template>

<script>
import {showFailToast} from 'vant';
import {ref} from 'vue';
import axios from 'axios'
import optionButtons from "@/components/optionButtons.vue";
import timeInput from "@/components/timeInput.vue";
import tagInput from "@/components/tagInput.vue";
import commentInput from "@/components/commentInput.vue";
import displayList from "@/components/displayList.vue";

export default {
  components: {
    optionButtons,
    timeInput,
    tagInput,
    commentInput,
    displayList,
  },
  data() {
    return {}
  },
  setup() {
    let buttonsList = ref([]);
    let allChoices = ref([]);

    axios.get(process.env.VUE_APP_SERVER_URL + "/options?p=time")
        .then((result) => {
          buttonsList.value = result.data;
        })
        .catch((error) => {
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
    onSubmit(action) {
      this.myVibrate();
      // 提交前检查
      if (
          !this.$refs.timeInput.checkBeforeSubmit()
          || !this.$refs.tagInput.checkBeforeSubmit()
      ) return;
      // 获取表单数据并提交
      let data = {
        'choice': this.$refs.optionButtons.getValue(),
        'time': this.$refs.timeInput.getValue(),
        'tags': this.$refs.tagInput.getValue(),
        'comment': this.$refs.commentInput.getValue(),
        'action': action,
      };
      console.log(data);
      this.myRequestPostWithHandler("/add/time", data)
          .then((ret) => {
            if (!ret) return;
            // 提交成功后清空表单
            this.$refs.optionButtons.clear();
            this.$refs.timeInput.clear();
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
