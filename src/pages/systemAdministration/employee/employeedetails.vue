<style lang="less" scoped>
.left-input-container {
  padding: 10px;

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
    <el-form ref="form" :model="DeptEntity" label-width="80px" :inline="true">
      <el-form-item label="姓名:">
        <el-input v-model="employeeEntity.perName" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <img v-if="employeeEntity.userImage" :src="employeeEntity.userImage" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-form-item>
    </el-form>
    
    <div class="left-input-container">
      <span>身份证</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.cardId"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>性别</span>
      <el-select type="text" placeholder="请输入内容" v-model="employeeEntity.sex" readonly="readonly">
        <el-option label="男" :value="0" />
        <el-option label="女" :value="1" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>状态</span>
      <el-select
        type="text"
        placeholder="0实习，1试用，2正式，3离职"
        v-model="employeeEntity.status"
        readonly="readonly"
      >
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
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>学历ID</span>
      <el-select v-model="employeeEntity.education" readonly="readonly" placeholder="请选择">
        <el-option
          v-for="item in educationList"
          :key="item.value"
          :label="item.educationName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="left-input-container">
      <span>专业</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.speciality"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>Email</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.email"
     readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>qq</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.qq"
       
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>电话号码</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.tel"
       readonly="readonly"
       
      ></el-input>
      
    </div>
    <div class="left-input-container">
      <span>生日</span>
      <el-date-picker v-model="employeeEntity.birthday" readonly="readonly" type="date" placeholder="选择日期"></el-date-picker>
    </div>

    <div class="left-input-container">
      <span type="info" size="small" style="margin-top: 4px;">选择部门</span>  
      <el-input type="text" v-model="employeeEntity.deptName" readonly="readonly" show-word-limit></el-input>
    </div>

    <div class="left-input-container">
      <span>角色</span>
      <el-select
        v-model="employeeEntity.perPost"
        readonly="readonly"
        placeholder="请选择"
      >
        <el-option
          v-for="item in positionNameList"
          :key="item.value"
          :label="item.positionName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="left-input-container">
      <span>岗位</span>
      <el-select
        v-model="employeeEntity.perRole"
       
        readonly="readonly"
        placeholder="请选择"
      >
        <el-option
          v-for="item in roleNameList"
          :key="item.value"
          :label="item.roleName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <div class="left-input-container">
      <span>入职时间</span>
      <el-date-picker v-model="employeeEntity.regTime" readonly="readonly" type="date" placeholder="选择日期"></el-date-picker>
    </div>
    <div class="left-input-container">
      <span>备注</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.remark"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>底薪</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.basicSalary"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>绩效</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.performancePay"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>现居住地邮编</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.zipCode"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>紧急人联系人</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.emergencyContact"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>关系</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.relationship"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>紧急联系人电话号码</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.contactTelephone"
        readonly="readonly"
      ></el-input>
      
    </div>
    <div class="left-input-container">
      <span>现居住地</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.living"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>毕业学校</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.graduateSchool"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>户口所在地邮编</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.residenceCode"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>户口所在地</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.accountAddress"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>银行卡</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.bankcard"
        readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>星级编号</span>
      <el-select
        v-model="employeeEntity.levelNo"
        
        readonly="readonly"
        placeholder="请选择"
      >
        <el-option
          v-for="item in levelNameList"
          :key="item.value"
          :label="item.levelName"
          :value="item.levelNo"
        ></el-option>
      </el-select>
    </div>
    <div class="left-input-container">
      <span>菁英</span>
      <el-select
        type="text"
        placeholder="请选择"
        v-model="employeeEntity.isGold"
        readonly="readonly"
        show-word-limit
      >
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
       readonly="readonly"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>毕业时间</span>
      <el-date-picker v-model="employeeEntity.graduation" type="date" readonly="readonly" placeholder="选择日期"></el-date-picker>
    </div>
    <div class="left-input-container">
      <span>岗位津贴</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="employeeEntity.postAllowance"
        readonly="readonly"
      ></el-input>
    </div>
    
    <div class="left-input-container">
      <span type="info" size="small" style="margin-top: 4px;">介绍人</span>

      <el-input type="text" v-model="employeeEntity.jieShaoName" readonly="readonly"></el-input>
    </div>

    <div class="footerContainer el-top">
     
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
import { TOKEN } from "@/util/constMap";
import getMenuRid from "@/minxi/getMenuRid";
import listPage from "@/components/listPage";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  props: {},
  data() {
    return {
      sidebarFlag: false,
      treeData: [],
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        isLocked: null, //0 查询锁定,1 查询未锁定,2 查询异常用户
        del: 0, //0 查询在职用户,1 查询离职用户,2 查询待离职用户
        type: 0 //0 内部  1 游客
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
      imageUrl: null,
      educationList: null,
      levelNameList: null,
      positionNameList: null,
      roleNameList: null,
      dialogVisible: false,
      dialogVisible1: false,
      employeeEntity: {
        upPerId: null,
        logStr: null,
        accountId: null,
        perName: null,
        cardId: null,
        sex: null,
        status: null,
        address: null,
        education: null,
        speciality: null,
        email: null,
        regTime: null,
        qq: null,
        tel: null,
        birthday: null,
        perDept: null,
        deptName: null,
        perPost: null,
        positionName: null,
        perRole: null,
        roleName: null,
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
        jieShaoNameId: null
      },
      backUrl: null,
      uploadUrl: "",
      myHeader: "",
      jumpNodeId: ""
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
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    back() {
      if (this.backUrl === "hrTree") {
        this.$router.push({
          path: "/sys/hrTree/hrTree",
          query: { cur: this.jumpNodeId }
        });
      } else {
        this.$router.push({ path: "/sys/employeeList" });
      }
    },
   
  },
  created() {
    this.uploadUrl = this.$api.baseUrl() + "/noticeManage/common/picture";
    this.myHeader = { tk: util.localStorageGet(TOKEN) };
    this.id = this.$route.query.id;
    if (this.$route.query.back != null) {
      this.backUrl = this.$route.query.back;
    }
    if (this.$route.query.cur != null) {
      this.jumpNodeId = this.$route.query.cur;
    }
  },
  mounted() {
      debugger;
    let   id = this.$route.params.id;
    this.$api
      .get({
        url: "/employee/" + id,
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.employeeEntity = result.data;
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
