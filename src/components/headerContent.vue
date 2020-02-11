<style lang="less" scoped>
.page-cell-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  .per-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .per-name-nav {
    margin-left: 20px;
    .el-dropdown-link {
      font-size: 18px;
    }
  }
  .per-exit {
    font-size: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
}
.page-theme {
  display: flex;
  align-items: center;
  &::before {
    content: "选择主题:";
    font-size: 14px;
  }
}
</style>
<template>
  <div class="page-cell-header">
    <div class="page-theme">
      <ThemePicker />
    </div>
    <div class="per-img">
      <img src="http://b-ssl.duitang.com/uploads/item/201804/25/20180425000646_fsmLS.thumb.700_0.jpeg"
           alt="头像">
    </div>
    <div class="per-name-nav">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          周杰伦<i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">基本资料</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">修改手机号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="per-exit el-icon-switch-button"></div>
  </div>
</template>
<script>
import ThemePicker from './ThemePicker';
export default {
  components: {
    ThemePicker
  },
  created () {
  },
  methods: {
    handleCommand (command) {
      this.$message('item ' + command);
    }
  },
}
</script>