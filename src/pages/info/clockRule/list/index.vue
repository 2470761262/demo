<template>
  <!-- 考勤规则管理 -->
  <div class="content">
    <div class="head">
      <div class="head-type">
        <div
          class="head-type-item"
          v-for="(item, index) in navs"
          :key="index"
          :class="{ active: currentNavIndex == index }"
          @click="navigateToOhter(item.path)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="head-underling-nva">
        <div class="head-nav-box">
          <div
            class="head-nav-item"
            v-for="(item, index) in subNavs"
            :key="index"
            :class="{ active: currentSubNavIndex == index }"
            @click="navigateToOhter(item.path, index)"
          >
            {{ item.name }}
          </div>
        </div>
        <button class="btn-add" @click="navigateToAdd()">新增考勤规则</button>
      </div>
    </div>
    <div class="scroll">
      <div class="main">
        <div class="clock-rule-conditions">
          <div class="conditions-box">
            <el-row :gutter="32">
              <el-form label-position="right" label-width="64px">
                <el-col :span="6">
                  <el-form-item label="规则名称">
                    <el-input
                      clearable
                      placeholder="考勤规则名称"
                      class="width100"
                      v-model="formData.ruleName"
                      @blur="query(1)"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="启用状态">
                    <el-select
                      class="width100"
                      v-model="formData.status"
                      clearable
                      placeholder="请选择"
                      @change="query(1)"
                    >
                      <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" class="fr">
                  <div class="conditions-btn">
                    <div class="btn" @click="reset">重置</div>
                    <div class="btn active" @click="query(1)">搜索</div>
                  </div>
                </el-col>
              </el-form>
            </el-row>
          </div>
        </div>
        <div
          class="wrapper"
          v-loading="loading"
          element-loading-text="正在加载"
        >
          <div class="column" v-for="(item, index) in tableData" :key="index">
            <div class="title">{{ item.name }}</div>
            <div class="text-box">
              <div class="text">{{ item.description }}</div>
            </div>
            <div class="btn-wrapper">
              <div class="btn-box">
                <button @click="navigateToAdd(item.id)">编辑</button>
                <button @click="deleteClick(item.id)">删除</button>
              </div>
              <!-- <div class="status-box">
                <span class="text">状态</span>
                <el-switch
                  :width="32"
                  v-model="value"
                  active-color="#30CCA8"
                  inactive-color="#ebebeb"
                >
                </el-switch>
              </div>-->
            </div>
          </div>
          <div v-if="tableData.length == 0">暂无数据</div>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageJson.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageJson.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageJson.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import clockRuleHead from "@/pages/info/mixins/clockRuleHead.js";
