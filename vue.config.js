const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir);
}
const webpack = require("webpack");
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "dist",
  assetsDir: "assets",
  productionSourceMap: false,
  filenameHashing: true,
  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  parallel: require("os").cpus().length > 1,
  //lintOnSave: true,
  chainWebpack: config => {
    //  console.log(config.resolve.alias, "config");

    // config.resolve.alias.set("vue$", "vue/dist/vue.esm.js");
    config.resolve.alias.set("@", resolve("src"));
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    config.module.rules.delete("eslint");
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  },
  //cnd引入
  configureWebpack: config => {
    // config.externals = {
    //   vue: "Vue",
    //   "element-ui": "ELEMENT"
    // };
    if (isProduction) {
      const plugins = [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        //     new CompressionWebpackPlugin({
        //       algorithm: "gzip",
        //       test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        //       threshold: 10240,
        //       minRatio: 0.8
        //     })
        //     // new webpack.optimize.LimitChunkCountPlugin({
        //     //   maxChunks: 5,
        //     //   minChunkSize: 100
        //     // })
      ];
      config.plugins.push(...plugins);
    }
  },
  devServer: {
    disableHostCheck: true,
    open: true,
    host: "localhost",
    port: 8080, // 端口号
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:8086/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/publicLess/root.less")]
    });
}
