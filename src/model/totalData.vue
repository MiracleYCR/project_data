<template>
  <div class="total_data_container">
    <div class="left">
      <div class="title">总商户数量</div>
      <div class="merchantNumer">{{ formatMerchantNumer }}</div>
    </div>

    <div class="center">
      <div class="title">交易总金额（元）</div>
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

export default {
  computed: {
    formatTotalAmt() {
      return currency(this.totalAmt, 2, true);
    },
    formatTradeNumber() {
      console.log(currency(this.tradeNumber, 0, true));
      return currency(this.tradeNumber, 0, true);
    },
    formatMerchantNumer() {
      return currency(this.merchantNumer, 0, true);
    },
  },

  data() {
    return {
      timer: null,
      merchantNumer: 5861,
      totalAmt: 198461374.68,
      tradeNumber: 6813706,
    };
  },

  mounted() {
    this.timer = setInterval(() => {
      // 总交易额
      const randomNum2 = Math.random() * (300 - 1 + 1) + 1;
      this.totalAmt += randomNum2;

      // 总交易笔数
      const randomNum3 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      this.tradeNumber += randomNum3;
    }, 15 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
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
