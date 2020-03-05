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
      <span>部门名称</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="DeptEntity.deptName"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>部门名首拼</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="DeptEntity.header"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>电话</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="DeptEntity.tel"
                maxlength="100"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>开业时间</span>
      <el-input type="date" placeholder="请输入内容" v-model="DeptEntity.regDate" show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>部门类型</span>
      <el-select type="text"
                 placeholder="1综合，2业务，3行政，4联营"
                 v-model="DeptEntity.deptType"
                 show-word-limit>
        <el-option label="综合" :value="1" />
        <el-option label="业务" :value="2" />
        <el-option label="行政" :value="3" />
        <el-option label="联营" :value="4" />
      </el-select>
      <el-select type="text"
                 placeholder="是否片区"
                 v-model="DeptEntity.isArea"
                 show-word-limit>
        <el-option label="是片区" :value="1" />
        <el-option label="不是片区" :value="0" />
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
      <span>负责人</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="DeptEntity.managerPer"
                maxlength="100"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>加入类型</span>
      <el-select type="text"
                 placeholder="请输入内容"
                 v-model="DeptEntity.joinType"
                 show-word-limit>
        <el-option label="直营" :value="1" />
        <el-option label="加盟" :value="2" />
        <el-option label="联营" :value="3" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>部门属性</span>
      <el-select type="text"
                 placeholder="请输入内容"
                 v-model="DeptEntity.joinType"
                 show-word-limit>
        <el-option label="运营期" :value="1" />
        <el-option label="拓展期" :value="2" />

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

    <div class="footerContainer el-top">
      <el-button type="primary" @click="saveDept()">确定</el-button>
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
      DeptEntity: {
        deptName: null,
        header: null,
        tel: null,
        joinType: null,
        regDate: null,
        deptType: null,
        deptCode: null,
        managerPer: null,
        address: null,
        deptDesc: null,
        coId: null,
        deptParentID: null,
        isArea: null,
        isCom : null,
        backUrl: null
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    saveDept() {
      let params = this.DeptEntity;
      this.$api
        .post({
          url: "/department/add",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "添加成功", {
              dangerouslyUseHTMLString: false
            });
            if (this.backUrl === "hrTree") {
              this.$router.push({ path: "/sys/hrTree/hrTree" });
            } else {
              this.$router.push({ path: "/sys/deptManageList" });
            }
            console.log(result.data);
            this.$message({ message: result.message });
          }
        })
        .catch(e => {
          debugger;
          console.log("添加失败");
          console.log(e);
        });
    },
    back () {
      this.$router.push({ path: "/sys/DeptManageList" });
    }
  },
  created () { },
  mounted () {
    console.log(this.$route.params.ParentId,this.$route.params.deptParentID )
    if (this.$route.params.ParentId != null) {
      this.DeptEntity.coId = this.$route.params.ParentId;
      this.DeptEntity.deptParentID = 0;
    }
    if (this.$route.params.deptParentID != null) {
      this.DeptEntity.coId = this.$route.params.ParentId;
      this.DeptEntity.deptParentID = this.$route.params.deptParentID;
    }
    if (this.$route.params.back != null) {
      this.backUrl = this.$route.params.back;
    }
    console.log(this.DeptEntity.coId ,this.DeptEntity.deptParentID )
  }

};
</script>
