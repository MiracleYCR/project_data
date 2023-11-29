<template>
  <div class="time_order_container">
    <div class="title">实时订单</div>

    <div class="time_order_body">
      <div id="time_order_chart">
        <div class="chart_header">
          <div>交易时间</div>
          <div>交易金额</div>
          <div>交易渠道</div>
          <div>交易方式</div>
        </div>

        <dv-loading v-if="loading">Loading...</dv-loading>

        <vue-seamless-scroll
          v-else
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
import { currency } from "@/utils";
import yuSmartcard_API from "@/api/yuSmartcard";
import yuSelection_API from "@/api/yuSelection";
// import farmProduct_API from "@/api/farmProduct";
import smartFarm_API from "@/api/smartFarm";

export default {
  data() {
    return {
      timer: null,
      loading: true,

      listData: [],
      classOption: { step: 0 },
    };
  },

  mounted() {
    this.getTimeOrderData();

    this.timer = setInterval(() => {
      this.getTimeOrderData();
    }, 30 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async getTimeOrderData() {
      try {
        // 渝卡通
        const { data: yuSmartcard } = await yuSmartcard_API.fetchTimeOrder();
        // 渝品甄选
        const { data: yuSelection } = await yuSelection_API.fetchTimeOrder();
        // 农产品展销
        // const { data: farmProduct } = await farmProduct_API.fetchTimeOrder();
        // 智慧农贸
        const { data: smartFarm } = await smartFarm_API.fetchTimeOrder();

        // 数据排序
        this.listData = [
          ...yuSmartcard,
          ...yuSelection.data,
          // ...farmProduct.data,
          ...smartFarm,
        ]
          .map((item) => {
            return {
              date: item.tradeDate,
              amt: currency(item.tradeAmt, 2, true),
              channel: item.tradeChannel,
              payment: item.payment,
              timestamp: item.timestamp,
            };
          })
          .sort((a, b) => b.timestamp - a.timestamp);

        this.loading = false;
      } catch (err) {
        this.loading = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.time_order_container {
  position: relative;
  width: 462px;
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
          padding: 0 5px;
          text-align: center;
          width: calc((100% - 220px) / 2);

          &:first-child {
            width: 110px;
          }

          &:last-child {
            width: 110px;
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
              font-size: 13px;
              padding: 0 5px;
              text-align: center;
              width: calc((100% - 220px) / 2);

              &:first-child {
                width: 110px;
              }

              &:last-child {
                width: 110px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
