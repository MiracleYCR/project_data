<template>
  <border-box
    boxTitle="智慧农贸"
    :customStyle="{
      width: '504px',
      height: '338px',
    }"
  >
    <div slot="boxContent" class="smart_farm_container">
      <div class="yesterday_data">
        <div class="data_item">
          <div class="title">门店数量</div>
          <dv-digital-flop
            :config="storeNumConfig"
            style="width: 100%; height: 34px"
          />
        </div>

        <div class="data_item">
          <div class="title">昨日交易笔数</div>
          <dv-digital-flop
            :config="storeNumConfig"
            style="width: 100%; height: 34px"
          />
        </div>

        <div class="data_item">
          <div class="title">昨日交易营收（元）</div>
          <dv-digital-flop
            :config="yesterdayTradeNumConfig"
            style="width: 100%; height: 34px"
          />
        </div>
      </div>

      <div class="yesterday_data_rank" ref="yesterdayDataRankRef">
        <dv-scroll-board
          style="width: 100%; height: 100%"
          :config="boardConfig"
        />
      </div>
    </div>
  </border-box>
</template>

<script>
import { numberFormatter } from "@/utils/index";
import BorderBox from "../components/borderBox.vue";

export default {
  components: {
    BorderBox,
  },

  data() {
    return {
      storeNumConfig: {
        number: [864],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "center",
        style: {
          fontSize: 34,
          fill: "#00d3ff",
        },
      },

      yesterdayTradeNumConfig: {
        number: [123861],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "center",
        style: {
          fontSize: 34,
          fill: "#00d3ff",
        },
      },

      yesterdayTradeAmtConfig: {
        number: [123451.23],
        content: "{nt}",
        formatter: numberFormatter,
        textAlign: "center",
        style: {
          fontSize: 34,
          fill: "#00d3ff",
        },
      },

      boardConfig: {
        header: ["排名", "门店名称", "交易笔数", "交易实收"],
        data: [
          ["1", "商户名太长的省略省略省略省商户", "898", "1898.98"],
          ["2", "某某某某商户某某某某商户", "756", "1756.58"],
          ["3", "某某某某某某商户省略省略省略", "688", "1699.40"],
          ["4", "商户名太长的省略省略省略省商户", "555", "1573.65"],
          ["5", "商户名太长的省略省略省略省商户", "547", "1510.06"],
          ["6", "商户名太长的省略省略省略省商户", "521", "1421.78"],
          ["7", "商户名太长的省略省略省略省商户", "432", "1298.65"],
          ["8", "商户名太长的省略省略省略省商户", "416", "976.35"],
          ["9", "商户名太长的省略省略省略省商户", "387", "886.27"],
          ["10", "商户名太长的省略省略省略省商户", "291", "746.05"],
        ],
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
        waitTime: 3000,
        carousel: "page",
        align: ["center", "left", "center", "center"],
        columnWidth: [],
      },
    };
  },

  mounted() {
    const yesterdayDataRankRefDomWidth =
      this.$refs.yesterdayDataRankRef.offsetWidth;

    this.boardConfig.columnWidth = [
      80,
      yesterdayDataRankRefDomWidth - 280,
      100,
      100,
    ];
  },
};
</script>

<style lang="scss" scoped>
.smart_farm_container {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;

  .yesterday_data {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .data_item {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        height: 16px;
        line-height: 16px;
        color: #ffffff;
      }
    }
  }

  .yesterday_data_rank {
    width: 100%;
    flex: 1;
    margin-top: 10px;
  }
}
</style>
