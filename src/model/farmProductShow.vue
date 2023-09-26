<template>
  <div class="farm_product_show_container">
    <div class="title">农产品展销</div>
    <div class="merchant_rank_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <wordcloud3D />
    </div>
  </div>
</template>

<script>
import wordcloud3D from "@/components/wordcloud3D.vue";

export default {
  components: {
    wordcloud3D,
  },

  data() {
    return {
      timer: null,
      loading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.farm_product_show_container {
  position: relative;
  width: 396px;
  height: 338px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/images/box.png");

  .title {
    height: 20px;
    margin-top: 9px;
    margin-left: 16px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 800;
    color: #0ab8ff;
  }

  .merchant_rank_body {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    #farm_product_show_chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
