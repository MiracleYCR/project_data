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
import { autoHover } from "@/utils";

import common_API from "@/api/common";
import smartFarm_API from "@/api/smartFarm";
import yuSmartcard_API from "@/api/yuSmartcard";
import yuSelection_API from "@/api/yuSelection";
import farmProduct_API from "@/api/farmProduct";
import { defaultIncomeAmt } from "@/mock/incomeForce";

export default {
  data() {
    return {
      timer: null,
      loading: true,
    };
  },

  mounted() {
    this.getTradeMonthIncomeData();
  },

  methods: {
    async getTradeMonthIncomeData() {
      try {
        const self = this;

        // 渝卡通
        const { data: jiangNanHongData } =
          await common_API.fetchSmartCardDefaultData();
        const { data: yuSmartcard } =
          await yuSmartcard_API.fetchTradeMonthIncome();

        // 渝品甄选
        const { data: yuSelection } =
          await yuSelection_API.fetchTradeMonthIncome();

        // 渝水农产品展销
        const { data: farmProduct } =
          await farmProduct_API.fetchTradeMonthIncome();

        // 渝控通
        const { data: smartFarm } = await smartFarm_API.fetchTradeMonthIncome();

        // 展示月份
        const monthList = yuSmartcard.map((item) => item.monthStr);

        // 展示数据
        const dataList = monthList.map((date, index) => {
          // 渝卡通江南红数据
          const curDateJiangNanHongData = jiangNanHongData[date];

          const amt = this.calculator.plus(
            // 渝卡通
            defaultIncomeAmt.yuSmartcard[date] ||
              this.calculator.plus(
                yuSmartcard[index].incomeAmt,
                curDateJiangNanHongData ? curDateJiangNanHongData.tradeAmt : 0
              ),
            // 渝品甄选
            defaultIncomeAmt.yuSelection[date] ||
              yuSelection["data"][index].incomeAmt,
            // 渝控通
            defaultIncomeAmt.smartFarm[date] || smartFarm[index].incomeAmt,
            // 渝水农产品展销
            defaultIncomeAmt.farmProduct[date]
              ? this.calculator.plus(
                  defaultIncomeAmt.farmProduct[date],
                  farmProduct["data"][index].incomeAmt
                )
              : farmProduct["data"][index].incomeAmt
          );

          return amt === 0 ? null : [date, amt];
        });

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("trade_month_income_chart");
          const tradeMonthIncomeChart = echarts.init(chartDom);

          const option = {
            tooltip: {
              trigger: "item",
              position: "top",
              textStyle: {
                color: "#ffffff",
              },
              borderColor: "rgba(0, 0, 0, 0.6)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              formatter: (params) => {
                return `
                  <div style="display:flex;flex-direction:column;">
                    <div style="display:flex;align-items:center;justify-content:center;margin-bottom:5px;font-weight:bold;color:orange;font-size:16px">
                      ${params.value[0]}
                    </div>

                    <div style="display:flex;align-items:center;justify-content:center;font-weight:500;">
                      ${self.calculator
                        .divide(params.value[1], 10000)
                        .toFixed(2)}万元
                    </div>
                  </div>
                `;
              },
            },
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
                formatter: (value) => {
                  return `${self.calculator.divide(value, 10000)}万元`;
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(57, 165, 237, 1)",
                },
              },
            },
            xAxis: {
              type: "category",
              data: monthList,
              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                fontSize: 11,
                rotate: 45,
                color: "rgba(57, 165, 237, 1)",
                formatter: function (value) {
                  return value;
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
                itemStyle: {
                  color: "#ffffff",
                },
                symbol: "circle",
                symbolSize: 8,
                emphasis: {
                  scale: 1.5,
                  itemStyle: {
                    color: "#0ab8ff",
                  },
                },
                data: dataList,
              },
            ],
          };

          option && tradeMonthIncomeChart.setOption(option);

          // 自动下标
          const tipIndexList = dataList
            .map((item, index) => {
              return item === null ? index : null;
            })
            .filter((item) => item !== null)
            .sort((a, b) => b - a);
          autoHover(tradeMonthIncomeChart, option, tipIndexList[0] + 1, 12);
        });
      } catch (err) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.trade_month_income_container {
  position: relative;
  width: 462px;
  height: 305px;
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
