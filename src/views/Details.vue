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
          <el-button type="primary"
                     size="small"
                     icon="el-icon-sort"
                     :loading="false">刷新</el-button>
          <div class="page-cell-tips">
            <i class="el-icon-share "></i>
            提示信息: 未知错误,又联系管理员
          </div>
        </div>
      </el-col>
      <el-col :xs="12"
              :sm="10"
              :md="6"
              :lg="4">
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
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    console.log(to, from, next);
    next();
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  },
  data () {
    return {};
  }, mounted () {
    console.log(this.$router.options.routes);
  },
};
</script>
