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
            <div class="title2">交易总金额(元)</div>
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
    </div>
  </div>
</template>

<script>
import { currency } from "@/utils/index";
import yuSmartcard_API from "@/api/yuSmartcard";

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
        header: ["排名", "商户名称", "交易笔数", "交易实收(元)"],
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

        console.log(smartCard);

        this.loading = false;

        this.$nextTick(() => {
          // 汇总数据
          this.merchantNumConfig = Object.assign({}, this.merchantNumConfig, {
            number: [smartCard.merchantNumer],
          });
          this.tradeNumConfig = Object.assign({}, this.tradeNumConfig, {
            number: [smartCard.tradeNumber],
          });
          this.tradeAmtConfig = Object.assign({}, this.tradeAmtConfig, {
            number: [smartCard.tradeAmt],
          });

          console.log(smartCard.merchantRankList.slice(0, 5));

          // 表格
          const smartCardDataRankRefDomWidth =
            this.$refs.smartCardDataRankRef.offsetWidth;

          this.boardConfig = Object.assign({}, this.boardConfig, {
            columnWidth: [60, smartCardDataRankRefDomWidth - 260, 90, 110],
            data: smartCard.merchantRankList.slice(0, 5).map((item, index) => {
              return [
                `${index + 1}`,
                item.name,
                item.tradeNumber,
                item.tradeAmt.toFixed(2),
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
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item2 {
        width: 170px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item3 {
        width: calc(100% - 270px);
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
  }
}
</style>
