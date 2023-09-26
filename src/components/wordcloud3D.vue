<template>
  <section class="cloud-bed">
    <div class="cloud-box">
      <span
        v-for="(item, index) in dataList"
        :key="index"
        @click="getDataInfo(item)"
        :style="{ color: item.color, background: item.bgColor }"
      >
        {{ item.name }}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: "word-cloud",
  data() {
    return {
      timer: 50, // 球体转动速率
      radius: 0, // 词云球体面积大小
      dtr: Math.PI / 180, //鼠标滑过球体转动速度
      active: false, // 默认加载是否开启转动
      lasta: 0, // 上下转动
      lastb: 0.5, // 左右转动
      distr: true,
      tspeed: 0, // 鼠标移动上去时球体转动
      mouseX: 0,
      mouseY: 0,
      tagAttrList: [],
      tagContent: null,
      cloudContent: null,
      sinA: "",
      cosA: "",
      sinB: "",
      cosB: "",
      sinC: "",
      cosC: "",
      dataList: [
        {
          name: "百丈峰蜂蜜",
          value: 11,
          color: "#FFB3F6",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "沧湘莲子",
          value: 12,
          color: "#6BC988",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "干货礼盒",
          value: 13,
          color: "#FFBF4D",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "南瓜酱",
          value: 11,
          color: "#00F1FF",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "蜂蜜条",
          value: 12,
          color: "#B366FF",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "沧莲心",
          value: 13,
          color: "#E16387",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "水北米粉",
          value: 11,
          color: "#FF2D2D",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "黄坑挂面",
          value: 12,
          color: "#FFB3F6",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "水北圆子",
          value: 13,
          color: "#6BC988",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "辣木茶简装",
          value: 11,
          color: "#FFBF4D",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "冰淇淋礼盒",
          value: 12,
          color: "#00F1FF",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
        {
          name: "柚子皮酱",
          value: 13,
          color: "#B366FF",
          bgColor: "rgb(57, 193, 207,0.12)",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.radius = document.querySelector(".cloud-box").offsetWidth / 2;
      this.initWordCloud();
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 获取点击文本信息
    getDataInfo(item) {
      console.log(item, "item");
    },
    initWordCloud() {
      this.cloudContent = document.querySelector(".cloud-box");
      this.tagContent = this.cloudContent.getElementsByTagName("span");
      for (let i = 0; i < this.tagContent.length; i++) {
        let tagObj = {};
        tagObj.offsetWidth = this.tagContent[i].offsetWidth;
        tagObj.offsetHeight = this.tagContent[i].offsetHeight;
        this.tagAttrList.push(tagObj);
      }
      this.sineCosine(0, 0, 0);
      this.positionAll();
      this.cloudContent.onmouseover = () => {
        this.active = true;
      };
      this.cloudContent.onmouseout = () => {
        this.active = false;
      };
      this.cloudContent.onmousemove = (ev) => {
        let oEvent = window.event || ev;
        this.mouseX =
          oEvent.clientX -
          (this.cloudContent.offsetLeft + this.cloudContent.offsetWidth / 2);
        this.mouseY =
          oEvent.clientY -
          (this.cloudContent.offsetTop + this.cloudContent.offsetHeight / 2);
        this.mouseX /= 5;
        this.mouseY /= 5;
      };
      setInterval(this.update, this.timer);
    },
    positionAll() {
      let phi = 0;
      let theta = 0;
      let max = this.tagAttrList.length;
      let aTmp = [];
      let oFragment = document.createDocumentFragment();
      //随机排序
      for (let i = 0; i < this.tagContent.length; i++) {
        aTmp.push(this.tagContent[i]);
      }
      aTmp.sort(() => {
        return Math.random() < 0.5 ? 1 : -1;
      });
      for (let i = 0; i < aTmp.length; i++) {
        oFragment.appendChild(aTmp[i]);
      }
      this.cloudContent.appendChild(oFragment);
      for (let i = 1; i < max + 1; i++) {
        if (this.distr) {
          phi = Math.acos(-1 + (2 * i - 1) / max);
          theta = Math.sqrt(max * Math.PI) * phi;
        } else {
          phi = Math.random() * Math.PI;
          theta = Math.random() * (2 * Math.PI);
        }
        //坐标变换
        this.tagAttrList[i - 1].cx =
          this.radius * Math.cos(theta) * Math.sin(phi);
        this.tagAttrList[i - 1].cy =
          this.radius * Math.sin(theta) * Math.sin(phi);
        this.tagAttrList[i - 1].cz = this.radius * Math.cos(phi);
        this.tagContent[i - 1].style.left =
          this.tagAttrList[i - 1].cx +
          this.cloudContent.offsetWidth / 2 -
          this.tagAttrList[i - 1].offsetWidth / 2 +
          "px";
        this.tagContent[i - 1].style.top =
          this.tagAttrList[i - 1].cy +
          this.cloudContent.offsetHeight / 2 -
          this.tagAttrList[i - 1].offsetHeight / 2 +
          "px";
      }
    },
    update() {
      let angleBasicA;
      let angleBasicB;

      if (this.active) {
        angleBasicA =
          (-Math.min(Math.max(-this.mouseY, -200), 200) / this.radius) *
          this.tspeed;
        angleBasicB =
          (Math.min(Math.max(-this.mouseX, -200), 200) / this.radius) *
          this.tspeed;
      } else {
        angleBasicA = this.lasta * 0.98;
        angleBasicB = this.lastb * 0.98;
      }

      this.sineCosine(angleBasicA, angleBasicB, 0);
      for (let j = 0; j < this.tagAttrList.length; j++) {
        let rx1 = this.tagAttrList[j].cx;
        let ry1 =
          this.tagAttrList[j].cy * this.cosA +
          this.tagAttrList[j].cz * -this.sinA;
        let rz1 =
          this.tagAttrList[j].cy * this.sinA +
          this.tagAttrList[j].cz * this.cosA;

        let rx2 = rx1 * this.cosB + rz1 * this.sinB;
        let ry2 = ry1;
        let rz2 = rx1 * -this.sinB + rz1 * this.cosB;

        let rx3 = rx2 * this.cosC + ry2 * -this.sinC;
        let ry3 = rx2 * this.sinC + ry2 * this.cosC;
        let rz3 = rz2;
        this.tagAttrList[j].cx = rx3;
        this.tagAttrList[j].cy = ry3;
        this.tagAttrList[j].cz = rz3;

        let per = 350 / (350 + rz3);

        this.tagAttrList[j].x = rx3 * per - 2;
        this.tagAttrList[j].y = ry3 * per;
        this.tagAttrList[j].scale = per;
        this.tagAttrList[j].alpha = per;

        this.tagAttrList[j].alpha =
          (this.tagAttrList[j].alpha - 0.6) * (10 / 6);
      }
      this.doPosition();
      this.depthSort();
    },
    doPosition() {
      let len = this.cloudContent.offsetWidth / 2;
      let height = this.cloudContent.offsetHeight / 2;
      for (let i = 0; i < this.tagAttrList.length; i++) {
        this.tagContent[i].style.left =
          this.tagAttrList[i].cx +
          len -
          this.tagAttrList[i].offsetWidth / 2 +
          "px";
        this.tagContent[i].style.top =
          this.tagAttrList[i].cy +
          height -
          this.tagAttrList[i].offsetHeight / 2 +
          "px";
        this.tagContent[i].style.fontSize =
          Math.ceil((12 * this.tagAttrList[i].scale) / 2) + 2 + "px";
        this.tagContent[i].style.filter =
          "alpha(opacity=" + 100 * this.tagAttrList[i].alpha + ")";
        this.tagContent[i].style.opacity = this.tagAttrList[i].alpha;
      }
    },
    depthSort() {
      let aTmp = [];
      for (let i = 0; i < this.tagContent.length; i++) {
        aTmp.push(this.tagContent[i]);
      }
      aTmp.sort((item1, item2) => item2.cz - item1.cz);
      for (let i = 0; i < aTmp.length; i++) {
        aTmp[i].style.zIndex = i;
      }
    },
    sineCosine(a, b, c) {
      this.sinA = Math.sin(a * this.dtr);
      this.cosA = Math.cos(a * this.dtr);
      this.sinB = Math.sin(b * this.dtr);
      this.cosB = Math.cos(b * this.dtr);
      this.sinC = Math.sin(c * this.dtr);
      this.cosC = Math.cos(c * this.dtr);
    },
  },
};
</script>

<style scoped>
.cloud-bed {
  width: 210px;
  height: 210px;
  margin: auto;
}
.cloud-box {
  position: relative;
  margin: 20px auto 0px;
  width: 100%;
  height: 100%;
  background: #00000000;
}
.cloud-box span {
  position: absolute;
  padding: 3px 6px;
  top: 0px;
  font-weight: bold;
  text-decoration: none;
  left: 0px;
  background-image: linear-gradient(to bottom, red, #fff);
  background-clip: text;
  color: transparent;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
