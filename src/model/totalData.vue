<template>
  <div class="total_data_container">
    <div class="left">
      <div class="title">总商户数量</div>
      <div class="merchantNumer">{{ formatMerchantNumer }}</div>
    </div>

    <div class="center">
      <div class="title">交易总实收（元）</div>
      <div class="totalAmtNumber">{{ formatTotalAmt }}</div>
    </div>

    <div class="right">
      <div class="title">交易总笔数</div>
      <div class="tradeNumber">{{ formatTradeNumber }}</div>
    </div>
  </div>
</template>

<script>
import { currency } from "@/utils/index";

import common_API from "@/api/common";
import smartFarm_API from "@/api/smartFarm";
import yuSmartcard_API from "@/api/yuSmartcard";
import yuSelection_API from "@/api/yuSelection";
import farmProduct_API from "@/api/farmProduct";

import { jiangNanHongDefaultData } from "@/mock/smartCard";
import { farmProductSummaryData } from "@/mock/farmProduct";

export default {
  computed: {
    formatTotalAmt() {
      return currency(this.totalAmt, 2, true);
    },
    formatTradeNumber() {
      return currency(this.tradeNumber, 0, true);
    },
    formatMerchantNumer() {
      return currency(this.merchantNumer, 0, true);
    },
  },

  data() {
    return {
      timer: null,
      totalAmt: 0,
      tradeNumber: 0,
      merchantNumer: 0,
    };
  },

  mounted() {
    this.getTotalData();
    this.timer = setInterval(async () => {
      await this.getTotalData();
    }, 15 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getTotalData() {
      try {
        // 渝卡通
        const { data: jiangNanHongData } =
          await common_API.fetchSmartCardDefaultData();
        const { data: yuSamrtcard } = await yuSmartcard_API.fetchTotalData();
        // 渝品甄选
        const { data: yuSelection } = await yuSelection_API.fetchTotalData();
        // 渝水农产品展销
        const { data: farmProduct } = await farmProduct_API.fetchTotalData();
        // 渝控通
        const { data: smartFarm } = await smartFarm_API.fetchTotalData();

        this.totalAmt = this.calculator.plus(
          yuSamrtcard.totalAmt,

          // 江南红数据
          jiangNanHongDefaultData.tradeAmt,
          Object.entries(jiangNanHongData).reduce(
            (pre, next) => this.calculator.plus(pre, next[1].tradeAmt),
            0
          ),

          yuSelection["data"][0].totalAmt,
          smartFarm.totalAmt,

          farmProduct.data.totalAmt,
          farmProductSummaryData.tradeAmt
        );

        this.tradeNumber = this.calculator.plus(
          yuSamrtcard.tradeNumber,

          // 江南红数据
          jiangNanHongDefaultData.tradeNumber,
          Object.entries(jiangNanHongData).reduce(
            (pre, next) => this.calculator.plus(pre, next[1].tradeNumber),
            0
          ),

          yuSelection["data"][0].tradeNumber,
          smartFarm.tradeNumber,

          farmProduct.data.tradeNumber,
          farmProductSummaryData.tradeNumber
        );

        this.merchantNumer = this.calculator.plus(
          yuSamrtcard.merchantNumer,
          1,
          farmProduct.data.merchantNumer,
          smartFarm.merchantNumer
        );
      } catch (err) {
        this.totalAmt = 0;
        this.tradeNumber = 0;
        this.merchantNumer = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.total_data_container {
  height: 100px;
  margin: 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .center {
    width: calc(60% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      width: 100%;
      font-size: 22px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 5px;
    }

    .totalAmtNumber {
      height: 53px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 53px;
      color: #00d3ff;
    }
  }

  .left,
  .right {
    width: 20%;
    display: flex;
    margin-top: 33px;
    flex-direction: column;
    align-items: center;

    .title {
      width: 100%;
      font-size: 17px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 5px;
    }

    .merchantNumer {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 36px;
      color: #00d3ff;
    }

    .tradeNumber {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 36px;
      color: #00d3ff;
    }
  }

  .left {
    .title {
      text-align: left;
    }
  }

  .right {
    .title {
      text-align: right;
    }
  }
}
</style>
