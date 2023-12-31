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
import farmProduct_API from "@/api/farmProduct";
import smartFarm_API from "@/api/smartFarm";

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

        // 渝水农产品展销
        const { data: farmProduct } =
          await farmProduct_API.fetchMerchantRatio();

        // 渝控通
        const { data: smartFarm } = await smartFarm_API.fetchMerchantRatio();

        this.loading = false;

        this.$nextTick(() => {
          const chartDom = document.getElementById("merchant_ratio_chart");
          const merchantRatioChart = echarts.init(chartDom);

          const merchantRatioData = [
            {
              name: yuSamrtcard[0].channel,
              value: yuSamrtcard[0].count + 1,
              children: yuSamrtcard[0].category
                .map((item, index) => {
                  return {
                    name: item.name,
                    value:
                      index === 0 ? Number(item.count + 1) : Number(item.count),
                  };
                })
                .filter((item) => item.value !== 0),
            },
            {
              name: "渝品甄选",
              value: 1,
              children: [{ name: "渝品甄选商城", value: 1 }],
            },
            {
              name: farmProduct["data"][0].channel,
              value: farmProduct["data"][0].count,
              children: farmProduct["data"][0].category
                .map((item) => ({
                  name: item.name,
                  value: Number(item.count),
                }))
                .filter((item) => item.value !== 0),
            },
            {
              name: smartFarm[0].channel,
              value: smartFarm[0].count,
              children: smartFarm[0].category
                .map((item) => ({
                  name: item.name,
                  value: Number(item.count),
                }))
                .filter((item) => item.value !== 0),
            },
          ];

          const option = {
            series: [
              {
                type: "pie",
                radius: [0, "50%"],
                startAngle: 100,
                label: {
                  position: "inside",
                  fontSize: 10,
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
                startAngle: 100,
                labelLine: {
                  show: true,
                  lineStyle: {
                    color: "#fff",
                  },
                },
                label: {
                  alignTo: "edge",
                  minMargin: 2,
                  edgeDistance: 8,
                  lineHeight: 12,
                  formatter: (e) => {
                    return `{name|${e.data.name}} {number|${e.data.value}}`;
                  },
                  rich: {
                    name: {
                      fontSize: 11,
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
