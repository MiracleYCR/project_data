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

export const daysData = [
  [98888, 362, 1210, 3400],
  [118888, 210, 1530, 4600],
  [110000, 532, 1081, 2100],
  [106700, 287, 999, 5710],
  [122500, 387, 1599, 4190],
  [118230, 468, 1992, 2310],
  [131800, 312, 1583, 5550],
  [105150, 422, 1623, 1210],
  [135600, 513, 1763, 4550],
  [125555, 698, 2245, 2318],
  [152129, 531, 1578, 3461],
  [172647, 617, 1618, 4878],
  [108263, 612, 1888, 3677],
  [112084, 276, 1009, 4539],
  [109763, 564, 1982, 3342],
  [112947, 871, 1089, 2431],
  [124818, 996, 1056, 6643],
  [147827, 571, 1305, 6716],
  [178123, 763, 1249, 5876],
  [157612, 421, 1023, 6310],
];
