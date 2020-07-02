<style lang="less" scoped>
.page-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  .page-steps {
    padding: 15px 40px !important;
    border: 1px solid #b4b4b4;
    border-top: none;
    /deep/.el-step__title {
      line-height: normal;
      margin-top: 10px;
      text-indent: -14px;
    }
    /deep/.is-success {
      color: var(--color--primary);
      border-color: var(--color--primary);
    }
    background: #fff;
    padding: 10px 0 15px;
  }
  .page-contenr {
    flex: 1;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    //padding: 0 20px;
    .page-contenr-com {
      overflow: auto;
      flex: 1;
      position: relative;
      &.page-contenr-com-over {
        overflow: hidden !important;
      }
      .page-contenr-com-posi {
        position: relative;
        background: #fff;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
        width: 940px;
        padding-bottom: 59px;
        box-sizing: border-box;
        left: calc(50% - 940px / 2);
        min-height: 100%;
      }
    }
    .page-contenr-but {
      display: flex;
      justify-content: center;
      border-top: 1px solid #f2f2f2;
      padding: 10px 0px;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
.page-next {
  background: rgba(90, 168, 148, 1);
}
.page-previous {
  background: #f59a23;
}
/deep/.el-button {
  border: none;
}
.right-nav-content {
  position: absolute;
  right: 0;
  transform: translateX(calc(100% + 1px));
  display: flex;
  flex-direction: column;
  > button:last-child {
    margin-left: 0;
  }
}
</style>
<template>
  <div class="page-body">
    <div class="page-steps">
      <el-steps :active="stepsActiveIndex + 1" finish-status="success">
        <el-step
          :title="item.title"
          icon="el-icon-edit"
          v-for="(item, index) in stepsList"
          :key="index"
        ></el-step>
      </el-steps>
    </div>
    <div
      class="page-contenr"
      v-loading="butLoading"
      element-loading-text="已经在努力加载了~"
    >
      <div
        :class="['page-contenr-com', { 'page-contenr-com-over': butLoading }]"
      >
        <div class="page-contenr-com-posi">
          <keep-alive>
            <component
              :houseType.sync="componentName"
              :nextSaveButton="nextSaveButton"
              :submitVerify="submitVerify"
              :wxUploadFile="wxUploadFile"
              :getData="formDataGet"
              :disabled="disabled"
              :is="componentName"
              ref="com"
              :paramsObj="paramsObj"
            ></component>
          </keep-alive>
          <div class="page-contenr-but">
            <el-button-group>
              <el-button
                :data-anchor="'添加房源 => click =>' + prevText"
                v-if="stepsActiveIndex != 0 && stepsActiveIndex != 3"
                type="primary"
                @click="prevPage"
                class="page-previous anchor-point"
                >{{ prevText }}</el-button
              >
              <el-button
                :data-anchor="'添加房源 => click =>' + nextText"
                v-if="stepsActiveIndex < 2 || reSetMethod"
                type="primary"
                class="anchor-point"
                @click="nextPage(null)"
                :loading="butLoading"
                >{{ nextText }}</el-button
              >
              <el-button
                :data-anchor="
                  '添加房源 => click =>' + paramsObj.buttonText || '提交验真'
                "
                type="primary"
                v-if="stepsActiveIndex < 3 || reSetMethod"
                @click="nextPage('draft')"
                class="anchor-point"
                :disabled="!submitVerify"
                :loading="butLoading"
                >{{ paramsObj.buttonText || "提交验真" }}</el-button
              >
            </el-button-group>
          </div>
          <div class="right-nav-content" v-scrollCenter="'page-contenr-com'">
            <el-button
              data-anchor="添加房源首页 => click"
              class="anchor-point"
              @click="navPage('/buySellSystem/houseList')"
              >首页</el-button
            >
            <el-button
              data-anchor="添加房源返回 => click"
              class="anchor-point"
              @click="navPage()"
              >返回</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//默认组件
import basicInformation from "@/pages/buySellSystem/addHouse/components/basicInformation";
//异步组件工厂方法
import componentsFactory from "@/util/componentsFactory";
import getMenuRid from "@/minxi/getMenuRid";
import util from "@/util/util";
export default {
  mixins: [getMenuRid],
  components: {
    basicInformation,
    supplement: () =>
      componentsFactory(
        import("@/pages/buySellSystem/addHouse/components/supplement")
      ), //补充信息
    exploration: () =>
      componentsFactory(
        import("@/pages/buySellSystem/addHouse/components/exploration")
      ), //实勘图片/视频
    morePushHouse: () =>
      componentsFactory(
        import("@/pages/buySellSystem/addHouse/components/morePushHouse")
      ), //多套录入
    addHouseSuccess: () =>
      componentsFactory(
        import("@/pages/buySellSystem/addHouse/components/addHouseSuccess")
      ) //邀请验真
  },
  created() {
    console.log(1);
    let params = {};
    if (Object.keys(this.$route.params).length > 0) {
      params = this.$route.params;
      util.sessionLocalStorageSet("editHouse", params); //this.$route.query;
    } else {
      if (util.sessionLocalStorageGet("editHouse")) {
        params = util.sessionLocalStorageGet("editHouse"); //this.$route.query;
      }
    }
    if (Object.keys(this.$route.query).length > 0) {
      params = this.$route.query;
    }
    let { method, id, paramsObj } = params;
    console.log(method, id);
    if (method && id) {
      this.$store.commit("updateId", id);
      this.formDataGet = true;
      this.disabled = true;
      this.reSetMethod = method == "reset" ? true : false;
      if (paramsObj) {
        this.paramsObj = paramsObj;
      }
    } else if (method == "tosale") {
      this.disabled = true;
    }
  },
  watch: {
    stepsActiveIndex(val) {
      if (val < this.stepsList.length) this.nextText = "下一步";
      else this.nextText = "邀请验真";
    },
    componentName(val) {
      if (val == "morePushHouse") {
        this.nextText = "邀请验真";
      } else if (val == "exploration") {
        this.nextText = "提交验真";
      } else {
        this.nextText = "下一步";
      }
    }
  },
  data() {
    return {
      reSetMethod: false,
      componentName: "basicInformation", //morePushHouse
      stepsList: [
        { title: "必填信息", componentName: "basicInformation" },
        { title: "选填信息", componentName: "supplement" },
        { title: "实勘图片/视频", componentName: "exploration" },
        { title: "房源验真", componentName: "addHouseSuccess" }
      ],
      prevText: "上一步",
      nextText: "下一步",
      stepsActiveIndex: 0,
      butLoading: false,
      formDataGet: false,
      disabled: false, //是否禁用楼盘选择和多套单套录入切换
      paramsObj: {},
      nextSaveButton: false,
      submitVerify: false,
      wxUploadFile: false
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.addHouse.isformDataNoCommit) {
      this.$confirm("您的表单还未提交,确定离开吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "warning",
            message: "您放弃了表单，将不会被保存~"
          });
          next();
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "good-boy , 咱们继续填写吧"
          });
        });
    } else {
      next();
    }
  },
  destroyed() {
    this.$store.commit("updateIsformDataNoCommit", false);
    this.$store.commit("resetFormData");
    util.sessionLocalStorageRemove("editHouse");
  },
  methods: {
    navPage(value) {
      if (!value) {
        this.$router.go(-1);
        return false;
      }
      this.$router.push({ path: value });
    },
    //上一步
    prevPage() {
      if (this.stepsActiveIndex > 0) {
        document.querySelector(".page-contenr-com").scrollTop = 0;
        this.componentName = this.stepsList[
          --this.stepsActiveIndex
        ].componentName;
      }
    },
    //下一步
    async nextPage(parmse) {
      let comName = this.$refs.com.$options.name;
      let flag = false;
      this.butLoading = true;
      if (parmse == "draft" && this.reSetMethod) {
        //点击提交验真按钮且标记为验真编辑
        this.reSetMethod = false;
      }
      switch (comName) {
        case "basicInformation":
          flag = await this.$refs.com.validateAll();
          break;
        case "supplement":
          flag = await this.$refs.com.validateAll();
          break;
        case "exploration":
          flag = await this.$refs.com.validateAll();
          break;
        case "addHouseSuccess":
          await this.$refs.com.validateAll();
          this.butLoading = false;
          return;
        case "morePushHouse":
          flag = await this.$refs.com.validateAll();
          this.butLoading = false;
          if (flag) {
            this.stepsActiveIndex = 3;
            this.componentName = this.stepsList[
              this.stepsActiveIndex
            ].componentName;
          }
          return;
      }
      this.butLoading = false;
      if (parmse && flag) {
        this.stepsActiveIndex = 3;
        this.componentName = this.stepsList[
          this.stepsActiveIndex
        ].componentName;
        this.$store.commit("updateIsformDataNoCommit", false);
        return;
      }
      if (this.stepsActiveIndex < this.stepsList.length && flag) {
        document.querySelector(".page-contenr-com").scrollTop = 0;
        this.componentName = this.stepsList[
          ++this.stepsActiveIndex
        ].componentName;
      }
    },
    getNextSaveButton() {
      let that = this;
      this.$api
        .get({
          url: "/agent_house/nextSaveButton"
        })
        .then(e => {
          e.data.data.functionRuleList.forEach(element => {
            if (element.rUrl == "nextSaveButton") {
              //that.nextSaveData = true;
              //but.$emit("nextSaveButton");
              that.nextSaveButton = true;
            }
            if (element.rUrl == "submitVerify") {
              //but.$emit("submitVerify");
              that.submitVerify = true;
            }
            if (element.rUrl == "wxUploadFile") {
              //console.log("0000000000", element.rUrl);
              //but.$emit("wxUploadFile");
              that.wxUploadFile = true;
              if (this.paramsObj.editUrl) {
                //编辑
                this.getEditHousePicture();
              }
            }
          });
        })
        .catch(() => {});
    },
    getEditHousePicture() {
      this.$api;
      this.wxUploadFile = false;
      this.$api
        .post({
          url: `/agent_house/editHousePicture`,
          headers: { "Content-Type": "application/json" },
          data: {
            id: this.$store.state.addHouse.formData.id
          }
        })
        .then(e => {
          console.log(e);
          if (e.data.code == 200) {
            this.wxUploadFile = e.data.data;
          }
        })
        .catch(() => {});
    }
  },
  mounted() {
    // but.$on("submitVerify", () => {
    //   this.btnSubmitVerify = false;
    // });
    let that = this;
    that.getNextSaveButton();
  }
};
</script>
