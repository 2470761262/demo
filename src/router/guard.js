
import util from '@/util/util';
import { LOGINDATA } from '@/util/constMap';
import { Notification } from 'element-ui';
export default (router) => {
  //路由拦截
  router.beforeEach((to, form, next) => {
    if (to.fullPath === "/") {
      next();
    } else {
      if (to.meta.jumpLogin) {
        next();
      } else if (util.localStorageGet(LOGINDATA)) {
        next();
      } else {
        Notification({
          title: '提示',
          message: '您没有进行登录,将跳转登录页面!',
          type: "warning"
        })
        next({ path: '/' })
      }
    }
  });
}
