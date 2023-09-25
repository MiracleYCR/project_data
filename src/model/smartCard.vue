<template>
  <div class="smart_card_container">
    <div class="title">智慧渝卡通</div>
    <div class="smart_card_content">
      <div class="top">
        <div class="acount">
          <div class="left">
            <div class="title2">商户数</div>
            <div class="content">
              <dv-digital-flop
                :config="merchantNumConfig"
                style="width: 100%; height: 28px"
              />
            </div>
          </div>

          <div class="right">
            <div class="title2">总交易笔数</div>
            <div class="content">
              <dv-digital-flop
                :config="tradeNumConfig"
                style="width: 100%; height: 28px"
              />
            </div>
          </div>
        </div>

        <div class="amt">
          <div class="title2">交易总金额 (元)</div>
          <div class="content">
            <dv-digital-flop
              :config="tradeAmtConfig"
              style="width: 100%; height: 28px"
            />
          </div>
        </div>
      </div>

      <div class="bottom" id="smart_card_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { numberFormatter } from "@/utils/index";

export default {
  data() {
    return {
      merchantNumConfig: {
        number: [864],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "center",
        style: {
          fontSize: 30,
          fill: "#00D3FF",
        },
      },

      tradeNumConfig: {
        number: [864],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "center",
        style: {
          fontSize: 30,
          fill: "#00D3FF",
        },
      },

      tradeAmtConfig: {
        number: [864],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "right",
        style: {
          fontSize: 30,
          fill: "#00D3FF",
        },
      },
    };
  },

  mounted() {
    const chartDom = document.getElementById("smart_card_chart");
    const smartCardChart = echarts.init(chartDom);

    const smartCardData = [
      {
        name: "订单总金额",
        value: 17623311,
      },
      {
        name: "支付总金额",
        value: 18231223,
      },
      {
        name: "消费券总金额",
        value: 47612422,
      },
    ];

    const option = {
      grid: {
        top: "15%", // 上边距
        bottom: "0", // 下边距
        left: "0", // 左边距
        right: "20%",
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
          color: "rgba(57, 165, 237, 1)",
        },
        data: smartCardData.map((item) => item.name).reverse(), // Y 轴刻度数据
      },
      series: [
        {
          type: "bar",
          itemStyle: {
            barWidth: 20,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                //只要修改前四个参数就ok
                offset: 0,
                color: "#2F9FFF",
              }, //柱图渐变色
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
          },
          data: smartCardData.map((item) => item.value).reverse(), // 柱状图数据
        },
      ],
    };

    option && smartCardChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.smart_card_container {
  position: relative;
  width: 504px;
  height: 338px;
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

  .title2 {
    font-size: 17px;
    font-weight: bold;
    color: #ffffff;
  }

  .smart_card_content {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: column;

    .top {
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .acount {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left,
        .right {
          height: 100%;
          width: calc(50% - 5px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(0, 211, 255, 0.1);
        }

        .left {
          padding: 0 16px 0 14px;
        }

        .right {
          padding: 0 14px 0 16px;
        }
      }

      .amt {
        height: 50px;
        align-items: center;
        display: flex;
        padding: 0 14px;
        justify-content: space-between;
        background-color: rgba(0, 211, 255, 0.1);

        .content {
          flex: 1;
        }
      }
    }

    .bottom {
      flex: 1;
    }
  }
}
</style>
