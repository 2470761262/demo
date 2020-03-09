<style lang="less" scoped>
.left-input-container {
  padding: 10px;
  font-size: 1rem;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-radius: 0.5rem;
  .el-input {
    width: 80%;
  }
  span {
    margin-right: 10px;
    margin-left: 5px;
  }
}
.el-top {
  margin-top: 50px;
}
</style>
<template>
  <div class="wrapper">
    <div class="left-input-container">
            <span>姓名</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.perName"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
        <div class="left-input-container">
            <span>身份证</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.cardId"
              maxlength="100"
              show-word-limit
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
            <span>学历ID</span>
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
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>Email</span>
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
              v-model="employeeEntity.tel"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
      
    <div class="left-input-container">
       <el-button type="info" @click="getDialogVisible()">选择部门</el-button>
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
      <el-select v-model="employeeEntity.position" filter-method @focus="findByParams()"  placeholder="请选择">
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
      <el-input
        type="date"
        placeholder="请输入内容"
        v-model="employeeEntity.regTime"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>备注</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.remark"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>底薪</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.basicSalary"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>绩效</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.performancePay"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>现居住地邮编</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.zipCode"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>紧急人联系人</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.emergencyContact"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>关系</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.relationship"
        maxlength="10"
        show-word-limit
      ></el-input>
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
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.living"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>毕业学校</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.graduateSchool"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>户口所在地邮编</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.residenceCode"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>户口所在地</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.accountAddress"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>银行卡</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.bankcard"
        maxlength="100"
        show-word-limit
      ></el-input>
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
      <span>菁英</span>
      <el-select type="text" placeholder="请选择" v-model="employeeEntity.isGold" show-word-limit>
        <el-option label="默认" :value="0" />
        <el-option label="是" :value="1" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>岗位属性</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.sxId"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>毕业时间</span>
      <el-input
        type="date"
        placeholder="请输入内容"
        v-model="employeeEntity.graduation"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>岗位津贴</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.postAllowance"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <span>头像</span>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="left-input-container">
      <span>介绍人</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.jieShaoName"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>


    <div class="footerContainer el-top">
      <el-button type="primary" @click="saveEmployee()">确定</el-button>
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {},
  props: {},
  data() {
    return {
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      imageUrl:null,
      positionNameList:null,
      roleNameList:null,
      dialogVisible: false,
      employeeEntity: {
        upPerId:null,
        logStr:null,
        accountId: null,
        perName: null,
        cardId: null,
        sex: null,
        status: null,
        address: null,
        education: null,
        speciality: null,
        email: null,
        regTime:null,
        qq: null,
        tel: null,
        birthday: null,
        perDeptId: null,
        deptName:null,
        perPostId: null,
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
        levelNo: null,
        isGold: null,
        sxId: null,
        graduation: null,
        postAllowance: null,
        userImage: null,
        jieShaoName: null,
      },
      backUrl: null
    };
  },
  watch: {},
  computed: {},
  methods: {
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
      let params = {keyWord:null};
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
      let params = {keyWord:null};
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
      let params = {keyWord:null};
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
      let params = {keyWord:null};
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
    saveEmployee() {
      let params = this.employeeEntity;
      params.upPerId = this.id;
      params.logStr = "修改员工基础信息操作";
      this.$api
        .put({
          url: "/employee/update",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "修改成功", {
              dangerouslyUseHTMLString: false
            });
            if (this.backUrl === "hrTree") {
              this.$router.push({ path: "/sys/hrTree/hrTree" });
            } else {
              this.$router.push({ path: "/sys/employeeList" });
            }
            console.log(result.data);
            this.$message({ message: result.message });
          }
        })
        .catch(e => {
          console.log("修改失败");
          console.log(e);
        });
    },
    back() {
      if (this.backUrl === "hrTree") {
        this.$router.push({ path: "/sys/hrTree/hrTree" });
      } else {
        this.$router.push({ path: "/sys/employeeList" });
      }
    },
    iscardId(){
      console.log(this.employeeEntity.cardId);
//debugger;
      if(!/^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2})$/.test(this.employeeEntity.cardId)){
        return false;
      }else{
        return true;
      }
      
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.$route.query.back != null) {
      this.backUrl = this.$route.query.back;
    }
  },
  mounted() {
    this.$api
      .get({
        url: "/employee/" + this.id,
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.employeeEntity = result.data;
          this.employeeEntity.regTime =  new Date(this.employeeEntity.regTime.replace(/-/g, '/'));
          this.employeeEntity.birthday =  new Date(this.employeeEntity.birthday.replace(/-/g, '/'));
        } else {
          console.log("查询用户详情结果：" + result.message);
          alert(result.message);
        }
      })
      .catch(e => {
        console.log("查询用户详情失败");
        console.log(e);
      });
  }
};
</script>
