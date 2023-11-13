<template>
  <div class="main_content_chart_container">
    <FarmProportion v-if="!toggleType" />
    <IncomeForce v-else />
  </div>
</template>

<script>
import IncomeForce from "./incomeForce.vue";
import FarmProportion from "./farmProportion.vue";

export default {
  components: {
    IncomeForce,
    FarmProportion,
  },

  data() {
    return {
      timer: null,
      toggleType: false,
    };
  },

  mounted() {
    this.timer = setInterval(() => {
      this.toggleChangeMainContentChart();
    }, 60 * 1000);
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    async toggleChangeMainContentChart() {
      this.toggleType = !this.toggleType;
    },
  },
};
</script>

<style lang="scss" scoped>
.main_content_chart_container {
  width: 100%;
  height: 100%;
}
</style>
