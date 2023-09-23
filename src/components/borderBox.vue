<template>
  <div :class="['border_box_container', bgImageClass]" :style="customStyle">
    <div class="box_title">{{ boxTitle }}</div>
    <slot name="boxContent"></slot>
  </div>
</template>

<script>
export default {
  props: {
    customStyle: {
      type: Object,
      default: () => {},
    },

    boxTitle: {
      type: String,
      default: "",
    },

    boxType: {
      type: String,
      default: "default",
    },
  },

  computed: {
    bgImageClass() {
      return this.boxType;
    },
  },
};
</script>

<style lang="scss" scoped>
.border_box_container {
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &.default {
    background-image: url("../assets/images/box.png");
  }

  &.mini {
    background-image: url("../assets/images/box2@2x.png");
  }

  .box_title {
    height: 20px;
    margin-top: 9px;
    margin-left: 24px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: PingFang;
    font-weight: 800;
    color: #0ab8ff;
  }
}
</style>
