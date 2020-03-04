<style lang="less" scoped>
.elTree {
  width: 20%;
  margin-right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
}

.elControl {
  width: 30%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
  margin-right: 20px;
}
.elInfo {
  width: 40%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        <el-tree
          ref="treeForm"
          :data="treeData"
          node-key="nodeId"
          show-checkbox
          :props="defaultProps"
          @check-change="handleCheckChange"
          :highlight-current="true"
          :filter-node-method="filterNode"
          check-strictly
          :action="''"
        ></el-tree>
      </div>
      <div class="elControl" v-loading="loading">
        <el-form ref="formCom" :model="formCom" v-show="checkedType===0" label-width="100px">
          <el-form-item label="公司名称">{{formCom.name}}</el-form-item>
          <el-form-item label="首拼">{{formCom.header}}</el-form-item>
          <el-form-item label="电话">{{formCom.tel}}</el-form-item>
          <el-form-item label="描述">{{formCom.desc}}</el-form-item>
          <el-form-item label="成立时间">{{formCom.regDate}}</el-form-item>
          <el-form-item label="公司类型">{{formCom.comType}}</el-form-item>
          <el-form-item label="公司编号">{{formCom.id}}</el-form-item>
          <el-form-item label="加入类型">{{formCom.joinType}}</el-form-item>
          <el-form-item label="楼盘管辖区域">{{formCom.region}}</el-form-item>
          <el-form-item label="操作">
            <el-button
              type="text"
              @click="linkJump('addCompanyManage',0,formCom.id)"
              :underline="false"
            >添加下级公司</el-button>
            <el-button
              type="text"
              @click="linkJump('addDeptManage',0,formCom.id)"
              :underline="false"
            >添加部门</el-button>
            <el-button type="text" @click="linkJumpEdit(0,formCom.id)" :underline="false">修改</el-button>
            <el-link href="https://element.eleme.io" :underline="false">锁定</el-link>
          </el-form-item>
        </el-form>
        <el-form ref="formDep" :model="formDep" v-show="checkedType===1" label-width="100px">
          <el-form-item label="部门名称">{{formDep.name}}</el-form-item>
          <el-form-item label="部门类型">{{formDep.depType}}</el-form-item>
          <el-form-item label="部门属性">{{formDep.isCom}}</el-form-item>
          <el-form-item label="负责人">{{formDep.principal}}</el-form-item>
          <el-form-item label="电话">{{formDep.tel}}</el-form-item>
          <el-form-item label="地址">{{formDep.add}}</el-form-item>
          <el-form-item label="在职人数">{{formDep.employeesNum}}</el-form-item>
          <el-form-item label="所在门店">{{formDep.store}}</el-form-item>
          <el-form-item label="部门编号">{{formDep.id}}</el-form-item>
          <el-form-item label="成立日期">{{formDep.regDate}}</el-form-item>
          <el-form-item label="部门描述">{{formDep.desc}}</el-form-item>
          <el-form-item label="操作">
            <el-button
              type="text"
              @click="linkJump('addDeptManage',formDep.id,formDep.coId)"
              :underline="false"
            >添加子部门</el-button>
            <el-button
              type="text"
              @click="linkJump('addCompanyManage',formDep.id,formDep.coId)"
              :underline="false"
            >添加下级公司</el-button>
            <el-button type="text" @click="linkJumpEdit(1,formDep.id)" :underline="false">修改</el-button>
            <el-link href="https://element.eleme.io" :underline="false">锁定</el-link>
          </el-form-item>
        </el-form>
      </div>
      <div class="elInfo">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
            <el-button style="float: right; padding: 3px 0" type="text">离职</el-button>
            <el-button style="float: right; padding: 3px 0" type="text">锁定</el-button>
            <el-button style="float: right; padding: 3px 0" type="text">任命</el-button>
            <el-button style="float: right; padding: 3px 0" type="text">人员异动</el-button>
            <el-button style="float: right; padding: 3px 0" type="text">密码重置</el-button>
            <el-button style="float: right; padding: 3px 0" type="text">手机备案</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          <br />
          <el-collapse class="box-card" accordion>
            <el-collapse-item title="more" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
        <br />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      formCom: {
        name: "",
        header: "",
        tel: "",
        desc: "",
        regDate: "",
        comType: "",
        id: null,
        joinType: "",
        region: ""
      },
      formDep: {
        name: "",
        depType: "",
        isCom: "",
        principal: "",
        tel: "",
        add: "",
        employeesNum: null,
        store: "",
        id: null,
        regDate: "",
        desc: "",
        coId: ""
      },
      checkedId: null,
      checkedType: null,
      loading: false
    };
  },
  mounted() {
    //读取树数据
    this.$api
      .post({
        url: "/sys/account/company/tree"
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.treeData = result.data;
        } else {
          console.log("载入结果" + +result.message);
          alert(result.message);
        }
      })
      .catch(e => {
        console.log("读取失败");
        console.log(e);
      });
  },
  methods: {
    handleCheckChange(data, checked, node) {
      this.loading = true;
      console.log("loading..." + this.loading);
      if (checked == true) {
        this.checkedId = data.businessId;
        this.checkedType = data.type;
        this.$refs.treeForm.setCheckedNodes([data]);
        console.log(
          "当前类型：" + this.checkedType + ",ID：" + data.businessId
        );
        if (this.checkedType === 0) {
          this.$api
            .get({
              url: "/company/" + this.checkedId
            })
            .then(e => {
              console.log(e.data);
              let result = e.data;
              if (result.code == 200) {
                let com = result.data;
                this.formCom.name = com.CompanyName;
                this.formCom.header = com.Header;
                this.formCom.tel = com.Tel;
                this.formCom.desc = com.CoDesc;
                this.formCom.regDate = com.regDate;
                this.formCom.comType = ["经纪", "物业", "平台", "金融", "代理"][
                  com.ComType - 1
                ];
                this.formCom.id = com.id;
                this.formCom.joinType = [
                  "独资",
                  "合资控股",
                  "合资占股",
                  "特许经营"
                ][com.JoinType - 1];
                this.formCom.region = com.RegionName;
              } else {
                console.log("查询公司详情结果：" + result.message);
                alert(result.message);
              }
            })
            .catch(e => {
              console.log("查询公司详情失败");
              console.log(e);
            })
            .finally(e => {
              this.loading = false;
            });
        } else if (this.checkedType === 1) {
          let params = { id: this.checkedId };
          this.$api
            .post({
              url: "/department/detail",
              data: params,
              qs: true
            })
            .then(e => {
              console.log(e.data);
              let result = e.data;
              if (result.code == 200) {
                let data = result.data;
                this.formDep.id = data.id;
                this.formDep.name = data.name;
                this.formDep.depType = ["支持线", "业务线"][data.depType - 1];
                this.formDep.isCom = ["运营期", "拓展期", "未设置"][
                  data.isCom - 1
                ];
                this.formDep.principal = data.principal;
                this.formDep.tel = data.tel;
                this.formDep.add = data.add;
                this.formDep.employeesNum = data.employeesNum;
                this.formDep.store = data.store;
                this.formDep.regDate = data.regDate;
                this.formDep.desc = data.desc;
                this.formDep.coId = data.coId;
              } else {
                console.log("查询详情结果：" + result.message);
                alert(result.message);
              }
            })
            .catch(e => {
              console.log("查询详情失败");
              console.log(e);
            })
            .finally(e => {
              this.loading = false;
            });
        }
      }
    },
    handleNodeClick(data) {},
    loadNode(node, resolve) {},
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeCheck(e, data) {},
    linkJump(jumpName, depId, coId) {
      this.$router.push({
        name: jumpName,
        params: { deptParentID: depId, ParentId: coId, back: "hrTree" }
      });
    },
    linkJumpEdit(type, id) {
      if (type === 0) {
        this.$router.push({
          path: "/sys/editCompanyDetail",
          query: { companyId: id, back: "hrTree" }
        });
      }
      if (type === 1) {
        this.$router.push({
          path: "/sys/editDeptDetail",
          query: { id: id, back: "hrTree" }
        });
      }
    }
  }
};
</script> 