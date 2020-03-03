<style lang="less" scoped>
.elTree {
  width: 200px;
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
  margin: 0 10px;
  display: inline-block;
}
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        <!--        <el-input placeholder="输入关键字进行过滤" v-model="filterText">-->
        <!--        </el-input>-->
        <el-tree ref="tree2"
                 :data="treeData"
                 :default-expanded-keys="[1]"
                 node-key="nodeId"
                 show-checkbox
                 :props="defaultProps"
                 @check-change="checkChange"
                 @check="treeCheck"
                 :highlight-current="true"
                 :filter-node-method="filterNode"></el-tree>
      </div>
    </template>
    <template>
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>人员密码重置</span>
        </div>
        <div class="text item">
          <div class="formItem">
            人员:
            <el-select v-model="personBusinessId"
                       placeholder="请选择">
              <el-option v-for="item in employeeList"
                         :key="item.nodeId"
                         :label="item.labelName"
                         :value="item.businessId">
              </el-option>
            </el-select>
          </div>
          <div class="formItem">
            最新密码:
            <el-input v-model="newPwd"
                      style="width: 200px;"
                      placeholder="最新密码"
                      disabled></el-input>
          </div>
          <div class="formItem">
            <el-button type="primary"
                       @click="resetPwd">重置密码</el-button>
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>
<script>
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val);
    }
  },
  components: {},
  data () {
    return {
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      newPwd: "",
      employeeList: [],
      personBusinessId: ""
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      // 代码保证 this.$el 在 document 中
      console.log(this);
      //读取公司，部门数据
      this.$api
        .post({
          url: "/sys/account/company/tree",
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.treeData = result.data;
          } else {
            console.log("发送公告结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("发送公告结果");
          console.log(e);
        });

    })
  },
  methods: {
    treeCheck (e, data) {
      //判断如果未选中，则清空用户列表；
      if (data && data.checkedKeys) {
        if (data.checkedKeys.length < 1) {
          this.employeeList = [];
          return;
        }
      }
      console.log(e, data, "check..");
      //读取公司或部门下面的员工
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
            console.log("获取员工失败：" + result.message);
            this.$message.error("获取员工失败：" + result.message);
          }
        })
        .catch(e => {
          console.log("获取员工异常");
          console.log(e);
          this.$message.error("获取员工异常" + e);
        });
      console.log(this.$refs.tree2.getNode(44), "getNode");
    },
    getCurrentKey () {
      console.log(this.$refs.tree2.getCurrentKey(), "getCurrentKey");
      //  this.$refs.tree2.setCurrentKey(44);
    },
    checkChange (e, data, childData) {
      console.log(e, data, childData, "checkChange");
    },
    //树输入筛选
    filterNode (value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //重置密码
    resetPwd () {
      //获取参数进行重置密码;
      if (!this.personBusinessId || this.personBusinessId == "" || this.personBusinessId == null) {
        alert("请先选择人员");
        return;
      }
      // let params = {accountId: this.personBusinessId};
      // data: params,
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      this.$api
        .post({
          url: "/sys/account/reset/pwd/" + this.personBusinessId,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.newPwd = result.data;
          } else {
            console.log("重置密码失败：" + result.message);
            this.$message.error("重置密码失败：" + result.message);
          }
        })
        .catch(e => {
          console.log("重置密码失败异常");
          console.log(e);
          this.$message.error("重置密码失败异常" + e);
        });
    }
  }
};
</script>
