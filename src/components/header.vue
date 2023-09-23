<template>
  <div class="app_header">
    <div class="name">{{ appName }}</div>
    <img class="bg" src="../assets/images/light.png" />
  </div>
</template>

<script>
export default {
  name: "app-header",

  data() {
    return {
      appName: "渝水区助农增收大数据可视化平台",
    };
  },
};
</script>

<style lang="scss" scoped>
.app_header {
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .name {
    position: absolute;
    width: 572px;
    height: 37px;
    font-size: 38px;
    font-family: PingFang;
    font-weight: 800;
    color: #0ab8ff;
    line-height: 32px;
    top: 43px;
  }

  .bg {
    width: 100%;
    height: 100%;
  }
}
</style>
