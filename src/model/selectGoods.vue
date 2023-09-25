<template>
  <div class="select_goods_container">
    <div class="title">渝品甄选</div>

    <div class="select_goods_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else id="select_goods_chart" ref="selectGoodsRef">
        <dv-scroll-board :config="config" style="width: 100%; height: 100%" />
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
        header: ["排名", "商品名称", "销售数量"],
        data: [
          [
            "1",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/1.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">渝水优品 百丈峰蜂蜜 150g</span>
              </div>`,
            "1063",
          ],
          [
            "2",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/2.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">渝水优品 百丈峰蜂蜜 360g*2</span>
              </div>`,
            "997",
          ],
          [
            "3",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/3.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">渝水优品 百丈峰莲子 400g (莲子)*3</span>
              </div>`,
            "925",
          ],
          [
            "4",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/4.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">渝水优品 百丈峰莲芯 230g (莲芯)*1 + 400g (莲子)*2</span>
              </div>`,
            "866",
          ],
          [
            "5",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/5.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">嘉木科技 简装辣木茶 80g</span>
              </div>`,
            "708",
          ],
          [
            "6",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/6.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">嘉木科技 简装辣木茶 120g</span>
              </div>`,
            "681",
          ],
          [
            "7",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/7.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">嘉木科技 精装辣木茶 180g</span>
              </div>`,
            "563",
          ],
          [
            "8",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/8.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">新巧美 水北米粉 500g*6</span>
              </div>`,
            "557",
          ],
          [
            "9",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/9.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">水芳手工 水北圆子 400g</span>
              </div>`,
            "429",
          ],
          [
            "10",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/10.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">水芳手工 南瓜酱 380g</span>
              </div>`,
            "406",
          ],
          [
            "11",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/11.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">水芳手工 柚子酱 380g</span>
              </div>`,
            "385",
          ],
          [
            "12",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/12.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">黄坑合昌 黄坑挂面 500g*7</span>
              </div>`,
            "267",
          ],
          [
            "13",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/13.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">鑫苼源农业 羊奶皂 110g</span>
              </div>`,
            "224",
          ],
          [
            "14",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/14.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">天凯乐 冰淇淋礼盒</span>
              </div>`,
            "168",
          ],
          [
            "15",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${require("@/assets/images/products/15.png")}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">渝水优品 干货礼盒</span>
              </div>`,
            "72",
          ],
        ],
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
        waitTime: 5000,
        carousel: "page",
        align: ["center", "left", "center"],
        columnWidth: [],
      },
    };
  },

  mounted() {
    if (!this.loading) {
      const selectGoodsDomWidth = this.$refs.selectGoodsRef.offsetWidth;
      this.config.columnWidth = [50, selectGoodsDomWidth - 130, 80];
    }
  },
};
</script>

<style lang="scss" scoped>
.select_goods_container {
  position: relative;
  width: 454px;
  height: 338px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/images/box.png");

  .title {
    height: 20px;
    color: #0ab8ff;
    font-size: 20px;
    font-weight: 800;
    margin-top: 10px;
    margin-left: 19px;
    display: flex;
    align-items: center;
  }

  .select_goods_body {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
    bottom: 20px;

    #select_goods_chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
