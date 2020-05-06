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
    <div>
      <el-form ref="form" :model="personLogEntity" label-width="80px" :inline="true">
        <el-form-item label="姓名:">
          <el-input v-model="personLogEntity.perName" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="personLogEntity.deptName" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="personLogEntity" label-width="80px" :inline="true">
        <el-form-item label="操作人:">
          <el-input v-model="personLogEntity.addName" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="变动时间">
          <el-input v-model="personLogEntity.logDate" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="personLogEntity" label-width="80px" :inline="true">
        <el-form-item label="异动类型:">
          <el-input v-model="personLogEntity.fnFrom" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-input v-model="personLogEntity.tag" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="personLogEntity" label-width="80px" :inline="true">
        <el-form-item label="审核人:">
          <el-input v-model="personLogEntity.checkName" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-input v-model="personLogEntity.checkTime" readonly="readonly"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column
          v-for="item in tableDataColumn"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.prop"
        ></el-table-column>
      </el-table>
    </template>
    <div class="footerContainer el-top" v-show="this.ttag===0">
      <el-button type="primary" @click="savepersonLog(1)">通过</el-button>
      <el-button type="primary" @click="savepersonLog(-1)">不通过</el-button>
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
      tableDataColumn: [
        { prop: "Key", label: "标题" },
        { prop: "OldName", label: "原信息" },
        { prop: "Name", label: "异动后信息" }
      ],
      tableData: [],
      personLogEntity: {
        accountID: null,
        addMemo: null,
        addName: null,
        addPer: null,
        addPerName: null,
        checkName: null,
        checkNameId: null,
        checkTime: null,
        companyName: null,
        deptName: null,
        fnFrom: null,
        logDate: null,
        logId: null,
        logInfo: null,
        logJson: null,
        logPerId: null,
        logPerName: null,
        logType: null,
        perName: null,
        tag: null
      },
      ttag: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    savepersonLog(tag) {
      this.$confirm("确定" + (tag === 1 ? "通过" : "不通过") + "？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let updateStr = "";
          this.tableData.forEach(element => {
            updateStr += element["KeyName"] + "^" + element["Id"] + "$";
          });
          console.log(updateStr);
          let params = {
            id: this.personLogEntity.logId,
            updateStr: updateStr,
            tag: tag,
            account: this.personLogEntity.accountID
          };
          this.$api
            .post({
              url: "/personLog/hrEmp/logCheck",
              data: params,
              qs: true
            })
            .then(e => {
              console.log(e.data);
              let result = e.data;
              if (result.code == 200) {
                this.$message({
                  type: "success",
                  message: result.message
                });
              } else {
                this.$message({
                  type: "error",
                  message: result.message
                });
              }
            })
            .catch(e => {
              console.log(e);
            })
            .finally(e => {
              this.pageLoad();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    pageLoad() {
      let id = this.$route.query.PersonLogId;
      this.$api
        .post({
          url: "/personLog/logList/" + id,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.data);
            this.personLogEntity = result.data;

            this.tableData = result.data.logJson.data;
            console.log("this.tableData", this.tableData);
            this.ttag = this.personLogEntity.tag;
            switch (this.personLogEntity.tag) {
              case 0:
                this.personLogEntity.tag = "未审核";
                break;
              case 1:
                this.personLogEntity.tag = "通过";
                break;
              case -1:
                this.personLogEntity.tag = "不通过";
                break;
            }
            switch (this.personLogEntity.fnFrom) {
              case 0:
                this.personLogEntity.fnFrom = "任命";
                break;
              case 1:
                this.personLogEntity.fnFrom = "调动";
                break;
            }
          } else {
            console.log("查询异动详情结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询异动详情失败");
          console.log(e);
        });
    }
  },
  created() {},
  mounted: function() {
    this.pageLoad();
  }
};
</script>
