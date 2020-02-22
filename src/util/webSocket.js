var websock = null;
var global_receiveMessageCallback = null;
function initWebSocket(domain,code,receiveMessageCallBack){ //初始化weosocket
    //ws地址
    global_receiveMessageCallback=receiveMessageCallBack;
    var wsuri="ws"+domain+"/webSocketHandler?code="+code;
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
    	websocketonmessage(e);
    } 
    websock.onclose = function(e){
    	websocketclose(e);
    }
    websock.onopen = function () {
	    websocketOpen();
	}
    
    //连接发生错误的回调方法
	websock.onerror = function () {
		console.log("WebSocket连接发生错误");
	}
}
 
// 实际调用的方法
function sendSock(agentData,callback){  
    if(!websock){
        return;
    }
    global_receiveMessageCallback = callback;
    if (websock.readyState === websock.OPEN) {
    	//若是ws开启状态
        websocketsend(agentData)
    }else if (websock.readyState === websock.CONNECTING) {
    	// 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
        	sendSock(agentData,callback);
        }, 1000);
    }else {
    	// 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData,callback);
        }, 1000);
    }
}
 
//数据接收
function websocketonmessage(e){ 
    if(typeof global_receiveMessageCallback == "function"){
        global_receiveMessageCallback(JSON.parse(e.data));
    }else{
        console.log(JSON.parse(e.data),"数据接收成功，但未初始化接收消息回调处理函数");
    }
}
 
//数据发送
function websocketsend(agentData){
    websock.send(JSON.stringify(agentData));
}
 
//关闭
function websocketclose(e){  
    console.log("connection closed (" + e + ")");
}
 
function websocketOpen(e){
	console.log("websocket连接成功");
}
function closeSocket(){
    if(websock){
        websock.onclose();
    }
}
//initWebSocket();
 
export{sendSock,initWebSocket,closeSocket}