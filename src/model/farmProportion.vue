<template>
  <div class="farm_proportion_container">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div id="farmProportionContainer"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import yuSmartcard_API from "@/api/yuSmartcard";
import yuSelection_API from "@/api/yuSelection";

export default {
  data() {
    return {
      loading: true,
    };
  },

  mounted() {
    this.getFarmProportionData();
  },

  methods: {
    async getFarmProportionData() {
      try {
        const { data: yuSmartcard } =
          await yuSmartcard_API.fetchTradeMonthIncome();

        const { data: yuSelection } =
          await yuSelection_API.fetchTradeMonthIncome();

        console.log(yuSelection);

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("farmProportionContainer");
          const farmProportionChart = echarts.init(chartDom);

          const dateList = yuSmartcard.map((item) => item.monthStr);

          const option = {
            visualMap: {
              top: "middle",
              right: 20,
              color: [
                "rgba(248, 165, 115, 1)",
                "rgba(225, 99, 135, 1)",
                "#0ab8ff",
              ],
              textStyle: {
                color: "#fff",
              },
              backgroundColor: "rgba(0, 0, 0, 0)",
              calculable: true,
            },
            radar: {
              indicator: [
                { text: "智慧农贸", min: 0 },
                { text: "渝品甄选", min: 0 },
                { text: "农产品展销", min: 0 },
                { text: "智慧渝卡通", min: 0 },
              ],
              splitLine: {
                lineStyle: {
                  width: 1,
                  color: "rgba(0, 211, 255, 0.5)",
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
              return dateList.map((date, index) => {
                return {
                  type: "radar",
                  symbol: "none",
                  lineStyle: {
                    width: 1.2,
                  },
                  emphasis: {
                    areaStyle: {
                      color: "#00F1FF",
                    },
                  },
                  data: [
                    {
                      value: [
                        (40 - index) * 500,
                        yuSelection["data"][index].totalAmt,
                        index * 20 + 200,
                        yuSmartcard[index].incomeAmt,
                      ],
                      name: date,
                    },
                  ],
                };
              });
            })(),
          };

          option && farmProportionChart.setOption(option);
        });
      } catch (err) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.farm_proportion_container {
  width: 100%;
  height: 100%;

  #farmProportionContainer {
    width: 100%;
    height: 100%;
  }
}
</style>
