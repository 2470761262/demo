import util from "@/util/util";
import {
  TREMEPACKERS,
  TREMEDEFTULTCOLOR,
  FONTSIZEBASE,
  FONTSIZEBASENAME
} from "@/util/constMap";
//const version = require('element-ui/package.json').version // element-ui version from node_modules
const defaultColor = "#409EFF"; // 不可修改
const tint = 0.8;
let themeData = {
  dom: document.documentElement,
  chalk: "",
  createImport(val, ordVal = defaultColor, font) {
    let newVal = val;
    if (newVal == undefined) {
      let storeColor = util.localStorageGet(TREMEPACKERS);
      if (!storeColor) {
        util.localStorageSet(TREMEPACKERS, TREMEDEFTULTCOLOR);
        storeColor = TREMEDEFTULTCOLOR;
      }
      newVal = storeColor;
    }
    if (font == undefined) {
      let fontsizebasename = util.localStorageGet(FONTSIZEBASENAME);
      if (!fontsizebasename) {
        util.localStorageSet(FONTSIZEBASENAME, FONTSIZEBASE);
      }
    }
    // if (process.env.NODE_ENV != 'development') {
    // themeData.createStyle(newVal, ordVal);
    // }
    themeData.createStyle(newVal, ordVal);
    themeData.init(newVal);
    themeData.font(font);
    return Promise.resolve();
  },
  font(fontSize) {
    let fontsizebasename = util.localStorageGet(FONTSIZEBASENAME);
    const fontRootField = [
      "--font--12",
      "--font--13",
      "--font--14",
      "--font--15",
      "--font--16",
      "--font--17",
      "--font--18",
      "--font--19",
      "--font--20",
      "--font--21",
      "--font--22",
      "--font--23",
      "--font--24",
      "--font--25",
      "--font--26"
    ];
    if (!fontSize) {
      if (fontsizebasename) {
        fontRootField.forEach((item, index) => {
          this.dom.style.setProperty(item, fontsizebasename + index + "px");
        });
      } else {
        fontRootField.forEach((item, index) => {
          this.dom.style.setProperty(item, FONTSIZEBASE + index + "px");
        });
      }
    } else {
      fontRootField.forEach((item, index) => {
        this.dom.style.setProperty(item, fontSize + index + "px");
      });
      util.localStorageSet(FONTSIZEBASENAME, fontSize);
    }
  },
  init(color) {
    let tremePackers = util.localStorageGet(TREMEPACKERS);
    console.log(tremePackers, "tremePackers", color);
    if (!color) {
      if (tremePackers) {
        this.dom.style.setProperty("--color--primary", tremePackers);
        this.dom.style.setProperty(
          "--color--opticyBackground",
          tintColor(tremePackers.replace("#", ""), tint)
        );
      } else {
        this.dom.style.setProperty("--color--primary", defaultColor);
        this.dom.style.setProperty(
          "--color--opticyBackground",
          tintColor(defaultColor.replace("#", ""), tint)
        );
      }
    } else {
      this.dom.style.setProperty("--color--primary", color);
      this.dom.style.setProperty(
        "--color--opticyBackground",
        tintColor(color.replace("#", ""), tint)
      );
      util.localStorageSet(TREMEPACKERS, color);
    }
  },
  createStyle(val, oldVal) {
    const themeCluster = themeData.getThemeCluster(val.replace("#", ""));
    const originalCluster = themeData.getThemeCluster(oldVal.replace("#", ""));
    const getHandler = (variable, id) => {
      return () => {
        let styleTag = document.getElementById(id);
        if (styleTag != null && styleTag.innerText)
          this[variable] = styleTag.innerText;
        const originalCluster = themeData.getThemeCluster(
          defaultColor.replace("#", "")
        );
        const newStyle = themeData.updateStyle(
          this[variable],
          originalCluster,
          themeCluster
        );
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.setAttribute("id", id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };
    const chalkHandler = getHandler("chalk", "chalk-style");
    if (!themeData.chalk) {
      //   const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
      //   themeData.getCSSString(url, chalkHandler, 'chalk').then(({
      //     styleCss,
      //     variable
      //   }) => {
      //     themeData[variable] = styleCss;
      //   })
    } else {
      chalkHandler();
    }
    const styles = [].slice
      .call(document.querySelectorAll("style"))
      .filter(style => {
        const text = style.innerText;
        return (
          new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
        );
      });
    styles.forEach(style => {
      const { innerText } = style;
      if (typeof innerText !== "string") return;
      style.innerText = themeData.updateStyle(
        innerText,
        originalCluster,
        themeCluster
      );
    });
  },
  updateStyle(style, oldCluster, newCluster) {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
    });
    return newStyle;
  },
  getCSSString(url, callback, variable) {
    return new Promise(r => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          r({
            styleCss: xhr.responseText.replace(/@font-face{[^}]+}/, ""),
            variable: variable
          });
          callback();
        }
      };
      xhr.send();
    });
  },
  getThemeCluster(theme) {
    const shadeColor = (color, shade) => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);

      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);

      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);

      return `#${red}${green}${blue}`;
    };
    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  }
};
const tintColor = (color, tint) => {
  let red = parseInt(color.slice(0, 2), 16);
  let green = parseInt(color.slice(2, 4), 16);
  let blue = parseInt(color.slice(4, 6), 16);

  if (tint === 0) {
    // when primary color is in its rgb space
    return [red, green, blue].join(",");
  } else {
    red += Math.round(tint * (255 - red));
    green += Math.round(tint * (255 - green));
    blue += Math.round(tint * (255 - blue));

    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);

    return `#${red}${green}${blue}`;
  }
};
export default themeData;
