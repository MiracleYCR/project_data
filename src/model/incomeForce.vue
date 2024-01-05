<template>
  <div class="incomeForce_container">
    <div class="title" @click="toggleChangeChartType">
      <div class="circle">
        <div class="inner"></div>
      </div>
      <span class="text">增收推力</span>
    </div>

    <div style="justify-content: space-between"></div>

    <div class="incomeForceChart_container">
      <div id="incomeForceChart"></div>
    </div>
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
    this.getIncomeForceData();
  },

  methods: {
    async getIncomeForceData() {
      try {
        const self = this;

        this.$nextTick(() => {
          const chartDom = document.getElementById("incomeForceChart");
          const incomeForceChart = echarts.init(chartDom);

          const option = {
            tooltip: {
              trigger: "axis",
              position: "top",
              padding: 10,
              textStyle: {
                color: "#ffffff",
              },
              borderColor: "rgba(0, 0, 0, 0.6)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              formatter: (params) => {
                const flag = params.length > 1;

                return `
                <div style="width:130px;display:flex;flex-direction:column;">
                  <div style="display:flex;align-items:center;margin-bottom:5px;">
                    <span style="display:inline-block;margin-right:8px;border-radius:12px;width:12px;height:12px;background-color:orange;"></span>
                    <span style="font-size:14px;font-weight:bold;">
                      ${params[0].axisValueLabel}
                    </span>
                  </div>

                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12px;font-weight:500;color:#00d3ff;">${
                      params[0].seriesName
                    }</span>
                    <span style="font-size:12px;">
                      ${self.calculator
                        .divide(params[0].value[1] || 0, 10000)
                        .toFixed(2)}万元
                    </span>
                  </div>

                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12px;font-weight:500;color:#FA8072;">
                      ${flag ? params[1].seriesName : "平台助农"}
                    </span>
                    <span style="font-size:12px;">
                      ${
                        flag
                          ? self.calculator
                              .divide(params[1].value[1] || 0, 10000)
                              .toFixed(2) + "万元"
                          : "暂无数据"
                      }
                    </span>
                  </div>
                </div>
                `;
              },
            },
            legend: {
              x: "center",
              bottom: 10,
              itemGap: 40,
              itemWidth: 40,
              itemHeight: 20,
              icon: "roundRect",
              data: [
                {
                  name: "供应商销售",
                  textStyle: {
                    color: "#00d3ff",
                    fontSize: 18,
                    fontWeight: 500,
                    rich: {
                      a: {
                        verticalAlign: "middle",
                      },
                    },
                    padding: [0, -2, -4, 4],
                  },
                  itemStyle: {
                    color: "#00d3ff",
                  },
                },
                {
                  name: "平台助农",
                  textStyle: {
                    color: "#FA8072",
                    fontSize: 18,
                    fontWeight: 500,
                    rich: {
                      a: {
                        verticalAlign: "middle",
                      },
                    },
                    padding: [0, -2, -4, 4],
                  },
                  itemStyle: {
                    color: "#FA8072",
                  },
                },
              ],
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              axisLabel: {
                interval: 0,
                fontSize: 13,
                fontWeight: 500,
                padding: [5, 0, 0, 0],
                color: "rgba(57, 165, 237, 1)",
              },
            },
            yAxis: {
              type: "value",
              boundaryGap: false,
              axisLabel: {
                fontSize: 14,
                fontWeight: 500,
                padding: [0, 5, 0, 0],
                color: "rgba(57, 165, 237, 1)",
                formatter: (value) => {
                  return `${self.calculator.divide(value, 10000)}万元`;
                },
              },
              splitArea: {
                interval: "atuo",
                show: true,
                areaStyle: {
                  color: ["rgba(0, 211, 255, 0.35)", "rgba(0, 211, 255, 0.15)"],
                },
              },
              splitLine: {
                show: false,
              },
            },
            series: [
              {
                type: "line",
                name: "供应商销售",
                smooth: true,
                symbol: "none",
                lineStyle: {
                  width: 2,
                  color: "#00d3ff",
                },
                areaStyle: {
                  color: "#00d3ff",
                },
                data: this.chartData[0],
              },
              {
                type: "line",
                name: "平台助农",
                smooth: true,
                symbol: "none",
                lineStyle: {
                  width: 2,
                  color: "#FA8072",
                },
                areaStyle: {
                  color: "#FA8072",
                },
                data: this.chartData[1],
              },
            ],
          };
          option && incomeForceChart.setOption(option);

          // 自动提示下标
          const tipIndexList = this.chartData[1]
            .map((item, index) => {
              return item[1] === null ? index : null;
            })
            .filter((item) => item !== null)
            .sort((a, b) => b - a);
          autoHover(incomeForceChart, option, tipIndexList[0] + 1, 12);
        });
      } catch (err) {
        console.log(err);
      }
    },

    toggleChangeChartType() {
      this.$emit("changeChartType");
    },
  },
};
</script>

<style lang="scss" scoped>
.incomeForce_container {
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
    cursor: pointer;

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

  .incomeForceChart_container {
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
    bottom: 0;
    padding-left: 45px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    #incomeForceChart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
