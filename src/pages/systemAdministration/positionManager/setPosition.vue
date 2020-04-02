<style lang="less" scoped>
.elTree {
  width: 500px;
  margin-right: 20px;
  margin-bottom: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  font-size: 14px;

  /deep/ .el-input {
    margin: 10px 0 10px;
  }

  float: left;
}

/deep/.is-current {
  > .el-tree-node__content {
    .custom-tree-node {
      .selected_btn {
        color: red !important;
      }
    }
  }
}

.personSelect {
  float: left;
}

.formItem {
  margin: 10px;
}

.selected_btn {
  color: #ffa6a4;
  cursor: pointer;
}

.demo1-form-inline {
  /deep/ .el-form-item {
    margin-bottom: 0;
    vertical-align: middle;
    &:first-child {
      .el-form-item__content {
        vertical-align: middle;
      }
    }
  }
}
</style>
<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">

    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin: 10px">
      <el-breadcrumb-item v-for="(item,index) in navAuthority.navList"
                          :key="index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <template>
      <div class="elTree">
        <el-form :inline="true"
                 class="demo1-form-inline"
                 style="align-content: center">
          <el-form-item label="类型">
            <el-select v-model="type"
                       @change="loadFunctionPoint"
                       style="width: 130px;"
                       placeholder="请选择功能点类型">
              <el-option label="PC端"
                         value="0"></el-option>
              <el-option label="Client端"
                         value="1"></el-option>
              <el-option label="Wap端"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不选中子节点">
            <el-switch v-model="checkStrictly"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       @click="savePositionRule">保存</el-button>
          </el-form-item>
        </el-form>
        <el-tree :data="ruleTreeData"
                 show-checkbox
                 node-key="id"
                 ref="tree"
                 check-strictly
                 :check-on-click-node=false
                 highlight-current
                 :check-strictly="checkStrictly"
                 :expand-on-click-node=false
                 :props="defaultProps">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text"
                         size="mini"
                         style="cursor: pointer;"
                         :class="{'selected_btn':node.data.dataType == '0' }"
                         @click=" operationSelf(node,data)"> 自己</el-button>
              <el-button type="text"
                         size="mini"
                         style="cursor: pointer;"
                         :class="{'selected_btn':node.data.dataType == '1'}"
                         @click="operationDept(node, data)"> 部门权限</el-button>
              <el-button type="text"
                         size="mini"
                         style="cursor: pointer;"
                         :class="{'selected_btn':node.data.dataType == '2'}"
                         @click="operationCompany(node, data)">跨部门权限</el-button>
            </span>
          </span>
        </el-tree>
      </div>

    </template>
    <template>
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>操作</span>
        </div>
        <div class="text item">
          <!--          <el-button type="primary"-->
          <!--                     @click="cancel">返回</el-button>-->
          <!--          <div class="formItem"-->
          <!--               style="margin-left: 230px;"-->
          <!--               v-show="showSave">-->
          <!--            <el-button type="primary"-->
          <!--                       @click="savePosition(0)">应用到角色</el-button>-->
          <!--            <el-button type="primary"-->
          <!--                       @click="savePosition(1)">应用到个人</el-button>-->
          <!--            <div v-show="showOperationCompany"-->
          <!--                 style="display: inline-block;margin-left: 10px">-->
          <!--              <el-button type="primary"-->
          <!--                         @click="savePosition(2)">应用到公司</el-button>-->
          <!--            </div>-->
          <!--          <div class="formItem" style="margin-left: 230px;" v-show="showSave">-->
          <!--            <el-button type="primary" @click="saveRolePermission">保存</el-button>-->
          <!--          </div>-->
        </div>
        <div class="text item"
             v-show="true">
          <template>
            <div class="formItem">
              <el-form :inline="true"
                       class="demo-form-inline"
                       style="!important;align-content: center">
                <el-form-item label="关键字过滤"
                              v-show="showCompanyTree">
                  <el-input placeholder="输入关键字进行过滤"
                            v-model="filterText"
                            class="treeSearch"></el-input>
                </el-form-item>
                <el-form-item label="功能操作"
                              v-show="showSave">
                  <el-button type="primary"
                             size="mini"
                             @click="saveRolePermission">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="elTree"
                 v-show="showCompanyTree">
              <el-tree ref="companyTree"
                       :data="companyTreeData"
                       node-key="businessId"
                       show-checkbox
                       :props="companyProps"
                       @check="checkNode"
                       :highlight-current="true"
                       :filter-node-method="filterNode"
                       check-strictly
                       :action="''"
                       empty-text="暂无数据，请检查权限"
                       auto-expand-parent
                       :default-checked-keys="companyGather"
                       :default-expanded-keys="companyGather"
                       v-loading="treeLoading"></el-tree>
            </div>
          </template>
        </div>
      </el-card>
    </template>

  </div>
