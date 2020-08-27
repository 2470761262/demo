<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/customers/privateCustomersList' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ breadcrumbName }}</el-breadcrumb-item>
      <div class="back" @click="back" v-if="isBack">返回</div>
    </el-breadcrumb>
    <feedback :isCustomers="true" class="feedback"></feedback>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbName: {
      type: String
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-breadcrumb__inner.is-link {
  color: @backgroud;
}
.back {
  display: inline;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
}
.box {
  display: flex;
}
.feedback {
  margin-left: auto;
}
</style>
