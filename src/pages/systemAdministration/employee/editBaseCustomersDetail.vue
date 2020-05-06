<template>
  <div class="wrapper">
    <el-form
      ref="form"
      :model="customersEntity"
      label-width="80px"
      :inline="true"
    >
      <el-form-item label="姓名:">
        <el-input
          v-model="customersEntity.customerName"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="customersEntity.sex" readonly="readonly"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      :model="customersEntity"
      label-width="80px"
      :inline="true"
    >
      <el-form-item label="常用电话:">
        <el-input
          v-model="customersEntity.commonTel"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="customersEntity.iDCard" readonly="readonly">
        </el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      :model="customersEntity"
      label-width="80px"
      :inline="true"
    >
      <el-form-item label="工作:">
        <el-input
          v-model="customersEntity.customerJob"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="收入">
        <el-input v-model="customersEntity.interest" readonly="readonly">
        </el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      :model="customersEntity"
      label-width="80px"
      :inline="true"
    >
      <el-form-item label="添加人:">
        <el-input
          v-model="customersEntity.addName"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="customersEntity.addTime"
          type="date"
          readonly="readonly"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      :model="customersEntity"
      label-width="80px"
      :inline="true"
    >
      <el-form-item label="备注:">
        <el-input v-model="customersEntity.memo" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="客户微信">
        <el-input v-model="customersEntity.openId" readonly="readonly">
        </el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      :model="customersEntity"
      label-width="80px"
      :inline="true"
    >
      <el-form-item label="备用电话:">
        <el-input
          v-model="customersEntity.spareTel"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="备用电话">
        <el-input v-model="customersEntity.spareTel1" readonly="readonly">
        </el-input>
      </el-form-item>
    </el-form>
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
      customersEntity: {
        customerName: null,
        sex: null,
        addName: null,
        commonTel: null,
        iDCard: null,
        customerJob: null,
        interest: null,
        addTime: null,
        memo: null,
        openId: null,
        spareTel: null,
        spareTel1: null
      }
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    let id = this.$route.params.customersId;
    this.$api
      .post({
        url: "/customers/customerById/" + id,
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.data);
          this.customersEntity = result.data;
          console.log(this.tableData);
          switch (this.customersEntity.sex) {
            case 0:
              this.customersEntity.sex = "男";
              break;
            case 1:
              this.customersEntity.sex = "女";
              break;
          }
        } else {
          console.log("查询客户详情结果：" + result.message);
          alert(result.message);
        }
      })
      .catch(e => {
        console.log("查询客户详情失败");
        console.log(e);
      });
  }
};
</script>
