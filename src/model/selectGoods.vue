<template>
  <border-box
    boxTitle="渝品甄选"
    :customStyle="{
      width: '454px',
      height: '338px',
    }"
  >
    <div slot="boxContent" class="select_goods_container" ref="selectGoodsRef">
      <dv-scroll-board :config="config" style="width: 100%; height: 100%" />
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
        header: ["排名", "商品名称", "销售数量"],
        data: [
          ["1", "商品名称商品名称商品名称", "888"],
          ["2", "商品名称商品名称商品名称", "777"],
          ["3", "商品名称商品名称商品名称", "666"],
          ["4", "商品名称商品名称商品名称", "555"],
          ["5", "商品名称商品名称商品名称", "444"],
          ["6", "商品名称商品名称商品名称", "333"],
          ["7", "商品名称商品名称商品名称", "222"],
          ["8", "商品名称商品名称商品名称", "111"],
          ["9", "商品名称商品名称商品名称", "97"],
          ["10", "商品名称商品名称商品名称", "50"],
        ],
        headerBGC: "#1078DC",
        oddRowBGC: "#020837",
        evenRowBGC: "#020837",
        waitTime: 3000,
        align: ["center", "left", "center"],
        columnWidth: [],
      },
    };
  },

  mounted() {
    const selectGoodsDomWidth = this.$refs.selectGoodsRef.offsetWidth;
    this.config.columnWidth = [80, selectGoodsDomWidth - 160, 80];
  },
};
</script>

<style lang="scss" scoped>
.select_goods_container {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
