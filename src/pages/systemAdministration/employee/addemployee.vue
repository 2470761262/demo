<style lang="less" scoped>

.left-input-container {
  padding: 10px;

  border-radius: 0rem;
  .el-input {
    width: 80%;
  }
  span {
    margin-right: 10px;
    margin-left: 5px;
  }
}
.el-top{
    margin-top: 50px;
}
</style>
<template>
  <div class="wrapper">
          <div class="left-input-container">
            <span>登录账号</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.loginUser"
          
              show-word-limit
            ></el-input>
          </div>
            <div class="left-input-container">
            <span>密码</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.loginPwd"
              
              show-word-limit
            ></el-input>
          </div>
          <div class="left-input-container">
            <span>重复密码</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.loginPwd"
           
              show-word-limit
            ></el-input>
          </div>
           <div class="left-input-container">
            <span>姓名</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.perName"
           
              show-word-limit
            ></el-input>
          </div>
        <div class="left-input-container">
            <span>身份证</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.cardId"
              @change="iscardId()"
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>性别</span>
            <el-select type="text" placeholder="请输入内容" v-model="employeeEntity.sex" show-word-limit >
              <el-option label="男" :value="0" />
              <el-option label="女" :value="1" />
            </el-select>
        </div>
        <div class="left-input-container">
            <span>状态</span>
            <el-select type="text" placeholder="0实习，1试用，2正式，3离职" v-model="employeeEntity.status" show-word-limit >
              <el-option label="实习" :value="0" />
              <el-option label="试用" :value="1" />
              <el-option label="正式" :value="2" />
              <el-option label="离职" :value="3" />
            </el-select>
        </div>
        <div class="left-input-container">
            <span>现居住地址</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.address"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>学历</span>
             <el-select v-model="employeeEntity.education" filter-method @focus="findByParams4()"  placeholder="请选择">
            <el-option
              v-for="item in educationList"
              :key="item.value"
              :label="item.educationName"
              :value="item.id">
            </el-option>
          </el-select>
         
        </div>
        <div class="left-input-container">
            <span>专业</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.speciality"
            ></el-input>
      
        </div>
        <div class="left-input-container">
            <span>邮箱</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.email"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>qq</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.qq"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>电话号码</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.tel"
              data-vv-name="tel"
              data-vv-as="电话号码"
              v-validate="'required|phone'"></el-input>
              {{errorBags.first('tel')}}
        </div>
        <div class="left-input-container">
            <span>生日</span>
            <el-input
              type="date"
              placeholder="birthday"
              v-model="employeeEntity.birthday"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
    <div class="left-input-container">
       <el-button type="info" @click="getDialogVisible()" size="small" style="margin-top: 4px;">选择部门</el-button>
       <el-dialog title="请选择:" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
          <template>
            <div class="elTree">
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
       </el-dialog>
      <el-input type="text" v-model="employeeEntity.deptName" show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>角色</span>
          <el-select v-model="employeeEntity.perPost" filter-method @focus="findByParams()" @change="initposition()"  placeholder="请选择">
            <el-option
              v-for="item in positionNameList"
              :key="item.value"
              :label="item.positionName"
              :value="item.id">
            </el-option>
          </el-select>
    </div>
    <div class="left-input-container">
      <span>岗位</span>
       <el-select v-model="employeeEntity.perRole" filter-method @focus="findByParams1()"  placeholder="请选择">
            <el-option
              v-for="item in roleNameList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
    </div>

    <div class="left-input-container">
      <span>入职时间</span>
      <el-input type="date"
                placeholder="请输入内容"
                v-model="employeeEntity.regTime"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>备注</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.remark"
               
                ></el-input>
    </div>
    <div class="left-input-container">
      <span>底薪</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.basicSalary"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>绩效</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.performancePay"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>现居住地邮编</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.zipCode"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>紧急人联系人</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.emergencyContact"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>关系</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.relationship"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>紧急联系人电话号码</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.contactTelephone"
                data-vv-name="tel"
                data-vv-as="电话号码"
                v-validate="'required|phone'"
      ></el-input>
               {{errorBags.first('tel')}}
    </div>
    <div class="left-input-container">
      <span>现居住地</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.living"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>毕业学校</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.graduateSchool"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>户口所在地邮编</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.residenceCode"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>户口所在地</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.accountAddress"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>银行卡</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.bankcard"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>星级编号</span>
      <el-select v-model="employeeEntity.levelNo" filter-method @focus="findByParams2()"  placeholder="请选择">
            <el-option
              v-for="item in levelNameList"
              :key="item.value"
              :label="item.levelName"
              :value="item.levelNo">
            </el-option>
          </el-select>
    </div>
    <div class="left-input-container">
      <span>是否菁英</span>
      <el-select type="text"
                 placeholder="请选择"
                 v-model="employeeEntity.isGold"
                 show-word-limit>
        <el-option label="默认" :value="0" />
        <el-option label="是" :value="1" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>岗位属性</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.sxId"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>毕业时间</span>
      <el-input type="date"
                placeholder="请输入内容"
                v-model="employeeEntity.graduation"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>岗位津贴</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.postAllowance"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :headers="myHeader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <span>头像</span>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="left-input-container">
      <!-- <span>介绍人</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="employeeEntity.jieShaoName"
                maxlength="10"
                show-word-limit></el-input> -->
      <el-button type="info" @click="getDialogVisible1()" size="small" style="margin-top: 4px;">介绍人</el-button>
       <el-dialog title="请选择:" :visible.sync="dialogVisible1" width="50%" :before-close="handleClose">
          <list-page :parentData="$data"
          highlight-current-row
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @current-change="handleChange"  >
              <template v-slot:tableColumn="cell">
                <template v-for="item in cell.tableData">
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :key="item.prop"
                  ></el-table-column>
                </template>
            </template>
          </list-page>
       </el-dialog>
      <el-input type="text" v-model="employeeEntity.jieShaoName" show-word-limit></el-input>
    </div>
    

    <div class="footerContainer el-top">
      <el-button type="primary"
                 @click="saveEmployee()">确定</el-button>
      <el-button type="primary"
                 @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
