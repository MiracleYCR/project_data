import { generateRandomNumber, getRandomElements } from "@/utils";

export const merchants = [
  "小廖便利店",
  "渝水区仙来西大道农心水果铺子",
  "渝水区人民南路秀才诚信贸易商行",
  "伊饰缘",
  "渝水区仙来中大道精英办公体育用品",
  "渝水区长青北路顺和烧虾馆",
  "渝水区沿江路小龙坎餐饮店",
  "渝水区赣西大道建辉便利店",
  "渝水区北湖东路兰福百货店",
  "贝斯特母婴生活馆",
  "沿江路环球岛食品超市",
  "渝水区长林路龙泉超市",
  "环球岛食品超市北湖帝景店",
  "渝水区平安路财利日用百货店",
  "渝水区仙来中大道佳德福百货店",
  "新余宴仙湖餐饮管理有限公司",
  "新余观山宴餐饮有限公司",
  "新余市遇餐城餐饮有限公司",
  "新余市江南一九七零餐饮管理有限公司",
  "新余市嗳味餐饮管理有限公司",
  "渝水区长青北路江南一九七零餐饮店",
  "渝水区劳动北路包笼仙包子店",
  "渝水区赣西大道月半披萨店",
  "清新路周福酱线下餐饮体验店",
  "学思路撸天虾餐厅",
  "渝水区罗坊镇大桥旁小青副食批发部",
  "渝水区平安路颖儿鲜鱼馆",
  "新余市博皓会务培训有限公司（餐饮部）",
  "新余市尚格服务有限公司",
  "新余市博皓会务培训有限公司（住宿）",
  "渝水区胜利北路金冠食品店",
  "渝水区平安路二胖私房菜馆",
  "新余市韦斯特酒店管理有限公司",
  "汉丽轩自助烤肉餐厅",
  "酒拾烤肉",
  "新余市御景酒店有限公司",
  "新余市酸柠檬食品有限公司",
  "渝水区中山路福群鑫超市",
  "江西七号食代餐饮管理有限公司",
  "新余苏宁易购东方巴黎店",
  "渝水区平安路全林饭店",
  "渝水区泰安大酒店",
  "北湖中路嘟嘟猪小酒馆",
  "浪莎内衣店",
  "廖记老新余砂锅粥",
  "新北润发超市",
  "廖记湖北油焖大虾",
  "渝水区萌贝儿儿童乐园",
  "渝水区北湖西路科涵书店",
  "渝水区劳动南路久顺电器行",
  "馋猫肉蟹煲",
  "渝水区鲜境小院烧烤店",
  "vivo新明数码科技（胜利北路火车站对面",
  "渝水区味柠檬蛋糕店",
  "渝水区站前西路延伸段味宁檬蛋糕店",
  "渝水区抱石大道酸柠檬蛋糕饼店",
  "渝水区味柠檬蛋糕龙泉弯店",
  "渝水区高能广场酸柠檬蛋糕饼店",
  "渝水区站前西路延伸段铁山购物中心",
  "新余市御景酒店有限公司",
  "新余市恩佳服饰有限公司",
  "渝水区中山路味宁檬蛋糕店",
  "渝水区劳动北路酸柠檬蛋糕饼三店",
  "新余高新区酸柠檬蛋糕饼店",
  "渝水区劳动北路铁山购物中心",
  "渝水区北湖东路酸柠檬蛋糕北湖店",
  "中国石油北湖加油站",
  "中国石油中盈加油站",
  "中国石油水北加油站",
  "渝水区茶山西路味宁檬蛋糕饼店",
  "中国石油中盈加油站（商超）",
  "渝水区沿江路渝小晨餐饮店",
  "中国石油北湖加油站（商超）",
  "中国石油水北加油站（商超）",
  "渝水区沿江路果小妞水果店",
  "渝水区长青北路味宁檬蛋糕饼店",
  "渝水区胜利南路红太阳奶行",
  "希亚臻品酒店",
  "渝水区沿江路小精灵童装店",
  "筑甜甜点店",
  "渝水区诗苏国风酥点店",
  "渝水区上亿广场诗苏糕点店",
  "渝水区牧场清晨新零售店",
  "渝水区赣西大道喜乐美烟酒店",
  "渝水区仙来中大道味宁檬蛋糕饼店",
  "新余市红太阳贸易有跟公司抱石分公司",
  "渝水区北湖东路红太阳奶行",
  "渝水区团结西路伊利牛奶专卖店",
  "真味烧烤",
  "新味缘餐馆",
  "衢州鸭头",
  "汤盛老汤店",
  "渝水区人民南路厨娘红餐饮店",
  "大团圆酒楼",
  "尚呈羊肉汤馆",
  "老上海东哥焖鹅",
  "渝水区白竹路林家铺子土菜馆",
  "新余市江南红餐饮有限公司江南红老味道店",
  "渝水区胜利南路零食有约副食店",
  "爱儿健童装",
  "渝水区洪客隆商业街轻熟女装店",
  "渝水区胜利北路老街美食城",
  "渝水区裕鼎鲜餐饮店",
  "老上海主题餐厅",
  "渝水区北湖东路和润优选生活超市",
  "渝水区站前西路延伸段丁雨超市",
  "零食荟",
  "渝水区江钢超市长红店",
  "渝水区洪客隆商业街欧希饰品店",
  "江钢百货超市天伦城店",
  "一锅羊肉汤",
  "迪卡轩店",
  "姗姗零食超市（抱石大道店）",
  "姗姗零食超市（暨阳店）",
  "姗姗零食超市（赣西学院店）",
  "1+cake甜品店",
  "渝水区仙来西大道安康超市",
  "百果园",
  "新余市新味来餐饮管理有限公司",
  "新余市江南红餐饮有限公司江南红原味店",
  "渝水区百盛商行",
  "新余市江南红餐饮有限公司江南红云味店",
  "渝水区江钢超市翠湖天地店",
  "江南红餐饮有限公司江南红农家院分公司",
  "简鹿糖水铺（暨阳店）",
  "新余市江南红餐饮有限公司江南饭店",
  "渝水区平安路遇见你餐饮店",
  "新余市江南红餐饮有限公司江南厨子分公司",
  "渝水区仙来中大道楼兰办公体育用品",
  "伊丝艾拉内衣店",
  "泽友忆家北京烤鸭",
  "泽友忆家北京烤鸭四中店",
  "渝乡群酒拾烤肉",
  "泽友忆家北京烤鸭城南店",
  "渝水区副食批发市场兆丰体育用品店",
  "渝水区文新路鲜鲜蔬菜店",
  "渝水区北湖东路娜么鲜蔬菜店",
  "渝水区人民南路江南红百福农庄城南店",
  "渝水区江南红百福农庄界水蔬菜店",
  "渝水区江景路江南红界水蔬菜店",
  "新余市渝水区江南红农业发展有限公司龙泉湾",
  "渝水区公园南路界水蔬菜店",
  "渝水区沿江路王捌小苑餐饮店",
  "渝水区长青南路胡胖子有点味餐厅店",
  "渝水区沿江路胡胖子有点味餐厅",
  "零食有约抱石店",
  "渝水区人民南路远东办公体育用品商场",
  "渝水区胜利南路肥牛仔时尚火锅城",
  "渝水区抱石东大道欣泰隆商场",
  "渝水区仙来东大道仙来自选超市",
  "渝水区欧里镇昌坊天然美味坊酒店",
  "渝水区五一中路鸿兴超市红海名仕公馆店",
  "渝水区中山路鸿兴超市暨阳店",
  "大萝小威抱石公园店",
  "渝水区茶山路鸿兴超市一水天城店",
  "渝水区下村镇芦茅沟农家乐",
  "渝水区北湖东路鸿兴超市金盾店",
  "渝水区长青北路鸿兴超市环青店",
  "鸿兴便利超市店",
  "渝水区欧里镇昌坊天然美味坊酒店",
  "渝水区沿江路伊饰缘饰品店",
  "长青北路许记牛蛙馆",
  "渝水区北湖水果干果商行",
  "渝水区北湖西路科涵书店",
  "渝水区北湖西路清华园超市",
  "沿江路科海书苑",
  "老上海主题餐厅",
  "渝水区仰天岗西大道本真超市",
  "渝水区仙来西大道本真超市",
  "渝水区白竹路郭聪超市(本真超市玉竹店)",
  "新余一中书店",
  "渝水区赣西大道本真超市",
  "新余诚丰影城",
  "睫甲日",
  "新余市经典影城有限公司",
  "新余市曼哈顿娱乐服务有限公司",
  "星辰花宿花艺馆",
  "新余市巨幕影院管理有限公司",
  "江西渝州绣坊有限公司",
  "渝水区沿江路胡胖子有点味餐厅",
  "渝水区萌贝儿儿童乐园",
  "渝水区平安路颖儿鲜鱼馆",
  "贵平百货商行",
  "老上海东哥焖鹅",
  "渝水区沿江路王捌小苑餐饮店",
  "袋鼠皮具",
  "渝水区百丈峰农产品中心",
  "渝水区仙来中大道精英办公体育用品",
  "新余市牧莘酒业有限公司",
  "微微超市",
  "好利来生鲜超市",
  "渝水区北湖中路楷茗轩茶舍",
  "渝水区江钢超市康盛店",
  "赣派采耳",
  "渝水区沿江路果小妞",
  "12道锋味",
  "渝水区阳光书店",
  "渝小晨正宗重庆麻辣烫",
  "渝水区沿江路金冠蛋糕罗福广场店",
  "新余市东方环球影城有限公司",
  "零食荟",
  "渝水区沿江路简鹿糖水铺",
  "德信影城（上亿广场店）",
  "渝水区长青北路麦洛菲蛋糕店",
  "麦洛菲龙泉湾东门门口",
  "麦洛菲春江花月店",
  "麦洛菲欧雅城店",
  "麦洛菲燕子山店",
  "麦洛菲里木塘店",
  "渝水区站前西路延伸段麦洛菲蛋糕店",
  "渝水区劳动北路麦洛菲蛋糕店",
  "渝水区麦洛菲蛋糕四中南门店",
  "潮酷茶饮",
  "新余文旅惠民卡",
  "潮酷茶饮",
  "渝水区城北广场陈瑜玲书店",
  "江西南风酒业有限责任公司",
  "古老誓言音乐书吧",
  "渝水区抱石西大道映像剧照相馆",
  "渝水区平安路遇见你餐饮店",
  "衢州鸭头",
  "渝水区公园北村江钢超市",
  "渝水区公园北路江钢超市",
  "麦上煌蛋糕（四中皇冠店）",
  "渝水区北湖东路江钢超市",
  "渝水区团结西路江钢超市",
  "渝水区江钢超市龙泉湾店",
  "渝水区泰安大酒店",
  "渝水区江钢超市北湖缔景店",
  "新余市渝水区江南红农业发展有限公司",
  "渝水区抱石大道江钢超市",
  "渝水区赣西大道江钢超市逸夫店",
  "渝水区胜利南路江钢超市",
  "渝水区学思路江钢超市",
  "嘿有家小冒菜",
  "江西江南恋餐饮管理有限公司江南恋景观餐厅",
  "江西江南恋餐饮管理有限公司",
  "渝水区渝州大道美汇乐超市",
  "渝水区白竹路优鲜优果生活超市",
  "渝水区礼祥里路贝斯特母婴生活馆",
  "渝水区洪客隆商业街织锦服饰店",
  "渝水区威蹦活力空间室内娱乐馆",
  "渝水区平安路江钢超市",
  "新余艺舞艺术培训中心有限公司",
  "渝水区胜利北路老街美食城",
  "渝水区沿江路小龙坎餐饮店",
  "渝水区沙土街江钢超市",
  "时代华城京东家电专卖",
  "酒拾烤肉高能店",
  "新余酒拾烤肉高能店",
  "中石油新余良山加油站",
  "中国石油新余南安加油站",
  "中国石油新余袁坊加油站",
  "新余良山加油站（商超）",
  "新余南安加油站（商超）",
  "新余袁坊加油站（商超）",
  "新余市豆缘食品饮料有限公司",
  "江西省瀚雅旸电子商务有限责任公司",
  "渝水区罗坊镇好又多购物广场",
  "新余市仙女湖商业管理有限公司",
  "齐家鲜豆花肥肠",
  "渝水区茶山西路小城元素超市",
  "初心鞋坊",
  "渝水区茶山路丽轩副食店",
  "仙女湖区凤香百货",
  "仙女湖区渔味楼",
  "仙女湖区永春商店",
  "渝水区康怡冷饮批发部",
  "渝水区沿江路小精灵童装店",
  "马刻便利店(罗福广场店)",
  "渝水区劳动北路食在不同酒店",
  "渝水区劳动南路天天回家吃饭主题餐厅",
  "渝水区仙来西大道一鼎鱼都酒店",
  "步步高百货",
  "渝水区沙土街顺发百货电器商行",
  "新余市渝水区华俊体育培训中心有限公司",
  "渝水区北湖西路麦上煌蛋糕",
  "鹄山麻花",
  "渝水区平安路丰欧购物中心",
  "渝水区丰欧购物中心御天城店",
  "渝水区学思路三德水果店",
  "洪客隆商业街轻熟女装店",
  "大丰收水果仓储中心",
  "渝水区珠珊镇凯鑫农庄",
  "渝水区天工商城旺太阳儿童玩具商行",
  "新余市锦园农业有限公司",
  "FOLLOW密•沉浸剧场密室",
  "渝水区罗坊镇粤客隆超市营业部",
  "柠檬树花园餐厅",
  "周黑鸭（胜利北路店）",
  "周黑鸭（胜利北路店）",
  "周黑鸭（暨阳风情街店）",
  "周黑鸭",
  "渝水区中山路鹿影服装店",
  "渝水区沙土街恒生超市",
  "爱贝艺术培训中心有限公司",
  "汤盛老汤店",
  "新余新爱婴早教托育中心",
  "新余金逸影城",
  "鲜果红休闲农庄",
  "鲜果红休闲农庄",
  "屋塘里重庆串串火锅",
  "渝水区傲雪棋服装店",
  "新余市庆芳体育文化发展有限公司",
  "渝水区团结东路庆芳文具店",
  "三德超市",
  "欧希饰品店",
  "爱尚书屋",
  "大益茶一水天城店",
  "渝水区飞跃电器体验店",
  "渝水区仙来西大道江钢超市",
  "渝水区财利日用百货店",
  "三六五超市",
  "鲜目录寿司店",
  "鲜目录寿司店",
  "井の奈茶饮",
  "井の奈茶饮",
  "新余市鹏泰高能购物广场有限公司",
  "乐果水果管家",
  "消费券转账测试商户",
  "消费券商户测试",
  "宝缦家纺",
  "羊鲜鲜烤串",
  "固美口腔测试",
  "王坑五金门市部",
  "喵来了水果零食果汁",
  "渝水区江钢超市长青北路店",
  "江钢超市御天城店",
  "渝水区信隆生活超市",
  "红地超市",
  "江钢零食优品-金盾店",
  "帝品鲜火锅烧烤面点食材",
  "天麓烟酒茶行",
  "优滋味零食店",
  "渝水区沙土街奇缘鲜果店",
  "渝水区舒达床垫专卖店",
  "万悦汇生活超市",
  "新余发到家商贸有限公司",
  "品味人生家宴",
  "五虎将川蜀火锅店",
  "新余俏西海餐饮有限责任公司",
  "好来福麻辣大王",
  "渝水区界水乡鲜果休闲农庄",
  "渝水区梁阿姨小吃店",
  "修匠通讯",
  "渝水区北湖东路睿远手机店",
  "渝水区下村镇雨翔果园",
  "千年福蛋糕渝水一小店",
  "中源加油站",
  "渝水区上亿广场联合创赢科技店",
  "沫沫文创",
  "渝水区方圆文化用品店",
  "欧莎名秀",
  "渝水区公园北村新金冠蛋糕店",
  "渝水区北湖星城新金冠蛋糕店",
  "渝水区金冠蛋糕高能店",
  "渝水区学思路麦洛菲蛋糕店",
  "渝水区仙来西大道麦洛菲蛋糕店",
  "北六街大牌档",
  "莱茵荷时尚主题酒店",
  "渝水区北湖西路信隆超市",
  "新余顺凯商贸有限公司",
  "渝水区鸿钧电器批发零售",
  "新余格泰工贸有限公司",
  "渝水区长虹农贸市场鑫麦西点",
  "渝水区公园北村鑫麦西点食品店",
  "渝水区胜利南路鑫麦西点店",
  "渝水区文新路麦洛菲蛋糕店",
  "杭州香辣鸡",
  "江西财富广场有限公司新余胜利北路分公司",
  "渝水区长林路千年福点心局",
  "渝水区城北江钢超市城市绿洲店",
  "渝水区仙来中大道千年福食品店",
  "渝水区晨鹏商行",
  "渝水区站前西路眼伸段千年福食品店",
  "渝水区高能广场蜀九捞火锅店",
  "渝水区辣子千红火锅龙泉湾店",
  "渝水区长青北路廖新林餐饮店",
  "新余市熙湘记餐饮管理有限公司",
  "湘约四季私房菜",
  "细牙葡萄庄园",
  "渝水区洪客隆商业街荣华家居生活馆",
  "楠火锅",
  "抱荷园大酒店",
  "颐荷园大酒店",
  "清华园大酒店",
  "渝水区中山路蜀九捞火锅店",
  "新余市新四平电器有限公司",
  "新余市中移制冷设备维修有限公司",
  "新余市汇洲工贸有限公司",
  "陈医师眼镜",
  "渝水区肖记电器店",
  "中国石油天然气股份有限公司江西新余销售分",
  "中国石油新余所属加油站",
  "渝水区味宁檬蛋糕龙泉湾店",
  "新余市渝水区一鼎岚上院商贸行",
  "渝水区味宁檬蛋糕店",
  "渝水区诗苏国风酥点恒太城店",
  "渝水区礼祥里路江钢超市",
  "一一木门",
  "大发宝家具",
  "新余市陈香餐饮发展有限公司陈香迎宾馆",
  "珠江精品瓷砖店",
  "新余市陈香餐饮发展有限公司刘三钵站前东路",
  "渝水区东方巴黎家居广场付培栋木门经销店",
  "晚安家居",
  "新余市陈香餐饮发展有限公司刘记陈香刘三钵",
  "新余市陈香餐饮发展有限公司陈香家宴妈妈菜",
  "中天灯饰",
  "港季烧腊",
  "渝水区湘聚家常饭店",
  "中山路铭旺生鲜超市",
  "香他她煲仔饭玫瑰城店",
  "渝水区赣西大道江钢超市",
  "鲜目录寿司恒太城店",
  "渝水区果探掌便利店",
  "渝水区刘记陈香刘三钵餐饮店",
  "卜丼屋",
  "渝水区天洋软装店",
  "渝水区东方巴黎家居广场博仕门窗店",
  "渝水区东方巴黎家居广场美心门店",
  "渝水区东鹏瓷砖店",
  "渝水区楼兰陶瓷店",
  "布老虎窗帘",
  "马可波罗瓷砖",
  "普锐麦克艺术涂料",
  "渝水区青年路美佳净水设备店",
  "东方巴黎美的智慧家",
  "新余俞味餐饮有限公司",
  "江西商银通电子商务有限公司",
  "渝水区城南胜利南路麦洛菲蛋糕店",
  "麦洛菲龙泉湾店",
  "渝品甄选（本小程序线上商城）",
];

