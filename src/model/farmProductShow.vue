<template>
  <border-box
    boxTitle="农产品展销"
    :customStyle="{
      width: '396px',
      height: '338px',
    }"
  >
    <div slot="boxContent" id="farm_product_show_container"></div>
  </border-box>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud";

import BorderBox from "../components/borderBox.vue";

export default {
  components: {
    BorderBox,
  },

  mounted() {
    const chart = echarts.init(
      document.getElementById("farm_product_show_container")
    );

    chart.setOption({
      series: [
        {
          // 类型
          type: "wordCloud",
          shape: "circle",
          width: "100%",
          height: "100%",
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
              ];
              return colorList[Math.floor(Math.random() * 6)];
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
              name: "水北圆子",
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
#farm_product_show_container {
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
