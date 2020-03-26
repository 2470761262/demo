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


.personSelect {
  float: left;
}

.formItem {
  margin: 10px;
  display: inline-block;
}

.selected_btn{
  color: #ffa6a4;
  cursor: pointer;
}

</style>
<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" style="align-content: center">
      <el-form-item label="类型">
        <el-select v-model="ruleParamsObj.type" style="width: 130px;" @change="loadFunctionPoint" placeholder="请选择功能点类型">
          <el-option label="PC端" value="0"></el-option>
          <el-option label="Client端" value="1"></el-option>
          <el-option label="Wap端" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子节点选中">
        <el-switch v-model="checkStrictly"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="savePosition">保存</el-button>
      </el-form-item>
    </el-form>
    <template>
      <div class="elTree">
        <el-tree :data="ruleTreeData"
                 show-checkbox
                 node-key="id"
                 ref="tree"
                 :check-strictly="checkStrictly"
                 highlight-current
                 :props="defaultProps">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
<!--              <el-button type="text"-->
<!--                         size="mini"-->
<!--                         style="cursor: pointer;"-->
<!--                         :class="{'selected_btn':node.data.dataType == '2'}"-->
<!--                         @click.stop="() => operationCompany(node, data)">权限设置</el-button>-->
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

            <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="treeSearch"></el-input>
            <el-tree
              ref="companyTree"
              :data="companyTreeData"
              node-key="businessId"
              show-checkbox
              :props="companyProps"
              @check="checkNode"
              :highlight-current="true"
              :filter-node-method="filterNode"
              :action="''"
              empty-text="暂无数据，请检查权限"
              auto-expand-parent
              :default-checked-keys="companyGather"
              :default-expanded-keys="companyGather"
              v-loading="treeLoading"
            ></el-tree>

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
      checkStrictly:true,
      filterText: "",
      treeLoading: true,
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
        children: "childrenNodes",
        label: "labelName"
      },
      showSave: false,
      showCompanyTree: true,
      companyGather: [],
      ruleParamsObj: {
        type: "0",
      },
      paramsObj: {},
      companyTreeSelectNode:{
        companyIds: [],
        deptIds:[],
      },
    }
  },
  mounted () {
    let that = this;
    let companyId = JSON.parse(that.$route.query.companyId);
    that.ruleParamsObj.companyId = companyId;
    that.loadFunctionPoint();
    that.loadUnitTree();
  },
  methods: {
    loadFunctionPoint(){
      let that = this;
      //读取功能点数据
      that.$api
        .post({
          url: "/sys/rule/company/authorityConfiguration/tree/checked",
          data: that.ruleParamsObj,
          qs: true,
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            that.ruleTreeData = result.data.allRule;
            that.$refs.tree.setCheckedKeys(result.data.selectedRule);
            that.companyGather = result.data.allRule[result.data.selectedRule[0]].companyGather.split(",");
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
    loadUnitTree(){
      let that = this;
      //读取树数据
      that.$api
        .post({
          url: "/sys/tree/companyAuthority/set/unit"
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
          this.treeLoading = false;
        });
    },
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
        this.$refs.companyTree.setCheckedKeys([]);
        // this.companyGather = new Array();
        // this.node.childNodes = [];
        // this.loadCompanyTreeNode(this.node, this.resolve);
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
      let that = this;
      let checkedKeys = that.$refs.tree.getCheckedKeys();
      let keys = "";
      checkedKeys.forEach(key => {
        keys = keys + "," + key;
      });
      keys = keys.substr(1, keys.length);
      console.log(keys, "checkedKeys///");
      that.ruleParamsObj.rIds = keys;
      let companyGather = "";
      that.companyTreeSelectNode.companyIds.forEach(id => {
        companyGather = companyGather + "," + id;
      });
      companyGather = companyGather.substr(1, companyGather.length);
      that.ruleParamsObj.companyGather = companyGather;
      //传入类型
      that.$api
        .post({
          url: "/sys/rule/save/authorityConfiguration",
          data: that.ruleParamsObj,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            that.$message.info("操作成功");
          } else {
            console.log("保存结果：" + result.message);
            that.$message.error("保存失败" + result.message);
          }
        });
    },

    //选中节点
    checkNode (data, checkedData) {
      if(checkedData.checkedNodes){
        this.companyTreeSelectNode.companyIds = new Array();
        this.companyTreeSelectNode.deptIds = new Array();
        checkedData.checkedNodes.forEach(node =>{
          if (node.type == 0) {
            this.companyTreeSelectNode.companyIds.push(node.businessId);
          }else{
            this.companyTreeSelectNode.deptIds.push(node.businessId);
          }
        })
      }

    },

    //取消
    cancel () {
      var that = this;
      //跳转页面
      that.$router.push({ path: '/sys/authority/employeeList', query: { "id": this.paramsObj.postId } });
    },
    filterNode(value, data) {
      console.log("value：" + value);
      console.log(data);
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    },
  },
  watch: {
    filterText(val) {
      this.$refs.companyTree.filter(val);
    },
  }
}
</script>
