<template>
  <div class="main_content_chart_container">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <template v-else>
      <IncomeForce v-if="!toggleType" :chartData="incomeForceData" />
      <FarmProportion v-else :chartData="farmProportionData" />
    </template>
  </div>
</template>

<script>
import IncomeForce from "./incomeForce.vue";
import FarmProportion from "./farmProportion.vue";

import common_API from "@/api/common";
import yuSmartcard_API from "@/api/yuSmartcard";
import yuSelection_API from "@/api/yuSelection";

export default {
  components: {
    IncomeForce,
    FarmProportion,
  },

  data() {
    return {
      timer: null,
      loading: true,
      toggleType: false,
      incomeForceData: [],
      farmProportionData: [],
    };
  },

  mounted() {
    this.toggleChangeMainContentChart();

    this.timer = setInterval(() => {
      this.toggleType = !this.toggleType;
      this.toggleChangeMainContentChart();
    }, 15 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async toggleChangeMainContentChart() {
      try {
        const { data: supply } = await common_API.fetchIncomeForceData();

        const { data: yuSmartcard } =
          await yuSmartcard_API.fetchTradeDaysIncome();

        const { data: yuSelection } =
          await yuSelection_API.fetchTradeMonthIncome();

        console.log(yuSmartcard, yuSelection);

        const incomeForceTotalData = supply.map((item, index) => {
          return [
            item.month,
            this.calculator.plus(
              item.totalAmt,
              yuSelection["data"][index].incomeAmt
            ),
          ];
        });

        const incomeForcePartData = yuSelection.data.map((item) => {
          return [item.monthStr, this.calculator.plus(item.incomeAmt, 0)];
        });

        this.incomeForceData = [incomeForceTotalData, incomeForcePartData];

        this.farmProportionData = supply;

        this.loading = false;
      } catch (err) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main_content_chart_container {
  width: 100%;
  height: 100%;
}
</style>
