<template>
  <div class="smart_card_container">
    <div class="title">智慧渝卡通</div>

    <div class="smart_card_content">
      <dv-loading v-if="loading">Loading...</dv-loading>

      <template v-else>
        <div class="summary_data">
          <div class="data_item">
            <div class="title2">商户数</div>
            <dv-digital-flop
              :config="merchantNumConfig"
              style="width: 100%; height: 32px"
            />
          </div>

          <div class="data_item2">
            <div class="title2">总交易笔数</div>
            <dv-digital-flop
              :config="tradeNumConfig"
              style="width: 100%; height: 32px"
            />
          </div>

          <div class="data_item3">
            <div class="title2">交易总金额 (元)</div>
            <dv-digital-flop
              :config="tradeAmtConfig"
              style="width: 100%; height: 32px"
            />
          </div>
        </div>

        <div class="smart_card_data_rank" ref="smartCardDataRankRef">
          <dv-scroll-board
            style="width: 100%; height: 100%"
            :config="boardConfig"
          />
        </div>
      </template>

      <!-- <template v-else>
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
                  style="height: 28px"
                />
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
      </template> -->
    </div>
  </div>
</template>

<script>
// import * as echarts from "echarts";
import { currency } from "@/utils/index";
import yuSmartcard_API from "@/api/yuSmartcard";

import { generateStoreTop5 } from "@/mock/store2";

export default {
  data() {
    return {
      timer: null,
      loading: true,

      merchantNumConfig: {
        number: [0],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 30,
          fill: "#00D3FF",
        },
      },

      tradeNumConfig: {
        number: [0],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 30,
          fill: "#0ab8ff",
        },
      },

      tradeAmtConfig: {
        number: [0],
        content: "{nt}",
        toFixed: 2,
        formatter: (value) => currency(value, 2, true),
        textAlign: "center",
        style: {
          fontSize: 30,
          fill: "#0ab8ff",
        },
      },

      boardConfig: {
        header: ["排名", "商户名称", "交易笔数", "交易实收"],
        data: [],
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
        waitTime: 4500,
        carousel: "page",
        align: ["center", "left", "center", "center"],
        columnWidth: [],
      },
    };
  },

  mounted() {
    this.getSmartCardData();

    this.timer = setInterval(() => {
      this.getSmartCardData();
    }, 15 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getSmartCardData() {
      try {
        const { data: smartCard } = await yuSmartcard_API.fetchSmartCard();

        this.loading = false;

        this.$nextTick(() => {
          const smartCardDataRankRefDomWidth =
            this.$refs.smartCardDataRankRef.offsetWidth;

          // const chartDom = document.getElementById("smart_card_chart");
          // const smartCardChart = echarts.init(chartDom);

          this.merchantNumConfig = Object.assign({}, this.merchantNumConfig, {
            number: [smartCard.merchantNumer],
          });

          this.tradeNumConfig = Object.assign({}, this.tradeNumConfig, {
            number: [smartCard.tradeNumber],
          });

          this.tradeAmtConfig = Object.assign({}, this.tradeAmtConfig, {
            number: [smartCard.tradeAmt],
          });

          this.boardConfig = Object.assign({}, this.boardConfig, {
            columnWidth: [60, smartCardDataRankRefDomWidth - 240, 90, 90],
            data: generateStoreTop5().map((item, index) => {
              return [`${index + 1}`, item.name, item.orders, item.amt];
            }),
          });

          // const smartCardChartData = smartCard.channelAmt.map((item) => {
          //   return {
          //     name: item.channel,
          //     value: item.amt,
          //   };
          // });

          // const option = {
          //   grid: {
          //     top: "15%", // 上边距
          //     bottom: "0", // 下边距
          //     left: "0", // 左边距
          //     right: "20%",
          //     containLabel: true,
          //   },
          //   xAxis: {
          //     show: false,
          //     type: "value",
          //   },
          //   yAxis: {
          //     type: "category",
          //     axisTick: {
          //       show: false,
          //     },
          //     axisLabel: {
          //       color: "rgba(57, 165, 237, 1)",
          //     },
          //     data: smartCardChartData.map((item) => item.name).reverse(),
          //   },
          //   series: [
          //     {
          //       type: "bar",
          //       itemStyle: {
          //         barWidth: 20,
          //         color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          //           {
          //             offset: 0,
          //             color: "#2F9FFF",
          //           },
          //           {
          //             offset: 1,
          //             color: "#B366FF",
          //           },
          //         ]),
          //       },
          //       label: {
          //         show: true,
          //         align: "left",
          //         position: "right",
          //         verticalAlign: "middle",
          //         color: "rgba(0, 241, 255, 1)",
          //         formatter: (value) => {
          //           return currency(value.data, 2, true);
          //         },
          //       },
          //       data: smartCardChartData.map((item) => item.value).reverse(),
          //     },
          //   ],
          // };

          // option && smartCardChart.setOption(option);
        });
      } catch (err) {
        this.loading = true;
      }
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
    height: 16px;
    line-height: 20px;
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

    .summary_data {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .data_item {
        width: 80px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item2 {
        width: 160px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item3 {
        width: calc(100% - 240px);
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .smart_card_data_rank {
      width: 100%;
      flex: 1;
      margin-top: 10px;

      ::v-deep(.dv-scroll-board .rows .row-item) {
        color: #0ab8ff;
      }
    }

    // .top {
    //   height: 120px;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: space-between;

    //   .acount {
    //     height: 50px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;

    //     .left,
    //     .right {
    //       height: 100%;
    //       width: calc(50% - 5px);
    //       display: flex;
    //       align-items: center;
    //       justify-content: space-between;
    //       background-color: rgba(0, 211, 255, 0.1);

    //       .content {
    //         flex: 1;
    //       }
    //     }

    //     .left {
    //       padding: 0 10px;
    //     }

    //     .right {
    //       padding: 0 10px;
    //     }
    //   }

    //   .amt {
    //     height: 50px;
    //     align-items: center;
    //     display: flex;
    //     padding: 0 14px;
    //     justify-content: space-between;
    //     background-color: rgba(0, 211, 255, 0.1);

    //     .content {
    //       flex: 1;
    //       text-align: right;
    //     }
    //   }
    // }

    // .bottom {
    //   flex: 1;
    // }
  }
}
</style>
