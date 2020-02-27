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
            <span>部门名称</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.deptName"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
        <div class="left-input-container">
            <span>部门名首拼</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.header"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>电话</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.tel"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>开业时间</span>
            <el-input
              type="date"
              placeholder="请输入内容"
              v-model="DeptEntity.regDate"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>部门类型：1综合，2业务，3行政，4联营</span>
            <!-- <el-input
              type="text"
              placeholder="部门类型：1综合，2业务，3行政，4联营"
              v-model="DeptEntity.deptType"
              maxlength="100"
              show-word-limit
            ></el-input> -->
            <el-select type="text" placeholder="1综合，2业务，3行政，4联营" v-model="DeptEntity.deptType" show-word-limit >
              <el-option label="综合" :value="1" />
              <el-option label="业务" :value="2" />
              <el-option label="行政" :value="3" />
              <el-option label="联营" :value="4" />
            </el-select>
        </div>
        <div class="left-input-container">
            <span>部门编码</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.deptCode"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>负责人id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.managerPer"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
           <div class="left-input-container">
            <span>加入类型   1 直营 2 加盟</span>
            <!-- <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.joinType"
              maxlength="100"
              show-word-limit
            ></el-input> -->
            <el-select type="text" placeholder="请输入内容" v-model="DeptEntity.joinType" show-word-limit >
              <el-option label="直营" :value="1" />
              <el-option label="加盟" :value="2" />
            </el-select>
        </div>
        <div class="left-input-container">
            <span>地址</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.address"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>部门描述</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.deptDesc"
              maxlength="100"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>公司id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.coId"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>父级id</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="DeptEntity.deptParentID"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>
        <div class="left-input-container">
            <span>是否区域部门</span>
            <el-input
              type="text"
              placeholder="0 否,1 是"
              v-model="DeptEntity.isArea"
              maxlength="10"
              show-word-limit
            ></el-input>
        </div>

        <div class="footerContainer el-top">
          <el-button type="primary" @click="saveDept()">确定</el-button>
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
        DeptEntity:{    id:null,
                        deptName:null ,
                        header:null,
                        tel:null,
                        joinType:null,
                        deptCode:null,
                        regDate:null,
                        comType:null,
                        managerPer:null,
                        address:null,
                        deptDesc:null,
                        isArea:null}
    };
  },
  watch: {},
  computed: {},
  methods: {
      saveDept() {
        let params = this.DeptEntity;
      this.$api.put({
        url: '/department/update',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) =>{
          let result = e.data;
        if(result.code == 200){
            console.log(result.message);
              this.$alert('', '修改成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/DeptManageList"});
          console.log(result.data);
          this.$message({message:result.message});
        }
      }).catch((e) => {
        console.log("修改失败");
        console.log(e);
      })
  },
      back(){
        this.$router.push({ path: "/sys/DeptManageList"});
      }
  },
   created() {
      this.id=this.$route.query.id;
  },
  mounted() {
        console.log("准备查询部门详情");
        debugger;
          this.$api.get({
        url: '/department/'+this.id,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.DeptEntity=result.data;
        } else {
          console.log("查询部门详情结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询部门详情失败");
        console.log(e);
      }) 
  }

};
</script>