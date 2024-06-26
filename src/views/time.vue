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
      ref="displayList"
      :title-list="['开始时间', '结束时间', '种类', '标签 备注']"
      :column-width-list="[4, 4, 3, 12]"
      api-path="/get/time"
      :maxListLevel="1"
  />
  <van-space size="10vw">
    <van-field placeholder="请输入日期: yymmdd" v-model="date"/>
    <van-button type="success" @click="initEcharts">画图</van-button>
  </van-space>
  <div
      class="echart"
      ref="myChart"
      id="myChart"
  ></div>

</template>

<script>
import * as echarts from "echarts";
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
  data() {
    return {
      date: this.getCurrentDateFormatted(),
      chart: undefined,
    }
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
            // 提交后刷新
            setTimeout(() => {
              this.$refs.displayList.onRefresh()
            }, 2000)
          })
          .catch((error) => {
            console.log(error);
            showFailToast(error)
          })
    },
    initEcharts() {
      this.myVibrate();
      this.myRequestGetWithHandler("/get/time", {'status': this.date})
          .then((ret) => {
            const option = {
              title: {
                text: "CBJ时间统计: " + `20${this.date.slice(0, 2)}年${this.date.slice(2, 4)}月${this.date.slice(4)}日`,
              },
              series: {
                type: "pie",
                label: {
                  show: true,
                  // formatter: "{b} : {c}h ({d}%)" // b代表名称，c代表对应值，d代表百分比
                  formatter: "{b}: {c}h",
                  overflow: "none",
                  backgroundColor: "transparent",
                  color: "black",
                  fontSize: 13,
                },
                center: ["50%", "50%"],
                radius: '50%',
                data: ret,
              },
            };
            if (this.chart) {
              this.chart.setOption(option);
              return;
            }
            this.chart = echarts.init(this.$refs.myChart);// 图标初始化
            this.chart.setOption(option);// 渲染页面
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
              this.chart.resize();
            });
          })
    },
    getCurrentDateFormatted() {
      const now = new Date()
      console.log(now.getMonth())
      return `${now.getFullYear().toString().slice(2)}`
          + `${(now.getMonth() + 1).toString().padStart(2, '0')}`
          + `${now.getDate().toString().padStart(2, '0')}`
    },
  },
};
</script>

<style scoped>
.echart {
  width: 100%; /* 或具体宽度 */
  height: 400px; /* 或具体高度 */
  position: relative; /* 用于绝对定位legend等组件 */
}
</style>
