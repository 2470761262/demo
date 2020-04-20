<style lang="less" scoped>
.elTree {
  width: 500px;
  margin-right: 20px;
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

.form .formItem {
  display: block;
}
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        关键字:
        <el-input
          style="width: 200px;"
          placeholder="输入关键字进行过滤"
          @change="keywordChange"
          v-model="keyword"
        ></el-input>类型:
        <el-select v-model="type" @change="typeChange" placeholder="请选择类型" style="width: 150px">
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.type"></el-option>
        </el-select>
        <el-tree
          ref="tree2"
          :props="defaultProps"
          :load="loadNode"
          lazy
          :highlight-current="true"
          draggable
          @node-drag-end="handleDragEnd"
          @node-click="clickNode"
          v-loading="treeLoading"
        ></el-tree>
      </div>
    </template>
    <template>
      <el-card class="box-card">
        <div class="text item">
          <div class="formItem">
            <el-button type="primary" @click="saveSubordinate">添加子级节点</el-button>
          </div>
          <div class="formItem">
            <el-button type="primary" @click="saveSiblingRule">添加同级节点</el-button>
          </div>
          <div class="formItem">
            <el-button type="primary" @click="updateRule">修改</el-button>
          </div>
          <div class="formItem">
            <el-button type="primary" @click="delRule">删除</el-button>
          </div>
        </div>
      </el-card>
    </template>

    <template>
      <el-card class="box-card" v-show="showTable">
        <div slot="header" class="clearfix">
          <span>人员管理</span>
        </div>
        <div class="item form">
          <div class="formItem">
            功能点名称:
            <el-input v-model="ruleObj.rName" style="width: 200px;" placeholder="功能点名称"></el-input>
          </div>
          <div class="formItem">
            链接地址:
            <el-input v-model="ruleObj.rUrl" style="width: 200px;" placeholder="链接地址"></el-input>
          </div>
          <div class="formItem">
            post参数:
            <el-input v-model="ruleObj.postData" style="width: 200px;" placeholder="post参数"></el-input>
          </div>
          <div class="formItem">
            图片地址:
            <el-input v-model="ruleObj.picUrl" style="width: 200px;" placeholder="图片地址"></el-input>
          </div>
          <div class="formItem">
            说明:
            <el-input v-model="ruleObj.state" style="width: 200px;" placeholder="说明"></el-input>
          </div>
          <div class="formItem">
            功能编号:
            <el-input v-model="ruleObj.rNo" style="width: 200px;" placeholder="功能编号"></el-input>
          </div>
          <div class="formItem">
            菜单类型:
            <el-select v-model="ruleObj.rType" placeholder="请选择类型">
              <el-option
                v-for="item in rTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
          <div class="formItem">
            是否有效:
            <el-select v-model="ruleObj.del" placeholder="是否有效">
              <el-option
                v-for="item in delList"
                :key="item.id"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
          <div class="formItem">
            范围:
            <el-select v-model="ruleObj.area" placeholder="范围">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
          <div class="formItem">
            是否超级:
            <el-select v-model="ruleObj.isSuper" placeholder="范围">
              <el-option
                v-for="item in isSuperList"
                :key="item.id"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
          <div class="formItem">
            类型:
            <el-select v-model="ruleObj.rulesType" placeholder="范围">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>

          <div class="formItem">
            关联接口:
            <el-select
              v-model="ruleObj.ruleUrls"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择接口"
            >
              <el-option
                v-for="item in ruleUrlList"
                :key="item.url"
                :label="item.name"
                :value="item.tag"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="text item">
          <div class="formItem" style="float: right;margin-right: 230px;">
            <el-button type="primary" @click="saveRuleObj">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>
<script>
import getMenuRid from "@/minxi/getMenuRid";
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getMenuRid, getToken],
  watch: {
    // filterText (val) {
    //   this.$refs.tree2.filter(val);
    // }
  },
  components: {},
  data() {
    return {
      treeData: [],
      keyword: "",
      defaultProps: {
        children: "children",
        label: "rName"
      },
      typeList: [
        {
          id: 0,
          name: "PC端",
          type: 0
        },
        {
          id: 1,
          name: "Client端",
          type: 1
        },
        {
          id: 2,
          name: "WAP端",
          type: 2
        }
      ],
      rTypeList: [
        {
          id: 0,
          name: "左菜单",
          type: "左菜单"
        },
        {
          id: 1,
          name: "功能菜单",
          type: "功能菜单"
        },
        {
          id: 2,
          name: "功能按钮",
          type: "功能按钮"
        },
        {
          id: 3,
          name: "主目录",
          type: "主目录"
        }
      ],
      delList: [
        {
          id: 0,
          name: "有效",
          type: 0
        },
        {
          id: 1,
          name: "无效",
          type: 1
        }
      ],
      areaList: [
        {
          id: 0,
          name: "内网",
          type: 0
        },
        {
          id: 2,
          name: "所有",
          type: 2
        }
      ],
      isSuperList: [
        {
          id: 0,
          name: "否",
          type: 0
        },
        {
          id: 1,
          name: "是",
          type: 1
        }
      ],
      ruleUrlList: [],
      ruleObj: {},
      defaultRule: {
        rType: "左菜单",
        rulesType: 0,
        del: 1,
        isSuper: 0,
        area: 0
      },
      type: 0,
      node: [],
      showTable: false,
      saveType: "update",
      treeLoading: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      console.log("init...");
    });
  },
  methods: {
    //change keyword
    keywordChange(e) {
      console.log(e, "keywrodChange");
      this.node.childNodes = [];
      this.loadNode(this.node, this.resolve);
    },
    typeChange(e) {
      console.log(e, "typeChange");
      this.node.childNodes = [];
      this.loadNode(this.node, this.resolve);
    },

    //动态加载节点
    loadNode(node, resolve) {
      this.treeLoading = true;
      if (node.level == 0) {
        this.node = node;
        this.node.id = 0;
        this.resolve = resolve;
      }
      console.log(node, resolve, "load tree node");
      //读取功能点数据
      //debugger;
      var pId = node.id;
      if (node.data) {
        pId = node.data.id;
      }
      this.$api
        .post({
          url: "/sys/rule/tree",
          data: "type=" + this.type + "&pId=" + pId + "&keyword=" + this.keyword
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
        })
        .catch(e => {
          console.log("发送公告结果");
          console.log(e);
        })
        .finally(e => {
          this.treeLoading = false;
        });
    },
    treeCheck(e, data) {
      //判断如果未选中，则清空用户列表；
      if (data && data.checkedKeys) {
        if (data.checkedKeys.length < 1) {
          this.employeeList = [];
          return;
        }
      }
      console.log(e, data, "check..");
      //读取公司或部门下面的用户
      this.$api
        .post({
          url: "/sys/account/employees/" + e.type + "/" + e.businessId,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.employeeList = result.data;
          } else {
            console.log("获取用户失败：" + result.message);
            this.$message.error("获取用户失败：" + result.message);
          }
        })
        .catch(e => {
          console.log("获取用户异常");
          console.log(e);
          this.$message.error("获取用户异常" + e);
        });
      console.log(this.$refs.tree2.getNode(44), "getNode");
    },
    getCurrentKey() {
      console.log(this.$refs.tree2.getCurrentKey(), "getCurrentKey");
      //  this.$refs.tree2.setCurrentKey(44);
    },
    checkChange(e, data, childData) {
      console.log(e, data, childData, "checkChange");
    },
    //树输入筛选
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
      console.log(draggingNode, dropNode, dropType, ev);
    },
    //选中节点
    clickNode(data, node, obj) {
      this.ruleObj = data;
      this.$forceUpdate();
      console.log(data, node, obj, "selected...");
      if (this.showTable) {
        this.selectRuleUrlConfig();
      }
    },
    //更新功能点
    updateRule() {
      let that = this;
      if (!that.ruleObj || !that.ruleObj.id) {
        alert("请选择节点进行操作");
        return;
      }
      //debugger;
      that.saveType = "update";
      that.showTable = true;
      this.selectRuleUrlConfig();
    },
    //删除功能点
    delRule() {
      if (!this.ruleObj || !this.ruleObj.id) {
        alert("请选择节点进行操作");
        return;
      }
      this.$confirm("确定删除该节点么？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$api
          .delete({
            url: "/sys/rule/" + this.ruleObj.id,
            data: this.ruleObj,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              console.log(result.data);
              this.$message.info("操作成功");
              this.showTable = false;
              this.node.childNodes = [];
              this.loadNode(this.node, this.resolve);
            } else {
              console.log("删除操作失败：" + result.message);
              this.$message.error("删除操作失败：" + result.message);
            }
          })
          .catch(e => {
            console.log("删除操作失败异常");
            console.log(e);
          });
        this.$message.error("删除操作失败异常" + e);
      });
    },
    //添加子级功能点
    saveSubordinate() {
      if (!this.ruleObj || !this.ruleObj.id) {
        alert("请选择节点进行操作");
        return;
      }
      console.log(this.ruleObj, "rule object。。。");
      this.saveType = "saveSub";
      let pId = this.ruleObj.id;
      let rule = this.defaultRule;
      this.ruleObj = rule;
      this.ruleObj.pId = pId;
      this.showTable = true;
      this.selectRuleUrlConfig();
    },
    //添加同级功能点
    saveSiblingRule() {
      if (!this.ruleObj || !this.ruleObj.id) {
        alert("请选择节点进行操作");
        return;
      }
      this.saveType = "saveSib";
      let id = this.ruleObj.id;
      let rule = this.defaultRule;
      this.ruleObj = rule;
      this.ruleObj.id = id;
      this.showTable = true;
      this.selectRuleUrlConfig();
    },
    //取消
    cancel() {
      this.ruleObj = {};
      this.ruleObj = this.defaultRule;
      this.showTable = false;
    },
    //保存节点信息
    saveRuleObj() {
      //获取参数进行保存;
      if (!this.ruleObj) {
        this.$message.info("请填充内容后进行保存");
        return;
      }
      let url;
      if (this.saveType == "update") {
        url = "sys/rule/update";
      } else if (this.saveType == "saveSib") {
        url = "/sys/rule/add/sib";
      } else if ((this.saveType = "saveSub")) {
        url = "/sys/rule/add/sub";
      }
      if (!url) {
        alert("保存方法错误");
        return;
      }
      this.$api
        .put({
          url: url,
          data: this.ruleObj,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result);
            this.$message.info("保存成功");
            this.showTable = false;
            //this.node.childNodes = [];
            //this.loadNode(this.node, this.resolve);
          } else {
            console.log("保存失败：" + result.message);
            this.$message.error("保存失败：" + result.message);
          }
        })
        .catch(e => {
          console.log("保存功能点失败异常");
          console.log(e);
          this.$message.error("保存功能点失败异常" + e);
        });
    },
    //请求url列表
    selectRuleUrlConfig() {
      let that = this;
      //请求功能点URL
      that.$api
        .post({
          url: "/sys/rule/url/list",
          data: { rId: that.ruleObj.id },
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.ruleUrlList = result.data.ruleUrlConfig;
            if (result.data.urlList) {
              this.$set(this.ruleObj, "ruleUrls", result.data.urlList);
            }
            console.log(this.ruleObj);
          } else {
            console.log("获取接口列表失败：" + result.message);
          }
          this.$forceUpdate();
        })
        .catch(e => {
          console.log("获取接口列表失败异常");
          console.log(e);
        });
    }
  }
};
</script>
