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
      "/api_common": {
        target: "https://miracleycr.com:8888/api_common/incomeForce",
        changeOrigin: true,
        pathRewrite: {
          "^/api_common": "",
        },
      },
    },
  },
});
