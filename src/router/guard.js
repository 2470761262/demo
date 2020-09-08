import util from "@/util/util";
import { LOGINDATA, TOKEN } from "@/util/constMap";
import { Notification } from "element-ui";
export default router => {
  //路由拦截
  router.beforeEach((to, form, next) => {
    if (to.name === "Login") {
      next();
    } else {
      if (to.meta.jumpLogin) {
        next();
      } else if (util.localStorageGet(LOGINDATA)) {
        next();
      } else {
        let search = new URL(window.location.href);
        let tk = new URLSearchParams(search.search.slice(1)).get(TOKEN);
        if (tk) {
          next();
        } else {
          if (util.localStorageGet(TOKEN)) {
            next();
          } else {
            Notification({
              title: "提示",
              message: "您没有进行登录!",
              type: "warning"
            });
            next({ path: "/logOut" });
          }
        }
      }
    }
  });
  router.afterEach((to, from) => {
    if (document.querySelector(".el-main")) {
      if (from.meta.isScrollTop) {
        util.sessionLocalStorageSet(
          "scrollTop",
          document.querySelector(".el-main").scrollTop
        );
      } else {
        document.querySelector(".el-main").scrollTop = 0;
        util.sessionLocalStorageSet("scrollTop", 0);
      }
    }
  });
};
