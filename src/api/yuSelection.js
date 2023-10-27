import request from "./http";

// 渝品甄选
export default {
  // 顶部全部数据
  fetchTotalData() {
    return request({
      url: "/api_yuselection/api/qstData/total",
      method: "GET",
    });
  },

  // 渝品甄选产品
  fetchSelectedProduction() {
    return request({
      url: "/api_yuselection/api/qstData/products",
      method: "GET",
    });
  },

  // 月净交易实收
  fetchTradeMonthIncome() {
    return request({
      url: "/api_yuselection/api/qstData/monthOrders",
      method: "GET",
    });
  },

  // 实时订单
  fetchTimeOrder() {
    return request({
      url: "/api_yuselection/api/qstData/orders",
      method: "GET",
    });
  },
};
