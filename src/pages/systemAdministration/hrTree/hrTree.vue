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
  height: 500px;
  overflow: scroll;
}

.el-form-item {
  margin-bottom: 0;
}

table {
  width: 100%;
  border-color: Black;
  border-style: dotted;
  border-width: 0px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  margin: 0;
  padding: 0;
  border-spacing: 0;
  text-align: center;
}
td {
  border-color: Black;
  border-style: dotted;
  border-width: 0px;
  border-top-width: 1px;
  border-left-width: 1px;
  padding: 0;
  height: 28px;
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
            <el-button type="text" @click="lock('company',formCom.id)" :underline="false">锁定</el-button>
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
            <el-button type="text" @click="lock('department',formDep.id)" :underline="false">锁定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="elInfo" v-show="checkedType===1" v-loading="loading" :style="contentStyleObj">
        <div v-for="(item) in this.employeeData" :key="item.AccountID">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.PerName}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">离职</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">锁定</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">任命</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">人员异动</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">密码重置</el-button>
              <el-button style="float: right; padding: 3px 0" type="text">手机备案</el-button>
            </div>
            <table>
              <tr>
                <td>账号：</td>
                <td>{{item.LoginUser}}</td>
                <td>账号状态：</td>
                <td>{{["帐号锁定","正常","三天未登录锁定","三天未带看锁定"][item.islocked]}}</td>
              </tr>
              <tr>
                <td>姓名：</td>
                <td>{{item.PerName}}</td>
                <td>性别：</td>
                <td>{{["男","女"][item.sex]}}</td>
              </tr>
              <tr>
                <td>电话：</td>
                <td>{{item.Tel}}</td>
                <td>身份证号：</td>
                <td>{{item.CardId}}</td>
              </tr>
              <tr>
                <td>岗位：</td>
                <td>{{item.PerPost}}</td>
                <td>部门：</td>
                <td>{{item.DeptName}}</td>
              </tr>
              <tr>
                <td>角色权限：</td>
                <td>{{item.RoleName}}</td>
                <td>星级：</td>
                <td>{{item.levelName}}[{{item.LevelCode}}]</td>
              </tr>
              <tr>
                <td>是否菁英：</td>
                <td>{{["否","菁英经纪人","未设置"][item.IsGold==null?3:item.IsGold]}}</td>
                <td>引进人：</td>
                <td>{{item.JieShaoName}}</td>
              </tr>
              <tr>
                <td>微信昵称：</td>
                <td colspan="2">{{item.nickname}}</td>
                <td>
                  <el-image style="width: 100px; height: 100px" :src="item.wxImgUrl"></el-image>
                </td>
              </tr>
              <tr>
                <td>入职时间：</td>
                <td>{{item.Regtime}}</td>
                <td>在职状态：</td>
                <td>（{{["实习","试用","正式","离职","其他"][item.Status==null?4:item.Status]}}）-{{["在职","离职","待离职","待审核","异常状态","未知状态"][item.Del==null?5:(item.Del==-2?4:item.Del)]}}</td>
              </tr>
            </table>
            <br />
            <el-collapse class="box-card" accordion>
              <el-collapse-item title="more" name="1">
                <table>
                  <tr>
                    <td>医保：</td>
                    <td>{{item.nickname}}</td>
                    <td>社保：</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>生日：</td>
                    <td>{{item.nickname}}</td>
                    <td>学历：</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>专业：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>毕业学校：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>毕业时间：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>户口所在地：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>现居地：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>毕业时间：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>紧急联系人：</td>
                    <td>{{item.nickname}}</td>
                    <td>联系电话：</td>
                    <td>{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>基础底薪：</td>
                    <td>{{item.nickname}}</td>
                    <td>绩效薪酬：</td>
                    <td>{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>岗位津贴：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>银行卡号：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>离职时间：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                  <tr>
                    <td>备注：</td>
                    <td colspan="3">{{item.nickname}}</td>
                  </tr>
                </table>
              </el-collapse-item>
            </el-collapse>
          </el-card>
          <br />
        </div>
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
      loading: false,
      employeeData: [],
      contentStyleObj: {
        height: ""
      }
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
              this.employee(this.checkedId);
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
    },
    lock(type, id) {
      this.$confirm("确实锁定？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          let params = { id: id };
          this.$api
            .post({
              url: "/" + type + "/lock",
              data: params,
              qs: true
            })
            .then(e => {
              let result = e.data;
              this.$message({
                type: "info",
                message: result.message
              });
            })
            .catch(e => {
              console.log("失败");
              console.log(e);
            })
            .finally(e => {
              this.loading = false;
              this.$router.go(0);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    employee(id) {
      let params = { id: id };
      this.$api
        .post({
          url: "/employee/dep/list",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            let data = result.data;
            this.employeeData = data;
          }
        })
        .catch(e => {
          console.log("查询失败");
          console.log(e);
        })
        .finally(e => {
          this.loading = false;
        });
    },
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 140 + "px";
    }
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },

  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  }
};
</script> 