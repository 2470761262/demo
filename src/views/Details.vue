<style lang="less">
.page-cell-pad {
  padding: 20px 30px;
  .page-cell-title {
    font-size: 24px;
    color: black;
  }
  .page-cell-margin {
    margin: 20px 0;
  }
  .page-cell-tips {
    display: flex;
    align-items: center;
    .page-cell-margin;
    border: 1px solid #409eff;
    border-radius: 5px;
    padding: 10px 5px;
    font-size: 14px;
  }
}
.page-cell-for-item {
  max-width: 190px;
  .for-item-conter {
    display: flex;
    .for-item-conter-left {
      .conter-left-image {
        width: 40px;
        height: 40px;
        background: #409eff;
        border-radius: 50%;
      }
    }
    .for-item-conter-right {
      flex: 1;
      margin-left: 10px;
      line-height: 1;
      .conter-right-title {
        font-size: 20px;
        color: black;
        .overText;
      }
      .conter-right-conter {
        margin-top: 15px;
        .conter-right-conter-type {
          display: flex;
          margin-bottom: 10px;
          font-size: 14px;
          color: #333;
          min-width: 0;
          .conter-type-title {
            flex-shrink: 0;
          }
          .conter-type-msg {
            .overText;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .for-cell-floot {
    margin-top: 10px;
    justify-content: space-between;
    .item-conter-but {
      cursor: pointer;
    }
  }
}
.overText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
  <div class="page-cell-pad">
    <el-row>
      <el-col :span="24">
        <div class="page-cell-title">查询表格</div>
        <div class="page-cell-margin">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-sort"
            :loading="false"
            >刷新</el-button
          >
          <div class="page-cell-tips">
            <i class="el-icon-share "></i>
            提示信息: 未知错误,又联系管理员
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="10" :md="6" :lg="4">
        <div class="page-cell-for-item">
          <div class="for-item-conter">
            <div class="for-item-conter-left">
              <!-- image -->
              <div class="conter-left-image"></div>
            </div>
            <div class="for-item-conter-right">
              <div class="conter-right-title">xxx platform</div>
              <div class="conter-right-conter">
                <div class="conter-right-conter-type">
                  <div class="conter-type-title">状态:</div>
                  <div class="conter-type-msg">未启动</div>
                </div>
                <div class="conter-right-conter-type">
                  <div class="conter-type-title">启动时间:</div>
                  <div class="conter-type-msg">2020-01-23</div>
                </div>
              </div>
            </div>
          </div>
          <div class="for-item-conter for-cell-floot">
            <div class="item-conter-but">重新启动</div>
            <div class="item-conter-but">日志查看</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  // name: "details",
  data() {
    return {};
  }
};
</script>
