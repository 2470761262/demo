//import util from "@/util/util";
//import { TREMEPACKERS, TREMEDEFTULTCOLOR } from "@/util/constMap";
import util from "@/util/util";
export default {
  methods: {
    distributeEvent(e, noticeId) {
      this[e](noticeId);
    },
    postUrl() {
      this.$router.push({
        path: "/buySellSystem/agentHouseContrast",
        query: { houseId: this.$cookies.get("houseId") }
      }); //获取cookie并跳转
    },
    addCookie(id) {
      if (window.$cookies.get("houseId") == null) {
        window.$cookies.set("houseId", id);

        this.queryVerifyHouseDatas(this.pageJson.currentPage);
      } else {
        window.$cookies.set(
          "houseId",
          window.$cookies.get("houseId") + "," + id
        );

        this.queryVerifyHouseDatas(this.pageJson.currentPage);
      }
    },
    removeCookie(id) {
      let postId = "";
      let houseId = this.$cookies.get("houseId");

      if (houseId.split(",")[1] == undefined && houseId == id) {
        //是否单一id
        this.$cookies.remove("houseId");
      } else {
        //多个id操作

        let cookie = houseId.split(",");

        for (let i = 0; i < cookie.length; i++) {
          if (i == 0 && id != cookie[i]) {
            //如果是第一个id并且不是要删除的id
            postId += cookie[i];
          } else if (cookie[i] != id && postId == "") {
            //如果是第一个id并且不是要删除的id
            postId += +cookie[i];
          } else if (cookie[i] != id) {
            postId += "," + cookie[i];
          }
        }
        this.$cookies.set("houseId", postId);
      }
      this.queryVerifyHouseDatas(this.pageJson.currentPage);
    },
    showNoticeDetail(noticeId) {
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: noticeId }
      });
    },
    isForBut(type) {
      let typ = type;
      let array = [];

      if (this.$cookies.get("houseId") != null) {
        if (
          this.$cookies.get("houseId").split(",")[1] == undefined &&
          this.$cookies.get("houseId") == typ
        ) {
          array = [
            { name: "查看", isType: "1,3", methosName: "showNoticeDetail" },
            { name: "删除对比", isType: "1,3", methosName: "removeCookie" },
            { name: "去对比", isType: "1,3", methosName: "postUrl" }
          ];
        } else if (this.$cookies.get("houseId").split(",") != "") {
          let houseId = this.$cookies.get("houseId").split(",");
          for (var i = 0; i < houseId.length; i++) {
            if (typ == houseId[i]) {
              array = [
                { name: "查看", isType: "1,3", methosName: "showNoticeDetail" },
                { name: "删除对比", isType: "1,3", methosName: "removeCookie" },
                { name: "去对比", isType: "1,3", methosName: "postUrl" }
              ];
              break;
            } else if (i + 1 == houseId.length) {
              array = [
                { name: "查看", isType: "1,3", methosName: "showNoticeDetail" },

                { name: "添加对比", isType: "1,3", methosName: "addCookie" }
              ];
            }
          }
        } else {
          array = [
            { name: "查看", isType: "1,3", methosName: "showNoticeDetail" },

            { name: "添加对比", isType: "1,3", methosName: "addCookie" }
          ];
        }
      } else {
        array = [
          { name: "查看", isType: "1,3", methosName: "showNoticeDetail" },

          { name: "添加对比", isType: "1,3", methosName: "addCookie" }
        ];
      }
      return array;
    }
  }
};
