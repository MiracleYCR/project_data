import request from "./http";

export default {
  fetchIncomeForceData() {
    return request({
      url: "/api_common/incomeForce",
      method: "GET",
    });
  },
};
