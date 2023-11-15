<template>
  <div class="farmProportion_container">
    <div class="title">
      <div class="circle">
        <div class="inner"></div>
      </div>
      <span class="text">平台助农</span>
    </div>
    <div id="farmProportionChart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { autoHover } from "@/utils";

export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {};
  },

  mounted() {
    this.getFarmProportionData();
  },

  methods: {
    async getFarmProportionData() {
      try {
        const self = this;

        this.$nextTick(() => {
          const chartDom = document.getElementById("farmProportionChart");
          const farmProportionChart = echarts.init(chartDom);

          console.log(
            self.chartData[0].partProportion.map((amt) => {
              return self.calculator.times(
                self.calculator.divide(amt, self.chartData[0].totalAmt),
                100
              );
            }),
            self.chartData[1].partProportion.map((amt) => {
              return self.calculator.times(
                self.calculator.divide(amt, self.chartData[1].totalAmt),
                100
              );
            }),
            self.chartData[2].partProportion.map((amt) => {
              return self.calculator.times(
                self.calculator.divide(amt, self.chartData[2].totalAmt),
                100
              );
            })
          );

          const option = {
            tooltip: {
              trigger: "item",
              padding: 10,
              textStyle: {
                color: "#ffffff",
              },
              borderColor: "rgba(0, 0, 0, 0.6)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              formatter: function (params) {
                return `
                  <div>
                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px">
                      <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${
                        params.data.lineStyle.color
                      };"></span>
                      <span style="color:${params.data.lineStyle.color}">
                        ${params.name}
                      </span>
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
                            self.chartData[params.dataIndex].totalAmt
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
                            self.chartData[params.dataIndex].totalAmt
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
                            self.chartData[params.dataIndex].totalAmt
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
                            self.chartData[params.dataIndex].totalAmt
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
              color: "#ffffff",
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
                    name: self.chartData[0].month,
                    areaStyle: {
                      color: "rgba(255,127,80,0.4)",
                    },
                    symbolSize: 8,
                    itemStyle: {
                      normal: {
                        color: "#ffffff",
                      },
                    },
                    lineStyle: {
                      color: "rgb(255,127,80)",
                    },
                    value: self.chartData[0].partProportion.map((amt) => {
                      return self.calculator.times(
                        self.calculator.divide(amt, self.chartData[0].totalAmt),
                        100
                      );
                    }),
                  },
                  {
                    name: self.chartData[1].month,
                    areaStyle: {
                      color: "rgba(127,255,0,0.4)",
                    },
                    symbolSize: 8,
                    itemStyle: {
                      normal: {
                        color: "#ffffff",
                      },
                    },
                    lineStyle: {
                      color: "rgb(127,255,0)",
                    },
                    value: self.chartData[1].partProportion.map((amt) => {
                      return self.calculator.times(
                        self.calculator.divide(amt, self.chartData[1].totalAmt),
                        100
                      );
                    }),
                  },
                  {
                    name: self.chartData[2].month,
                    areaStyle: {
                      color: "rgba(0,255,255,0.4)",
                    },
                    symbolSize: 8,
                    itemStyle: {
                      normal: {
                        color: "#ffffff",
                      },
                    },
                    lineStyle: {
                      color: "rgb(0,255,255)",
                    },
                    value: self.chartData[2].partProportion.map((amt) => {
                      return self.calculator.times(
                        self.calculator.divide(amt, self.chartData[2].totalAmt),
                        100
                      );
                    }),
                  },
                ],
              },
            ],
          };

          option && farmProportionChart.setOption(option);

          autoHover(farmProportionChart, option, 3);
        });
      } catch (err) {
        console.log(err);
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
