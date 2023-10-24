<template>
  <div class="merchant_ratio_container">
    <div class="title">商户占比</div>

    <div class="merchant_ratio_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else id="merchant_ratio_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import yuSmartcard_API from "@/api/yuSmartcard";

export default {
  data() {
    return {
      timer: null,
      loading: true,
    };
  },

  mounted() {
    this.getMerchantRatioData();
  },

  methods: {
    async getMerchantRatioData() {
      try {
        // 渝卡通数据
        const { data: yuSamrtcard } =
          await yuSmartcard_API.fetchMerchantRatio();

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("merchant_ratio_chart");
          const merchantRatioChart = echarts.init(chartDom);

          const merchantRatioData = [
            {
              name: yuSamrtcard[0].channel,
              value: yuSamrtcard[0].count,
              children: yuSamrtcard[0].category.map((item) => ({
                name: item.name,
                value: item.count,
              })),
            },
            {
              name: "渝品甄选",
              value: 9,
              children: [
                { name: "自营", value: 2 },
                { name: "品牌", value: 3 },
                { name: "合伙", value: 4 },
              ],
            },
            {
              name: "展销馆",
              value: 50,
              children: [
                { name: "大规模生产", value: 2 },
                { name: "小规模生产", value: 12 },
                { name: "一般生产", value: 15 },
                { name: "源头生产", value: 8 },
                { name: "散户", value: 13 },
              ],
            },
            {
              name: "农贸市场",
              value: 271,
              children: [
                { name: "蔬菜瓜果", value: 103 },
                { name: "水产品", value: 56 },
                { name: "禽蛋", value: 23 },
                { name: "肉类及其制品", value: 12 },
                { name: "粮食及其制品", value: 26 },
                { name: "豆制品", value: 18 },
                { name: "熟食", value: 24 },
                { name: "调味品、土特产", value: 9 },
              ],
            },
          ];

          const option = {
            series: [
              {
                type: "pie",
                radius: [0, "50%"],
                startAngle: -280,
                label: {
                  position: "inside",
                  fontSize: 9,
                  color: "#fff",
                  formatter: (params) => {
                    return `${params.name}\n${params.percent}%`;
                  },
                },
                labelLine: {
                  show: false,
                },
                labelLayout: {
                  hideOverlap: false,
                },
                data: merchantRatioData.map((item) => {
                  return {
                    name: item.name,
                    value: item.value,
                  };
                }),
                animationType: "scale", // 设置动画类型为缩放
                animationEasing: "elasticOut", // 设置动画缓动效果
                animationDuration: 2000, // 设置动画持续时间（毫秒）
              },

              {
                type: "pie",
                radius: ["65%", "80%"],
                startAngle: -280,
                labelLine: {
                  show: true,
                  lineStyle: {
                    color: "#fff",
                  },
                },
                label: {
                  alignTo: "edge",
                  minMargin: 2,
                  edgeDistance: 10,
                  lineHeight: 12,
                  formatter: "{name|{b}}\n{number|{c}}",
                  rich: {
                    name: {
                      fontSize: 12,
                      color: "rgba(57, 165, 237, 1)",
                    },
                    number: {
                      fontSize: 11,
                      color: "rgba(0, 241, 255, 1)",
                    },
                  },
                },
                labelLayout: {
                  hideOverlap: false,
                },
                data: merchantRatioData.reduce((result, item) => {
                  return result.concat(
                    item.children.map((child) => {
                      return {
                        name: child.name,
                        value: child.value,
                      };
                    })
                  );
                }, []),
              },
            ],
          };

          option && merchantRatioChart.setOption(option);

          let highlightIndex = 0;

          this.timer = setInterval(() => {
            merchantRatioChart.dispatchAction({
              type: "downplay",
              seriesIndex: 0,
              dataIndex: highlightIndex % 4,
            });

            highlightIndex++;

            merchantRatioChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: highlightIndex % 4,
            });
          }, 3000);
        });
      } catch (err) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.merchant_ratio_container {
  position: relative;
  width: 504px;
  height: 369px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/images/box.png");

  .title {
    height: 20px;
    color: #0ab8ff;
    font-size: 20px;
    font-weight: 800;
    margin-top: 10px;
    margin-left: 24px;
    display: flex;
    align-items: center;
  }

  .merchant_ratio_body {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
    bottom: 20px;

    #merchant_ratio_chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
