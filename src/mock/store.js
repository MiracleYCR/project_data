import { getRandomElements } from "@/utils";

export const stores = [
  "江西百丈峰米业有限公司",
  "新余市向冉种养农民专业合作社",
  "江西嘉木科技有限公司",
  "江西美源艾草种植有限责任公司",
  "新余市新巧美食品有限公司",
  "新余市鹄山正宗大蒜厂",
  "江西佳又佳食品有限公司",
  "江西天凯乐食品有限公司",
  "新余市乐意特色农业开发有限公司",
  "三八茶厂",
  "新余市新星园林有限责任公司",
  "新余市老俵情面条厂",
  "小作坊鹄山窝里习字号麻花",
  "渝水区仙来办老俵食品厂",
  "新余市渝水区丰民种养殖专业合作社",
  "新余市豆缘食品饮料有限公司",
  "新余市荷之韵农业开发有限公司",
  "渝水区水北水芳手工圆子加工",
  "新余市想民种养农民专业合作社",
  "江西省新余市院前红米基地",
  "新余市北山金片茶叶发展有限公司",
  "新余市国生种养农民专业合作社",
  "渝水区水北镇黄坑挂面",
  "新余市腾胜种植专业合作社",
  "江西省胜邮农业开发有限公司",
  "新余市一把锄头农产品开发有限公司",
  "界水亲慧酒业",
  "新余市仙来红酿酒有限公司",
  "江西南风酒业有限责任公司",
  "渝水区新溪乡城头南风酒坊",
  "新余市欣欣荣农业科技有限公司",
  "新余市余园实业有限公司",
  "新余金源蔬菜配送有限公司",
  "陈氏养蜂农民专业合作社",
  "新余市青兰种养殖家庭农场",
  "黄虎村锦润种养合作社",
  "新余市皇庄种养农民专业合作社",
  "北岗村委三把铺头红薯粉丝",
  "南安和塘",
  "新余市香满浓食品加工有限公司",
  "蒙泉润农业开发有限公司",
  "人和茶叶小作坊",
  "江西鑫苼源农业开发有限责任公司",
  "新余农活泉饮品有限公司（原新余市渝水区百丈峰水厂）",
  "新余市森凤蛋鸡散养有限公司",
  "新余市福耕田农业发展有限公司",
  "渝水区徐娘食品厂",
];

export const generateStoreTop5 = () => {
  return getRandomElements(stores, 5);
};