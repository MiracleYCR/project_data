<template>
  <div class="smart_farm_container">
    <div class="title">智慧农贸</div>
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
              :config="yesterdayTradeNumConfig"
              style="width: 100%; height: 32px"
            />
          </div>

          <div class="data_item3">
            <div class="title2">交易总金额(元)</div>
            <dv-digital-flop
              :config="yesterdayTradeAmtConfig"
              style="width: 100%; height: 32px"
            />
          </div>
        </div>

        <div class="yesterday_data_rank" ref="yesterdayDataRankRef">
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
import { generateStoreTop5 } from "@/mock/store2";
// import { stores, generateStoreTop5 } from "@/mock/store";
// import { generateMerchantsValues } from "@/mock/merchant";

export default {
  data() {
    // const top5stores = generateStoreTop5();
    // const merchantsValues = generateMerchantsValues(stores.length);

    const top5stores = generateStoreTop5();

    return {
      timer: null,
      loading: false,

      storeNumConfig: {
        number: [273],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#00d3ff",
        },
      },
      yesterdayTradeNumConfig: {
        number: [1713],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "center",
        style: {
          fontSize: 26,
          fill: "#00d3ff",
        },
      },
      yesterdayTradeAmtConfig: {
        number: [120337.1],
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
        header: ["排名", "门店名称", "交易笔数", "交易实收"],
        data: top5stores.map((item, index) => {
          return [`${index + 1}`, item.name, item.orders, item.amt];
        }),
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
    const yesterdayDataRankRefDomWidth =
      this.$refs.yesterdayDataRankRef.offsetWidth;

    this.boardConfig.columnWidth = [
      60,
      yesterdayDataRankRefDomWidth - 240,
      90,
      90,
    ];

    this.timer = setInterval(() => {
      // const top5Stores = generateStoreTop5();
      // const merchantsValues = generateMerchantsValues(stores.length);

      const top5Stores = generateStoreTop5();

      this.boardConfig = Object.assign({}, this.boardConfig, {
        // data: top5Stores.map((name, index) => {
        //   return [
        //     `${index + 1}`,
        //     name,
        //     merchantsValues["order"][index],
        //     merchantsValues["amt"][index],
        //   ];
        // }),
        data: top5Stores.map((item, index) => {
          return [`${index + 1}`, item.name, item.orders, item.amt];
        }),
      });
    }, 30 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.smart_farm_container {
  position: relative;
  width: 456px;
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
        width: 180px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
      }

      .data_item3 {
        width: calc(100% - 260px);
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
    }
  }
}
</style>
