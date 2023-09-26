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
              <dv-digital-flop :config="tradeNumConfig" style="height: 28px" />
            </div>
          </div>
        </div>

        <div class="amt">
          <div class="title2">交易总金额 (元)</div>
          <div class="content">
            <dv-digital-flop :config="tradeAmtConfig" style="height: 28px" />
          </div>
        </div>
      </div>

      <div class="bottom" id="smart_card_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  currency,
  generateRandomNumber,
  getRandomSecondsInterval,
} from "@/utils/index";

export default {
  data() {
    return {
      timer: null,

      smartCardData: [
        {
          name: "订单总金额",
          value: 17948416,
        },
        {
          name: "支付总金额",
          value: 10736212,
        },
        {
          name: "消费券总金额",
          value: 7212204,
        },
      ],

      merchantNumConfig: {
        number: [2344],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "right",
        style: {
          fontSize: 30,
          fill: "#00D3FF",
        },
      },

      tradeNumConfig: {
        number: [1861],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "right",
        style: {
          fontSize: 30,
          fill: "#0ab8ff",
        },
      },

      tradeAmtConfig: {
        number: [19281281.82],
        content: "{nt}",
        toFixed: 2,
        formatter: (value) => currency(value, 2, true),
        textAlign: "right",
        style: {
          fontSize: 30,
          fill: "#0ab8ff",
        },
      },
    };
  },

  mounted() {
    getRandomSecondsInterval(() => {
      const randomTradeNum = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

      const randomTradeAmt =
        (Math.floor(Math.random() * (300 - 10 + 1)) + 10) * randomTradeNum;

      this.tradeNumConfig = Object.assign({}, this.tradeNumConfig, {
        number: [this.tradeNumConfig.number[0] + randomTradeNum],
      });

      this.tradeAmtConfig = Object.assign({}, this.tradeAmtConfig, {
        number: [this.tradeAmtConfig.number[0] + randomTradeAmt],
      });

      this.drawsmartCardDataChart(randomTradeAmt);
    });
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    drawsmartCardDataChart(randomTradeAmt) {
      const chartDom = document.getElementById("smart_card_chart");
      const smartCardChart = echarts.init(chartDom);

      this.smartCardData.forEach((item) => {
        item.value += parseFloat(
          generateRandomNumber(randomTradeAmt, randomTradeAmt + 500)
        );
      });

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
          data: this.smartCardData.map((item) => item.name).reverse(),
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
                return currency(value.data, 2, true);
              },
            },
            data: this.smartCardData.map((item) => item.value).reverse(),
          },
        ],
      };

      option && smartCardChart.setOption(option);
    },
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

          .content {
            flex: 1;
          }
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
          text-align: right;
        }
      }
    }

    .bottom {
      flex: 1;
    }
  }
}
</style>
