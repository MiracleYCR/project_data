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
        const self = this;

        const { data: yuSmartcard } =
          await yuSmartcard_API.fetchTradeDaysIncome();

        const { data: yuSelection } =
          await yuSelection_API.fetchTradeDaysIncome();

        const dateList = yuSmartcard.map((item) => item.dayStr);

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("farmProportionContainer");
          const farmProportionChart = echarts.init(chartDom);

          const option = {
            textStyle: {
              fontSize: 17,
            },
            visualMap: {
              top: "middle",
              right: 20,
              min: 0,
              max: 20,
              color: [
                "#AC3B2A",
                "#AA069F",
                "#FD0100",
                "#FC7D02",
                "#FBDB0F",
                "#93CE07",
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
                {
                  name: "智慧农贸",
                  max: 100,
                },
                {
                  name: "渝品甄选",
                  max: 20,
                },
                {
                  name: "农产品展销",
                  max: 10,
                },
                {
                  name: "智慧渝卡通",
                  max: 20,
                },
              ],
              splitLine: {
                lineStyle: {
                  width: 1,
                  color: "rgba(0, 211, 255, 0.5)",
                },
              },
              splitArea: {
                show: false,
              },
            },
            series: (() => {
              const series = [];

              dateList.forEach((date, index) => {
                const a = 100000 + 10000 * (Math.random() * (5 - 1) + 1);
                const b = 1000 * (Math.random() * (5 - 1) + 1);

                const total = self.calculator.plus(
                  a,
                  yuSelection["data"][index].totalAmt,
                  b,
                  yuSmartcard[index].incomeAmt
                );

                console.log(
                  self.calculator.divide(a, total),
                  self.calculator.divide(
                    yuSelection["data"][index].totalAmt,
                    total
                  ),
                  self.calculator.divide(b, total),
                  self.calculator.divide(yuSmartcard[index].incomeAmt, total)
                );

                series.push({
                  type: "radar",
                  symbol: "none",
                  lineStyle: {
                    width: 1,
                  },
                  emphasis: {
                    areaStyle: {
                      color: "rgba(0,250,0,0.3)",
                    },
                  },
                  data: [
                    {
                      value: [
                        self.calculator.divide(a, total) * 100,
                        self.calculator.divide(
                          yuSelection["data"][index].totalAmt,
                          total
                        ) * 100,
                        self.calculator.divide(b, total) * 100,
                        self.calculator.divide(
                          yuSmartcard[index].incomeAmt,
                          total
                        ) * 100,
                      ],
                      name: date,
                    },
                  ],
                });
              });

              return series;
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
