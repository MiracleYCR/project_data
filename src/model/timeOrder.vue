<template>
  <border-box
    boxTitle="实时订单"
    :customStyle="{
      width: '454px',
      height: '300px',
    }"
  >
    <div slot="boxContent" class="time_order_container">
      <dv-scroll-board
        style="width: 100%; height: 100%"
        ref="timeOrderBoardRef"
        :config="config"
      />
    </div>
  </border-box>
</template>

<script>
import BorderBox from "../components/borderBox.vue";

export default {
  components: {
    BorderBox,
  },

  data() {
    return {
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
        headerBGC: "#1078DC",
        oddRowBGC: "#020837",
        evenRowBGC: "#020837",
        waitTime: 3000,
        align: ["center", "center", "center", "center"],
        carousel: "page",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.time_order_container {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>