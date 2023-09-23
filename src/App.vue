<template>
  <div id="app">
    <dv-full-screen-container>
      <dv-loading v-if="loading">Loading...</dv-loading>
      <template v-else>
        <AppHeader />
        <AppContent />
      </template>
    </dv-full-screen-container>
  </div>
</template>

<script>
import AppHeader from "@/components/header.vue";
import AppContent from "@/components/content.vue";

export default {
  name: "App",

  components: {
    AppHeader,
    AppContent,
  },

  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  color: #ffffff;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./assets/images/bg@2x.png");
}
</style>
