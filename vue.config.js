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
        target: "http://83456030kf.zicp.fun:47124",
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
    },

    client: {
      overlay: false,
    },
  },
});
