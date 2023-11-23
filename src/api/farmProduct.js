import request from "./http";

// 农产品展销
export default {
  // 顶部全部数据
  fetchTotalData() {
    return request({
      url: "/api_farmproduct/middlewareweb/largescreen",
      method: "GET",
      params: {
        param: '{function:"top"}',
      },
    });
  },

  // 商户占比
  fetchMerchantRatio() {
    return request({
      url: "/api_farmproduct/middlewareweb/largescreen",
      method: "GET",
      params: {
        param: '{function:"shzb"}',
      },
    });
  },

  // 商户排行
  fetchMerchantRank() {
    return request({
      url: "/api_farmproduct/middlewareweb/largescreen",
      method: "GET",
      params: {
        param: '{function:"shph"}',
      },
    });
  },

  // 月净交易实收
  fetchTradeMonthIncome() {
    return request({
      url: "/api_farmproduct/middlewareweb/largescreen",
      method: "GET",
      params: {
        param: '{function:"yjjyss"}',
      },
    });
  },

  // 实时订单
  fetchTimeOrder() {
    return request({
      url: "/api_farmproduct/middlewareweb/largescreen",
      method: "GET",
      params: {
        param: '{function:"ssdd"}',
      },
    });
  },

  // 农产品展销馆
  fetchFarmProductDisplay() {
    return request({
      url: "/api_farmproduct/middlewareweb/largescreen",
      method: "GET",
      params: {
        param: '{function:"ncpzx"}',
      },
    });
  },
};
