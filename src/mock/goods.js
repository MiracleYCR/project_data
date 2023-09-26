import { getRandomElements, generateRandomNumber } from "@/utils";

export const goodsList = [
  { name: "渝水优品 百丈峰蜂蜜 150g", imgUrl: "1.png" },
  { name: "渝水优品 百丈峰蜂蜜 360g*2", imgUrl: "2.png" },
  { name: "渝水优品 百丈峰莲子 400g (莲子)*3", imgUrl: "3.png" },
  {
    name: "渝水优品 百丈峰莲芯 230g (莲芯)*1 + 400g (莲子)*2",
    imgUrl: "1.png",
  },
  { name: "嘉木科技 简装辣木茶 80g", imgUrl: "4.png" },
  { name: "嘉木科技 简装辣木茶 120g", imgUrl: "5.png" },
  { name: "嘉木科技 精装辣木茶 180g", imgUrl: "6.png" },
  { name: "新巧美 水北米粉 500g*6", imgUrl: "7.png" },
  { name: "水芳手工 水北圆子 400g", imgUrl: "8.png" },
  { name: "水芳手工 南瓜酱 380g", imgUrl: "9.png" },
  { name: "水芳手工 柚子酱 380g", imgUrl: "10.png" },
  { name: "黄坑合昌 黄坑挂面 500g*7", imgUrl: "11.png" },
  { name: "鑫苼源农业 羊奶皂 110g", imgUrl: "12.png" },
  { name: "天凯乐 冰淇淋礼盒", imgUrl: "13.png" },
  { name: "渝水优品 干货礼盒", imgUrl: "14.png" },
];

export const generateGoodsTop4 = () => {
  return getRandomElements(goodsList, 4);
};

export const generateGoodsTop4Order = (count = 4) => {
  const orderList = [];

  for (let i = 0; i < count; i++) {
    orderList.push(parseInt(generateRandomNumber(500, 1000)));
  }

  return orderList.sort((a, b) => b - a);
};
