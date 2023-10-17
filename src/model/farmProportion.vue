<template>
  <div class="farm_proportion_container" id="farmProportionContainer"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },

  mounted() {
    const chartDom = document.getElementById("farmProportionContainer");
    const farmProportionChart = echarts.init(chartDom);

    const option = {
      // tooltip: {
      //   trigger: "item",
      // },
      visualMap: {
        top: "middle",
        right: 20,
        color: [
          "rgba(248, 165, 115, 1)",
          "rgba(225, 99, 135, 1)",
          "rgba(47, 159, 255, 1)",
        ],
        textStyle: {
          color: "#fff",
        },
        backgroundColor: "rgba(0, 0, 0, 0)",
        calculable: true,
      },
      radar: {
        indicator: [
          { text: "智慧农贸", max: 400, min: 30 },
          { text: "渝品甄选", max: 400, min: 40 },
          { text: "农产品展销", max: 400, min: 50 },
          { text: "智慧渝卡通", max: 400, min: 60 },
        ],
        splitLine: {
          lineStyle: {
            width: 2,
            color: "rgba(10, 184, 255, 1)",
          },
        },
        splitArea: {
          areaStyle: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      },
      textStyle: {
        fontSize: 17,
      },
      series: (function () {
        var series = [];
        for (var i = 0; i <= 20; i++) {
          series.push({
            type: "radar",
            symbol: "none",
            lineStyle: {
              width: 1,
            },
            emphasis: {
              areaStyle: {
                color: "#00F1FF",
              },
            },
            data: [
              {
                value: [
                  (40 - i) * 10,
                  (38 - i) * 4 + 60,
                  i * 5 + 10,
                  i * 9,
                  (i * i) / 2,
                ],
                name: i + 2000 + "",
              },
            ],
          });
        }
        return series;
      })(),
    };

    option && farmProportionChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.farm_proportion_container {
  width: 100%;
  height: 100%;
}
</style>
