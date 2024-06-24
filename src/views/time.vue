<template>

  <optionButtons ref="optionButtons" page="time"/>
  <timeInput ref="timeInput"/>
  <tagInput ref="tagInput" page="time"/>
  <commentInput ref="commentInput"/>
  <br>
  <van-space size="10vw">
    <van-button type="success" @click="onSubmit('break')">断点</van-button>
    <van-button type="success" @click="onSubmit('start')">开始</van-button>
    <van-button type="success" @click="onSubmit('end')">结束</van-button>
  </van-space>
  <br><br>
  <displayList
      :title-list="['开始时间', '结束时间', '种类', '标签 备注']"
      :column-width-list="[4, 4, 3, 12]"
      api-path="/get/time"
  />

</template>

<script>
import {showFailToast} from 'vant';
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
