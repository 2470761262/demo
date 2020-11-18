<style lang="less" scoped>
@font-face {
  font-family: "lsx";
  src: url(~@/assets/DIN-Bold.otf);
}
@font-face {
  font-family: "rank";
  src: url(~@/assets/DIN-BlackItalic.otf);
}
.back {
  background: #f0f7f7;
  flex: 1;
  .content {
    padding: 24px 24px 53px;
    width: 1168px;
    margin: 0 auto;
    display: flex;
    .main {
      flex: 1;
      .visual {
        display: flex;
        margin-top: 24px;
      }
    }
    .right {
      width: 292px;
      margin-left: 24px;
      .sticky {
        top: 20px;
        position: sticky;
      }
    }
  }
}
</style>
<template>
  <div class="back">
    <div class="content">
      <div class="main">
        <info-head />
        <!-- 工资信息 -->
        <salaryinfo />
        <!-- 我的资源 -->
        <my-resource v-if="configDiff.myResource" />
        <!-- echart -->
        <div class="visual">
          <!-- 左侧Echart -->
          <left-echart v-if="configDiff.leftEchart" />
          <!-- 右侧Echart -->
          <right-echart v-if="configDiff.rightEchart" />
          <!-- 非业务线经纪人 -->
          <anget-normal v-if="configDiff.angetNormal" />
          <!-- 非业务线门店 -->
          <dept-normal v-if="configDiff.deptNormal" />
        </div>
      </div>
      <div class="right">
        <div class="sticky">
          <!-- 签到 -->
          <sign-in />
          <!-- 合伙人 -->
          <partner />
          <!-- 通知 -->
          <notice />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  infoHead, //头部
  salaryinfo, //工资信息
  myResource, //我的资源
  leftEchart, //左侧Echart
  rightEchart, //右侧Echart
  signIn, //签到
  partner, //合伙人
  notice, //通知
  angetNormal, //普通员工经纪人业绩
  deptNormal //普通员工门店业绩
} from "./components/index";
//工具
import util from "@/util/util";
//常量
import { LOGINDATA } from "@/util/constMap";

function initConfig() {
  return {
    leftEchart: false,
    rightEchart: false,
    myResource: false,
    angetNormal: false,
    deptNormal: false
  };
}

export default {
  components: {
    infoHead,
    salaryinfo,
    myResource,
    leftEchart,
    rightEchart,
    signIn,
    partner,
    notice,
    angetNormal,
    deptNormal
  },
  data() {
    return {
      configDiff: initConfig()
    };
  },
  created() {
    this.getLoginData();
  },
  methods: {
    /**
     * @example: 合并属性
     */
    megerConfigDiff(config) {
      this.configDiff = {
        ...initConfig(),
        ...config
      };
    },
    /**
     * @example: 显示对应的界面
     */
    getLoginData() {
      switch (util.localStorageGet(LOGINDATA).deptType) {
        case 2:
        case 4:
          this.megerConfigDiff({
            leftEchart: true,
            rightEchart: true,
            myResource: true
          });
          break;
        default:
          this.megerConfigDiff({
            angetNormal: true,
            deptNormal: true
          });
          break;
      }
    }
  }
};
</script>
