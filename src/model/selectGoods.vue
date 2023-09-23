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
          [
            "1",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "888",
          ],
          [
            "2",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "777",
          ],
          [
            "3",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "666",
          ],
          [
            "4",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "555",
          ],
          [
            "5",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "444",
          ],
          [
            "6",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "333",
          ],
          [
            "7",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "222",
          ],
          [
            "8",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "111",
          ],
          [
            "9",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "97",
          ],
          [
            "10",
            `<div style="display: flex; align-items: center">
              <img style="width: 30px; height: 30px; object-fit: cover" src="https://images.pexels.com/photos/603030/pexels-photo-603030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
              <span style="margin-left: 10px">商品名称商品名称商品名称</span>
              </div>`,
            "50",
          ],
        ],
        headerBGC: "rgba(0, 211, 255, 0.1)",
        oddRowBGC: "",
        evenRowBGC: "",
        waitTime: 3000,
        align: ["center", "left", "center"],
        columnWidth: [],
      },
    };
  },

  mounted() {
    const selectGoodsDomWidth = this.$refs.selectGoodsRef.offsetWidth;
    this.config.columnWidth = [50, selectGoodsDomWidth - 130, 80];
  },
};
</script>

<style lang="scss" scoped>
.select_goods_container {
  position: absolute;
  top: 60px;
  left: 30px;
  right: 30px;
  bottom: 30px;
}
</style>
