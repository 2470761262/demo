<style lang="less" scoped>
.elTree {
  width: 20%;
  margin-right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
  overflow-x: auto;
  background: #fff;
  /deep/.el-tree-node__children {
    overflow: visible;
  }
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

.el-textarea {
  width: 80%;
}

.treeSearch {
  width: 100%;
}

// .elTreeChange {
//   width: 60%;
//   float: right;
// }
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="treeSearch"></el-input>
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
          empty-text="暂无数据，请检查权限"
          auto-expand-parent
          :default-expanded-keys="curNodeId"
          :default-checked-keys="curNodeId"
          v-loading="treeLoading"
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
        <el-form
          ref="formDep"
          :model="formDep"
          v-show="checkedType===1||checkedType===2"
          label-width="100px"
        >
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
      <div
        class="elInfo"
        v-show="checkedType===1||checkedType===2"
        v-loading="loading"
        :style="contentStyleObj"
      >
        <div v-for="(item) in this.employeeData" :key="item.AccountID">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.PerName}}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="setPhone(item.AccountID)"
              >手机备案</el-button>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="resetPwd(item.AccountID)"
              >密码重置</el-button>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="userHandle('change',item.AccountID,item.PerName,item.DeptName,item.PerPost,item.Deptid,item.PerPostid,item.PerRole,item.LevelNo,item.IsGold)"
              >人员异动</el-button>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="userHandle('appoint',item.AccountID,item.PerName,item.DeptName,item.PerPost,item.Deptid,item.PerPostid,item.PerRole,item.LevelNo,item.IsGold)"
              >任命</el-button>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="userLock(item.AccountID)"
              >锁定</el-button>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="userHandle('quit',item.AccountID,item.PerName,item.DeptName,item.PerPost,item.Deptid,item.PerPostid,item.PerRole,item.LevelNo,item.IsGold)"
              >离职</el-button>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="userJumpEdit(item.AccountID)"
              >修改</el-button>
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
                <td>{{item.RoleName}}</td>
                <td>部门：</td>
                <td>{{item.DeptName}}</td>
              </tr>
              <tr>
                <td>角色权限：</td>
                <td>{{item.PerPost}}</td>
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
                  <el-image :src="item.WXImgUrl"></el-image>
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
                  <!-- <tr>
                    <td>医保：</td>
                    <td>{{item.YiBaoId==-1?"暂无":item.YiBaoId}}</td>
                    <td>社保：</td>
                    <td>{{item.SheBaoId==-1?"暂无":item.SheBaoId}}</td>
                  </tr>-->
                  <tr>
                    <td>生日：</td>
                    <td>{{item.Birthday!=null&&item.Birthday.length>10?item.Birthday.substring(0,10):item.Birthday}}</td>
                    <td>学历：</td>
                    <td>{{item.Education}}</td>
                  </tr>
                  <tr>
                    <td>专业：</td>
                    <td colspan="3">{{item.Speciality}}</td>
                  </tr>
                  <tr>
                    <td>毕业学校：</td>
                    <td colspan="3">{{item.GraduateSchool}}</td>
                  </tr>
                  <tr>
                    <td>毕业时间：</td>
                    <td colspan="3">{{item.Graduation}}</td>
                  </tr>
                  <tr>
                    <td>户口所在地：</td>
                    <td colspan="3">{{item.Address}}</td>
                  </tr>
                  <tr>
                    <td>现居地：</td>
                    <td colspan="3">{{item.Living}}</td>
                  </tr>
                  <tr>
                    <td>紧急联系人：</td>
                    <td>{{item.EmergencyContact}}（{{item.Relationship}}）</td>
                    <td>联系电话：</td>
                    <td>{{item.contactTelephone}}</td>
                  </tr>
                  <tr>
                    <td>基础底薪：</td>
                    <td>{{item.BasicSalary}}</td>
                    <td>绩效薪酬：</td>
                    <td>{{item.performancePay}}</td>
                  </tr>
                  <tr>
                    <td>岗位津贴：</td>
                    <td colspan="3">{{item.PostAllowance}}</td>
                  </tr>
                  <tr>
                    <td>银行卡号：</td>
                    <td colspan="3">{{item.Bankcard}}</td>
                  </tr>
                  <tr>
                    <td>离职时间：</td>
                    <td colspan="3">{{item.LeaveTime}}</td>
                  </tr>
                  <tr>
                    <td>备注：</td>
                    <td colspan="3">{{item.remark}}</td>
                  </tr>
                </table>
              </el-collapse-item>
            </el-collapse>
          </el-card>
          <br />
        </div>
      </div>
    </template>
    <el-dialog title="离职信息" :visible.sync="dialogQuit" width="33%">
      <el-form>
        <span>{{this.optInfo.name}}-{{this.optInfo.dep}}-{{this.optInfo.job}}</span>
        <br />
        <br />
        <el-form-item label="离职时间">
          <el-date-picker
            v-model="quitPost.time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="离职原因">
          <el-input type="textarea" placeholder="请离职原因" v-model="quitPost.remark" width="100%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQuit = false">取 消</el-button>
        <el-button type="primary" @click="userQuitSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="任命信息" :visible.sync="dialogChange" width="52%">
      <el-form>
        <span>{{this.optInfo.name}}-{{this.optInfo.dep}}-{{this.optInfo.job}}</span>
        <table>
          <tr>
            <td rowspan="4">
              <el-form-item label="调动部门" label-position="right">
                <el-input placeholder="输入关键字进行过滤" v-model="filterTextChange"></el-input>
                <div>
                  <el-tree
                    ref="treeFormChange"
                    :data="treeDataChange"
                    node-key="nodeId"
                    show-checkbox
                    :props="defaultProps"
                    @check-change="handleCheckChangeChange"
                    :highlight-current="true"
                    :filter-node-method="filterNode"
                    check-strictly
                    :action="''"
                    empty-text="暂无数据，请检查权限"
                    auto-expand-parent
                    :default-expanded-keys="curNodeIdChange"
                    :default-checked-keys="curNodeIdChange"
                  ></el-tree>
                </div>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="岗位" label-position="right">
                <!-- <el-select v-model="optInfo.role" filterable placeholder="请选择" :disabled="RoleDis">
                  <el-option
                    v-for="item in postOptions"
                    :key="item.roleID"
                    :label="item.roleName"
                    :value="item.roleID"
                  ></el-option>
                </el-select>-->
                <el-cascader
                  ref="positionTree"
                  @focus="selectPositionList()"
                  @change="selectPositionNode()"
                  :options="positionTree"
                  :props="{
                         label: 'labelName',
                         value: 'businessId',
                         children: 'childrenNodes'
                       }"
                  :show-all-levels="false"
                  :disabled="RoleDis"
                  v-model="optInfo.role"
                ></el-cascader>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="角色权限" label-position="right">
                <!-- <el-select v-model="optInfo.post" filterable placeholder="请选择">
                  <el-option
                    v-for="item in positionNameList"
                    :key="item.id"
                    :label="item.positionName"
                    :value="item.id"
                  ></el-option>
                </el-select>-->
                <el-select v-model="optInfo.post" @focus="selectRoleList()" placeholder="请选择">
                  <el-option
                    v-for="item in positionNameList"
                    :key="item.value"
                    :label="item.positionName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="星级" label-position="right">
                <el-select v-model="optInfo.level" filterable placeholder="请选择">
                  <el-option
                    v-for="item in levelNameList"
                    :key="item.levelNo"
                    :label="item.levelName+'['+item.levelCode+']('+item.companyName+')'"
                    :value="item.levelNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="是否菁英" label-position="right">
                <el-select v-model="optInfo.isGold" placeholder="请选择">
                  <el-option
                    v-for="item in isGoldOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChange = false">取 消</el-button>
        <el-button type="primary" @click="userChangeSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getToken],
  data() {
    return {
      filterText: "",
      filterTextChange: "",
      treeData: [],
      treeDataChange: [],
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
      },
      dialogQuit: false,
      dialogChange: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      optInfo: {
        id: 0,
        name: null,
        dep: null,
        job: null,
        post: null,
        role: null,
        level: null,
        isGold: null,
        fnFrom: null
      },
      quitPost: {
        id: null,
        time: null,
        remark: null
      },
      curNodeId: [],
      curNodeIdChange: [],
      jumpNodeId: null,
      treeLoading: true,
      postOptions: [],
      positionNameList: [],
      levelNameList: [],
      isGoldOptions: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ],
      RoleDis: false,
      checkedIdChange: null,
      checkedTypeChange: null,
      logStr: "",
      positionTree: [],
      currDep: null,
      userChangeData: {
        id: null,
        dep: null,
        post: null,
        level: null,
        role: null,
        isGold: null,
        fnFrom: null
      }
    };
  },
  mounted() {
    //读取树数据
    this.$api
      .post({
        url: "/sys/tree/unit"
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
      .then(() => {
        if (this.$route.query.cur != null) {
          this.curNodeId = [this.$route.query.cur];
          this.$nextTick(() => {
            this.handleCheckChange(
              this.$refs.treeForm.getNode(...this.curNodeId).data,
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
  methods: {
    handleCheckChange(data, checked, node) {
      this.loading = true;
      if (checked == true) {
        this.checkedId = data.businessId;
        this.checkedType = data.type;
        this.$refs.treeForm.setCheckedNodes([data]);
        this.jumpNodeId = data.nodeId;
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
                this.formCom.name = com.companyName;
                this.formCom.header = com.header;
                this.formCom.tel = com.tel;
                this.formCom.desc = com.coDesc;
                this.formCom.regDate = com.regDate;
                this.formCom.comType = ["经纪", "物业", "平台", "金融", "代理"][
                  com.comType - 1
                ];
                this.formCom.id = com.id;
                this.formCom.joinType = [
                  "独资",
                  "合资控股",
                  "合资占股",
                  "特许经营"
                ][com.joinType - 1];
                this.formCom.region = com.regionName;
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
        } else if (this.checkedType === 2) {
          let params = { id: data.parentNodeId.split(",")[0] };
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
              this.userInfo(this.checkedId);
            });
        }
      }
    },
    filterNode(value, data) {
      console.log("value：" + value);
      console.log(data);
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    },
    treeCheck(e, data) {},
    linkJump(jumpName, depId, coId) {
      this.$router.push({
        path: "/sys/" + jumpName,
        query: {
          deptParentID: depId,
          ParentId: coId,
          back: "hrTree",
          cur: this.jumpNodeId
        }
      });
    },
    linkJumpEdit(type, id) {
      if (type === 0) {
        this.$router.push({
          path: "/sys/editCompanyDetail",
          query: { companyId: id, back: "hrTree", cur: this.jumpNodeId }
        });
      }
      if (type === 1) {
        this.$router.push({
          path: "/sys/editDeptDetail",
          query: { id: id, back: "hrTree", cur: this.jumpNodeId }
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
          //let params = { id: id };
          this.$api
            .post({
              url: "/" + type + "/lock",
              data: id,
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
    userInfo(id) {
      let params = { id: id };
      this.$api
        .post({
          url: "/employee/info",
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
    },
    userJumpEdit(id) {
      this.$router.push({
        path: "/sys/editemployee",
        query: { id: id, back: "hrTree", cur: this.jumpNodeId }
      });
    },
    userHandle(
      type,
      id,
      name,
      dep,
      job,
      deptId,
      perPostid,
      roleId,
      level,
      isGold
    ) {
      if (type === "quit") {
        this.dialogQuit = true;
      } else {
        //读取树数据
        this.$api
          .post({
            url: "/sys/tree/unit/noMan"
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              this.treeDataChange = result.data;
              //this.filterTextChange = dep;
              this.curNodeIdChange = [deptId + ",1"];
              this.currDep = deptId;
              console.log("this.currDep", this.currDep);
            } else {
              console.log("载入结果" + +result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("读取失败");
            console.log(e);
          });
        let paramsRole = {};
        paramsRole.keyWord = "";
        this.$api
          .post({
            url: "/role/getRoleName",
            data: paramsRole
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              this.postOptions = result.data;
            } else {
              console.log("查询岗位结果：" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("查询岗位失败");
          });
        this.$api
          .post({
            url: "/sys/position/getPostName",
            data: paramsRole
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              this.positionNameList = result.data;
            } else {
              console.log("查询角色结果：" + result.message);
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("查询角色失败");
          });
        paramsRole.depId = deptId;
        this.$api
          .post({
            url: "/sys/position/getLevelList",
            data: paramsRole,
            qs: true
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              this.levelNameList = result.data;
            } else {
              alert(result.message);
            }
          })
          .catch(e => {
            console.log("查询星级失败");
          });
        if (type === "change") {
          this.dialogChange = true;
          this.RoleDis = true;
          this.optInfo.fnFrom = 1; //0任命，1调动
          this.userChangeData.fnFrom = 1;
        }
        if (type === "appoint") {
          this.dialogChange = true;
          this.RoleDis = false;
          this.optInfo.fnFrom = 0; //0任命，1调动
          this.userChangeData.fnFrom = 0;
        }
        this.userChangeData.id = id;
        this.userChangeData.dep = deptId;
        this.userChangeData.post = perPostid;
        this.userChangeData.level = level + "";
        this.userChangeData.isGold = isGold + "";
        this.userChangeData.role = roleId;
      }
      this.optInfo.id = id;
      this.optInfo.name = name;
      this.optInfo.dep = dep;
      this.optInfo.job = job;
      this.optInfo.post = perPostid;
      this.optInfo.role = roleId;
      //console.log(level);
      this.optInfo.level = level + "";
      this.optInfo.isGold = isGold + "";
      this.checkedIdChange = deptId;
      this.checkedTypeChange = 1;
      this.logStr =
        "[部门ID:" +
        deptId +
        "改成rpl1],[角色ID:" +
        roleId +
        "改成rpl2],[级别编号:" +
        level +
        "改成rpl3],[岗位ID:" +
        perPostid +
        "改成rpl4],[菁英:" +
        isGold +
        "改成rpl5]";
    },
    userQuitSubmit() {
      if (
        this.quitPost.time == null ||
        this.quitPost.time == "" ||
        this.quitPost.remark == null ||
        this.quitPost.remark == ""
      ) {
        this.$message({
          type: "error",
          message: "离职信息请填写完整"
        });
      } else {
        let params = {
          perId: this.optInfo.id,
          UpType: "del",
          upValue: 1,
          leaveMemo: this.quitPost.remark,
          leaveTime: this.quitPost.time
        };
        this.operation(params);
      }
    },
    setPhone(id) {
      this.$confirm("注意！你确定要手机备案？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = { id: id };
          this.$api
            .post({
              url: "/employee/set/phoneTag",
              data: params,
              qs: true
            })
            .then(e => {
              console.log(e.data);
              let result = e.data;
              if (result.code == 200) {
                this.$message({
                  type: "success",
                  message: result.message
                });
              } else {
                this.$message.error(result.message);
              }
            })
            .catch(e => {
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    resetPwd(id) {
      this.$confirm("注意！你确定要重置该用户密码？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = { id: id };
          this.$api
            .post({
              url: "/employee/reset/pwd",
              data: params,
              qs: true
            })
            .then(e => {
              console.log(e.data);
              let result = e.data;
              if (result.code == 200) {
                this.$alert(result.message, "提示", {
                  confirmButtonText: "确定"
                });
              } else {
                this.$message.error(result.message);
              }
            })
            .catch(e => {
              this.$message.error(e.message);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    operation(params) {
      this.$api
        .post({
          url: "/employee/operation",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.dialogQuit = false;
          } else {
            this.$message({
              type: "error",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("失败");
          console.log(e);
        });
    },
    userLock(id) {
      this.$confirm("注意！你确定要锁定该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (id == null || id == "") {
            this.$message({
              type: "error",
              message: "参数出错"
            });
          } else {
            let params = { perId: id, upType: "locked", upValue: 0 };
            this.operation(params);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleCheckChangeChange(data, checked, nodeId) {
      this.leafCheckArr = this.$refs.treeFormChange.getCheckedKeys()
      if (this.leafCheckArr.length < 1) {
        this.checkedTypeChange = null;
        this.$message({
          type: "error",
          message: "请选择部门！"
        });
      }
      if (checked == true) {
        this.checkedIdChange = data.businessId;
        console.log("this.checkedIdChange", this.checkedIdChange);
        this.currDep = data.businessId;
        this.checkedTypeChange = data.type;
        this.$refs.treeFormChange.setCheckedNodes([data]);
        if (this.checkedTypeChange === 1) {
          this.$message({
            type: "success",
            message: "已选择【" + data.labelName + "】"
          });
          this.filterTextChange = null;
        } else {
          this.$message({
            type: "error",
            message: "请选择部门！"
          });
        }
      }
    },
    userChangeSubmit() {
      if (this.checkedTypeChange !== 1) {
        this.$message({
          type: "error",
          message: "请选择部门！"
        });
        return;
      }
      let params = {
        id: this.optInfo.id,
        dep: this.checkedIdChange,
        post: this.optInfo.post,
        level: this.optInfo.level,
        role: this.optInfo.role,
        isGold: this.optInfo.isGold,
        fnFrom: this.optInfo.fnFrom
      };

      if (
        this.userChangeData.id == params.id &&
        this.userChangeData.dep == params.dep &&
        this.userChangeData.post == params.post &&
        this.userChangeData.level == params.level &&
        this.userChangeData.role == params.role &&
        this.userChangeData.isGold == params.isGold &&
        this.userChangeData.fnFrom == params.fnFrom
      ) {
        this.$message({
          type: "error",
          message: "未做变动"
        });
        return;
      }

      this.logStr = this.logStr
        .replace("rpl1", this.checkedIdChange)
        .replace("rpl2", this.optInfo.role)
        .replace("rpl3", this.optInfo.level)
        .replace("rpl4", this.optInfo.post)
        .replace("rpl5", this.optInfo.isGold);
      params.log = this.logStr;
      this.$api
        .post({
          url: "/sys/tree/user/change",
          data: params,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: result.message
            });
            this.dialogChange = false;
          } else {
            this.$message({
              type: "error",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("保存失败");
          console.log(e);
        });
    },
    selectPositionList() {
      let that = this;
      let params = {
        dep: that.currDep
      };
      that.$api
        .post({
          url: "/sys/tree/hr/tree/user/manager",
          data: params,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.positionTree = result.data;
            console.log(that.positionTree);
          } else {
            console.log("查询岗位结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询岗位失败");
        });
    },
    selectPositionNode() {
      let checkedNodes = this.$refs.positionTree.getCheckedNodes();
      //this.employeeEntity.perRole = checkedNodes[0].data.businessId;
      this.perPostReadOnly = false;
      //   this.employeeEntity.positionName = "";
      //   this.employeeEntity.perPost = "";
      this.$forceUpdate();
      this.optInfo.role = checkedNodes[0].data.businessId;
      this.optInfo.post = "";
      this.selectRoleList();
    },
    selectRoleList() {
      let that = this;
      let positionId = that.optInfo.role;
      that.$api
        .get({
          url: "/sys/position/hrTree/list/" + positionId
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.positionNameList = result.data;
            console.log(this.positionNameList);
          } else {
            console.log("查询角色结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询角色失败");
        });
    }
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },

  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  watch: {
    filterText(val) {
      this.$refs.treeForm.filter(val);
    },
    filterTextChange(val) {
      this.$refs.treeFormChange.filter(val);
    }
  }
};
</script>
