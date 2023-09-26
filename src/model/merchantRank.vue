<template>
  <div class="merchant_rank_container">
    <div class="title">商户排行</div>

    <div class="merchant_rank_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else id="merchant_rank_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { currency } from "@/utils";
import {
  generateMerchantsTop6,
  generateGoodsTop6HistoryAmt,
} from "@/mock/merchant";

export default {
  data() {
    return {
      timer: null,
      loading: false,
    };
  },

  mounted() {
    this.drawMerchantRankDataChart();

    this.timer = setInterval(() => {
      this.drawMerchantRankDataChart();
    }, 3 * 60 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    drawMerchantRankDataChart() {
      const chartDom = document.getElementById("merchant_rank_chart");
      const merchantRankChart = echarts.init(chartDom);

      const merchantAmtTop6 = generateGoodsTop6HistoryAmt();

      const merchantRankData = generateMerchantsTop6().map((item, index) => {
        return {
          name: item,
          value: merchantAmtTop6[index],
        };
      });

      const option = {
        grid: {
          top: "15%", // 上边距
          bottom: "0", // 下边距
          left: "0", // 左边距
          right: "18%",
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
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              barWidth: 20,
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
                  `${value.value}.${Math.floor(Math.random() * 9)}${Math.floor(
                    Math.random() * 9
                  )}`,
                  2,
                  true
                );
              },
            },
            data: merchantRankData.map((item) => item.value).reverse(), // 柱状图数据
          },
        ],
      };

      option && merchantRankChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.merchant_rank_container {
  position: relative;
  width: 504px;
  height: 240px;
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
}
</style>
