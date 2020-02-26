import util from '@/util/util';
import { TREMEPACKERS, TREMEDEFTULTCOLOR } from '@/util/constMap';
import api from '@/api/require';
import listPage from '@/components/listPage';
import Vue from 'Vue'
import VueCookies from 'vue-cookies'
let themeData = {
    postUrl() {

        this.$router.push({ path: "/buySellSystem/agentHouseContrast", query: { houseId: window.$cookies.get("houseId") } });//获取cookie并跳转
    },
    removeCookie(id) {
        let postId = "";
        let houseId = window.$cookies.get("houseId");
        console.log(houseId);
        if (houseId.split(",")[1] == undefined && houseId == id) {//是否单一id
            window.$cookies.remove("houseId");

        } else {//多个id操作

            let cookie = houseId.split(',');
            console.log(cookie);
            for (let i = 0; i < cookie.length; i++) {
                if (i == 0 && id != cookie[i]) {//如果是第一个id并且不是要删除的id
                    postId += cookie[i];
                } else if (cookie[i] != id && postId == "") {//如果不是要删除的id
                    postId += +cookie[i];
                } else if(cookie[i]!=id) {
                    postId+=','+cookie[i];
                  }
            }
            window.$cookies.set("houseId", postId);//插入cookie
        }
        this.queryVerifyHouseDatas(this.pageJson.currentPage); //刷新页面
    },
    isForBut(type) {

        let array = [];

        if (window.$cookies.get("houseId") != null) {
            if (window.$cookies.get("houseId").split(",")[1] == undefined && window.$cookies.get("houseId") == typ) {//如果cookie已有当前id，按钮改变
                array = [
                    { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
                    { name: '删除对比', isType: '1,3', methosName: 'removeCookie' },
                    { name: '去对比', isType: '1,3', methosName: 'postUrl' },
                ]
            }
            else if (window.$cookies.get("houseId").split(",") != "") {
                let houseId = window.$cookies.get("houseId").split(",");
                for (var i = 0; i < houseId.length; i++) {
                    if (typ == houseId[i]) {
                        array = [
                            { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },
                            { name: '删除对比', isType: '1,3', methosName: 'removeCookie' },
                            { name: '去对比', isType: '1,3', methosName: 'postUrl' },
                        ];
                        break;
                    } else if (i + 1 == houseId.length) {//如果cookie中没有当前id，按钮不变
                        array = [
                            { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },

                            { name: '添加对比', isType: '1,3', methosName: 'addCookie' },
                        ];

                    }
                }
            } else {
                array = [
                    { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },

                    { name: '添加对比', isType: '1,3', methosName: 'addCookie' },
                ];

            }
        } else {
            array = [
                { name: '查看', isType: '1,3', methosName: 'showNoticeDetail' },

                { name: '添加对比', isType: '1,3', methosName: 'addCookie' },
            ];

        }
        return array;
    }
}



export default themeData;