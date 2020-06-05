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
let isOpenLog = process.env.VUE_APP_OPEN_ANCHOR ? (process.env.VUE_APP_OPEN_ANCHOR == "False" || process.env.VUE_APP_OPEN_ANCHOR == "false" ? false : true) : false;
/**
 * 锚点服务地址
 * @type {string}
 */
let logSocketUri = "ws://" + process.env.VUE_APP_WEBSOCKET_URI + "/log";
/**
 * 锚点客户端标识
 * @type {string}
 */
let identify = process.env.VUE_APP_IDENTIFY;

let addLog_eventListener = {
  click() {
    document.addEventListener("click", ev => log_socket.sendUserActionData(ev));
  },
  mouseover() {
    document.addEventListener("mouseover", ev =>
      log_socket.sendUserActionData(ev)
    );
  },
  mouseleave() {
    document.addEventListener("mouseleave", ev =>
      log_socket.sendUserActionData(ev)
    );
  },
  dblclick() {
    document.addEventListener("dblclick", ev =>
      log_socket.sendUserActionData(ev)
    );
  }
};

let log_socket = {
  socket: null,
  isConn: false,
  init() {
    if (!log_socket.isConn) {
      log_socket.socket = new WebSocket(logSocketUri);
      log_socket.socket.onopen = function() {
        log_socket.isConn = true;
        console.log("日志锚点数据websocket开启成功");
      };
      log_socket.socket.onerror = function(err) {
        console.log(err);
        log_socket.isConn = false;
      };
      log_socket.socket.onclose = function() {
        console.log("close");
        log_socket.isConn = false;
      };
    }
  },
  sendUserActionData(e) {
    //判断如果socket未连接或配置不开启log则不进入
    if(!log_socket.isConn || !isOpenLog){
      return;
    }
    let accountId = log_socket.getAccountId();
    let target = e.target;
    let className = target.className;
    let content = this.sendAction(e, accountId);
    if (className && className != "" && className.includes("anchor-point")) {
      content = this.sendAnchorData(e, accountId);
    } else if (e.target.dataset && e.target.dataset.anchor) {
      content = this.sendAnchorData(e, accountId);
    }
    content = identify + "@$@" + content;
    console.log(content);
    this.socket.send(content);
  },
  sendAction(e, accountId) {
    let parent = {
      version: "1.0.1",
      accountId: accountId,
      screenX: e.screenX,
      screenY: e.screenY,
      pageX: e.pageX,
      pageY: e.pageY,
      type: e.type,
      baseURI: e.target.baseURI,
      className: e.target.className,
      id: e.target.id,
      identify: e.view.clientInformation.userAgent,
      placeholder: e.target.placeholder
    };
    let content = "user_action@$:" + JSON.stringify(parent);
    return content;
  },
  sendAnchorData(e, accountId) {
    let parent = {
      version: "1.0.1",
      accountId: accountId,
      screenX: e.screenX,
      screenY: e.screenY,
      pageX: e.pageX,
      pageY: e.pageY,
      type: e.type,
      baseURI: e.target.baseURI,
      className: e.target.className,
      id: e.target.id,
      nodeName: e.target.nodeName,
      innerHTML: e.target.innerHTML,
      placeholder: e.target.placeholder,
      identify: e.view.clientInformation.userAgent,
      anchorName: e.target.dataset.anchor
    };
    let content = "user_anchor@$:" + JSON.stringify(parent);
    return content;
  },
  getAccountId() {
    let loginData = util.localStorageGet(LOGINDATA);
    let accountId = loginData.accountId;
    return accountId;
  }
};

if (isOpenLog) {
  log_socket.init();
  addLog_eventListener.click();
  addLog_eventListener.dblclick();
  addLog_eventListener.mouseover();
  addLog_eventListener.mouseleave();
}

export default log_socket;
