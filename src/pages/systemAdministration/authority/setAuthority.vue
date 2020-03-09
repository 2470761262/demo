<style lang="less" scoped>
.elTree {
  width: 500px;
  margin-right: 20px;
  margin-bottom: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;

  /deep/ .el-input {
    margin: 10px 0 10px;
  }

  float: left;
}

.personSelect {
  float: left;
}

.formItem {
  margin: 10px;
  display: inline-block;
}

.selected_btn{
  color: red;
  cursor: pointer;
}
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        <el-button style="margin:10px 45px;"
                   type="primary"
                   size="mini"
                   @click="savePosition">保存</el-button>
        <el-tree :data="ruleTreeData"
                 show-checkbox
                 node-key="id"
                 ref="tree"
                 highlight-current
                 :props="defaultProps">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text"
                         size="mini"
                         :class="{'selected_btn':node.data.dataType == '0' }"
                         @click.stop="() => operationSelf(node,data)"> 自己</el-button>
              <el-button type="text"
                         size="mini"
                         :class="{'selected_btn':node.data.dataType == '1'}"
                         @click.stop="() => operationDept(node, data)"> 部门权限</el-button>
              <el-button type="text"
                         size="mini"
                         :class="{'selected_btn':node.data.dataType == '2'}"
                         @click.stop="() => operationCompany(node, data)">跨部门权限</el-button>
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
        </div>
        <div class="text item"
             style="margin-top: 10px;">
          <template>
            <div class="formItem"
                 v-show="showSave">
              <el-button type="primary"
                         size="mini"
                         @click="saveCompanyRule">保存</el-button>
            </div>
            <div class="elTree" v-show="showCompanyTree">
              <el-tree  :data="companyTreeData"
                       show-checkbox
                       :load="loadCompanyTreeNode"
                       lazy
                       node-key="id"
                       ref="companyTree"
                       highlight-current
                       :props="companyProps"
                       @check-change="checkNode"
                       :default-checked-keys="companyGather"
                       :default-expanded-keys="companyGather">

              </el-tree>
            </div>
          </template>
        </div>
      </el-card>
    </template>

  </div>
</template>
<script>
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {},
  data () {
    return {
      ruleTreeData: [],
      companyTreeData: [],
      positionObj: {},
      saveType: null,
      node: null,
      resolve: null,
      defaultProps: {
        children: "children",
        label: "rName",
      },
      companyProps: {
        children: "children",
        label: "name",
      },
      showSave: false,
      showCompanyTree: false,
      companyGather: [],
      ruleParamsObj: {
        postId: null,
        accountId: null,
      },
      paramsObj: {},
    }
  },
  mounted () {
    let postId = JSON.parse(this.$route.query.postId);
    let accountId = JSON.parse(this.$route.query.accountId);
    this.ruleParamsObj.accountId = accountId;
    this.ruleParamsObj.postId = postId;
    this.paramsObj.accountId = accountId;
    //读取功能点数据
    this.$api
      .post({
        url: "/sys/rule/employee/tree/checked",
        data: { accountId: accountId },
        qs: true,
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          this.ruleTreeData = result.data.allRule;
          this.$refs.tree.setCheckedKeys(result.data.selectedRule);
        } else {
          console.log("查询错误: ", result.message);
          this.$message.error("查询错误: " + result.message);
        }
      })
      .catch(e => {
        console.log("查询树节点");
        console.log(e);
      });
  },
  methods: {
    operationCompany (node, data) {
      this.showCompanyTree = true;
      this.showSave = true;
      console.log(node, data, "operationCompany..");
      this.paramsObj.rId = data.id;
      this.paramsObj.dataType = 2;
      node.data.dataType = "2";
      if (data.companyGather) {
        let gather = data.companyGather;
        let arrayGather = gather.split(",");
        this.companyGather = arrayGather;
      } else {
        this.companyGather = new Array();
        this.node.childNodes = [];
        this.loadCompanyTreeNode(this.node, this.resolve);
      }
    },
    operationSelf (node, data) {
      this.showCompanyTree = false;
      this.showSave = true;
      this.paramsObj.rId = data.id;
      this.paramsObj.dataType = 0;
      node.data.dataType = "0";
      console.log(node, data, "operationSelf..");
    },
    operationDept (node, data) {
      this.showCompanyTree = false;
      this.showSave = true;
      this.paramsObj.rId = data.id;
      this.paramsObj.dataType = 1;
      node.data.dataType = "1";
      console.log(node, data, "operationDept..");
    },
    //应用
    savePosition () {
      var that = this;
      debugger;
      let checkedKeys = that.$refs.tree.getCheckedKeys();
      let keys = "";
      checkedKeys.forEach(key => {
        keys = keys + "," + key;
      });
      keys = keys.substr(1, keys.length);
      console.log(keys, "checkedKeys///");
      that.ruleParamsObj.ruleIds = keys;
      this.$api
        .post({
          url: "/sys/rule/employee/set",
          data: that.ruleParamsObj,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            this.$message.info("操作成功");
          } else {
            console.log("保存结果：" + result.message);
            this.$message.error("保存失败" + result.message);
          }
        });
    },
    //保存跨部门权限
    saveCompanyRule () {
      if (!this.paramsObj && !this.paramsObj.rId) {
        this.$message.info("请选择节点进行保存");
        return;
      }
      var that = this;
      console.log(that.paramsObj, "save company ...");
      this.$api
        .post({
          url: "/sys/rule/employee/company/set",
          data: that.paramsObj,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            this.$message.info("操作成功");
          } else {
            console.log("保存结果：" + result.message);
            this.$message.error("保存失败" + result.message);
          }
        });
    },

    //动态加载节点
    loadCompanyTreeNode (node, resolve) {
      if (node.level == 0) {
        this.node = node;
        this.resolve = resolve;
      }
      console.log(node, resolve, "load tree node");
      //读取功能点数据
      debugger;
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
            console.log("发送公告结果：" + result.message);
            alert(result.message);
          }
        });
    },

    //选中节点
    checkNode (data, checked, indeterminate) {
      if (checked) {
        if (data.deptParentId == 0) {
          this.paramsObj.companyId = data.id;
        } else {
          this.paramsObj.deptId = data.deptParentId;
        }
      }
    },

    //取消
    cancel () {
      var that = this;
      //跳转页面
      that.$router.push({ path: '/sys/authority/employeeList', query: { "id": this.paramsObj.postId } });
    },
  }
}
</script>
