import request from "./http";

// 渝卡通
export default {
  // 顶部全部数据
  fetchTotalData() {
    return request({
      url: "/api_yusmartcard/ysqzn/external/getGrossData",
      method: "GET",
    });
  },

  // 商户占比
  fetchMerchantRatio() {
    return request({
      url: "/api_yusmartcard/ysqzn/external/getMerchantProp",
      method: "GET",
    });
  },

  // 商户排行
  fetchMerchantRank() {
    return request({
      url: "/api_yusmartcard/ysqzn/external/getMerchantRank",
      method: "GET",
    });
  },

  // 智慧渝卡通
  fetchSmartCard() {
    return request({
      url: "/api_yusmartcard/ysqzn/external/getSmartCardData",
      method: "GET",
    });
  },

  // 月净交易实收
  fetchTradeMonthIncome() {
    return request({
      url: "/api_yusmartcard/ysqzn/external/getMonthTradeData",
      method: "GET",
    });
  },

  // 实时订单
  fetchTimeOrder() {
    return request({
      url: "/api_yusmartcard/ysqzn/external/getOrderList",
      method: "GET",
    });
  },
};
