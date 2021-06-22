module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api": { //请求以/api作为标识 "/api/login"
        target: "http://localhost:8001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""// 将标识清空
        }
      }
    },
    disableHostCheck: true
  }
}