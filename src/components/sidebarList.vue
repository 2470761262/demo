<style lang="less" scoped>
.sldebar-content {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 30px;
  .sldebar-content-list {
    border-radius: 4px;
    width: 48px;
    padding: 10px 0;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    .sldebar-content-item {
      cursor: pointer;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
      .nav-image {
        width: 31px;
        height: 31px;
      }
      .item-title {
        margin-top: 5px;
      }
    }
  }
}
</style>
<template>
  <div class="sldebar-content">
    <div class="sldebar-content-list">
      <div class="sldebar-content-item anchor-point" @click="goHome">
        <img
          class="nav-image"
          src="https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/8d7ff13733c34e6b9020a137150ad2bc.png"
          alt=""
        />
        <span class="item-title">首页</span>
      </div>
      <div
        class="sldebar-content-item anchor-point"
        @click="goBack"
        v-if="isShowReturn"
      >
        <img
          class="nav-image"
          src="https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/cfca816db35642d483ad4dc5e889288a.png"
          alt=""
        />
        <span class="item-title">返回</span>
      </div>
      <div
        class="sldebar-content-item anchor-point"
        @click="lastClick"
        v-if="hisEdit && (showEdit || editAgentHouse)"
      >
        <!-- <i class="el-icon-plus icon"></i> -->
        <img
          class="nav-image"
          src="https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/43c6bb2152e647ec825a754fd3817fbb.png"
        />
        <span class="item-title">{{ lastItemSet ? lastTitle : "新增" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import but from "@/evenBus/but.js";
export default {
  props: {
    lastItemSet: {
      type: Boolean,
      default: false
    },
    lastTitle: {
      type: String
    },
    lastName: {
      type: String,
      default: "addHouse"
    },
    lastParams: {
      type: Object,
      default: () => {}
    },
    judgeShowEdit: {
      //判断是否为编辑
      type: Boolean,
      default: false
    },
    sissiontSet: {
      type: Object
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    hisEdit: {
      type: Boolean,
      default: true
    },
    queryUrl: {
      type: Object
    }
  },
  data() {
    return {
      editAgentHouse: false,
      isShowReturn: true
    };
  },
  mounted() {
    let that = this;
    if (!this.judgeShowEdit) {
      this.editAgentHouse = true;
    }
    but.$on("editAgentHouse", (authorityUnderName, houseDatails) => {
      if (
        houseDatails.plate == 0 &&
        this.getEditAuthority(authorityUnderName, houseDatails)
      ) {
        that.editAgentHouse = true;
      }
    });
    var url = window.location.href; //获取url中"?"符后的字串
    if (
      url.indexOf("/houseDetails/") != -1 ||
      url.indexOf("/potentialHouseDetail/") != -1 ||
      url.indexOf("/buildingHouseDetail/") != -1 ||
      url.indexOf("/historyDetails/") != -1 ||
      url.indexOf("/validateHouseDetails/") != -1
    ) {
      that.isShowReturn = false;
    }
    // console.log("===================--url-->", url, that.isShowReturn);
  },
  destroyed() {
    but.$off("editAgentHouse");
  },
  methods: {
    getEditAuthority(authorityUnderName, houseDatails) {
      if (!authorityUnderName) return;
      return (
        (authorityUnderName.coIdList &&
          authorityUnderName.coIdList.includes(
            houseDatails.agentPerCompanyId
          )) ||
        (authorityUnderName.deptList &&
          authorityUnderName.deptList.includes(
            houseDatails.agentPerDepartmentId
          )) ||
        (authorityUnderName.accountId &&
          houseDatails.AgentPer == authorityUnderName.accountId)
      );
    },
    goHome() {
      this.$router.push({ path: "/buySellSystem/houseList" });
    },
    goBack() {
      this.$router.go(-1);
    },
    lastClick() {
      let routerData = {
        name: this.lastName
      };
      if (this.lastParams) {
        routerData.params = this.lastParams;
      }
      if (!this.queryUrl) {
        this.$router.push(routerData);
      } else {
        this.$router.push(this.queryUrl);
      }
    }
  }
};
</script>
