<template>
  <div class="time_order_container">
    <div class="title">实时订单</div>

    <div class="time_order_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else id="time_order_chart">
        <div class="chart_header">
          <div>交易时间</div>
          <div>交易金额</div>
          <div>交易渠道</div>
          <div>交易方式</div>
        </div>

        <vue-seamless-scroll
          class="warp"
          ref="timeOrderBoardRef"
          :data="listData"
          :class-option="classOption"
        >
          <ul class="item">
            <li v-for="(item, index) in listData" :key="index">
              <span style="color: #0ab8ff" v-text="item.date"></span>
              <span style="color: #0ab8ff" v-text="item.amt"></span>
              <span style="color: #0ab8ff" v-text="item.channel"></span>
              <span style="color: #0ab8ff" v-text="item.payment"></span>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import {
  currency,
  // getRandomSecondsInterval
} from "@/utils";
// import { tradeChannel, payment } from "@/mock/orders";

import yuSmartcard_API from "@/api/yuSmartcard";

export default {
  data() {
    return {
      timer: null,
      loading: false,

      listData: [],

      classOption: {
        step: 0,
      },
    };
  },

  mounted() {
    this.getTimeOrderData();

    this.timer = setInterval(() => {
      this.getTimeOrderData();
    }, 30 * 1000);

    // getRandomSecondsInterval(this.initData, 20, 25);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getTimeOrderData() {
      const { data: yuSmartcard } = await yuSmartcard_API.fetchTimeOrder();

      this.listData = yuSmartcard.map((item) => {
        return {
          date: item.tradeDate,
          amt: currency(item.tradeAmt, 2, true),
          channel: item.tradeChannel,
          payment: item.payment,
        };
      });

      console.log(yuSmartcard);
    },

    // initData() {
    //   const currentTime = new Date();
    //   const curChannelIndex = this.generateChannelRandomNumber();
    //   const curPaymentIndex = this.generatePaymentRandomNumber();

    //   this.listData.unshift({
    //     date: `${(currentTime.getMonth() + 1)
    //       .toString()
    //       .padStart(2, "0")}-${currentTime
    //       .getDate()
    //       .toString()
    //       .padStart(2, "0")} ${currentTime.toLocaleTimeString()}`,
    //     amt: currency(Math.random() * (99 - 1 + 1) + 1, 2, true),
    //     channel: tradeChannel[curChannelIndex],
    //     payment: payment[curPaymentIndex],
    //   });

    //   this.$refs.timeOrderBoardRef.reset();
    // },

    // generateChannelRandomNumber() {
    //   const randomValue = Math.random();
    //   if (randomValue < 0.7) {
    //     return 2;
    //   } else {
    //     return Math.random() < 0.6 ? 0 : 1;
    //   }
    // },

    // generatePaymentRandomNumber() {
    //   const randomValue = Math.random();
    //   if (randomValue < 0.7) {
    //     return Math.random() < 0.5 ? 0 : 1;
    //   } else {
    //     return 2;
    //   }
    // },
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
      display: flex;
      flex-direction: column;

      .chart_header {
        height: 35px;
        margin-bottom: 10px;
        font-size: 15px;
        display: flex;
        align-items: center;
        background-color: rgba(0, 211, 255, 0.1);

        div {
          padding: 0 10px;
          text-align: center;
          width: calc((100% - 120px) / 3);

          &:first-child {
            width: 120px;
          }
        }
      }

      .warp {
        width: 414px;
        height: calc(100% - 45px);
        margin: 0 auto;
        overflow: hidden;
        ul {
          list-style: none;
          padding: 0;
          margin: 0 auto;

          li {
            display: block;
            height: 37px;
            line-height: 37px;
            display: flex;
            justify-content: space-between;
            font-size: 15px;

            span {
              font-size: 14px;
              padding: 0 10px;
              text-align: center;
              width: calc((100% - 120px) / 3);

              &:first-child {
                width: 120px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
