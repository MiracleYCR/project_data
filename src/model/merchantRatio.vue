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

export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    const chartDom = document.getElementById("merchant_ratio_chart");
    const merchantRatioChart = echarts.init(chartDom);

    const merchantRatioData = [
      {
        name: "渝卡通",
        value: 400,
        children: [
          { name: "餐饮住宿", value: 20 },
          { name: "生鲜蔬菜店", value: 280 },
          { name: "建材家居", value: 100 },
        ],
      },
      {
        name: "渝品甄选",
        value: 150,
        children: [
          { name: "文旅街区", value: 15 },
          { name: "各景区景点", value: 135 },
        ],
      },
      {
        name: "展销馆",
        value: 100,
        children: [
          { name: "影院", value: 60 },
          { name: "其他文旅市场", value: 40 },
        ],
      },
      {
        name: "农贸市场",
        value: 300,
        children: [
          { name: "商超百货", value: 90 },
          { name: "电子家电", value: 150 },
          { name: "汽油", value: 60 },
        ],
      },
    ];

    const option = {
      series: [
        {
          type: "pie",
          radius: [0, "50%"],
          label: {
            position: "inner",
            fontSize: 10,
            color: "#fff",
          },
          labelLine: {
            show: false,
          },
          data: merchantRatioData.map((item) => {
            return {
              name: item.name,
              value: item.value,
            };
          }),
        },

        {
          type: "pie",
          radius: ["60%", "80%"],
          labelLine: {
            show: true,
            lineStyle: {
              color: "#fff",
            },
          },
          label: {
            alignTo: "edge",
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            formatter: "{name|{b}}\n{number|{c}}",
            rich: {
              name: {
                fontSize: 13,
                color: "rgba(57, 165, 237, 1)",
              },
              number: {
                fontSize: 12,
                color: "rgba(0, 241, 255, 1)",
              },
            },
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
  },
};
</script>

<style lang="scss" scoped>
.merchant_ratio_container {
  position: relative;
  width: 504px;
  height: 373px;
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
