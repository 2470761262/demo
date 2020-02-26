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
.el-top{
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
            <span>身份证id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.cardId"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>性别：0男，1女</span>
            <el-select type="text" placeholder="请输入内容" v-model="employeeEntity.sex" show-word-limit >
              <el-option :label="男" :value="0" />
              <el-option :label="女" :value="1" />
            </el-select>
        </div>
        <div class="left-input-container">
            <span>状态：0实习，1试用，2正式，3离职</span>
            <el-select type="text" placeholder="0实习，1试用，2正式，3离职" v-model="employeeEntity.status" show-word-limit >
              <el-option :label="实习" :value="0" />
              <el-option :label="试用" :value="1" />
              <el-option :label="正式" :value="2" />
              <el-option :label="离职" :value="3" />
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
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.education"
              maxlength="100"
              show-word-limit
            ></el-input>
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
              maxlength="10"
              show-word-limit
            ></el-input>
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
        <!-- <div class="left-input-container">
            <span>是否锁住：0 锁定，1正常，2三天未登录锁定，3三天未带看锁定</span>
            <el-select type="text" placeholder="是否锁住：0 锁定，1正常，2三天未登录锁定，3三天未带看锁定" v-model="employeeEntity.isLocked" show-word-limit >
              <el-option :label="锁定" :value="0" />
              <el-option :label="正常" :value="1" />
              <el-option :label="三天未登录锁定" :value="2" />
              <el-option :label="三天未带看锁定" :value="3" />
            </el-select>
        </div> -->
        <div class="left-input-container">
            <span>部门id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.perDeptId"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>

        <div class="left-input-container">
            <span>角色id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.perPostId"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>岗位ID</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.perRole"
              maxlength="10"
              show-word-limit
            ></el-input>
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
            <span>remark</span>
            <el-input
              type="备注"
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
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.contactTelephone"
              maxlength="10"
              show-word-limit
            ></el-input>
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
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>星级编号</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.levelNo"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>是否菁英：0默认，1是</span>
            <el-select type="text" placeholder="请选择" v-model="employeeEntity.isGold" show-word-limit >
              <el-option :value="0" />
              <el-option :value="1" />
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
            <span>头像</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.userImage"
              maxlength="10"
              show-word-limit
            ></el-input>
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
        <div class="left-input-container">
            <span>社保ID</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.sheBaoId"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>医保ID</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="employeeEntity.yiBaoId"
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
export default {
  components: {},
  props: {},
  data() {
    return {
        employeeEntity:{   
                        perName:null ,
                        cardId:null ,
                        sex:null ,
                        status:null ,
                        address:null ,
                        education:null ,
                        speciality:null ,
                        email:null ,
                        qq:null ,
                        tel:null ,
                        birthday:null ,
                        perDeptId:null ,
                        perPostId:null ,
                        perRole:null ,
                        remark:null ,
                        basicSalary:null ,
                        performancePay:null ,
                        zipCode:null ,
                        emergencyContact:null ,
                        relationship:null ,
                        contactTelephone:null ,
                        living:null ,
                        graduateSchool:null ,
                        residenceCode:null ,
                        accountAddress:null ,
                        bankcard:null ,
                        levelNo:null ,
                        isGold:null,
                        sxId:null,
                        graduation:null,
                        postAllowance:null,
                        userImage:null,
                        jieShaoName:null,
                        sheBaoId:null,
                        yiBaoId:null
                        }
    };
  },
  watch: {},
  computed: {},
  methods: {
      saveEmployee() {
         let params = this.employeeEntity;
      this.$api.post({
        url: '/employee/add',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      }).then((e) =>{
          let result = e.data;
        if(result.code == 200){
            console.log(result.message);
              this.$alert('', '添加成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/employeeList"});
          console.log(result.data);
          this.$message({message:result.message});
        }
      }).catch((e) => {
        console.log("添加失败");
        console.log(e);
      })
  },
      back(){
        this.$router.push({ path: "/sys/employeeList"});
      }
  },
  created() {
    this.employeeEntity.isGold = 0;
  },
  mounted() {}

};
</script>