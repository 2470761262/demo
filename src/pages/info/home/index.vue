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
      display: flex;
      flex-direction: column;
      .visual {
        display: flex;
        margin: 24px -8px 0;
      }
      .loading-warp {
        flex: 1;
        margin-top: 24px;
        background: #fff;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #606266;
        .el-icon-loading {
          font-size: 40px;
        }
        .loading-text {
          margin-top: 20px;
          font-size: 20px;
          color: #606266;
          font-weight: bold;
        }
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
        <template v-if="!loading">
          <!-- 我的资源 -->
          <my-resource v-if="roleConfig.getResouceStatistics" />
          <!-- echart -->
          <div class="visual">
            <!-- 左侧Echart -->
            <left-echart v-if="roleConfig.rankListBroker" />
            <!-- 非业务线经纪人 -->
            <anget-normal v-else />
            <!-- 右侧Echart -->
            <right-echart v-if="roleConfig.rankListStore" />
            <!-- 非业务线门店 -->
            <dept-normal v-else />
          </div>
        </template>
        <div class="loading-warp" v-else>
          <div class="el-icon-loading"></div>
          <div class="loading-text">加载中</div>
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

export default {
  provide() {
    return {
      parentInstance: this
    };
  },
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
      roleConfig: {}, //接口权限
      loading: true
    };
  },
  created() {
    this.getLoginData();
  },
  methods: {
    /**
     * @example: 显示对应的界面
     */
    getLoginData() {
      this.loading = true;
      this.$api
        .get({
          url: "/statistics/index/detailsFunction"
        })
        .then(({ data }) => {
          const roleMap = new Map();

          data.data.functionRuleList.forEach(element => {
            if (element.rUrl) roleMap.set(element.rUrl, true);
          });
          this.roleConfig = Object.fromEntries(roleMap);

          this.loading = false;
        });
    }
  }
};
</script>
