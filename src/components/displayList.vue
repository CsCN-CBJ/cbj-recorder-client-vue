<template>
  <van-button type="success" @click="onLoad">刷新</van-button>
  <br>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-row justify="center">
      <van-col v-for="(item, index) in titleList" :span="columnWidthList[index]" :key="item">
        <van-cell center :key="item" :title="item" class="list-title"/>
      </van-col>
    </van-row>

    <van-row v-for="row in list" justify="center" :key="row">
      <van-col v-for="(item, index) in row" :span="columnWidthList[index]" :key="item">
        <van-cell center :key="item" :title="item.trim() === '' ? '-' : item" class="list-value"/>
      </van-col>
    </van-row>
  </van-list>

</template>

<script>

import {showFailToast} from "vant";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      titleList: ['日期', '类型', '金额', '标签 备注'],
      columnWidthList: [4, 4, 3, 12],
    };
  },
  methods: {
    onLoad() {
      this.myVibrate();
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.myRequestGet('/get/ledger')
            .then((response) => {
              this.list = response.data.map((item) => [item[0], item[1], item[2], item[3] + ' ' + item[4]])
            })
            .catch((error) => {
              console.log(error);
              showFailToast(error)
            });

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        this.finished = true;
      }, 1000);
    },
  },
};

</script>

<style scoped>
.list-title {
  text-align: center;
  --van-cell-horizontal-padding: 0;
  color: var(--van-button-default-color);
  --van-cell-background: #ecbdb4;
  --van-cell-value-color: #606060;
  --van-cell-border-color: #000000;
}
.list-value {
  text-align: center;
  --van-cell-horizontal-padding: 0;
  color: var(--van-button-default-color);
}
</style>
