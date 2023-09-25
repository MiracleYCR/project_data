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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  position: relative;

  .name {
    position: absolute;
    width: 572px;
    height: 37px;
    font-size: 38px;
    font-weight: 800;
    color: #0ab8ff;
    line-height: 32px;
    bottom: 110px;
  }

  .bg {
    width: 100%;
    height: 100%;
  }
}
</style>
