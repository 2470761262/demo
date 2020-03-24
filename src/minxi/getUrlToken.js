import util from "@/util/util";
import {
  TOKEN,LOGINDATA
} from '@/util/constMap';
export default {
  created() {
    //console.log(window.location.href);
    //console.log(window.location.hash);

    var url = window.location.href; //获取url中"?"符后的字串
    console.log("getUrlToken--url-->",url);
    var theRequest = new URLSearchParams(
      url.substring(url.indexOf("?"))
    );
    var token = theRequest.get("tk");

    console.log("getUrlToken---->"+token);

    if(token!=null)
    util.localStorageSet(TOKEN, token);
    if(!util.localStorageGet(LOGINDATA)){
      util.localStorageSet("logindata",{sessionId:null});
    }


  }
}
