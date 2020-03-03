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
      <span>岗位名称</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="roleEntity.RoleName"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>岗位描述</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="roleEntity.RoleDesc"
                maxlength="100"
                show-word-limit></el-input>
    </div>

    <div class="footerContainer el-top">
      <el-button type="primary"
                 @click="saveRole()">确定</el-button>
      <el-button type="primary"
                 @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {},
  props: {},
  data () {
    return {
      roleEntity: {        RoleName: null,
        RoleDesc: null      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    saveRole () {
      this.$api.post({
        url: '/role/add',
        data: {          RoleName: this.roleEntity.RoleName,
          RoleDesc: this.roleEntity.RoleDesc
        },
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          this.$alert('', '添加成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/roleManagementList" });
          console.log(result.data);
          this.$message({ message: result.message });
        }
      }).catch((e) => {
        console.log("添加失败");
        console.log(e);
      })
    },
    back () {
      this.$router.push({ path: "/sys/roleManagementList" });
    }
  },
  created () { },
  mounted () { }

};
</script>