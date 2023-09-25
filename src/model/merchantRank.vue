<template>
  <border-box
    boxType="mini"
    boxTitle="商户排行"
    :customStyle="{
      width: '504px',
      height: '222px',
    }"
  >
    <div slot="boxContent" class="merchant_rank_container">
      <div id="merchant_rank_chart"></div>
    </div>
  </border-box>
</template>

<script>
import * as echarts from "echarts";
import BorderBox from "../components/borderBox.vue";

export default {
  components: {
    BorderBox,
  },

  mounted() {
    const chartDom = document.getElementById("merchant_rank_chart");
    const merchantRankChart = echarts.init(chartDom);

    const merchantRankData = [
      {
        name: "商户名1",
        value: 17948416,
      },
      {
        name: "商户名2",
        value: 17248416,
      },
      {
        name: "商户名3",
        value: 16328416,
      },
      {
        name: "商户名4",
        value: 12128416,
      },
      {
        name: "商户名5",
        value: 1761416,
      },
      {
        name: "商户名6",
        value: 17338416,
      },
      {
        name: "商户名7",
        value: 1412416,
      },
    ];

    const option = {
      grid: {
        top: "0", // 上边距
        bottom: "0", // 下边距
        left: "0", // 左边距
        right: "15%",
        containLabel: true,
      },
      xAxis: {
        show: false,
        type: "value",
      },
      yAxis: {
        type: "category",
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "rgba(57, 165, 237, 1)",
        },
        data: merchantRankData.map((item) => item.name).reverse(), // Y 轴刻度数据
      },
      series: [
        {
          type: "bar",
          itemStyle: {
            barWidth: 20,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                //只要修改前四个参数就ok
                offset: 0,
                color: "#2F9FFF",
              }, //柱图渐变色
              {
                offset: 1,
                color: "#B366FF",
              },
            ]),
          },
          label: {
            show: true,
            align: "left",
            position: "right",
            verticalAlign: "middle",
            color: "rgba(0, 241, 255, 1)",
          },
          data: merchantRankData.map((item) => item.value).reverse(), // 柱状图数据
        },
      ],
    };

    option && merchantRankChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.merchant_rank_container {
  position: absolute;
  top: 60px;
  left: 30px;
  right: 30px;
  bottom: 5px;

  #merchant_rank_chart {
    width: 100%;
    height: 100%;
  }
}
</style>
