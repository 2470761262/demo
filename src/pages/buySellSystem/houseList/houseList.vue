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
        <el-tabs class="page-tabs"
                 v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="分类房源"
                       name="houseListTypeHouse"></el-tab-pane>
          <el-tab-pane label="房源配对"
                       name="houseLIstlHousePair"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :sm="16">
        <div class="page-cell-query">
          <el-input v-model="queryInput"
                    placeholder="请输入关键字搜索"></el-input>
          <el-button-group>
            <el-button type="primary">查询</el-button>
            <el-button type="primary"
                       @click="addHouse">录入</el-button>
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
import houseListTypeHouse from "@/pages/buySellSystem/houseList/components/houseListTypeHouse";
//异步组件工厂方法
import componentsFactory from "@/util/componentsFactory";
import getToken from "@/minxi/getUrlToken";
export default {
  name: "houseList",
  mixins: [getToken],
  components: {
    houseListTypeHouse,
    houseLIstlHousePair: () => componentsFactory("pages/buySellSystem/houseList/components/houseLIstlHousePair")
  },
  data () {
    return {
      activeName: "houseListTypeHouse",
      queryInput: ""
    };
  },
  created () {
    console.log("===========" + JSON.stringify(this.GetRequest()));
  },
  methods: {
    GetRequest () {
      var url = location.href; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    handleClick (e) {
      console.log(e);
    },
    addHouse () {
      this.$router.push({ path: "/buySellSystem/addHouse" });
    }
  }
};
</script>
