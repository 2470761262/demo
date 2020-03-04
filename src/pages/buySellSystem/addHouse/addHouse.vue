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
        // margin: 0 auto;
        //transform: translateX(-50%);
        left: calc(50% - 940px / 2);
        min-height: 100%;
        // top: 0;
        //bottom: 0;
      }
    }
    .page-contenr-but {
      display: flex;
      justify-content: center;
      border-top: 1px solid #f2f2f2;
      padding: 10px 0px;
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
    <div class="page-contenr">
      <div :class="['page-contenr-com',{'page-contenr-com-over':butLoading}]"
           v-scrollTop="butLoading"
           v-loading="butLoading">
        <div class="page-contenr-com-posi">
          <keep-alive>
            <component :getData="formDataGet"
                       :is="componentName"
                       ref="com"></component>
          </keep-alive>
          <div class="page-contenr-but"
               v-if="stepsActiveIndex!=3">
            <el-button-group>
              <el-button v-if="stepsActiveIndex!=0"
                         type="primary"
                         @click="prevPage"
                         class="page-previous">{{
            prevText
          }}</el-button>
              <el-button type="primary"
                         @click="nextPage"
                         class="page-next"
                         :loading="butLoading">{{ nextText }}</el-button>
              <!-- <el-button type="info"
                         :loading="butLoading">保存草稿</el-button> -->
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
import { mapState } from "vuex";
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {
    basicInformation,
    supplement: () => componentsFactory("pages/buySellSystem/addHouse/components/supplement"), //补充信息
    exploration: () => componentsFactory("pages/buySellSystem/addHouse/components/exploration"), //实勘图片/视频
    addHouseSuccess: () => componentsFactory("pages/buySellSystem/addHouse/components/addHouseSuccess") //邀请验真
  },
  directives: {
    scrollTop: {
      update (el, bind, vnode) {
        el.scrollTop = 0;
      }
    }
  },
  created () {
  //  this.$store.commit('updateId', 41);
  //  this.formDataGet = true;
  },
  watch: {
    stepsActiveIndex (val) {
      if (val != this.stepsList.length - 1) this.nextText = "下一步";
      else this.nextText = "邀请验真";
    }
  },
  data () {
    return {
      componentName: "basicInformation",
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
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.addHouse.isformDataNoCommit) {
      this.$confirm('您的表单还未提交,确定离开吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'warning',
          message: '您放弃了表单，将不会被保存~'
        });
        next();
      }).catch(() => {
        this.$message({
          type: 'success',
          message: 'good-boy , 咱们继续填写吧'
        });
      })
    } else {
      next();
    }
  },
  destroyed () {
    this.$store.commit("updateIsformDataNoCommit", false);
    this.$store.commit("resetFormData");
  },
  methods: {
    //上一步
    prevPage () {
      if (this.stepsActiveIndex > 0) {
        this.componentName = this.stepsList[--this.stepsActiveIndex].componentName;
      }
    },
    //下一步
    async  nextPage () {
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
      }
      this.butLoading = false;
      if (this.stepsActiveIndex < this.stepsList.length && flag) {
        this.componentName = this.stepsList[++this.stepsActiveIndex].componentName;
      }
    }
  }
};
</script>
