<template>
  <div class="trade_month_income_container">
    <div class="title">月净交易实收</div>

    <div class="trade_month_income_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else id="trade_month_income_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      timer: null,
      loading: false,
    };
  },
  mounted() {
    const chartDom = document.getElementById("trade_month_income_chart");
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
        splitLine: {
          lineStyle: {
            color: "rgba(57, 165, 237, 1)",
          },
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
          fontSize: 12,
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

    let index = 0;
    this.timer = setInterval(() => {
      tradeMonthIncomeChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index % 4,
      });
      index++;
      tradeMonthIncomeChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index % 4,
      });
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.trade_month_income_container {
  position: relative;
  width: 454px;
  height: 300px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/images/box.png");

  .title {
    height: 20px;
    color: #0ab8ff;
    font-size: 20px;
    font-weight: 800;
    margin-top: 6px;
    margin-left: 19px;
    display: flex;
    align-items: center;
  }

  .trade_month_income_body {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
    bottom: 10px;

    #trade_month_income_chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
