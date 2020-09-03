// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    "postcss-plugin-px2rem": {
      exclude: /cutmomersPair.vue|cutmomersResultList.vue/,
      remUnit: 100,
      selectorBlackList: [/^html$/],
      unitPrecision: 5,
      minPixelValue: 2,
      propBlackList: ["border"]
    },
    "postcss-lsx-zr": {}
  }
};
