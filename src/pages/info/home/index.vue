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
        <!-- <my-resource /> -->
        <!-- echart -->
        <div class="visual">
          <!-- 左侧Echart -->
          <!-- <left-echart /> -->
          <!-- 右侧Echart -->
          <!-- <right-echart /> -->
          <anget-normal />
          <dept-normal />
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
//头部
import infoHead from "./components/infoHead";
//工资信息
import salaryinfo from "./components/salaryinfo";
//我的资源
import myResource from "./components/myResource";
//左侧Echart
import leftEchart from "./components/leftEchart";
//右侧Echart
import rightEchart from "./components/rightEchart";
//签到
import signIn from "./components/signIn";
//合伙人
import partner from "./components/partner";
//通知
import notice from "./components/notice";
//普通员工经纪人业绩
import angetNormal from "./components/angetNormal";
//普通员工门店业绩
import deptNormal from "./components/deptNormal";
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
  }
};
</script>