</template>
<script>
import getMenuRid from "@/minxi/getMenuRid";
import { mapState } from "vuex";
export default {
  mixins: [getMenuRid],
  computed: {
    ...mapState(['navAuthority'])
  },
  data () {
    return {
      checkStrictly: true,
      fullscreenLoading: false,
      filterText: "",
      treeLoading: true,
      type: "0",
      postId: null,
      ruleTreeData: [],
      companyTreeData: [],
      positionObj: {},
      saveType: null,
      node: null,
      resolve: null,
      defaultProps: {
        children: "children",
        label: "rName"
      },
      companyProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      showSave: false,
      showCompanyTree: false,
      companyGather: [],
      paramsObj: {
        functionPointArray: new Array(),
        postId: null,
        ruleType: null
      },
      showOperationCompany: false,
      companyTreeSelectNode: {
        companyIds: [],
        deptIds: []
      },
      currentCompanyGather: null,
      currentDeptGather: null,
      currentNode: null
    };
  },
  created () {
    let id = JSON.parse(this.$route.query.id);
    console.log(this.navAuthority.navList, 'navAuthority.navList');
    this.$store.dispatch('judgeNavList', id);
    this.postId = id;
    this.paramsObj.postId = id;
    this.loadFunctionPoint();
    //读取树数据
    this.loadUnitTree();
  },
  methods: {
    loadFunctionPoint () {
      let that = this;
      //读取功能点数据
      that.$api
        .post({
          url: "/sys/rule/position/tree/checked",
          data: { postId: that.postId, type: that.type },
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            that.ruleTreeData = result.data.allRule;
            that.$refs.tree.setCheckedKeys(result.data.selectedRule);
          } else {
            console.log("查询错误: ", result.message);
            that.$message.error("查询错误: " + result.message);
          }
        })
        .catch(e => {
          console.log("查询树节点");
          console.log(e);
        });
    },
    loadUnitTree () {
      let that = this;
      //读取树数据
      that.$api
        .post({
          url: "/sys/tree/role/set/unit"
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            that.companyTreeData = result.data;
          } else {
            console.log("载入结果" + +result.message);
            alert(result.message);
          }
        })
        .then(() => {
          if (this.$route.query.cur != null) {
            this.curNodeId = [this.$route.query.cur];
            this.$nextTick(() => {
              this.handleCheckChange(
                this.$refs.companyTreeData.getNode(...this.curNodeId).data,
                true
              );
            });
          }
        })
        .catch(e => {
          console.log("读取失败");
          console.log(e);
        })
        .finally(e => {
          that.treeLoading = false;
        });
    },
    operationCompany (node, data) {
      this.showCompanyTree = true;
      this.showSave = true;
      this.showOperationCompany = true;
      console.log(node, data, "operationCompany..");
      node.data.dataType = "2";
      this.$refs.companyTree.setCheckedKeys([]);
      if (data.companyGather) {
        let gather = data.companyGather;
        let arrayGather = gather.split(",");
        this.companyGather = arrayGather;
      }
      if (data.deptGather) {
        let deptGather = data.deptGather;
        let deptArrayGather = deptGather.split(",");
        if (this.companyGather) {
          deptArrayGather.forEach(deptId => {
            this.companyGather.push(deptId);
          });
          //this.companyGather = this.companyGather + deptArrayGather;
        } else {
          this.companyGather = deptArrayGather;
        }
      }
      this.currentCompanyGather = null;
      this.currentDeptGather = null;
      this.putParams(node, "2");
      this.currentNode = node;
    },
    operationSelf (node, data) {
      this.showCompanyTree = false;
      this.showSave = true;
      this.showOperationCompany = false;
      // this.paramsObj.rId = data.id;
      // this.paramsObj.dataType = 0;
      node.data.dataType = "0";
      console.log(node, data, "operationSelf..");
      //设置参数
      this.putParams(node, "0");
    },
    operationDept (node, data) {
      this.showCompanyTree = false;
      this.showSave = true;
      this.showOperationCompany = false;
      // this.paramsObj.rId = data.id;
      // this.paramsObj.dataType = 1;
      node.data.dataType = "1";
      console.log(node, data, "operationDept..");
      //设置参数
      this.putParams(node, "1");
    },
    //应用
    savePosition (type) {
      if (!this.paramsObj && !this.paramsObj.rId) {
        this.$message.info("请选择节点进行保存");
        return;
      }
      var that = this;
      that.paramsObj.postId = that.postId;
      that.paramsObj.ruleType = that.type;
      that.paramsObj.type = type;
      let companyId = "";
      that.companyTreeSelectNode.companyIds.forEach(id => {
        companyId = companyId + "," + id;
      });
      let deptId = "";
      that.companyTreeSelectNode.deptIds.forEach(id => {
        deptId = deptId + "," + id;
      });
      companyId = companyId.substr(1, companyId.length);
      deptId = deptId.substr(1, deptId.length);
      that.paramsObj.companyId = companyId;
      that.paramsObj.deptId = deptId;
      console.log(that.paramsObj, "save company ...");
      that.fullscreenLoading = true;
      that.$api
        .post({
          url: "/sys/position/set/rules",
          data: that.paramsObj,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            that.$message.info("重新登录后生效，操作成功");
          } else {
            console.log("保存结果：" + result.message);
            that.$message.error("保存失败" + result.message);
          }
          that.fullscreenLoading = false;
        });
    },
    //保存角色rule
    savePositionRule () {
      var that = this;
      let paramsObj = {};
      paramsObj.id = that.postId;
      paramsObj.type = that.type;
      let checkedKeys = that.$refs.tree.getCheckedKeys();
      let keys = "";
      checkedKeys.forEach(key => {
        keys = keys + "," + key;
      });
      console.log(keys, "before ...");
      keys = keys.substr(1, keys.length);
      console.log(keys, "after ...");
      if (that.type == 1) {
        //默认端 client 端
        paramsObj.postClientRuleCode = keys;
      } else if (that.type == 2) {
        //默认 wap端
        paramsObj.postWapRuleCode = keys;
      } else if (that.type == 0) {
        //默认 pc端
        paramsObj.postRuleCode = keys;
      }
      that.fullscreenLoading = true;
      this.$api
        .put({
          url: "/sys/position/update/authority",
          data: paramsObj,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            this.$message.info("重新登录后生效，操作成功");
          } else {
            console.log("保存结果：" + result.message);
            this.$message.error("保存失败" + result.message);
          }
          that.fullscreenLoading = false;
        })
        .finally(function () {
          that.fullscreenLoading = false
        });
    },

    /**
     * 批量保存角色设置
     */
    saveRolePermission () {
      if (!this.paramsObj && !this.paramsObj.rId) {
        this.$message.info("请选择节点进行保存");
        return;
      }
      this.fullscreenLoading = true;
      var that = this;
      that.paramsObj.ruleType = this.type;
      let functionPointList = [];
      that.paramsObj.functionPointArray.forEach(obj => {
        functionPointList.push(new Object(obj));
      });
      that.paramsObj.functionPointList = functionPointList;
      that.paramsObj.functionPointArray = new Array();
      console.log(that.paramsObj, "save company ...");
      this.$api
        .post({
          url: "/sys/position/set/role/permission",
          data: that.paramsObj,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            this.$message.info("重新登录后生效，操作成功");
          } else {
            console.log("保存结果：" + result.message);
            this.$message.error("保存失败" + result.message);
          }
          that.fullscreenLoading = false;
        })
        .finally(
          function () {
            that.fullscreenLoading = false;
          }
        );
    },
    //保存跨部门权限
    putParams (node, dataType) {
      let data = node.data;
      if (!data) {
        data = node;
      }
      //设置参数
      let that = this;
      let functionPointObj =
        that.paramsObj.functionPointArray[new String(data.id)];
      debugger;
      if (!functionPointObj) {
        functionPointObj = {};
      }
      functionPointObj.rId = data.id;
      functionPointObj.dataType = dataType;
      if ((that.companyTreeSelectNode.companyIds && that.companyTreeSelectNode.companyIds.length > 0) ||
        that.companyTreeSelectNode.deptIds && that.companyTreeSelectNode.deptIds.length > 0) {
        let companyId = that.foreachList(that.companyTreeSelectNode.companyIds);
        functionPointObj.companyId = companyId;
        let deptId = that.foreachList(that.companyTreeSelectNode.deptIds);
        functionPointObj.deptId = deptId;
      }
      that.paramsObj.functionPointArray[new String(data.id)] = functionPointObj;
      if (data.children) {
        if (data.children.length > 0) {
          this.foreachChildren(data.children, dataType);
        }
      }
      //设置当前对象的值
      let currentNode = that.$refs.tree.getNode(data.id);
      currentNode.data.dataType = dataType;
      if (this.currentCompanyGather != null) {
        currentNode.data.companyGather = this.currentCompanyGather;
      }
      if (this.currentDeptGather != null) {
        currentNode.data.deptGather = this.currentDeptGather;
      }
    },
    foreachList (list) {
      let temp = "";
      list.forEach(id => {
        temp = temp + "," + id;
      });
      temp = temp.substr(1, temp.length);
      return temp;
    },
    //遍历子节点
    foreachChildren (childrenData, dataType) {
      let that = this;
      if (childrenData) {
        childrenData.forEach(data => {
          that.putParams(data, dataType);
        });
      }
    },
    //动态加载节点
    loadCompanyTreeNode (node, resolve) {
      if (node.level == 0) {
        this.node = node;
        this.resolve = resolve;
      }
      console.log(node, resolve, "load tree node");
      //读取功能点数据
      var pId = node.id;
      var type = null;
      if (node.data) {
        pId = node.data.id;
        type = node.data.type;
      }
      this.$api
        .post({
          url: "/company/tree/companyAndDept",
          data: { id: pId, type: type },
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            resolve(result.data); //动态加载时
          } else {
            console.log("请求结果：" + result.message);
            alert(result.message);
          }
        });
    },

    //选中节点
    checkNode (data, checkedData) {
      if (checkedData.checkedNodes) {
        this.companyTreeSelectNode.companyIds = new Array();
        this.companyTreeSelectNode.deptIds = new Array();
        checkedData.checkedNodes.forEach(node => {
          if (node.type == 0) {
            this.companyTreeSelectNode.companyIds.push(node.businessId);
          } else {
            this.companyTreeSelectNode.deptIds.push(node.businessId);
          }
        });
        this.currentCompanyGather = this.foreachList(
          this.companyTreeSelectNode.companyIds
        );
        this.currentDeptGather = this.foreachList(
          this.companyTreeSelectNode.deptIds
        );
        this.putParams(this.currentNode, this.currentNode.data.dataType);
      }
    },
    //取消
    cancel () {
      var that = this;
      //跳转页面
      that.$router.push({ path: "/sys/positionManager" });
    },
    filterNode (value, data) {
      console.log("value：" + value);
      console.log(data);
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.companyTree.filter(val);
    }
  }
};
</script>
