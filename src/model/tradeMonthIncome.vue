<template>
  <border-box
    boxTitle="月净交易实收"
    :customStyle="{
      width: '454px',
      height: '300px',
    }"
  >
    <div slot="boxContent" id="trade_month_income_container">123132</div>
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
    const chartDom = document.getElementById("trade_month_income_container");
    const tradeMonthIncomeChart = echarts.init(chartDom);

    const option = {
      grid: {
        top: "10%",
        bottom: "10%",
        left: "0",
        right: "0",
        containLabel: true,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "rgba(57, 165, 237, 1)",
        },
      },
      xAxis: {
        type: "category",
        data: [
          "1-月",
          "2-月",
          "3-月",
          "4-月",
          "5-月",
          "6-月",
          "7-月",
          "8-月",
          "9-月",
          "10-月",
          "11-月",
          "12-月",
        ],
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: "rgba(57, 165, 237, 1)",
          formatter: function (value) {
            return value.split("-").join("\n");
          },
        },
      },

      series: [
        {
          type: "line",
          lineStyle: {
            width: 4,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#2F9FFF",
              },
              {
                offset: 0.5,
                color: " #E16387",
              },
              {
                offset: 1,
                color: "#F8A573",
              },
            ]),
          },
          symbol: "circle",
          symbolSize: [8, 8],
          itemStyle: {
            color: "#ffffff",
          },
          data: [
            621, 746, 683, 867, 912, 973, 881, 994, 1059, 1207, 1388, 1486,
          ],
        },
      ],
    };

    option && tradeMonthIncomeChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
#trade_month_income_container {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 10px;
}
</style>
