<template>
  <div class="time_order_container">
    <div class="title">实时订单</div>

    <div class="time_order_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else id="time_order_chart">
        <dv-scroll-board
          style="width: 100%; height: 100%"
          ref="timeOrderBoardRef"
          :config="config"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomSecondsInterval, generateRandomNumber } from "@/utils";
import { tradeChannel, payment } from "@/mock/orders";

export default {
  data() {
    return {
      loading: false,

      realTimeList: [],

      config: {
        header: ["交易时间", "交易金额", "交易渠道", "交易方式"],
        data: [],
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
        columnWidth: [120],
        align: ["center", "center", "center", "center"],
      },
    };
  },

  watch: {
    realTimeList: {
      handler(n) {
        const updateData = n.map((item) => {
          return [
            item,
            generateRandomNumber(500, 1898),
            tradeChannel[Math.floor(Math.random() * 3)],
            payment[Math.floor(Math.random() * 3)],
          ];
        });

        this.config = Object.assign({}, this.config, {
          data: updateData,
        });

        // const newData = [
        //   n[n.length - 1],
        //   "1898.98",
        //   tradeChannel[Math.floor(Math.random() * 3)],
        //   payment[Math.floor(Math.random() * 3)],
        // ];

        // this.$nextTick(() => {
        //   this.$refs["timeOrderBoardRef"].updateRows(
        //     [...this.config.data, newData],
        //     0
        //   );
        // });
      },
      immediate: true,
    },
  },

  mounted() {
    getRandomSecondsInterval(() => {
      const currentTime = new Date();

      this.realTimeList.push(
        `${(currentTime.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${currentTime
          .getDay()
          .toString()
          .padStart(2, "0")} ${currentTime.toLocaleTimeString()}`
      );
    });
  },
};
</script>

<style lang="scss" scoped>
.time_order_container {
  position: relative;
  width: 454px;
  height: 310px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/images/box.png");

  .title {
    height: 20px;
    color: #0ab8ff;
    font-size: 20px;
    font-weight: 800;
    margin-top: 6px;
    margin-left: 19px;
    display: flex;
    align-items: center;
  }

  .time_order_body {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
    bottom: 20px;

    #time_order_chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
