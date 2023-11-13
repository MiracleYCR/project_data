<template>
  <div class="select_goods_container">
    <div class="title">渝品甄选</div>

    <div class="select_goods_body">
      <dv-loading v-if="loading">Loading...</dv-loading>

      <template v-else>
        <div class="summary_data">
          <div class="data_item">
            <div class="title2">在售农产品(款)</div>
            <dv-digital-flop
              :config="farmGoodsNumConfig"
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
            <div class="title2">交易总金额(元)</div>
            <dv-digital-flop
              :config="tradeAmtConfig"
              style="width: 100%; height: 32px"
            />
          </div>
        </div>

        <div class="select_goods_chart" ref="selectGoodsRef">
          <dv-scroll-board
            style="width: 100%; height: 100%"
            :config="boardConfig"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { currency } from "@/utils/index";
import yuSelection_API from "@/api/yuSelection";

export default {
  data() {
    return {
      timer: null,
      loading: true,

      farmGoodsNumConfig: {
        number: [273],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#00d3ff",
        },
      },
      tradeNumConfig: {
        number: [1713],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#00d3ff",
        },
      },
      tradeAmtConfig: {
        number: [22120337.1],
        toFixed: 2,
        content: "{nt}",
        formatter: (value) => currency(value, 2, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#00d3ff",
        },
      },

      boardConfig: {
        header: ["排名", "商品名称", "单价", "销售数量"],
        rowNum: 4,
        data: [],
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
        carousel: "page",
        align: ["center", "left", "center", "center"],
        columnWidth: [],
      },
    };
  },

  mounted() {
    this.getSelectedProduction();

    setInterval(() => {
      this.getSelectedProduction();
    }, 30 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getSelectedProduction() {
      try {
        const { data: yuSelectionData } =
          await yuSelection_API.fetchSelectedProduction();

        this.loading = false;

        this.$nextTick(() => {
          const selectGoodsDomWidth = this.$refs.selectGoodsRef.offsetWidth;

          this.boardConfig = Object.assign({}, this.boardConfig, {
            columnWidth: [50, selectGoodsDomWidth - 210, 80, 80],
            data: yuSelectionData.data.map((item, index) => {
              return [
                `${index + 1}`,
                `<div style="display: flex; align-items: center">
                  <img style="width: 30px; height: 30px; object-fit: cover" src="${item.productImage}">
                  <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${item.productName}</span>
                </div>`,
                `单价`,
                `${item.orderNumber}`,
              ];
            }),
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
.select_goods_container {
  position: relative;
  width: 462px;
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
    margin-left: 19px;
    display: flex;
    align-items: center;
  }

  .select_goods_body {
    position: absolute;
    top: 55px;
    left: 12px;
    right: 12px;
    bottom: 10px;
    display: flex;
    flex-direction: column;

    .summary_data {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .data_item {
        width: 125px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item2 {
        width: 130px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item3 {
        width: calc(100% - 255px);
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .select_goods_chart {
      width: 100%;
      flex: 1;
      margin-top: 10px;

      ::v-deep(.dv-scroll-board .rows .row-item) {
        color: #0ab8ff;
      }
    }

    // #select_goods_chart {
    //   width: 100%;
    //   height: 100%;
    //   ::v-deep(.dv-scroll-board .rows .row-item) {
    //     color: #0ab8ff;
    //   }
    // }
  }
}
</style>
