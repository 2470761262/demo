<template>
  <div class="panel right">
    <el-tabs class="sub-nav" v-model="activeTabName" @tab-click="switchTab">
      <el-tab-pane
        v-for="(item, index) in sidebarNavs"
        :key="index"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <div class="content">
      <div class="tabpanel" v-if="activeTabName == 'first'">
        <div class="relate-ipt-box">
          <el-input
            class="ipt"
            v-model="deptFilterName"
            clearable
            @input="relateDeptInput"
            @focus="relateDeptFocus"
          ></el-input>
          <div
            class="result-panel"
            :class="{ active: openDeptFilterPanel }"
            v-loading="deptObj.loading"
          >
            <div class="list" v-infinite-scroll="relateDepartLoad">
              <el-checkbox-group v-model="deptCheckList">
                <el-checkbox
                  :label="item.nameId"
                  v-for="(item, index) in deptObj.list"
                  :key="index"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
              <div
                class="no-data"
                v-if="deptObj.list.length == 0 && deptObj.loading == false"
              >
                暂无数据
              </div>
            </div>
            <div class="bottom">
              <button @click="addRelateDept">添加</button>
            </div>
          </div>
        </div>
        <div class="relate-list" v-loading="getDeptRelateListLoading">
          <div
            class="column"
            v-for="(item, index) in deptRelateList"
            :key="index"
          >
            <span class="title">{{ item.name }}</span>
            <span
              class="btn el-icon-delete-solid"
              @click="deptDelRelate(item.nameId)"
            ></span>
          </div>
          <div
            class="no-data"
            v-if="
              getDeptRelateListLoading == false && deptRelateList.length == 0
            "
          >
            <img
              src="@/assets//images/clockRule_add_ralate_no_data.svg"
              alt=""
            />
            <p>暂无关联部门</p>
          </div>
        </div>
      </div>
      <div class="tabpanel" v-else>
        <div class="relate-ipt-box">
          <el-input
            class="ipt"
            v-model="perFilterName"
            clearable
            @input="relatePerInput"
            @focus="relatePerFocus"
          ></el-input>
          <div class="result-panel" :class="{ active: openPerFilterPanel }">
            <div
              class="list"
              v-infinite-scroll="relateDepartLoad"
              v-loading="perObj.loading"
            >
              <el-checkbox-group v-model="perCheckList">
                <el-checkbox
                  :label="item.nameId"
                  v-for="(item, index) in perObj.list"
                  :key="index"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
              <div
                class="no-data"
                v-if="perObj.list.length == 0 && perObj.loading == false"
              >
                暂无数据
              </div>
            </div>
            <div class="bottom">
              <button @click="addRelatePer">添加</button>
            </div>
          </div>
        </div>
        <div class="relate-list">
          <div
            class="column"
            v-for="(item, index) in perRelateList"
            :key="index"
          >
            <span class="title">{{ item.name }}</span>
            <span
              class="btn el-icon-delete-solid"
              @click="perDelRelate(item.nameId)"
            ></span>
          </div>
          <div
            class="no-data"
            v-if="getPerRelateListLoading == false && perRelateList.length == 0"
          >
            <img
              src="@/assets//images/clockRule_add_ralate_no_data.svg"
              alt=""
            />
            <p>暂无关联人员</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ruleId: {
      type: [String, Number],
      default: null
    },
    companyId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      activeTabName: "first",
      sidebarNavs: [
        {
          label: "适用部门",
          name: "first"
        },
        {
          label: "适用人员",
          name: "second"
        }
      ],
      openDeptFilterPanel: false,
      openPerFilterPanel: false,
      deptCheckList: [],
      deptFilterName: "",
      deptObj: {
        loading: false,
        list: []
      },
      deptRelateList: [],
      getDeptRelateListLoading: false,
      perCheckList: [],
      perFilterName: "",
      perObj: {
        loading: false,
        list: []
      },
      perRelateList: [],
      getPerRelateListLoading: false
    };
  },
  watch: {
    ruleId(newVal) {
      this.getRelateDept();
      this.getRelatePer();
    }
  },
  created() {
    if (this.ruleId) {
      this.getRelateDept();
      this.getRelatePer();
    }
  },
  mounted() {
    document.addEventListener("click", this.relateInpBlur);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.relateInpBlur);
  },
  methods: {
    /**
     * @description: 部门/人员切换
     * @return {*}
     */
    switchTab() {},
    relateInpBlur(e) {
      let tp = document.querySelector(".relate-ipt-box");
      if (tp) {
        if (
          !tp.contains(e.target) &&
          e.target.className.indexOf("el-input__clear") == -1
        ) {
          this.openDeptFilterPanel = false;
          this.openPerFilterPanel = false;
        }
      }
    },
    /**
     * @description: 考勤部门搜索框获取焦点
     * @param {*}
     * @return {*}
     */
    relateDeptFocus() {
      if (!this.openDeptFilterPanel) {
        this.getRelateDeptList();
        this.openDeptFilterPanel = true;
      }
    },
    /**
     * @description: 考勤人员搜索框获取焦点
     * @param {*}
     * @return {*}
     */
    relatePerFocus() {
      if (!this.openPerFilterPanel) {
        this.getRelatePerList();
        this.openPerFilterPanel = true;
      }
    },
    /**
     * @description: 考勤部门搜索框input事件
     * @param {*}
     * @return {*}
     */
    relateDeptInput(e) {
      this.getRelateDeptList();
    },
    /**
     * @description: 考勤人员搜索框input事件
     * @param {*}
     * @return {*}
     */
    relatePerInput(e) {
      this.getRelatePerList();
    },
    /**
     * @description: 请求考勤部门数据
     * @param {*}
     * @return {*}
     */
    getRelateDeptList() {
      if (!this.companyId) return;
      this.deptObj.loading = true;
      this.$api
        .get({
          url: "/attendance/rule/auth/dept",
          data: {
            limit: 20,
            companyId: this.companyId,
            name: this.deptFilterName
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.deptObj.list = e.data.data;
          }
        })
        .finally(e => {
          this.deptObj.loading = false;
        });
    },
    /**
     * @description: 请求考勤人员数据
     * @param {*}
     * @return {*}
     */
    getRelatePerList() {
      if (!this.companyId) return;
      this.perObj.loading = true;
      this.$api
        .get({
          url: "/attendance/rule/auth/per",
          data: {
            limit: 20,
            companyId: this.companyId,
            name: this.perFilterName
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.perObj.list = e.data.data;
          }
        })
        .finally(e => {
          this.perObj.loading = false;
        });
    },
    /**
     * @description: 添加关联部门
     * @param {*}
     * @return {*}
     */
    addRelateDept() {
      this.deptObj.loading = true;
      this.$api
        .post({
          url: "/attendance/rule/relation",
          data: {
            ruleId: this.ruleId,
            companyId: this.companyId,
            type: 1,
            relationIds: this.deptCheckList
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: "添加关联考勤部门成功~",
              type: "success"
            });
            this.openDeptFilterPanel = false;
            // 添加关联的部门添加到已关联列表中
            this.deptCheckList.map(item => {
              let index = this.deptRelateList.findIndex(row => {
                return row.nameId == item;
              });
              if (index == -1) {
                let addIndex = this.deptObj.list.findIndex(col => {
                  return col.nameId == item;
                });
                this.deptRelateList.push(this.deptObj.list[addIndex]);
              }
            });
          }
        })
        .finally(e => {
          this.deptObj.loading = false;
        });
    },
    /**
     * @description: 添加关联部门
     * @param {*}
     * @return {*}
     */
    addRelatePer() {
      this.perObj.loading = true;
      this.$api
        .post({
          url: "/attendance/rule/relation",
          data: {
            ruleId: this.ruleId,
            companyId: this.companyId,
            type: 2,
            relationIds: this.perCheckList
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              message: "添加关联考勤人员成功~",
              type: "success"
            });
            this.openPerFilterPanel = false;
            // 添加关联的人员添加到已关联列表中
            this.perCheckList.map(item => {
              let index = this.perRelateList.findIndex(row => {
                return row.nameId == item;
              });
              if (index == -1) {
                let addIndex = this.perObj.list.findIndex(col => {
                  return col.nameId == item;
                });
                this.perRelateList.push(this.perObj.list[addIndex]);
              }
            });
          }
        })
        .finally(e => {
          this.perObj.loading = false;
        });
    },
    /**
     * @description: 获取考勤已关联部门
     * @param {*}
     * @return {*}
     */
    getRelateDept() {
      this.getDeptRelateListLoading = true;
      this.$api
        .get({
          url: "/attendance/rule/dept",
          data: {
            ruleId: this.ruleId
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.deptRelateList = e.data.data;
            // 已关联数据添加默认勾选数据中
            this.deptCheckList = this.deptRelateList.map(item => {
              return item.nameId;
            });
          }
        })
        .finally(e => {
          this.getDeptRelateListLoading = false;
        });
    },
    /**
     * @description: 获取考勤已关联人员
     * @param {*}
     * @return {*}
     */
    getRelatePer() {
      this.getPerRelateListLoading = true;
      this.$api
        .get({
          url: "/attendance/rule/per",
          data: {
            ruleId: this.ruleId
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.perRelateList = e.data.data;
            // 已关联数据添加默认勾选数据中
            // this.perCheckList = this.perRelateList.map(item => {
            //   return item.nameId;
            // });
          }
        })
        .finally(e => {
          this.getPerRelateListLoading = false;
        });
    },
    /**
     * @description: 解除该条关联考勤部门
     * @param {*} id
     * @return {*}
     */
    deptDelRelate(id) {
      this.getDeptRelateListLoading = true;
      this.$api
        .delete({
          url: "/attendance/rule/relation/delete",
          data: {
            relationId: id,
            type: 1
          },
          qs: true
        })
        .then(e => {
          if (e.data.code == 200) {
            let delIndex = this.deptRelateList.findIndex(item => {
              return item.nameId == id;
            });
            this.deptRelateList.splice(delIndex, 1);
            this.$message({
              message: "考勤部门解除关联成功~",
              type: "success"
            });
          }
        })
        .finally(e => {
          this.getDeptRelateListLoading = false;
        });
    },
    /**
     * @description: 解除该条关联考勤人员
     * @param {*} id
     * @return {*}
     */
    perDelRelate(id) {
      this.getPerRelateListLoading = true;
      this.$api
        .delete({
          url: "/attendance/rule/relation/delete",
          data: {
            relationId: id,
            type: 2
          },
          qs: true
        })
        .then(e => {
          if (e.data.code == 200) {
            let delIndex = this.perRelateList.findIndex(item => {
              return item.nameId == id;
            });
            this.perRelateList.splice(delIndex, 1);
            this.$message({
              message: "考勤人员解除关联成功~",
              type: "success"
            });
          }
        })
        .finally(e => {
          this.getPerRelateListLoading = false;
        });
    },
    relateDepartLoad() {},
    /**
     * @description: 获取考勤已关联人员
     * @param {*}
     * @return {*}
     */
    getRelatePerson() {}
  }
};
</script>

