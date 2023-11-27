import request from "./http";

// 智慧农贸（渝控通）
export default {
  // 顶部全部数据
  fetchTotalData() {
    return request({
      url: "",
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
      url: "",
      method: "GET",
    });
  },

  // 月净交易实收
  fetchTradeMonthIncome() {
    return request({
      url: "",
      method: "GET",
    });
  },

  // 实时订单
  fetchTimeOrder() {
    return request({
      url: "",
      method: "GET",
    });
  },

  // 智慧农贸
  fetchSmartFarmDisplay() {
    return request({
      url: "",
      method: "GET",
    });
  },
};
