/**
 * 用户锚点日志及行为日志存储传输
 * @type {{mouseover(): void, click(): void}}
 */

import util from "@/util/util";
import { LOGINDATA, TOKEN } from "@/util/constMap";

/**
 * 锚点数据是否开启
 * @type {boolean}
 */
let isOpenLog = true;
let logSocketUri = "ws://" +  process.env.VUE_APP_WEBSOCKET_URI + "/log";

let addLog_eventListener = {
  click() {
    document.addEventListener("click", log_socket.sendUserActionData);
  },
  mouseover() {
    document.addEventListener("mouseover", log_socket.sendUserActionData);
  }
};

let log_socket = {
  socket: null,
  isConn: false,
  init() {
    debugger;
    if (!log_socket.isConn) {
      log_socket.socket = new WebSocket(logSocketUri);
      log_socket.socket.onopen = function(){
        log_socket.isConn = true;
      };
      log_socket.socket.onerror = function(err){
        console.log(err);
        log_socket.isConn = false;
      };
      log_socket.socket.onclose = function(){
        console.log("close");
        log_socket.isConn = false;
      };
    }
  },
  sendUserActionData(e) {
    let accountId = log_socket.getAccountId();
    let parent = {
      accountId: accountId,
      screenX: e.screenX,
      screenY: e.screenY,
      pageX: e.pageX,
      pageY: e.pageY,
      type: e.type,
      baseURI: e.target.baseURI,
      className: e.target.className,
      id: e.target.id,
      innerHTML: e.target.innerHTML
    };
    let content = "user_action@$:" + JSON.stringify(parent);
    log_socket.socket.send(content);
  },
  getAccountId(){
    let loginData = util.localStorageGet(LOGINDATA);
    let accountId = loginData.accountId;
    return accountId;
  },
  sendUserAnchorData(name,event) {
    let accountId = log_socket.getAccountId();
    let data = {
      accountId:accountId,
      name:name,
      event:event
    }
    let content = "user_anchor@$:" + JSON.stringify(data);
    console.log(content);
    log_socket.socket.send(content);
  }
};

if(isOpenLog){
  log_socket.init();
  addLog_eventListener.click();
  addLog_eventListener.mouseover();
}

export default log_socket;
