<template>
  <div class="app_content">
    <div class="left">
      <MerchantRatio />
      <MerchantRank />
      <SmartCard />
    </div>

    <div class="center">
      <div class="top">
        <TotalData />
        <FarmProportion />
      </div>

      <div class="bottom">
        <SamrtFarm />
        <FarmProductShow />
      </div>
    </div>

    <div class="right">
      <TradeMonthIncome />
      <TimeOrder />
      <SelectGoods />
    </div>
  </div>
</template>

<script>
import MerchantRank from "../model/merchantRank.vue";
import MerchantRatio from "../model/merchantRatio.vue";
import SmartCard from "../model/smartCard.vue";

import TotalData from "../model/totalData.vue";
import FarmProportion from "../model/farmProportion.vue";

import SamrtFarm from "../model/smartFarm.vue";
import FarmProductShow from "../model/farmProductShow.vue";

import TimeOrder from "../model/timeOrder.vue";
import SelectGoods from "../model/selectGoods.vue";
import TradeMonthIncome from "../model/tradeMonthIncome.vue";

export default {
  name: "app-content",

  components: {
    SmartCard,
    MerchantRank,
    MerchantRatio,

    TotalData,
    FarmProportion,

    SamrtFarm,
    FarmProductShow,

    TimeOrder,
    SelectGoods,
    TradeMonthIncome,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.app_content {
  position: absolute;
  left: 0;
  right: 0;
  top: 94px;
  bottom: 0;
  padding: 0 10px 14px 10px;
  display: flex;

  .left {
    width: 504px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 15px;

    .top {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .bottom {
      height: 338px;
      display: flex;
      justify-content: space-between;
    }
  }

  .right {
    width: 454px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
