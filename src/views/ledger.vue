<template>

  <optionButtons ref="optionButtons" page="ledger"/>
  <numInput ref="numInput"/>
  <tagInput ref="tagInput" page="ledger"/>
  <commentInput ref="commentInput"/>
  <br>
  <van-button type="success" @click="onSubmit">提交</van-button>
  <br><br>
  <displayList
      :title-list="['日期', '类型', '金额', '标签 备注']"
      :column-width-list="[4, 4, 3, 12]"
      api-path="/get/ledger"
  />

</template>

<script>
import {showFailToast} from 'vant';
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
      this.myRequestPostWithHandler("/add/ledger", data)
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
