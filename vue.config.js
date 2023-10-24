const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/api_yusmartcard": {
        target: "https://szshmall.shuziys.com", // 目标主机
        changeOrigin: true, // 启用跨域
        pathRewrite: {
          "^/api_yusmartcard": "", // 重写路径，如果后端接口不包含 '/api' 前缀，可以去掉
        },
      },
    },
  },
});
