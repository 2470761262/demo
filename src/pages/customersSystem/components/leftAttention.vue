/* eslint-disable no-undef */
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
          <el-button type="text" @click="restoreImpression">一键还原</el-button>
          <el-button type="text" @click="clearAllImpression"
            >一键清除</el-button
          >
        </div>
        <div class="attention-scroll-content">
          <el-tag
            v-for="item in selectedImpressions"
            :key="item.id"
            size="small"
            @close="closeImpression(item.id)"
            class="scroll-content-tag"
            closable
            >{{ item.impression }}</el-tag
          >
        </div>
      </div>
    </transition>
    <div
      class="hide-query"
      @click="triggerLeft"
      :class="queryFlag ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"
    ></div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  model: {
    prop: "queryFlag",
    event: "input"
  },
  props: {
    queryFlag: {
      type: Boolean
    },
    fatherMethod: {
      type: Function,
      default: null
    },
    parentPageType: {
      //标识当前组件被哪个父页面引用
      type: String,
      default: "allMyCustomers"
    }
  },
  data() {
    return {
      imdataimdata: "",
      selectPage: 0,
      impressionIsPageEnd: false,
      loadingImpression: false,
      myImpressionsList: [],
      selectedImpressions: [],
      beforeImpressions: []
    };
  },
  watch: {
    selectedImpressions: function(val) {
      let otherParams = util.localStorageGet("customers:query:allParams");
      let customerIds = [];
      if (val.length > 0) {
        console.log(val, "准备通过印象搜索");
        val.forEach((item, index) => {
          customerIds.push(item.customerId);
        });
        console.log(customerIds, "条件，客户id：");
        util.localStorageSet("customers:allCustomers:impressionSelected", {
          customerIds: customerIds
        });
      } else {
        util.localStorageRemove("customers:allCustomers:impressionSelected");
      }
      if (this.fatherMethod) {
        let queryParams = { customerIds: customerIds, page: 1 };
        console.log(this.parentPageType, queryParams);
        if (this.parentPageType == "allMyCustomers" && otherParams) {
          //只有我的所有私客 页面 才需要组合条件
          queryParams = Object.assign(queryParams, otherParams);
        }
        this.fatherMethod(queryParams);
      } else {
        console.log("无法调用父组件方法，因为未初始化");
      }
    }
  },
  mounted() {
    util.localStorageRemove("customers:query:impressionSelected");
  },
  created() {
    //刷新要清除
    util.localStorageRemove("customers:allCustomers:impressionSelected");
  },
  methods: {
    restoreImpression() {
      if (
        this.beforeImpressions == null ||
        this.beforeImpressions.length == 0
      ) {
        this.selectedImpressions = [];
      } else {
        this.selectedImpressions = this.beforeImpressions;
      }
    },
    clearAllImpression() {
      this.beforeImpressions = this.selectedImpressions; //保存之前的，用于一键还原
      this.selectedImpressions = [];
    },
    closeImpression(id) {
      let that = this;
      that.selectedImpressions.forEach((item, index) => {
        if (item.id == id) {
          that.selectedImpressions.splice(index, 1);
          return;
        }
      });
    },
    selectImpressionChange(value) {
      let that = this;
      if (value) {
        this.$api
          .get({
            url: "/saleCustomerImpression/" + value,
            qs: true
          })
          .then(e => {
            let result = e.data;
            console.log(result, "选择了某个印象");
            if (result.code == 200) {
              let hasSelected = false;
              that.selectedImpressions.forEach((item, index) => {
                if (item.id == value) {
                  that.$message({
                    message: "已经选择过了",
                    type: "info"
                  });
                  hasSelected = true;
                }
              });
              if (!hasSelected) {
                that.selectedImpressions.push(result.data);
              }
            } else {
              that.$message({
                message: result.message,
                type: "info"
              });
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
