<template>
  <div class="farm_product_show_container">
    <div class="title">渝水农产品展销</div>

    <div class="merchant_rank_body">
      <dv-loading v-if="loading">Loading...</dv-loading>

      <template v-else>
        <div class="summary_data">
          <div class="data_item">
            <div class="title2">供应商数</div>
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
            <div class="title2">交易总实收 (元)</div>
            <dv-digital-flop
              :config="tradeAmtConfig"
              style="width: 100%; height: 32px"
            />
          </div>
        </div>

        <div class="farm_product_data_rank" ref="farmProductDataRankRef">
          <template v-if="boardConfig.data.length > 0">
            <dv-scroll-board
              style="width: 100%; height: 100%"
              :config="boardConfig"
            />
          </template>

          <template v-else>
            <div class="no_data_container">
              <div class="chart_header">
                <div>排名</div>
                <div style="flex: 1; text-align: left">商品名称</div>
                <div style="width: 85px">销售单价(元)</div>
                <div>销售数量(个)</div>
              </div>
              <div class="content">暂无数据</div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { currency } from "@/utils/index";

import farmProduct_API from "@/api/farmProduct";
import { farmProductSummaryData } from "@/mock/farmProduct";

export default {
  data() {
    return {
      timer: null,
      loading: false,

      merchantNumConfig: {
        number: [0],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#00D3FF",
        },
      },
      tradeNumConfig: {
        number: [0],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 26,
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
          fontSize: 26,
          fill: "#0ab8ff",
        },
      },

      boardConfig: {
        header: ["排名", "商品名称", "销售单价(元)", "销售数量(个)"],
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
    this.getFarmProductData();

    this.timer = setInterval(() => {
      this.getFarmProductData();
    }, 15 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getFarmProductData() {
      try {
        // 渝水农产品展销
        const { data: farmProduct } =
          await farmProduct_API.fetchFarmProductDisplay();

        this.loading = false;

        this.$nextTick(() => {
          const totalTradeNumber = this.calculator.plus(
            farmProduct.data.tradeNumber,
            farmProductSummaryData.tradeNumber
          );

          const totalTradeAmt = this.calculator.plus(
            farmProduct.data.tradeAmt,
            farmProductSummaryData.tradeAmt
          );

          // 汇总数据
          this.merchantNumConfig = Object.assign({}, this.merchantNumConfig, {
            number: [farmProduct.data.supplyNumber],
          });
          this.tradeNumConfig = Object.assign({}, this.tradeNumConfig, {
            number: [totalTradeNumber],
          });
          this.tradeAmtConfig = Object.assign({}, this.tradeAmtConfig, {
            number: [totalTradeAmt],
          });

          // 表格
          const farmProductDataRankRefDomWidth =
            this.$refs.farmProductDataRankRef.offsetWidth;
          this.boardConfig = Object.assign({}, this.boardConfig, {
            columnWidth: [60, farmProductDataRankRefDomWidth - 270, 105, 105],
            data: farmProduct.data.goodsRankList.map((item, index) => [
              `${index + 1}`,
              `<div style="display:flex;align-items:center;cursor:pointer;">
                <div title='${item.name}' style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
              </div>`,
              item.price.toFixed(2),
              item.saleNumber,
            ]),
          });
        });
      } catch (err) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.farm_product_show_container {
  position: relative;
  width: 463px;
  height: 338px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/images/box@2x.png");

  .title {
    height: 20px;
    margin-top: 10px;
    margin-left: 11px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 800;
    color: #0ab8ff;
  }

  .merchant_rank_body {
    position: absolute;
    top: 55px;
    left: 12px;
    right: 12px;
    bottom: 10px;
    display: flex;
    flex-direction: column;

    .summary_data {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .data_item {
        width: 85px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item2 {
        width: 145px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item3 {
        width: calc(100% - 230px);
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .farm_product_data_rank {
      width: 100%;
      flex: 1;
      margin-top: 10px;

      ::v-deep(.dv-scroll-board .rows .row-item) {
        color: #0ab8ff;
      }

      .no_data_container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .chart_header {
          height: 35px;
          font-size: 15px;
          display: flex;
          align-items: center;
          background-color: rgba(0, 211, 255, 0.1);

          div {
            padding: 0 10px;
            text-align: center;

            &:first-child {
              width: 60px;
            }

            &:last-child {
              width: 110px;
            }
          }
        }

        .content {
          flex: 1;
          color: #0ab8ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
