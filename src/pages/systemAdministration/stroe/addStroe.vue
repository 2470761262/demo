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
      <span>店面名称</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="StroeEntity.storeName"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>店面地址</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="StroeEntity.shoreAddress"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>电话号码</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="StroeEntity.shoreTel"
        maxlength="100"
        show-word-limit
        @change="verify(StroeEntity.shoreTel)"
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>职务</span>
      <el-select type="text" placeholder="职务" v-model="StroeEntity.flagSale" show-word-limit>
        <el-option label="文职" :value="0" />
        <el-option label="职务" :value="1" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>门店类型</span>
      <el-select type="text" placeholder="门店类型" v-model="StroeEntity.shoreType" show-word-limit>
        <el-option label="加盟店" :value="0" />
        <el-option label="直营店" :value="1" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>开业时间</span>
      <el-input
        type="date"
        placeholder="请输入内容"
        v-model="StroeEntity.regDate"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>描述</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="StroeEntity.storeDesc"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="footerContainer el-top">
      <el-button type="primary" @click="saveStroe()">确定</el-button>
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
      StroeEntity: {
        storeName: null,
        flagSale: null,
        shoreAddress: null,
        shoreTel: null,
        shoreType: null,
        storeDesc: null,
        regDate: null
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    saveStroe() {
      let params = this.StroeEntity;
      this.$api
        .put({
          url: "/stroe/add",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "添加成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/stroeList" });
            console.log(result.data);
            this.$message({ message: result.message });
          }
        })
        .catch(e => {
          console.log("添加失败");
          console.log(e);
        });
    },
    back() {
      this.$router.push({ path: "/sys/stroeList" });
    },
    verify(shoreTel) {
      
      if (!( /^[0-9]*$/ .test(shoreTel))) {
        this.$alert("", "电话号码错误,请重填!!!", {
          dangerouslyUseHTMLString: false
        });
      }
    }
  },
  created() {},
  mounted() {}

};
</script>