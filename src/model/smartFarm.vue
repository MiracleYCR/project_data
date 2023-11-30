<template>
  <div class="smart_farm_container">
    <div class="title">渝控通</div>
    <div class="smart_farm_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <template v-else>
        <div class="yesterday_data">
          <div class="data_item">
            <div class="title2">门店数</div>
            <dv-digital-flop
              :config="storeNumConfig"
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
            <div class="title2">交易总实收(元)</div>
            <dv-digital-flop
              :config="tradeAmtConfig"
              style="width: 100%; height: 32px"
            />
          </div>
        </div>

        <div class="yesterday_data_rank" ref="smartFarmDataRankRef">
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
                <div style="flex: 1; text-align: left">门店名称</div>
                <div style="width: 90px">交易笔数</div>
                <div>交易实收(元)</div>
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
import smartFarm_API from "@/api/smartFarm";

export default {
  data() {
    return {
      timer: null,
      loading: false,

      storeNumConfig: {
        number: [0],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#0ab8ff",
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
        toFixed: 2,
        content: "{nt}",
        formatter: (value) => currency(value, 2, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#0ab8ff",
        },
      },

      boardConfig: {
        header: ["排名", "门店名称", "交易笔数", "交易实收(元)"],
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
    this.getSmartFarmData();

    this.timer = setInterval(() => {
      this.getSmartFarmData();
    }, 30 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getSmartFarmData() {
      try {
        // 渝水农产品展销
        const { data: smartFarm } = await smartFarm_API.fetchSmartFarmDisplay();

        this.loading = false;

        this.$nextTick(() => {
          // 汇总数据
          this.storeNumConfig = Object.assign({}, this.storeNumConfig, {
            number: [smartFarm.merchantNumber],
          });
          this.tradeNumConfig = Object.assign({}, this.tradeNumConfig, {
            number: [smartFarm.tradeNumber],
          });
          this.tradeAmtConfig = Object.assign({}, this.tradeAmtConfig, {
            number: [smartFarm.tradeAmt],
          });

          // 表格
          const smartFarmDataRankRefDomWidth =
            this.$refs.smartFarmDataRankRef.offsetWidth;

          this.boardConfig = Object.assign({}, this.boardConfig, {
            columnWidth: [60, smartFarmDataRankRefDomWidth - 260, 85, 115],
            data: smartFarm.merchantRankList.map((item, index) => [
              `${index + 1}`,
              `<div style="display:flex;align-items:center;cursor:pointer;">
                <div title='${item.name}' style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
              </div>`,
              item.tradeNumber,
              item.tradeAmt,
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
.smart_farm_container {
  position: relative;
  width: 450px;
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

  .smart_farm_body {
    position: absolute;
    top: 55px;
    left: 12px;
    right: 12px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    .yesterday_data {
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
        width: 140px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item3 {
        width: calc(100% - 220px);
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .yesterday_data_rank {
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
