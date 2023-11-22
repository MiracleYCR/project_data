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

import { monthDataMap } from "@/config/datamap";

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

      mockData: {
        9: [128888, 3271],
        10: [114218, 2667],
        11: [98721, 1896],
      },
    };
  },

  mounted() {
    this.toggleChangeMainContentChart();

    this.timer = setInterval(() => {
      this.toggleType = !this.toggleType;
    }, 15 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async toggleChangeMainContentChart() {
      try {
        const { data: supply } = await common_API.fetchIncomeForceData();

        // 渝卡通
        const { data: yuSmartcard } =
          await yuSmartcard_API.fetchTradeMonthIncome();

        // 渝品甄选
        const { data: yuSelection } =
          await yuSelection_API.fetchTradeMonthIncome();

        // 增收推力
        const incomeForceData = {
          total: [],
          part: [],
        };

        // 平台助农
        const farmProportionData = [];

        supply.forEach((item, index) => {
          // 增收推力
          const totalAmt = this.calculator.plus(
            item.totalAmt,
            yuSmartcard[index].incomeAmt,
            yuSelection["data"][index].incomeAmt
          );
          const partAmt = this.calculator.plus(
            yuSmartcard[index].incomeAmt,
            yuSelection["data"][index].incomeAmt
          );
          incomeForceData.total.push([item.month, totalAmt]);
          incomeForceData.part.push([item.month, partAmt]);

          // 平台助农
          if (index > supply.length - 4) {
            const curObj = {
              month: monthDataMap[item.month.split("-")[1]],
              totalAmt: this.calculator.plus(
                this.mockData[index][0] * 30,
                yuSmartcard[index].incomeAmt,
                this.mockData[index][1] * 30,
                yuSelection["data"][index].incomeAmt
              ),
              partProportion: [
                this.mockData[index][0] * 30,
                yuSelection["data"][index].incomeAmt,
                this.mockData[index][1] * 30,
                yuSmartcard[index].incomeAmt,
              ],
            };

            farmProportionData.push(curObj);
          }
        });

        // 增收推力格式化数据
        this.incomeForceData = [incomeForceData.total, incomeForceData.partAmt];

        // 平台助农格式化数据
        this.farmProportionData = farmProportionData;

        console.log(this.farmProportionData);

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
