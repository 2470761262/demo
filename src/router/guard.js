
import util from '@/util/util';
import { LOGINDATA,TOKEN } from '@/util/constMap';
import { Notification } from 'element-ui';
export default (router) => {
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
        let tk = new URLSearchParams(to.fullPath).get(TOKEN);
        if(tk){
          next();
        }else{

          if(util.localStorageGet(TOKEN))
          {
            next();
          }else{
            Notification({
              title: '提示',
              message: '您没有进行登录,将跳转登录页面!',
              type: "warning"
            })
            next({ path: '/' })
          }
        }
      }
    }
  });
}
