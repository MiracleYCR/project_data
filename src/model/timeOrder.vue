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
export default {
  data() {
    return {
      loading: false,

      config: {
        header: ["交易时间", "交易金额", "交易渠道", "交易方式"],
        data: [
          ["09-22 09:22", "1898.98", "农产品展销", "支付宝"],
          ["09-22 09:22", "1898.98", "渝品甄选", "微信支付"],
          ["09-22 09:22", "1898.98", "智慧农贸", "微信支付"],
          ["09-22 09:22", "1898.98", "渝品甄选", "支付宝"],
          ["09-22 09:22", "1898.98", "智慧农贸", "支付宝"],
          ["09-22 09:22", "1898.98", "农产品展销", "渝卡通支付"],
          ["09-22 09:22", "1898.98", "渝品甄选", "渝卡通支付"],
          ["09-22 09:22", "1898.98", "智慧农贸", "支付宝"],
          ["09-22 09:22", "1898.98", "渝品甄选", "微信支付"],
          ["09-22 09:22", "1898.98", "智慧农贸", "渝卡通支付"],
        ],
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
        waitTime: 3000,
        align: ["center", "center", "center", "center"],
      },
    };
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
