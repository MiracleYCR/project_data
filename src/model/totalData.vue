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
import { numberFormatter } from "@/utils/index";

export default {
  data() {
    return {
      merchantNumConfig: {
        number: [26],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "left",
        style: {
          fontSize: 36,
          fill: "#00d3ff",
        },
      },

      totalAmtConfig: {
        number: [26891],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "center",
        style: {
          fontSize: 53,
          fill: "#00d3ff",
        },
      },

      tradeNumConfig: {
        number: [31],
        content: "{nt}",
        formatter: numberFormatter,
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
      // 0-3
      const randomNum1 = Math.floor(Math.random() * 3);
      this.merchantNumConfig = Object.assign({}, this.merchantNumConfig, {
        number: [this.merchantNumConfig.number[0] + randomNum1],
      });

      // 200-1000
      const randomNum2 = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
      this.totalAmtConfig = Object.assign({}, this.totalAmtConfig, {
        number: [this.totalAmtConfig.number[0] + randomNum2],
      });

      // 5-20
      const randomNum3 = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      this.tradeNumConfig = Object.assign({}, this.tradeNumConfig, {
        number: [this.tradeNumConfig.number[0] + randomNum3],
      });
    }, 5000);
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
