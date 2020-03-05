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
      <span>加入类型 1 直营 2 加盟</span>
      <el-select type="text" placeholder="请输入内容" v-model="companyEntity.JoinType" show-word-limit>
        <el-option label="直营" :value="1" />
        <el-option label="加盟" :value="2" />
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
      <el-select type="text" placeholder="请输入内容" v-model="companyEntity.ComType" show-word-limit>
        <el-option label="经纪" :value="1" />
        <el-option label="物业" :value="2" />
        <el-option label="平台" :value="3" />
        <el-option label="金融" :value="4" />
        <el-option label="代理" :value="5" />
      </el-select>
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
        v-model="companyEntity.CoDesc"
        maxlength="100"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <el-button type="info" @click="getDialogVisible()">设置管辖区域</el-button>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <template>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in regionName" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-dialog>
      <el-input type="text" placeholder="请输入内容" v-model="companyEntity.RegionName" show-word-limit></el-input>
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
      dialogVisible: false,
      companyID: 0,
      companyEntity: null,
      regionName: [],

      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      backUrl: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.regionName : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.regionName.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.regionName.length;
    },
    getDialogVisible() {
      this.dialogVisible = true;
      this.$api
        .get({
          url: "/company/regionName",
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.regionName = result.data;
          } else {
            console.log("载入结果" + +result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("读取失败");
          console.log(e);
        });
    },
    setDialogVisible() {
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.companyEntity.RegionName = this.checkedCities.join(",");
    },
    savecompany() {
      let params = this.companyEntity;
      this.$api
        .put({
          url: "/company/update",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json" }
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
              this.$router.push({ path: "/sys/companyList" });
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
        this.$router.push({ path: "/sys/companyList" });
      }
    }
  },
  created() {
    this.companyId = this.$route.query.companyId;
    if (this.$route.query.back != null) {
      this.backUrl = this.$route.query.back;
    }
  },
  mounted() {
    console.log("准备查询公司详情");
    this.$api
      .get({
        url: "/company/" + this.companyId,
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.companyEntity = result.data;
        } else {
          console.log("查询公司详情结果：" + result.message);
          alert(result.message);
        }
      })
      .catch(e => {
        console.log("查询公司详情失败");
        console.log(e);
      });
  }
};
</script>