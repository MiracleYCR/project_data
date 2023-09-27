<template>
  <div class="total_data_container">
    <div class="left">
      <div class="title">总商户数量</div>
      <dv-digital-flop
        :config="merchantNumConfig"
        style="width: 100%; height: 36px"
      />
    </div>

    <div class="center">
      <div class="title">交易总金额（元）</div>
      <dv-digital-flop
        :config="totalAmtConfig"
        style="width: 100%; height: 53px"
      />
    </div>

    <div class="right">
      <div class="title">交易总笔数</div>
      <dv-digital-flop
        :config="tradeNumConfig"
        style="width: 100%; height: 36px"
      />
    </div>
  </div>
</template>

<script>
import { currency } from "@/utils/index";

export default {
  data() {
    return {
      merchantNumConfig: {
        number: [5861],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "left",
        style: {
          fontSize: 36,
          fill: "#00d3ff",
        },
      },

      totalAmtConfig: {
        number: [98365861.68],
        content: "{nt}",
        toFixed: 2,
        formatter: (value) => currency(value, 2, true),
        textAlign: "center",
        style: {
          fontSize: 53,
          fill: "#00d3ff",
        },
      },

      tradeNumConfig: {
        number: [65861],
        content: "{nt}",
        formatter: (value) => currency(value, 0, true),
        textAlign: "right",
        style: {
          fontSize: 36,
          fill: "#00d3ff",
        },
      },

      timer: null,
    };
  },

  mounted() {
    this.timer = setInterval(() => {
      // 总商户数
      // const randomNum1 = Math.floor(Math.random() * 3);
      // this.merchantNumConfig = Object.assign({}, this.merchantNumConfig, {
      //   number: [this.merchantNumConfig.number[0] + randomNum1],
      // });

      // 总交易额
      const randomNum2 = Math.floor(Math.random() * (5000 - 200 + 1)) + 200;
      this.totalAmtConfig = Object.assign({}, this.totalAmtConfig, {
        number: [this.totalAmtConfig.number[0] + randomNum2],
      });

      // 总交易笔数
      const randomNum3 = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
      this.tradeNumConfig = Object.assign({}, this.tradeNumConfig, {
        number: [this.tradeNumConfig.number[0] + randomNum3],
      });
    }, 30 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.total_data_container {
  height: 100px;
  margin: 20px 34px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .center {
    width: calc(60% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      width: 100%;
      font-size: 22px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 5px;
    }
  }

  .left,
  .right {
    width: 20%;
    display: flex;
    margin-top: 33px;
    flex-direction: column;
    align-items: center;

    .title {
      width: 100%;
      font-size: 17px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 5px;
    }
  }

  .left {
    .title {
      text-align: left;
    }
  }

  .right {
    .title {
      text-align: right;
    }
  }
}
</style>