export default {
  mixins: [clockRuleHead],
  data() {
    return {
      currentSubNavIndex: 0,
      subSecondNavs: [
        {
          name: "我的日志",
          path: "/clockList/myInfo",
          rUrl: "workSummary"
        },
        {
          name: "考勤统计",
          path: "/clockList/statistic",
          rUrl: "statistics"
        },
        {
          name: "考勤审批",
          path: "/clockList/examine",
          rUrl: "audit"
        }
      ],
      status: "",
      statusList: [
        {
          label: "开启",
          value: 1
        },
        {
          label: "关闭",
          value: 0
        }
      ],
      value: "",
      pageJson: {
        page: 1,
        limit: 10,
        total: 0,
        pageSum: 0
      },
      formData: {
        ruleName: "",
        status: ""
      },
      loading: false,
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    navigateToAdd(id) {
      this.$router.push({
        path: "/clockRule/add",
        query: { id: id }
      });
    },
    /**
     * @example:重置
     */
    reset() {
      Object.keys(this.formData).forEach(item => {
        this.formData[item] = "";
      });
      this.query();
    },
    /**
     * @example:查询
     */
    query(page = 1) {
      this.pageJson.page = page;
      this.tableData = [];
      this.getData();
    },
    /**
     * @example: 改变每页请求数据数量
     * @param {val} 请求数
     * @param {type} 分页类型
     */
    handleSizeChange(val) {
      this.pageJson.limit = val;
      this.query();
    },
    /**
     * @example: 改变分页当前页码
     * @param {val} 页码
     * @param {type} 分页类型
     */
    handleCurrentChange(val) {
      this.query(val);
    },
    /**
     * @example：获取列表数据
     */
    getData() {
      let params = {
        limit: this.pageJson.limit,
        page: this.pageJson.page
      };
      Object.assign(params, JSON.parse(JSON.stringify(this.formData))); //合并查询条件
      this.loading = true;
      this.$api
        .post({
          url: "/attendance/rule/list",
          data: params,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.tableData = result.data.list;
            this.pageJson.total = result.data.totalCount;
            this.pageJson.pageSum = result.data.totalPage;
          }
        })
        .finally(e => {
          this.loading = false;
        });
    },
    /**
     * @example:删除事件
     * @param {id}  规则id
     */
    deleteClick(id) {
      this.$confirm("您确定要删除选中的数据吗?删除后，数据将不可恢复", {
        confirmButtonText: "扔要删除",
        cancelButtonText: "我再想想",
        title: "温馨提示",
        center: true
      }).then(() => {
        this.$api
          .delete({
            url: `/attendance/rule/${id}`
          })
          .then(e => {
            this.$message({
              message: e.data.message
            });
            if (e.data.code == 200) {
              this.query();
            }
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
/*** element下拉选择面板 ***/
.el-select-dropdown__item {
  height: 40px;
  line-height: 40px;
  font-size: @font14;
}
/*** element开关 ***/
/deep/.el-switch {
  .el-switch__core {
    height: 18px;
  }
  .el-switch__core:after {
    width: 14px;
    height: 14px;
  }
  &.is-checked .el-switch__core::after {
    margin-left: -15px;
  }
}
/deep/.clock-rule-conditions {
  padding: 24px 24px 0;
  .conditions-box {
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f2f5;
  }
  .fr {
    float: right;
  }
  .el-form-item__content {
    line-height: inherit;
  }
  .el-form-item__label {
    padding: 0;
    line-height: 36px;
    text-align: left;
    font-size: @font14;
    color: #303133;
  }
  .el-input__inner {
    height: 36px;
    font-size: @font14;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-range-input {
    text-align: left;
    text-indent: 5px;
    font-size: @font14;
  }
  .prefix-icon {
    width: 0;
  }
  .el-date-editor {
    width: 100%;
    .el-range-separator {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      padding: 0;
      line-height: 1;
      text-indent: 0;
      font-size: @font14;
    }
  }
  .width100 {
    width: 100%;
  }
  .conditions-btn {
    display: flex;
    justify-content: flex-end;
    .btn {
      width: 90px;
      height: 36px;
      border: none;
      border-radius: 4px;
      background: #fff;
      outline: none;
      line-height: 36px;
      text-align: center;
      font-size: @font14;
      color: @backgroud;
      cursor: pointer;
      &.active {
        background: @backgroud;
        color: #fff;
      }
    }
  }
}

.content {
  flex: 1;
  height: 0;
  background: #f0f7f7;
  display: flex;
  flex-direction: column;
  .head {
    background: #fff;
    // position: sticky;
    // top: 0;
    // z-index: 10;
    .head-type {
      height: 67px;
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid #f0f2f5;
      .head-type-item {
        position: relative;
        line-height: 67px;
        margin-right: 46px;
        color: #303133;
        font-size: @font18;
        cursor: pointer;
        &.active {
          color: @backgroud;
          font-weight: bold;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: @backgroud;
            border-radius: 2px 2px 0px 0px;
          }
        }
      }
    }
    .head-underling-nva {
      display: flex;
      height: 58px;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      .head-nav-box {
        display: flex;
        .head-nav-item {
          height: 26px;
          padding: 0 8px;
          border-radius: 4px;
          border: 1px solid transparent;
          box-sizing: border-box;
          font-size: @font14;
          text-align: center;
          line-height: 24px;
          color: #606266;
          margin-right: 16px;
          cursor: pointer;
          &.active {
            color: @backgroud;
            background: @opacityBackground;
            border: 1px solid @backgroud;
          }
        }
      }
      .btn-add {
        height: 40px;
        padding: 0 16px;
        line-height: 40px;
        background: @backgroud;
        border: none;
        border-radius: 4px;
        color: #fff;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .scroll {
    display: flex;
    padding: 24px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #fff;
      box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
      border-radius: 8px;
      .wrapper {
        min-height: 189px;
        padding: 0 24px;
        margin: 24px 0 27px;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 268px);
        grid-gap: 24px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          background-color: rgba(0, 0, 0, 0);
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 6px;
          background-color: #bbb;
        }
        &::-webkit-scrollbar-track {
          // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: #fff;
        }
        .column {
          width: 268px;
          height: 189px;
          padding: 16px;
          background: #fff;
          border-radius: 4px;
          border: 1px solid #d8d8d8;
          box-sizing: border-box;
          &:hover {
            border-color: transparent;
            box-shadow: 0px 7px 12px 0px rgba(0, 0, 0, 0.08);
          }
          .title {
            font-size: @font18;
            font-weight: bold;
            color: #303133;
            line-height: 18px;
          }
          .text-box {
            display: flex;
            align-items: center;
            width: 100%;
            height: 64px;
            margin: 24px 0 16px;
            padding: 4px 8px;
            background: #f8f8f9;
            border-radius: 4px;
            font-size: @font12;
            color: #606266;
            box-sizing: border-box;
            .text {
              line-height: 20px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
            }
          }
          .btn-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 16px;
            border-top: 1px solid #d8d8d8;
            .btn-box {
              button {
                padding: 0;
                margin-right: 22px;
                background: transparent;
                border: none;
                line-height: 1;
                font-size: @font12;
                color: #606366;
                outline: none;
                cursor: pointer;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
            .status-box {
              .text {
                margin-right: 4px;
                color: #606266;
              }
            }
          }
        }
      }
      .el-pagination {
        padding: 5px 5px 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-pager li,
        .btn-next .el-icon,
        .btn-prev .el-icon,
        button,
        span:not([class*="suffix"]) {
          height: auto;
          line-height: 1;
          font-size: @font16;
          font-weight: normal;
        }
        .el-select .el-input {
          width: 80px;
        }
        .el-pagination__sizes .el-input .el-input__inner {
          height: 22px;
          line-height: 20px;
          font-size: @font14;
        }
        .el-pager .more::before {
          line-height: 1;
        }
        .el-pagination__editor {
          height: auto;
          .el-input__inner {
            height: 22px;
          }
        }
        .el-input--mini .el-input__icon {
          line-height: 1;
        }
      }
    }
  }
}
</style>
