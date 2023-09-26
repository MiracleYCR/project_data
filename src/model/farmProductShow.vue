<template>
  <div class="farm_product_show_container">
    <div class="title">农产品展销</div>
    <div class="merchant_rank_body">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <!-- <div v-else id="farm_product_show_chart"></div> -->
      <wordcloud3D width="356" height="258" :data="wordList" :RADIUS="160" />
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud";

import wordcloud3D from "@/components/wordcloud3D.vue";

export default {
  components: {
    wordcloud3D,
  },

  data() {
    return {
      timer: null,
      loading: false,

      wordList: [
        "百丈峰蜂蜜",
        "沧湘莲子",
        "干货礼盒",
        "南瓜酱",
        "蜂蜜条",
        "沧莲心",
        "水北米粉",
        "黄坑挂面",
        "水北圆子",
        "辣木茶简装",
        "冰淇淋礼盒",
        "柚子皮酱",
      ],
    };
  },

  mounted() {
    const chart = echarts.init(
      document.getElementById("farm_product_show_chart")
    );

    chart.setOption({
      series: [
        {
          // 类型
          type: "wordCloud",
          shape: "circle",
          width: "90%",
          height: "90%",
          // 数据映射文本的大小范围
          sizeRange: [10, 50],
          // 文字旋转范围
          rotationRange: [0, 0],
          // 单词之间的间距
          gridSize: 15,
          // 渲染动画
          layoutAnimation: true,
          // 字体
          textStyle: {
            // 随机色值
            color: () => {
              const colorList = [
                "#FFB3F6",
                "#6BC988",
                "#FFBF4D",
                "#00F1FF",
                "#B366FF",
                "#E16387",
                "#FF2D2D",
              ];
              return colorList[Math.floor(Math.random() * 7)];
            },
          },
          // 高亮字体
          emphasis: {
            textStyle: {
              fontWeight: "bold",
              color: "#ffffff",
            },
          },
          // 数据
          data: [
            {
              name: "百丈峰蜂蜜",
              value: 11,
            },
            {
              name: "沧湘莲子",
              value: 12,
            },
            {
              name: "干货礼盒",
              value: 13,
            },
            {
              name: "南瓜酱",
              value: 11,
            },
            {
              name: "蜂蜜条",
              value: 12,
            },
            {
              name: "沧莲心",
              value: 13,
            },
            {
              name: "水北米粉",
              value: 11,
            },
            {
              name: "黄坑挂面",
              value: 12,
            },
            {
              name: "水北圆子",
              value: 13,
            },
            {
              name: "辣木茶简装",
              value: 11,
            },
            {
              name: "冰淇淋礼盒",
              value: 12,
            },
            {
              name: "柚子皮酱",
              value: 13,
            },
          ],
        },
      ],
    });
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
