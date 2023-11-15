<template>
  <div class="incomeForce_container">
    <div class="title">
      <div class="circle">
        <div class="inner"></div>
      </div>
      <span class="text">增收推力</span>
    </div>

    <div style="justify-content: space-between"></div>
    <div id="incomeForceChart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { autoHover } from "@/utils";

export default {
  data() {
    return {};
  },

  mounted() {
    this.getIncomeForceData();
  },

  methods: {
    async getIncomeForceData() {
      try {
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
                console.log(params);
                return `
                <div style="width:130px;display:flex;flex-direction:column;">
                  <div style="display:flex;align-items:center;margin-bottom:5px;">
                    <span style="display:inline-block;margin-right:8px;border-radius:12px;width:12px;height:12px;background-color:orange;"></span>
                    <span style="font-size:14px;font-weight:bold;">
                      ${params[0].axisValueLabel}
                    </span>
                  </div>

                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12px;font-weight:500;color:#00d3ff;">${params[0].seriesName}</span>
                    <span style="font-size:12px;">${params[0].value[1]}万元</span>
                  </div>

                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:12px;font-weight:500;color:#FA8072;">${params[1].seriesName}</span>
                    <span style="font-size:12px;">${params[1].value[1]}万元</span>
                  </div>
                </div>      
                `;
              },
            },
            legend: {
              x: "center",
              bottom: 0,
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
                color: "rgba(57, 165, 237, 1)",
              },
            },
            yAxis: {
              type: "value",
              boundaryGap: false,
              axisLabel: {
                fontSize: 15,
                color: "rgba(57, 165, 237, 1)",
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
                data: [
                  ["2022-11", 550],
                  ["2022-12", 640],
                  ["2023-01", 200],
                  ["2023-02", 100],
                  ["2023-03", 300],
                  ["2023-04", 450],
                  ["2023-05", 300],
                  ["2023-06", 250],
                  ["2023-07", 580],
                  ["2023-08", 200],
                  ["2023-09", 200],
                  ["2019-10", 750],
                ],
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
                data: [
                  ["2022-11", 350],
                  ["2022-12", 440],
                  ["2023-01", 0],
                  ["2023-02", 0],
                  ["2023-03", 100],
                  ["2023-04", 250],
                  ["2023-05", 100],
                  ["2023-06", 50],
                  ["2023-07", 380],
                  ["2023-08", 0],
                  ["2023-09", 0],
                  ["2019-10", 550],
                ],
              },
            ],
          };

          option && incomeForceChart.setOption(option);
          autoHover(incomeForceChart, option, 12);
        });
      } catch (err) {
        console.log(err);
      }
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

  #incomeForceChart {
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
    bottom: 0;
  }
}
</style>
