import util from "@/util/util";
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
    util.localStorageSet("tk", token);

  }
}