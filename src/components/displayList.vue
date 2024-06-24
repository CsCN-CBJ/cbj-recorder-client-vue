<template>
  <van-button type="success" @click="onRefresh">刷新</van-button>
  <br>
  <van-list
      :loading="loading"
      :finished="finished"
      :error="error"
      finished-text="没有更多了"
      error-text="数据请求失败"
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
  props: {
    titleList: Array,
    columnWidthList: Array,
    apiPath: String,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      listStatus: 0, // 0: 未加载, 1: limit, 2: 月数据, 3: 所有
    };
  },
  methods: {
    onLoad() {
      this.myVibrate();
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.myRequestGet(this.apiPath, {status: Math.min(this.listStatus + 1, 3)})
            .then((response) => {
              this.list = response.data.map((item) => [item[0], item[1], item[2], item.slice(3).join(' ')])
              this.listStatus++
              this.loading = false
              if (this.listStatus === 3) {
                this.finished = true
              }
            })
            .catch((error) => {
              console.log(error);
              showFailToast(error)
              this.loading = false
              this.error = true
            });
      }, 1000);
    },
    onRefresh() {
      // 重新加载数据
      this.listStatus = 0
      this.onLoad()
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
