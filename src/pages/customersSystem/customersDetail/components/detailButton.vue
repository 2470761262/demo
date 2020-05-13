<style lang="less" scoped>
@pad: 0 20px 0 40px;
.page-content-head {
  /** 名字 星星 */
  .customers-head {
    padding: @pad;
    display: flex;
    .customers-head-name {
      font-size: 30px;
      &::after {
        content: "(" attr(data-sex) ")";
        color: #cccccc;
        font-size: 20px;
      }
    }
    .customers-head-rate {
      align-self: center;
      margin-left: 30px;
      /deep/.el-rate__icon {
        font-size: 30px;
      }
    }
  }
  /** 印象 */
  .customers-head-impression {
    padding: @pad;
    display: flex;
    padding-top: 20px;
    .heard-scroll-tag {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
      flex: 1;
      width: 0;
      font-size: 0;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-button,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track-piece {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #c9c9c9;
        border-radius: 50px;
      }
      .tag-content {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 4px;
        background: #11a760;
        position: relative;
        margin-right: 20px;
        &:hover {
          margin-right: 35px;
          .icon {
            display: block;
          }
        }
        span {
          color: #fff;
          line-height: 1;
          font-size: 15px;
          white-space: nowrap;
        }
        .icon {
          padding-left: 4px;
          display: none;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translate(100%, -50%);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
    .add-impression {
      margin-left: 10px;
      padding-top: 0;
      padding-bottom: 10px;
      //align-self: flex-start;
      /deep/span {
        text-decoration: underline;
      }
    }
  }
  /** 数据 拨打电话 */
  .customers-body {
    padding: @pad;
    display: flex;
    margin-top: 30px;
    .customers-body-detail {
      flex: 1;
      width: 0;
      .body-detail-row {
        display: flex;
        font-size: 18px;
        margin-top: 0px;
        &:not(:first-child) {
          margin-top: 32px;
        }
        &::after {
          content: attr(data-after);
          color: black;
        }
        > span {
          flex: 1;
          text-align: right;
          padding: 0 10px;
          box-sizing: border-box;
        }
        &::before {
          content: attr(data-before);
          color: #cccccc;
        }
      }
    }
    .customers-phone {
      margin-left: 50px;
      align-self: center;
      padding: 0 10px;
      height: 43px;
      font-size: 18px;
      font-family: "SimHei", sans-serif;
      .el-icon-phone {
        font-size: 22px;
      }
    }
  }
  /** 按钮组 */
  .customers-button-gruop {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px 0 40px;
    margin: 30px -30px 0;
    .customers-button-item {
      flex: 0 0 calc((100% - 60px * 2) / 2);
      margin: 20px 30px 0px;
      &:nth-child(-n + 2) {
        margin-top: 0;
      }
      height: 53px;
      font-size: 18px;
      color: black;
      padding: 0;
      /deep/i {
        font-size: 28px;
        vertical-align: middle;
        margin-right: 15px;
      }
      /deep/span {
        vertical-align: middle;
      }
    }
  }
}
.line-break {
  height: 1px;
  background: #cccccc;
  margin-top: 10px;
}
</style>
<template>
  <div class="page-content-head">
    <div class="customers-head">
      <div class="customers-head-name" data-sex="男">李先生</div>
      <el-rate
        class="customers-head-rate"
        :value="2"
        :max="3"
        disabled
      ></el-rate>
    </div>
    <div class="customers-head-impression">
      <div class="heard-scroll-tag">
        <div class="tag-content">
          <span>转介绍</span>
          <i class="el-icon-close icon"></i>
        </div>
        <div class="tag-content">
          <span>精准客户</span>
          <i class="el-icon-close icon"></i>
        </div>
        <div class="tag-content">
          <span>周末看房</span>
          <i class="el-icon-close icon"></i>
        </div>
      </div>
      <el-button type="text" class="add-impression"
        ><i class="el-icon-circle-plus"></i> 印象</el-button
      >
    </div>
    <div class="line-break"></div>
    <div class="customers-body">
      <div class="customers-body-detail">
        <div class="body-detail-row" data-before="拥有人数" data-after="人">
          <span class="overText">2</span>
        </div>
        <div class="body-detail-row" data-before="公司看房套数" data-after="套">
          <span class="overText">15</span>
        </div>
        <div class="body-detail-row" data-before="我的带看套数" data-after="套">
          <span class="overText">9</span>
        </div>
      </div>
      <el-button type="primary" class="customers-phone"
        ><i class="el-icon-phone"></i>一键拨号</el-button
      >
    </div>
    <div class="customers-button-gruop">
      <el-button class="customers-button-item" icon="el-icon-refresh"
        >转公客</el-button
      >
      <el-button class="customers-button-item" icon="el-icon-refresh"
        >转状态</el-button
      >

      <el-button class="customers-button-item" icon="el-icon-delete"
        >删除</el-button
      >
      <el-button class="customers-button-item" icon="iconfont iconzhuanhuan"
        >PASS客户</el-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>
