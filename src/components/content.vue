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
        <MainContentChart />
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
import MainContentChart from "../model/mainContentChart.vue";

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
    MainContentChart,

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
  flex: 1;
  display: flex;
  margin-top: -80px;
  padding: 0 10px 14px 10px;

  .left {
    width: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }

  .center {
    margin: 0 9px;
    flex: 1;
    display: flex;
    flex-direction: column;

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
    width: 462px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
