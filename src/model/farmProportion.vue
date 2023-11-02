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

        // const maxYuSmartcard = yuSmartcard
        //   .slice()
        //   .sort((a, b) => b.incomeAmt - a.incomeAmt)[0].incomeAmt;

        // const maxYuSelection = yuSelection.data
        //   .slice()
        //   .sort((a, b) => b.totalAmt - a.totalAmt)[0].totalAmt;

        // const maxA = 150000;
        // const maxB = 5000;

        // const maxTotal = self.calculator.plus(
        //   maxYuSmartcard,
        //   maxYuSelection,
        //   150000,
        //   5000
        // );

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("farmProportionContainer");
          const farmProportionChart = echarts.init(chartDom);

          const option = {
            tooltip: {
              trigger: "item",
            },
            textStyle: {
              fontSize: 17,
            },
            visualMap: {
              top: "middle",
              right: 20,
              min: 5,
              max: 15,
              color: ["#F8A573", "#E16387", "#2F9FFF"],
              textStyle: {
                color: "#fff",
              },
              backgroundColor: "rgba(0, 0, 0, 0)",
              calculable: true,
              formatter: function (value) {
                if (value === 5) return 0;
                if (value === 15) return 20;
                return self.calculator
                  .mapNumberToRange(value, 5, 15, 0, 20)
                  .toFixed(4);
              },
            },
            radar: {
              indicator: [
                {
                  name: "智慧农贸",
                  max: 95,
                },
                {
                  name: "渝品甄选",
                  max: 20,
                },
                {
                  name: "农产品展销",
                  max: 20,
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
                  self.calculator.divide(a, total) * 100,
                  self.calculator.divide(
                    yuSelection["data"][index].totalAmt,
                    total
                  ) * 100,
                  self.calculator.divide(b, total) * 100,
                  self.calculator.divide(yuSmartcard[index].incomeAmt, total) *
                    100
                );

                series.push({
                  type: "radar",
                  symbol: "none",
                  lineStyle: {
                    width: 1,
                  },
                  emphasis: {
                    areaStyle: {
                      color: "rgba(0, 250, 0, 0.3)",
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