import { TOKEN } from '@/util/constMap';
import listPage from "@/components/listPage";
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  props: {},
  data () {
    return {
      sidebarFlag:false,
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        isLocked:null, //0 查询锁定,1 查询未锁定,2 查询异常用户
        del:0 ,//0 查询在职用户,1 查询离职用户,2 查询待离职用户
        type:0 //0 内部  1 游客
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 5 //每页条数
      },
      tableDataColumn: [],
      currentRow: null,
      tableData: [],
      imageUrl:null,
      positionNameList:null,
      levelNameList:null,
      educationList:null,
      roleNameList:null,
      dialogVisible: false,
      dialogVisible1:false,
      employeeEntity: {
        loginUser:null,
        loginPwd:null,
        perName: null,
        cardId: null,
        sex: null,
        status: null,
        address: null,
        education: null,
        educationName:null,
        speciality: null,
        email: null,
        qq: null,
        tel: null,
        birthday: null,
        perDept: null,
        deptName:null,
        perPost: null,
        positionName:null,
        perRole: null,
        roleName:null,
        remark: null,
        basicSalary: null,
        performancePay: null,
        zipCode: null,
        emergencyContact: null,
        relationship: null,
        contactTelephone: null,
        living: null,
        graduateSchool: null,
        residenceCode: null,
        accountAddress: null,
        bankcard: null,
        levelName:null,
        levelNo: null,
        isGold: null,
        sxId: null,
        graduation: null,
        postAllowance: null,
        userImage: null,
        jieShaoName: null,
        jieShaoNameId:null,
      },
      uploadUrl: "",
      myHeader: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    getDialogVisible1(){
      this.dialogVisible1 = true;
       this.getPrincipal(1);
       this.tableDataColumn = [
        { prop: "perName", label: "姓名" },
        { prop: "deptName", label: "部门" },
        { prop: "companyName", label: "公司" },
        { prop: "positionName", label: "岗位" },
        ]
    },
    getPrincipal(currentPage){
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      params.coId = 0;
      params.type = 0;
      params.del = 0;
      params.isLocked =this.employeeEntity.isLocked;
      this.$api.post({
        url: '/employee/selectPrincipal',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);

          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;
          this.tableData = result.data.list;

        } else {
          console.log("查询负责人列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询负责人列表失败");
        console.log(e);
      })
    },
  
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.employeeEntity.userImage = this.imageUrl;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      findByParams4 () {
      let params = null;
      if (this.employeeEntity.education != null && this.employeeEntity.education != "") {
        params.keyWord = this.employeeEntity.education;
      }
      this.$api
        .get({
          url: "/employee/getConfigEducation",
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            //debugger;
            this.educationList = result.data;
            console.log(this.educationList);
          } else {
            console.log("查询学历结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询学历失败");
        });
    },
      findByParams2 () {
      let params = null;
      if (this.employeeEntity.levelName != null && this.employeeEntity.levelName != "") {
        params.keyWord = this.employeeEntity.levelName;
      }
      this.$api
        .post({
          url: "/sys/position/getLevelNoList",
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            //debugger;
            this.levelNameList = result.data;
            console.log(this.levelNameList);
          } else {
            console.log("查询星级结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询星级失败");
        });
    },
    findByParams1 () {
      let params = null;
      if (this.employeeEntity.roleName != null && this.employeeEntity.roleName != "") {
        params.keyWord = this.employeeEntity.roleName;
      }
      this.$api
        .post({
          url: "/role/getRoleName",
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            //debugger;
            this.roleNameList = result.data;
            console.log(this.roleNameList);
          } else {
            console.log("查询岗位结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询岗位失败");
        });
    },
    findByParams () {
      let params = null;
      if (this.employeeEntity.positionName != null && this.employeeEntity.positionName != "") {
        params.keyWord = this.employeeEntity.positionName;
      }
      this.$api
        .post({
          url: "/sys/position/getPostName",
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            //debugger;
            this.positionNameList = result.data;
            console.log(this.positionNameList);
          } else {
            console.log("查询角色结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询角色失败");
        });
    },
    checkChange (e, data, childData) {
      console.log(e, data, childData, "checkChange");
    },
    treeCheck (e, data) {
       if (e.type == 1) {
        this.$api.get({
          url: '/department/' + e.businessId,
          token: false
        }).then((e) => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.employeeEntity.perDeptId = result.data.id;
            this.employeeEntity.deptName = result.data.deptName;
          } else {
            console.log("查询部门详情结果：" + result.message);
            alert(result.message);
          }
        }).catch((e) => {
          console.log("查询部门详情失败");
          console.log(e);
        })
      }else{
        this.$alert("", "请选择一个部门节点!!!", {
          dangerouslyUseHTMLString: false
        });
      }
      console.log(e, data, "check..");
    },
    //树输入筛选
    filterNode (value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getDialogVisible() {
      this.dialogVisible = true;
      this.getDept();
    },
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      //this.employeeEntity.perDeptId =null ;
      //this.employeeEntity.deptName = null ;
    },
    getDept(){
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
          console.log("载入结果" + + result.message);
          alert(result.message);
        }
      })
      .catch(e => {
        console.log("读取失败");
        console.log(e);
      });
    },
    saveEmployee () {
      
      if(this.iscardId()){
        if(/^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.employeeEntity.tel)){
           this.employeeEntity.birthday=this.employeeEntity.birthday.toLocaleString();
           this.employeeEntity.regTime=this.employeeEntity.regTime.toLocaleString();
           this.employeeEntity.graduation=this.employeeEntity.graduation.toLocaleString();
           let params = this.employeeEntity;
           this.$api.post({
             url: '/employee/add',
             data: params,
             token: false,
             headers: { "Content-Type": "application/json;charset=UTF-8" }
           }).then((e) => {
             let result = e.data;
             if (result.code == 200) {
               console.log(result.message);
               this.$alert('', '添加成功', {
                 dangerouslyUseHTMLString: false
               });
               this.$router.push({ path: "/sys/employeeList" });
               console.log(result.data);
               this.$message({ message: result.message });
             }
           }).catch((e) => {
             console.log("添加失败");
             console.log(e);
           })
        }else{
            this.$alert("","请填写正确的电话号码!!!", {
              dangerouslyUseHTMLString: false
            });
        }
      }else{
          this.$alert("","请填写正确的身份证号!!!", {
              dangerouslyUseHTMLString: false
            });
        }
     
    },
    back () {
      this.$router.push({ path: "/sys/employeeList" });
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.getPrincipal(1);
    },
    handleCurrentChange (val) {
      this.getPrincipal(val);
    },
    handleChange(row){
    console.log(row);
    this.employeeEntity.jieShaoName = row.perName;
    this.employeeEntity.jieShaoNameId = row.accountId;
    },
    iscardId(){
      console.log(this.employeeEntity.cardId);
//debugger;
      if(!/^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2})$/.test(this.employeeEntity.cardId)){
        return false;
      }else{
         if(!/^([1-9]{1})(\d{14}|\d{18})$/.test(this.employeeEntity.bankcard)){
           return false;
        }else{
        return true;
        }
      }
      
    },
  },
  created () {
    this.uploadUrl = this.$api.baseUrl() + "/noticeManage/common/picture";
    this.myHeader = { tk: util.localStorageGet(TOKEN) };
    this.employeeEntity.isGold = 0;
  },
  mounted () { }

};
</script>
