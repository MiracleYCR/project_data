<template>
  <div id="app">
    <v-scale-screen width="1920" height="1080">
      <div class="app_body">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <template v-else>
          <AppHeader />
          <AppContent />
        </template>
      </div>
    </v-scale-screen>
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

  .app_body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("./assets/images/bg@2x.png");
  }
}
</style>
