import request from "./http";

// 智慧农贸（渝控通）
export default {
  // 顶部全部数据
  fetchTotalData() {
    return request({
      url: "/api_smartfarm/yukongtong/stats",
      method: "GET",
    });
  },

  // 商户占比
  fetchMerchantRatio() {
    return request({
      url: "",
      method: "GET",
    });
  },

  // 商户排行
  fetchMerchantRank() {
    return request({
      url: "/api_smartfarm/yukongtong/merchant-rank",
      method: "GET",
    });
  },

  // 月净交易实收
  fetchTradeMonthIncome() {
    return request({
      url: "/api_smartfarm/yukongtong/year-stats",
      method: "GET",
    });
  },

  // 实时订单
  fetchTimeOrder() {
    return request({
      url: "/api_smartfarm/yukongtong/recent-trade",
      method: "GET",
    });
  },

  // 智慧农贸
  fetchSmartFarmDisplay() {
    return request({
      url: "/api_smartfarm/yukongtong/summary-top",
      method: "GET",
    });
  },
};
