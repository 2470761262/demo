<style lang="less" scoped>
.page-cell-query {
  display: flex;
  justify-content: flex-end;
  /deep/.el-input {
    width: 200px;
  }
  .el-button-group {
    display: flex;
  }
  @media screen and(max-width: 768px) {
    justify-content: start;
    /deep/.el-input {
      width: 100%;
    }
  }
}
/deep/.el-tabs__item {
  font-size: 20px;
  font-weight: 600;
}
/deep/.el-tabs__nav-wrap {
  &::after {
    display: none;
  }
}
</style>
<template>
  <div>
    <el-row>
      <el-col :sm="8">
        <el-tabs
          class="page-tabs"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="分类房源" name="houseListTypeHouse"></el-tab-pane>
          <el-tab-pane
            label="房源配对"
            name="houseLIstlHousePair"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :sm="16">
        <div class="page-cell-query">
          <el-input
            v-model="queryInput"
            placeholder="请输入关键字搜索"
          ></el-input>
          <el-button-group>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" @click="addHouse">录入</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <keep-alive>
      <component :is="activeName"></component>
    </keep-alive>
  </div>
</template>
<script>
//默认分类房源组件
import houseListTypeHouse from "../components/houseListTypeHouse";
export default {
  name: "houseList",
  components: {
    houseListTypeHouse,
    houseLIstlHousePair: () => import("../components/houseLIstlHousePair") //配对房源
  },
  data() {
    return {
      activeName: "houseListTypeHouse",
      queryInput: ""
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
    },
    addHouse() {
      this.$router.push({ path: "/menuFrame/addHouse" });
    }
  }
};
</script>
