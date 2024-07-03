const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/api_yusmartcard": {
        target: "https://szshmall.shuziys.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api_yusmartcard": "",
        },
      },
      "/api_yuselection": {
        target: "https://yyx.haomianjie.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api_yuselection": "",
        },
      },
      "/api_farmproduct": {
        // target: "http://83456030kf.zicp.fun:47124",
        target: "http://47.116.207.65:47124",
        changeOrigin: true,
        pathRewrite: {
          "^/api_farmproduct": "",
        },
      },
      "/api_smartfarm": {
        target: "https://szdashboardapi.uphicoo.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api_smartfarm": "",
        },
      },
      // "/api_common": {
      //   target: "https://miracleycr.com:8888/api_common/incomeForce",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api_common": "",
      //   },
      // },
      // "/aaaa": {
      //   target: "https://miracleycr.com:8888/aaaa/smartCard",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/aaaa": "",
      //   },
      // },
    },

    client: {
      overlay: false,
    },
  },
});
