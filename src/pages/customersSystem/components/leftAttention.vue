<style lang="less" scoped>
.attention-content {
  margin-right: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 280px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 15px 15px 0;
  box-sizing: border-box;
  .attention-select {
    width: 100%;
    /deep/.el-select {
      width: 100%;
    }
  }
  .but-group {
    text-align: right;
    padding-right: 20px;
    /deep/.el-button {
      span {
        color: var(--color--primary);
      }
    }
  }
  .attention-scroll-content {
    flex: 1 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    height: 0;
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
      background: var(--color--primary);
      border-radius: 50px;
    }
    .scroll-content-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.hide-query {
  position: absolute;
  height: 100%;
  color: var(--color--primary);
  right: -10px;
  top: 0;
  font-size: 20px;
  cursor: pointer;
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}
.attention {
  height: 100%;
}
</style>
<template>
  <div class="attention">
    <transition name="el-fade-in-linear">
      <div class="attention-content" v-if="queryFlag">
        <div class="attention-select">
          <!-- <el-select
            v-model="imdataimdata"
            filterable
            placeholder="请输入您添加过的客源印象"
          >
          </el-select> -->
          <el-paging-select
            class="anchor-point"
            keyValue="impression"
            valueKey="id"
            clearable
            type="radio"
            frist
            placeholder="请输入您添加过的客源印象"
            @load="queryMyImpressionList"
            @change="queryMyImpressionList"
            @valueChange="selectImpressionChange"
            :isPageEnd="impressionIsPageEnd"
            :loading="loadingImpression"
            :data="myImpressionsList"
          ></el-paging-select>
        </div>
        <div class="but-group">
          <el-button type="text">一键还原</el-button>
          <el-button type="text">一键清除</el-button>
        </div>
        <div class="attention-scroll-content">
          <el-tag
            v-for="item in 6"
            :key="item.index"
            size="small"
            class="scroll-content-tag"
            closable
            >活跃客户(3)</el-tag
          >
        </div>
      </div>
    </transition>
    <div
      class="hide-query"
      @click="triggerLeft"
      :class="queryFlag ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
    ></div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "queryFlag",
    event: "input"
  },
  props: {
    queryFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      imdataimdata: "",
      selectPage: 0,
      impressionIsPageEnd: false,
      loadingImpression: false,
      myImpressionsList: []
    };
  },
  mounted() {},
  methods: {
    selectImpressionChange(value) {
      //选择印象后
      if (value) {
        this.$message({
          message: "您选择了" + value,
          type: "success"
        });
      }
    },
    queryMyImpressionList(name, type) {
      if (type == "change") {
        console.log(type);
        this.selectPage = 1;
        this.myImpressionsList = [];
        this.impressionIsPageEnd = false;
      }
      let _that = this;
      if (!this.impressionIsPageEnd) {
        this.loadingImpression = true;
      }
      this.$api
        .post({
          url: "/saleCustomerImpression/queryMyImperssions",
          data: { name: name, page: _that.selectPage, limit: 10 },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            if (type == "change") {
              console.log(type);
              this.selectPage = 1;
              this.myImpressionsList = [];
              this.impressionIsPageEnd = false;
            }
            console.log(this.selectPage);
            if (result.data.totalPage >= this.selectPage) {
              ++this.selectPage;
            } else {
              this.impressionIsPageEnd = true;
              return false;
            }
            var arrayCommunity = result.data.list;
            this.myImpressionsList = [
              ...this.myImpressionsList,
              ...arrayCommunity
            ];
          } else {
            console.log("查询我的客户then：" + result.message);
          }
        })
        .catch(e => {
          console.log("查询我的客户印象失败catch");
          console.log(e);
        })
        .finally(() => {
          this.loadingImpression = false;
        });
    },
    /**
     * 切换左侧
     */
    triggerLeft() {
      this.$emit("input", !this.queryFlag);
    }
  }
};
</script>
