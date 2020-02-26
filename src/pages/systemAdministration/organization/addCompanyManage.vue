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
            <span>公司名称</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.CompanyName"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
        <div class="left-input-container">
            <span>公司名首拼</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.Header"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>电话</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.Tel"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>加入类型   1 直营 2 加盟</span>
            <el-select type="text" placeholder="请输入内容" v-model="companyEntity.joinType" show-word-limit >
              <el-option  :value="1" />
              <el-option  :value="2" />
            </el-select>
        </div>
        <div class="left-input-container">
            <span>开业时间</span>
            <el-input
              type="date"
              placeholder="请输入内容"
              v-model="companyEntity.RegDate"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>公司类型</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.ComType"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>负责人id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.managerPer"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>地址</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.Address"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>公司描述</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.CompanyDesc"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>父级id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="companyEntity.ParentId"
              maxlength="10"
              disabled="true"
              show-word-limit
            ></el-input>
        </div>

        <div class="footerContainer el-top">
          <el-button type="primary" @click="savecompany()">确定</el-button>
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
        companyEntity:{ CompanyName:null ,
                        Header:null,
                        Tel:null,
                        JoinType:null,
                        RegDate:null,
                        ComType:null,
                        managerPer:null,
                        Address:null,
                        CompanyDesc:null,
                        ParentId:null,
                        deptParentId:null}
    };
  },
  watch: {},
  computed: {},
  methods: {
      savecompany() {
         let params = this.companyEntity;
      this.$api.post({
        url: '/company/add',
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
          this.$router.push({ path: "/sys/companyList"});
          console.log(result.data);
          this.$message({message:result.message});
        }
      }).catch((e) => {
        console.log("添加失败");
        console.log(e);
      })
  },
      back(){
        this.$router.push({ path: "/sys/companyList"});
      }
  },
  created() {},
  mounted() {
    if (this.$route.params.ParentId != null){
      this.companyEntity.ParentId = this.$route.params.ParentId;
      this.companyEntity.deptParentId = this.$route.params.ParentId;
    }
  }

};
</script>