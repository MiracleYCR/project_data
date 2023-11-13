<template>
  <div class="incomeForce_container">
    <div class="title">
      <div class="circle">
        <div class="inner"></div>
      </div>
      <span class="text">增收推力</span>
    </div>
    <div id="incomeForceChart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import yuSmartcard_API from "@/api/yuSmartcard";
import yuSelection_API from "@/api/yuSelection";

export default {
  data() {
    return {};
  },

  mounted() {
    this.getFarmProportionData();
  },

  methods: {
    async getFarmProportionData() {
      try {
        const { data: yuSmartcard } =
          await yuSmartcard_API.fetchTradeDaysIncome();

        const { data: yuSelection } =
          await yuSelection_API.fetchTradeDaysIncome();

        console.log(yuSmartcard, yuSelection);

        this.$nextTick(() => {
          const chartDom = document.getElementById("farmProportionChart");
          const farmProportionChart = echarts.init(chartDom);

          const option = {
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
                  max: 100,
                },
                {
                  name: "农产品展销",
                  max: 100,
                },
                {
                  name: "智慧渝卡通",
                  max: 100,
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
                    value: [42, 76, 60, 35],
                    name: "八月",
                    areaStyle: {
                      color: "rgba(255,127,80,0.5)",
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
                  },
                  {
                    value: [50, 88, 28, 66],
                    name: "九月",
                    areaStyle: {
                      color: "rgba(127,255,0,0.5)",
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
                  },
                  {
                    value: [14, 52, 72, 25],
                    name: "十月",
                    areaStyle: {
                      color: "rgba(0,255,255,0.5)",
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
                  },
                ],
              },
            ],
          };

          option && farmProportionChart.setOption(option);
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
    width: 100%;
    height: 100%;
  }
}
</style>
