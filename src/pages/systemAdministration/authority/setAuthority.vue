<style lang="less" scoped>
.elTree {
  font-size: 14px;
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

/deep/.is-current{
  .el-tree-node__content{
    .custom-tree-node{
      span{
        .el-button:last-child{
          color: #ff1300;
        }
      }
    }
  }
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
    <template>
      <div class="elTree">
        <el-select v-model="ruleParamsObj.type" @change="loadFunctionPoint" placeholder="请选择功能点类型">
          <el-option label="PC端" value="0"></el-option>
          <el-option label="Client端" value="1"></el-option>
          <el-option label="Wap端" value="2"></el-option>
        </el-select>
<!--        <el-button style="margin:10px 45px;"-->
<!--                   type="primary"-->
<!--                   size="mini"-->
<!--                   @click="savePosition">保存</el-button>-->
        <el-tree :data="ruleTreeData"
                 show-checkbox
                 node-key="id"
                 ref="tree"
                 check-strictly
                 :check-on-click-node=false
                 highlight-current
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
                         @click.stop="() => operationSelf(node,data)"> 自己</el-button>
              <el-button type="text"
                         size="mini"
                         style="cursor: pointer;"
                         :class="{'selected_btn':node.data.dataType == '1'}"
                         @click.stop="() => operationDept(node, data)"> 部门权限</el-button>
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
                check-strictly
                :action="''"
                empty-text="暂无数据，请检查权限"
                auto-expand-parent
                :default-checked-keys="companyGather"
                :default-expanded-keys="companyGather"
                v-loading="treeLoading"
              ></el-tree>

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
      showCompanyTree: false,
      companyGather: [],
      ruleParamsObj: {
        type: "0",
        postId: null,
        accountId: null,
      },
      paramsObj: {
        functionPointArray: new Array(),
        accountId: null,
        ruleType: null,
      },
      companyTreeSelectNode:{
        companyIds: [],
        deptIds:[],
      },
      currentNode: null,
    }
  },
  mounted () {
    //let postId = JSON.parse(this.$route.query.postId);
    let accountId = JSON.parse(this.$route.query.accountId);
    this.ruleParamsObj.accountId = accountId;
    this.paramsObj.accountId = accountId;
    this.loadFunctionPoint();
    this.loadUnitTree();
    //this.ruleParamsObj.postId = postId;
  },
  methods: {
    loadFunctionPoint(){
      let that = this;
      that.currentNode = null;
      that.paramsObj.functionPointArray = new Array();
      //读取功能点数据
      that.$api
        .post({
          url: "/sys/rule/employee/tree/checked",
          data: that.ruleParamsObj,
          qs: true,
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
    loadUnitTree(){
      let that = this;
      //读取树数据
      that.$api
        .post({
          url: "/sys/tree/person/set/unit"
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
      console.log(node, data, "operationCompany..");
      node.data.dataType = "2";
      this.$refs.companyTree.setCheckedKeys([]);
      if(data.companyGather){
        let gather = data.companyGather;
        let arrayGather = gather.split(",");
        this.companyGather = arrayGather;
      }
      if(data.deptGather){
        let gather = data.deptGather;
        let arrayGather = gather.split(",");
        this.companyGather = arrayGather;
      }
      //设置参数
      //this.putParams(node);
      this.currentNode = node;
    },
    operationSelf (node, data) {
      this.showCompanyTree = false;
      this.showSave = true;
      node.data.dataType = "0";
      //设置参数
      this.putParams(node);
      console.log(node, data, "operationSelf..");
    },
    operationDept (node, data) {
      this.showCompanyTree = false;
      this.showSave = true;
      node.data.dataType = "1";
      //设置参数
      this.putParams(node);
      console.log(node, data, "operationDept..");
    },
    //应用
    // savePosition () {
    //   var that = this;
    //   let checkedKeys = that.$refs.tree.getCheckedKeys();
    //   let keys = "";
    //   checkedKeys.forEach(key => {
    //     keys = keys + "," + key;
    //   });
    //   keys = keys.substr(1, keys.length);
    //   console.log(keys, "checkedKeys///");
    //   that.ruleParamsObj.ruleIds = keys;
    //   this.$api
    //     .post({
    //       url: "/sys/rule/employee/set",
    //       data: that.ruleParamsObj,
    //       qs: true
    //     })
    //     .then(e => {
    //       console.log(e.data);
    //       let result = e.data;
    //       if (result.code == 200) {
    //         this.$message.info("重新登录后生效，操作成功");
    //       } else {
    //         console.log("保存结果：" + result.message);
    //         this.$message.error("保存失败" + result.message);
    //       }
    //     });
    // },
    //保存跨部门权限
    putParams(node){
      let data = node.data;
      let dataType = node.data.dataType;
      //设置参数
      let that = this;
      let functionPointObj = that.paramsObj.functionPointArray[new String(data.id)];
      debugger;
      if(!functionPointObj){
        functionPointObj = {};
      }
      functionPointObj.rId = data.id;
      functionPointObj.dataType = dataType;
      let companyId = that.foreachList(that.companyTreeSelectNode.companyIds);
      functionPointObj.companyId = companyId;
      let deptId = that.foreachList(that.companyTreeSelectNode.deptIds);
      functionPointObj.deptId = deptId;
      that.paramsObj.functionPointArray[new String(data.id)] = functionPointObj;
    },
    saveCompanyRule () {
      if (!this.paramsObj && !this.paramsObj.rId) {
        this.$message.info("请选择节点进行保存");
        return;
      }
      var that = this;
      that.paramsObj.ruleType = this.ruleParamsObj.type;
      let functionPointList = [];
      that.paramsObj.functionPointArray.forEach(obj => {functionPointList.push(new Object(obj))})
      that.paramsObj.functionPointList = functionPointList;
      that.paramsObj.functionPointArray = new Array();
      console.log(that.paramsObj, "save company ...");
      this.$api
        .post({
          url: "/sys/rule/employee/company/set/gather",
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
        });
    },
    foreachList(list){
      let temp = "";
      list.forEach(id => {
        temp = temp + "," + id;
      });
      temp = temp.substr(1, temp.length);
      return temp;
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
        //设置节点数据权限
        this.currentNode.data.companyGather = this.foreachList(this.companyTreeSelectNode.companyIds);
        this.currentNode.data.deptGather = this.foreachList(this.companyTreeSelectNode.deptIds);
        this.putParams(this.currentNode);
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
  }
  ,
  watch: {
    filterText(val) {
      this.$refs.companyTree.filter(val);
    },
  }
}
</script>
