<style lang="less" scoped>
.page-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  .page-steps {
    padding: 15px 40px !important;
    border: 1px solid #b4b4b4;
    border-top: none;
    /deep/.el-step__title {
      line-height: normal;
      margin-top: 10px;
      text-indent: -14px;
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
        position: absolute;
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
</style>
<template>
  <div class="page-body">
    <div class="page-steps">
      <el-steps :active="stepsActiveIndex+1"
                finish-status="success">
        <el-step :title="item.title"
                 icon="el-icon-edit"
                 v-for="(item, index) in stepsList"
                 :key="index"></el-step>
      </el-steps>
    </div>
    <div class="page-contenr"
         v-loading="butLoading"
         element-loading-text="已经在努力加载了~">
      <div :class="['page-contenr-com',{'page-contenr-com-over':butLoading}]">
        <div class="page-contenr-com-posi">
          <keep-alive>
            <component :houseType.sync="componentName"
                       :getData="formDataGet"
                       :is="componentName"
                       ref="com"></component>
          </keep-alive>
          <div class="page-contenr-but">
            <el-button-group>
              <el-button v-if="stepsActiveIndex != 0 && stepsActiveIndex != 3 "
                         type="primary"
                         @click="prevPage"
                         class="page-previous">
                {{prevText}}
              </el-button>
              <el-button v-if="stepsActiveIndex < 3 ||  reSetMethod"
                         type="primary"
                         @click="nextPage(null)"
                         class="page-next"
                         :loading="butLoading">{{ nextText }}</el-button>
              <el-button type="primary"
                         v-if="stepsActiveIndex < 3 ||  reSetMethod"
                         @click="nextPage('draft')"
                         :loading="butLoading">提交验真</el-button>
            </el-button-group>
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
export default {
  mixins: [getMenuRid],
  components: {
    basicInformation,
    supplement: () =>
      componentsFactory("pages/buySellSystem/addHouse/components/supplement"), //补充信息
    exploration: () =>
      componentsFactory("pages/buySellSystem/addHouse/components/exploration"), //实勘图片/视频
    addHouseSuccess: () =>
      componentsFactory(
        "pages/buySellSystem/addHouse/components/addHouseSuccess"
      ), //邀请验真
    morePushHouse: () =>
      componentsFactory("pages/buySellSystem/addHouse/components/morePushHouse") //多套录入
  },
  created() {
    let { method, id } = this.$route.query;
    if (method && id) {
      this.$store.commit("updateId", id);
      this.formDataGet = true;
      this.reSetMethod = method == "reset" ? true : false;
    }
  },
  watch: {
    stepsActiveIndex(val) {
      if (val < this.stepsList.length - 1) this.nextText = "下一步";
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
      formDataGet: false
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
  },
  methods: {
    //上一步
    prevPage() {
      if (this.stepsActiveIndex > 0) {
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
        return;
      }
      if (this.stepsActiveIndex < this.stepsList.length && flag) {
        this.componentName = this.stepsList[
          ++this.stepsActiveIndex
        ].componentName;
      }
    }
  }
};
</script>
