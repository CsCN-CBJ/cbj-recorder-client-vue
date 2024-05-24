<template>
  <van-button type="success" @click="onLoad">刷新</van-button>
  <br>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-config-provider :theme-vars="titleTheme">
      <van-row justify="center">
        <van-col v-for="item in titleRow" :span="4" :key="item">
          <van-cell center :key="item" :value="item === '' ? '-' : item"/>
        </van-col>
      </van-row>
    </van-config-provider>

    <van-row v-for="row in list" justify="center" :key="row">
      <van-col v-for="item in row" :span="4" :key="item">
        <van-cell border center :key="item" :value="item === '' ? '-' : item"/>
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
      titleRow: ['日期', '类型', '金额', '标签', '备注'],
      titleTheme: {
        cellBackground: "#ecbdb4",
        cellValueColor: "#606060",
        cellBorderColor: "#000000",
      },
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
              this.list = response.data;
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
