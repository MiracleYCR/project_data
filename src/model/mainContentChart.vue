<template>
  <div class="main_content_chart_container">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <template v-else>
      <IncomeForce
        v-if="!toggleType"
        :chartData="incomeForceData"
        @changeChartType="handleChangeChartType"
      />
      <FarmProportion
        v-else
        :chartData="farmProportionData"
        @changeChartType="handleChangeChartType"
      />
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
import smartFarm_API from "@/api/smartFarm";

import farmProduct_API from "@/api/farmProduct";
import { defaultIncomeAmt } from "@/mock/incomeForce";

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
    }, 20 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async toggleChangeMainContentChart() {
      try {
        const { data: supply } = await common_API.fetchIncomeForceData();

        // 渝卡通
        const { data: jiangNanHongData } =
          await common_API.fetchSmartCardDefaultData();
        const { data: yuSmartcard } =
          await yuSmartcard_API.fetchTradeMonthIncome();

        // 渝品甄选
        const { data: yuSelection } =
          await yuSelection_API.fetchTradeMonthIncome();

        // 渝水农产品展销
        const { data: farmProduct } =
          await farmProduct_API.fetchTradeMonthIncome();

        // 渝控通
        const { data: smartFarm } = await smartFarm_API.fetchTradeMonthIncome();

        // 增收推力
        const incomeForceData = {
          total: [],
          part: [],
        };

        // 平台助农
        const farmProportionData = [];

        supply.forEach((item, index) => {
          const curDateJiangNanHongData = jiangNanHongData[item.month];

          // 增收推力
          // 四方数据+本方数据
          const totalAmt = this.calculator.plus(
            item.totalAmt,
            // 渝卡通
            defaultIncomeAmt.yuSmartcard[item.month] ||
              this.calculator.plus(
                yuSmartcard[index].incomeAmt,
                curDateJiangNanHongData ? curDateJiangNanHongData.tradeAmt : 0
              ),
            // 渝品甄选
            defaultIncomeAmt.yuSelection[item.month] ||
              yuSelection["data"][index].incomeAmt,
            // 渝控通
            defaultIncomeAmt.smartFarm[item.month] ||
              smartFarm[index].incomeAmt,
            // 渝水农产品展销
            defaultIncomeAmt.farmProduct[item.month]
              ? this.calculator.plus(
                  defaultIncomeAmt.farmProduct[item.month],
                  farmProduct["data"][index].incomeAmt
                )
              : farmProduct["data"][index].incomeAmt
          );

          // 四方数据
          const partAmt = this.calculator.plus(
            // 渝卡通
            defaultIncomeAmt.yuSmartcard[item.month] ||
              this.calculator.plus(
                yuSmartcard[index].incomeAmt,
                curDateJiangNanHongData ? curDateJiangNanHongData.tradeAmt : 0
              ),
            // 渝品甄选
            defaultIncomeAmt.yuSelection[item.month] ||
              yuSelection["data"][index].incomeAmt,
            // 渝控通
            defaultIncomeAmt.smartFarm[item.month] ||
              smartFarm[index].incomeAmt,
            // 渝水农产品展销
            defaultIncomeAmt.farmProduct[item.month]
              ? this.calculator.plus(
                  defaultIncomeAmt.farmProduct[item.month],
                  farmProduct["data"][index].incomeAmt
                )
              : farmProduct["data"][index].incomeAmt
          );

          // 表格数据
          incomeForceData.total.push([item.month, totalAmt]);
          incomeForceData.part.push([
            item.month,
            partAmt === 0 ? null : partAmt,
          ]);

          // 平台助农
          if (index > supply.length - 4) {
            const curDateJiangNanHongData = jiangNanHongData[item.month];

            const curObj = {
              month: monthDataMap[item.month.split("-")[1]],
              totalAmt: partAmt,
              partProportion: [
                smartFarm[index].incomeAmt,

                yuSelection["data"][index].incomeAmt,

                defaultIncomeAmt.farmProduct[item.month]
                  ? this.calculator.plus(
                      defaultIncomeAmt.farmProduct[item.month],
                      farmProduct["data"][index].incomeAmt
                    )
                  : farmProduct["data"][index].incomeAmt,

                // 渝卡通 + 江南红数据
                this.calculator.plus(
                  yuSmartcard[index].incomeAmt,
                  curDateJiangNanHongData ? curDateJiangNanHongData.tradeAmt : 0
                ),
              ],
            };

            farmProportionData.push(curObj);
          }
        });

        // 增收推力格式化数据
        this.incomeForceData = [incomeForceData.total, incomeForceData.part];

        // 平台助农格式化数据
        this.farmProportionData = farmProportionData;

        this.loading = false;
      } catch (err) {
        this.loading = true;
      }
    },

    handleChangeChartType() {
      clearInterval(this.timer);

      this.toggleType = !this.toggleType;
      this.timer = setInterval(() => {
        this.toggleType = !this.toggleType;
      }, 20 * 1000);
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
