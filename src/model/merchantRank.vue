<template>
  <div class="merchant_rank_container">
    <div class="title">
      <span>商户排行</span>
      <span>（历史销售额/元）</span>
    </div>

    <div class="merchant_rank_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else id="merchant_rank_chart"></div>
    </div>

    <div v-show="yAxisTipVisible" class="yAxis-tip" :style="yAxisTipStyle">
      {{ yAxisTipText }}
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { currency } from "@/utils";
import common_API from "@/api/common";
import smartFarm_API from "@/api/smartFarm";
import yuSmartcard_API from "@/api/yuSmartcard";
import yuSelection_API from "@/api/yuSelection";
import farmProduct_API from "@/api/farmProduct";

import { jiangNanHongDefaultData } from "@/mock/smartCard";

export default {
  data() {
    return {
      timer: null,
      loading: true,

      yAxisTipVisible: false,
      yAxisTipText: "",
      yAxisTipStyle: {
        left: "0px",
        top: "0px",
      },
    };
  },

  mounted() {
    this.getMerchantRankData();

    this.timer = setInterval(() => {
      this.getMerchantRankData();
    }, 30 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getMerchantRankData() {
      try {
        // 渝卡通
        const { data: jiangNanHongData } =
          await common_API.fetchSmartCardDefaultData();
        const { data: yuSamrtcard } = await yuSmartcard_API.fetchMerchantRank();
        // 渝品甄选
        const { data: yuSelection } = await yuSelection_API.fetchTotalData();
        // 渝水农产品展销
        const { data: farmProduct } = await farmProduct_API.fetchMerchantRank();
        // 渝控通
        const { data: smartFarm } = await smartFarm_API.fetchMerchantRank();

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("merchant_rank_chart");
          const merchantRankChart = echarts.init(chartDom);

          const allMerchantRankData = [
            {
              merchant: "江南红",
              salesAmt: this.calculator.plus(
                jiangNanHongDefaultData.tradeAmt,
                Object.entries(jiangNanHongData).reduce(
                  (pre, next) => this.calculator.plus(pre, next[1].tradeAmt),
                  0
                )
              ),
            },
            ...yuSamrtcard.slice(0, 7),
            ...farmProduct.data.slice(0, 8),
            ...smartFarm.slice(0, 8),
            {
              merchant: "渝品甄选商城",
              salesAmt: yuSelection["data"][0].totalAmt,
            },
          ];

          const merchantRankData = allMerchantRankData
            .map((item) => {
              return {
                name: item.merchant,
                value: item.salesAmt,
              };
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 8);

          const option = {
            grid: {
              top: "12%", // 上边距
              bottom: "0", // 下边距
              left: "0", // 左边距
              right: "16%",
              containLabel: true,
            },
            xAxis: {
              show: false,
              type: "value",
            },
            yAxis: {
              type: "category",
              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                formatter: (value) => {
                  const maxChars = 7;
                  if (value.length > maxChars) {
                    return value.slice(0, maxChars) + "...";
                  }
                  return value;
                },
                color: "rgba(57, 165, 237, 1)",
              },
              data: merchantRankData.map((item) => item.name).reverse(),
              triggerEvent: true,
            },
            series: [
              {
                type: "bar",
                barGap: 36,
                itemStyle: {
                  barWidth: 30,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "#2F9FFF",
                    },
                    {
                      offset: 1,
                      color: "#B366FF",
                    },
                  ]),
                },
                label: {
                  show: true,
                  align: "left",
                  position: "right",
                  verticalAlign: "middle",
                  color: "rgba(0, 241, 255, 1)",
                  formatter: (value) => {
                    return currency(
                      `${value.value}.${Math.floor(
                        Math.random() * 9
                      )}${Math.floor(Math.random() * 9)}`,
                      2,
                      true
                    );
                  },
                },
                data: merchantRankData.map((item) => item.value).reverse(),
              },
            ],
          };

          merchantRankChart.on("mouseover", "yAxis.category", (e) => {
            this.yAxisTipText = e.value;
            this.yAxisTipStyle = Object.assign(this.yAxisTipStyle, {
              top: `${e.event.offsetY}px`,
              left: `${e.event.offsetX}px`,
            });
            this.yAxisTipVisible = true;
          });
          merchantRankChart.on("mouseout", "yAxis.category", () => {
            this.yAxisTipText = "";
            this.yAxisTipStyle = Object.assign(this.yAxisTipStyle, {
              top: "0px",
              left: "0px",
            });
            this.yAxisTipVisible = false;
          });

          option && merchantRankChart.setOption(option);
        });
      } catch (err) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.merchant_rank_container {
  position: relative;
  width: 504px;
  height: 250px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/images/box2@2x.png");

  .title {
    height: 20px;
    margin-top: 10px;
    margin-left: 24px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 800;
    color: #0ab8ff;

    span {
      &:last-child {
        font-size: 15px;
      }
    }
  }

  .merchant_rank_body {
    position: absolute;
    top: 40px;
    left: 30px;
    right: 30px;
    bottom: 5px;

    #merchant_rank_chart {
      width: 100%;
      height: 100%;
    }
  }

  .yAxis-tip {
    position: absolute;
    padding: 5px 5px;
    font-size: 12px;
    line-height: 18px;
    color: #ffffff;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
