var websock = null;
var global_receiveMessageCallback = null;
function initWebSocket(domain, code) {
  //初始化weosocket
  var wsuri = "ws" + domain + "/webSocketHandler?user=" + code;
  connectWs(wsuri);
  window.setInterval(function() {
    //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
    let ping = { type: "ping" };
    // websock.send(JSON.stringify(ping));
    if(websock.readyState === websock.OPEN) {
      websock.send("heartCheck");
    } else if (websock.readyState === websock.CONNECTING) {
      console.log("CONNECTING--");
    }else {
      connectWs(wsuri);
    }
  }, 5000);
}
function connectWs(wsuri) {
  websock = new WebSocket(wsuri);
  websock.onmessage = function(e) {
    websocketonmessage(e);
  };
  websock.onclose = function(e) {
    // websocketclose(e, wsuri);
    closeSocket();
  };
  websock.onopen = function() {
    websocketOpen();
  };

  //连接发生错误的回调方法
  websock.onerror = function() {
    console.log("WebSocket连接发生错误");
  };
}

// 实际调用的方法
function sendSock(agentData, callback) {
  if (!websock) {
    return;
  }
  global_receiveMessageCallback = callback;
  if (websock.readyState === websock.OPEN) {
    //若是ws开启状态
    websocketsend(agentData);
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback);
    }, 1000);
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback);
    }, 1000);
  }
}

//数据接收
function websocketonmessage(e) {
  if (typeof global_receiveMessageCallback == "function") {
    global_receiveMessageCallback(JSON.parse(e.data));
  } else {
    console.log(
      JSON.parse(e.data),
      "数据接收成功，但未初始化接收消息回调处理函数"
    );
  }
}

//数据发送
function websocketsend(agentData) {
  websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e, url) {
  console.log("connection closed (" + e + ")");
  console.log("准备重新连接 --");
  connectWs(url);
}

function websocketOpen(e) {
  console.log("websocket连接成功");
}
function closeSocket() {
  if (websock) {
    try {
      websock.close();
      return true;
    } catch (e) {
      console.log(e, "websocket断开连接失败，异常");
      return false;
    }
  } else {
    console.log("websocket未初始化,无需断开");
    return false;
  }
}
function initReceiveMessageCallBack(callback) {
  global_receiveMessageCallback = callback;
}
//initWebSocket();

export { sendSock, initWebSocket, closeSocket, initReceiveMessageCallBack };
