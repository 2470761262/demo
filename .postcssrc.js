// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-plugin-px2rem": {
      remUnit: 100,
      selectorBlackList: [/^html$/],
      unitPrecision: 5,
      minPixelValue: 2
    }
  }
}
