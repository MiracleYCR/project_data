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
import { generateGoodsTop4, generateGoodsTop4Order } from "@/mock/goods";

export default {
  data() {
    const top4goods = generateGoodsTop4();
    const top4Orders = generateGoodsTop4Order();

    return {
      timer: null,
      loading: false,

      config: {
        header: ["排名", "商品名称", "销售数量"],
        rowNum: 4,
        data: top4goods.map((item, index) => {
          const imgUrl = require(`@/assets/images/products/${item.imgUrl}`);
          return [
            `${index + 1}`,
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${imgUrl}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${item.name}</span>
              </div>`,
            `${top4Orders[index]}`,
          ];
        }),
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
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

      this.timer = setInterval(() => {
        const top4goods = generateGoodsTop4();
        const top4Orders = generateGoodsTop4Order();

        this.config = Object.assign({}, this.config, {
          data: top4goods.map((item, index) => {
            const imgUrl = require(`@/assets/images/products/${item.imgUrl}`);
            return [
              `${index + 1}`,
              `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="${imgUrl}">
              <span style="margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${item.name}</span>
              </div>`,
              `${top4Orders[index]}`,
            ];
          }),
        });
      }, 5 * 60 * 1000);
    }
  },

  destroyed() {
    clearInterval(this.timer);
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