export const generateMerchantsTop6 = () => {
  return getRandomElements(merchants, 6);
};

export const generateGoodsTop6HistoryAmt = (count = 6) => {
  const orderList = [];

  for (let i = 0; i < count; i++) {
    orderList.push(parseInt(generateRandomNumber(1212204, 8948416)));
  }

  return orderList.sort((a, b) => b - a);
};

export const generateMerchantsValues = (total) => {
  const amtNumbers = [];
  const orderNumbers = [];

  let totalAmtNumbers;
  let totalOrderNumbers;

  for (let i = 0; i < total; i++) {
    amtNumbers.push(parseFloat(generateRandomNumber(127, 1499, 2)));

    orderNumbers.push(parseInt(generateRandomNumber(15, 299)));
  }

  amtNumbers.sort((a, b) => b - a);
  orderNumbers.sort((a, b) => b - a);

  totalAmtNumbers = amtNumbers.reduce((prev, next) => {
    return prev + next;
  }, 0);

  console.log(totalAmtNumbers);

  totalOrderNumbers = orderNumbers.reduce((prev, next) => {
    return prev + next;
  }, 0);

  return {
    amt: amtNumbers,
    order: orderNumbers,
    totalAmt: totalAmtNumbers,
    totalOrder: totalOrderNumbers,
  };
};