<style lang="less" scoped>
.right {
  padding: 24px 0 !important;
  height: 634px;
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0);
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #bbb;
  }
  *::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  /deep/.sub-nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    .el-tabs__header {
      width: 100%;
      margin: 0;
    }
    .el-tabs__item {
      height: 32px;
      line-height: 1;
      font-size: @font18;
      color: #303133;
      &.is-active {
        color: @backgroud;
        font-weight: bold;
      }
    }
    .el-tabs__active-bar {
      height: 4px;
      border-radius: 4px;
    }
    .el-tabs__nav-wrap::after {
      background: rgba(0, 0, 0, 0);
    }
  }
  .content {
    padding: 16px 0 0;
    .tabpanel {
      /deep/.relate-ipt-box {
        position: relative;
        margin: 0 24px;
        .ipt {
          .el-input__inner {
            height: 46px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #cecece;
            font-size: @font16;
          }
        }
        .result-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          top: 62px;
          width: 100%;
          min-height: 120px;
          max-height: 456px;
          background: #fff;
          box-shadow: 0px 8px 13px 0px rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          box-sizing: border-box;
          opacity: 0;
          transition-duration: 0.3s;
          z-index: -2;
          &.active {
            opacity: 1;
            z-index: 9;
          }
          .list {
            overflow: auto;
            .el-checkbox {
              display: flex;
              align-items: center;
              height: 62px;
              padding-left: 24px;
              .el-checkbox__inner {
                width: 14px;
                height: 14px;
              }
              .el-checkbox__inner::after {
                height: 7px;
                left: 4px;
              }
              .el-checkbox__label {
                padding-left: 16px;
                font-size: @font14;
                color: #303133;
              }
            }
            .no-data {
              padding: 24px;
              line-height: 1;
              color: #555;
              font-size: @font14;
            }
          }
          .bottom {
            width: 366px;
            height: 58px;
            padding: 9px;
            background: #fff;
            box-shadow: 0px -2px 15px 0px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            button {
              width: 109px;
              height: 40px;
              background: #247257;
              border: none;
              border-radius: 4px;
              font-size: @font16;
              color: #fff;
              outline: none;
              cursor: pointer;
              float: right;
            }
          }
        }
      }
      .relate-list {
        width: 100%;
        height: 476px;
        padding: 0 24px;
        margin-top: 16px;
        overflow: auto;
        box-sizing: border-box;
        .column {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 62px;
          .title {
            font-size: @font14;
            color: #303133;
          }
          .btn {
            font-size: @font16;
            color: #909399;
            cursor: pointer;
          }
        }
        .no-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 115px;
          img {
            width: 114px;
            margin-bottom: 24px;
          }
          p {
            font-size: @font14;
            color: #606266;
          }
        }
      }
    }
  }
}
</style>
