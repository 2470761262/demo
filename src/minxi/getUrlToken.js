import util from "@/util/util";
//import {getColor} from '@/themePackers/getSkin';
import { TOKEN, LOGINDATA } from "@/util/constMap";
export default {
  beforeCreate() {
    if (process.env.NODE_ENV !== "development") {
      util.localStorageSet("nest", true);
    } else {
      util.localStorageSet("nest", false);
    }
  },
  created() {
    //console.log(window.location.href);
    //console.log(window.location.hash);
    var url = window.location.href; //获取url中"?"符后的字串
    console.log("getUrlToken--url-->", url);
    var theRequest = new URLSearchParams(url.substring(url.indexOf("?")));

    var token = theRequest.get("tk");
    if (token == "" || token == null)
      //兼容部分低版本浏览器通过上面的方法获取不到token问题
      token = this.getQueryVariable("tk");
    console.log(util.localStorageGet("tk"), token, "util.localStorageGet(tk)");
    if (
      !util.localStorageGet(LOGINDATA) ||
      (token != "" && token != null && token != util.localStorageGet("tk"))
    ) {
      //util.localStorageSet("logindata",{sessionId:null});
      this.getLoginData(token);
    }
    //getColor();
    console.log("getUrlToken---->" + token);

    if (token != null) {
      //util.localStorageSet('nest', true);
      util.localStorageSet(TOKEN, token);
    } else {
      //util.localStorageSet('nest', false);
    }
  },
  mounted() {
    if (window.self !== window.top) {
      document.querySelector("#page-cell-main").style.height = "100%";
    }
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return null;
    },
    getLoginData(token) {
      let params = { token: token };
      this.$api
        .post({
          url: "/loginManager/getLoginData",
          data: params,
          token: false,
          qs: true,
          async: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log("200-------->", e.data.data);
            util.localStorageSet("logindata", e.data.data);
          } else {
            console.log("-------->", e);
          }
        })
        .catch(e => {
          console.log("catch-------->", e);
        });
    }
  }
};
