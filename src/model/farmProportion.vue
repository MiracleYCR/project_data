<template>
  <div class="farmProportion_container">
    <div class="title">
      <div class="circle">
        <div class="inner"></div>
      </div>
      <span class="text">平台助农</span>
    </div>

    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else id="farmProportionChart"></div>
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

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("farmProportionChart");
          const farmProportionChart = echarts.init(chartDom);

          const totalAmt = [
            self.calculator.plus(
              yuSmartcard[27].incomeAmt,
              yuSelection["data"][27].incomeAmt,
              3271,
              128888
            ),
            self.calculator.plus(
              yuSmartcard[28].incomeAmt,
              yuSelection["data"][28].incomeAmt,
              2667,
              114218
            ),
            self.calculator.plus(
              yuSmartcard[29].incomeAmt,
              yuSelection["data"][29].incomeAmt,
              1896,
              98721
            ),
          ];

          const option = {
            tooltip: {
              trigger: "item",
              formatter: function (params) {
                return `
                  <div>
                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px">
                      <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:orange;"></span>
                      <span>${params.name}</span>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                      "
                    >
                      <span style="margin-right: 50px">智慧农贸</span>
                      <span>${self.calculator
                        .divide(
                          self.calculator.times(
                            params.value[0],
                            totalAmt[params.dataIndex]
                          ),
                          1000000
                        )
                        .toFixed(2)}万元</span>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                      "
                    >
                      <span>渝品甄选</span>
                      <span>${self.calculator
                        .divide(
                          self.calculator.times(
                            params.value[1],
                            totalAmt[params.dataIndex]
                          ),
                          1000000
                        )
                        .toFixed(2)}万元</span>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                      "
                    >
                      <span>农产品展销</span>
                      <span>${self.calculator
                        .divide(
                          self.calculator.times(
                            params.value[2],
                            totalAmt[params.dataIndex]
                          ),
                          1000000
                        )
                        .toFixed(2)}万元</span>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                      "
                    >
                      <span>智慧渝卡通</span>
                      <span>${self.calculator
                        .divide(
                          self.calculator.times(
                            params.value[3],
                            totalAmt[params.dataIndex]
                          ),
                          1000000
                        )
                        .toFixed(2)}万元</span>
                    </div>
                  </div>
                  `;
              },
            },

            textStyle: {
              fontSize: 17,
            },
            radar: {
              indicator: [
                {
                  name: "智慧农贸",
                  max: 100,
                },
                {
                  name: "渝品甄选",
                  max: 1,
                },
                {
                  name: "农产品展销",
                  max: 80,
                },
                {
                  name: "智慧渝卡通",
                  max: 70,
                },
              ],
              splitLine: {
                lineStyle: {
                  width: 1,
                  color: "rgba(0, 211, 255, 0.4)",
                },
              },
              splitArea: {
                show: false,
              },
            },
            legend: {
              orient: "vertical",
              right: 20,
              y: "center",
              itemWidth: 40,
              textStyle: {
                color: "#fff",
                fontWeight: 500,
                padding: [0, 0, 0, 10],
              },
              data: [
                {
                  name: "八月",
                  itemStyle: {
                    color: "rgb(255,127,80)",
                  },
                },
                {
                  name: "九月",
                  itemStyle: {
                    color: "rgb(127,255,0)",
                  },
                },
                {
                  name: "十月",
                  itemStyle: {
                    color: "rgb(0,255,255)",
                  },
                },
              ],
            },
            series: [
              {
                type: "radar",
                data: [
                  {
                    name: "八月",
                    areaStyle: {
                      color: "rgba(255,127,80,0.4)",
                    },
                    symbolSize: 10,
                    itemStyle: {
                      normal: {
                        color: "#fff",
                      },
                    },
                    lineStyle: {
                      color: "rgb(255,127,80)",
                    },
                    value: [
                      self.calculator.times(
                        self.calculator.divide(128888, totalAmt[0]),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(
                          yuSelection["data"][27].incomeAmt,
                          totalAmt[0]
                        ),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(3271, totalAmt[0]),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(
                          yuSmartcard[27].incomeAmt,
                          totalAmt[0]
                        ),
                        100
                      ),
                    ],
                  },
                  {
                    name: "九月",
                    areaStyle: {
                      color: "rgba(127,255,0,0.4)",
                    },
                    symbolSize: 10,
                    itemStyle: {
                      normal: {
                        color: "#fff",
                      },
                    },
                    lineStyle: {
                      color: "rgb(127,255,0)",
                    },
                    value: [
                      self.calculator.times(
                        self.calculator.divide(114218, totalAmt[1]),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(
                          yuSelection["data"][28].incomeAmt,
                          totalAmt[1]
                        ),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(2667, totalAmt[1]),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(
                          yuSmartcard[28].incomeAmt,
                          totalAmt[1]
                        ),
                        100
                      ),
                    ],
                  },
                  {
                    name: "十月",
                    areaStyle: {
                      color: "rgba(0,255,255,0.4)",
                    },
                    symbolSize: 10,
                    itemStyle: {
                      normal: {
                        color: "#fff",
                      },
                    },
                    lineStyle: {
                      color: "rgb(0,255,255)",
                    },
                    value: [
                      self.calculator.times(
                        self.calculator.divide(108726, totalAmt[2]),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(
                          yuSelection["data"][29].incomeAmt,
                          totalAmt[2]
                        ),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(1896, totalAmt[2]),
                        100
                      ),
                      self.calculator.times(
                        self.calculator.divide(
                          yuSmartcard[29].incomeAmt,
                          totalAmt[2]
                        ),
                        100
                      ),
                    ],
                  },
                ],
              },
            ],
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
.farmProportion_container {
  width: 100%;
  height: 100%;
  position: relative;

  .title {
    position: absolute;
    left: 0;
    top: 20px;
    width: 160px;
    height: 45px;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 1px solid #0ab8ff;
    z-index: 100;

    .circle {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid #00d3ff;
      background-color: transparent;
      .inner {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #00d3ff;
      }
    }

    .text {
      font-size: 24px;
      font-weight: bold;
      margin-left: 5px;
      color: #00d3ff;
    }
  }

  #farmProportionChart {
    width: 100%;
    height: 100%;
  }
}
</style>
