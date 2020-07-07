// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    "postcss-plugin-px2rem": {
      remUnit: 100,
      selectorBlackList: [/^html$/, ".page-cell-main-menu"],
      unitPrecision: 5,
      minPixelValue: 2,
      propBlackList: ["border", "border-radius"]
    },
    "postcss-lsx-zr": {}
  }
};
