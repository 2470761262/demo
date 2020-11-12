<style lang="less" scoped>
.page-form-inline {
  display: flex;
  /deep/.el-input-group__append {
    color: #606266;
    background: none;
    border: none;
  }
}
.page-form-inarea {
  border: 1px solid #f2f2f2;
  padding-left: 10px;
  padding-top: 10px;
  margin-bottom: 20px;
}
.page-form-tips {
  height: 50px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 20px;
  line-height: 50px;
  font-size: 16px;
}
.item-before-top {
  padding: 20px 0;
  font-size: 18px;
}
.dividingLine {
  height: 1px;
  background: #c0c4cc;
  width: 10px;
  align-self: center;
  margin: 0 10px 20px;
}
/deep/.is-bordered {
  margin-left: 0 !important;
}
.marLeft20 {
  margin-left: 20px;
  flex-shrink: 0;
}
.content-warp {
  min-height: 100%;
  background: #fff;
  padding: 0 50px;
}
.text-center {
  padding: 10px 0;
  margin-bottom: 30px;
}
.set-el-textarea {
  width: 500px;
  /deep/.el-form-item {
    width: 100%;
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
}

.form-error-tips {
  position: relative;
}
.item-before-col {
  text-align: center;
  margin-left: 10px;
  color: var(--color--primary);
}
.margin-left_20 {
  margin-left: 20px;
}
.el-form-item {
  text-align: right;
}
</style>
<template>
  <div class="content-warp">
    <div class="page-form-tips">
      Tips：新增表后就创建看板就方便多了！
    </div>
    <el-form
      ref="form"
      :rules="rules"
      @submit.native.prevent
      :model="form"
      label-width="80px"
    >
      <div class="page-form-inline">
        <el-form-item label="表名" prop="dispalyname">
          <el-input
            placeholder="请输入表名"
            v-model="form.tablename"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="表中文名"
          prop="dispalycode"
          class="margin-left_20"
        >
          <el-input
            placeholder="请输入表中文名"
            v-model="form.tablecname"
          ></el-input>
        </el-form-item>
      </div>
      <div class="page-form-inarea" prop="columninfo">
        <div
          class="page-form-inline "
          v-for="(columnitem, index) in columninfo"
          :key="'字段' + index"
        >
          <el-form-item label="字段名称">
            <el-input
              placeholder="请输入字段名称"
              v-model="columnitem.column"
            ></el-input>
          </el-form-item>
          <el-form-item label="字段注释">
            <el-input
              placeholder="请输入字段注释"
              v-model="columnitem.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据类型">
            <el-input
              placeholder="数据类型只读"
              v-model="columnitem.dataType"
            ></el-input>
          </el-form-item>
          <el-form-item label="字段备注">
            <el-input
              placeholder="请输入字段备注"
              v-model="columnitem.remark"
            ></el-input>
          </el-form-item>
          <div
            v-if="index == 0"
            slot="append"
            data-anchor="新增看板展示字段添加 => click"
            @click="addColunmInfo"
            class="item-after item-before-col anchor-point"
          >
            <i class="el-icon-circle-plus-outline"></i>
            <div>添加</div>
          </div>
          <div
            v-if="index"
            slot="append"
            data-anchor="新增看板展示字段删除 => click"
            @click="removeColunmInfo(index)"
            class="item-after item-before-col anchor-point"
          >
            <i class="el-icon-remove-outline"></i>
            <div>删除</div>
          </div>
        </div>
      </div>
      <el-button type="primary" :disabled="buttonDisable" @click="apply()"
        >申请</el-button
      >
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import getMenuRid from "@/minxi/getMenuRid";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  mixins: [getMenuRid],
  data() {
    return {
      rules: {
        tablename: [
          { required: true, message: "表名不能为空", trigger: "blur" }
        ],
        tablecname: [
          { required: true, message: "楼栋名称不能为空", trigger: "blur" }
        ]
      },
      form: {
        id: 0,
        tablename: "",
        tablecname: ""
      },
      columninfo: [
        {
          column: "",
          name: "",
          dataType: "",
          remark: ""
        }
      ],
      selectPageColumn: {
        // 栋座
        list: [],
        loading: false
      },
      selectPageTable: {
        // 楼栋
        list: [],
        loading: false
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      buttonDisable: false
    };
  },
  mounted() {
    let that = this;
    var id = JSON.parse(that.$route.query.id);
    if (!id) {
      return;
    }
    that.getDetail(id);
  },
  methods: {
    getDetail(id) {
      let that = this;
      return this.$apiReport
        .get({
          url: "/xjwreport/table/info/" + id, //带权限
          qs: true,
          token: false
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            that.form.id = data.data.id;
            that.form.tablename = data.data.tablename;
            that.form.tablecname = data.data.tablecname;
            that.columninfo = JSON.parse(data.data.columninfo);
            //this.$forceUpdate();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //展示字段更改事件
    remoteColumninfoChange(index, e) {
      if (!e) {
        this.columninfo[index].dataType = "";
        this.columninfo[index].name = "";
        this.columninfo[index].remark = "";
        return;
      }
      let item = this.selectPageColumn.list.find(item => {
        return item.column == e;
      });
      this.columninfo[index].dataType = item.dataType;
      this.columninfo[index].name = item.name;
      this.columninfo[index].remark = item.remark;
    },
    addColunmInfo() {
      this.columninfo.push({
        column: "",
        name: "",
        dataType: "",
        remark: ""
      });
    },
    removeColunmInfo(index) {
      this.columninfo.splice(index, 1);
    },
    apply() {
      var that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          let columninfo = that.columninfo.filter(item => {
            return item.column !== "";
          });
          if (!columninfo || columninfo.length == 0) {
            this.$message({
              type: "warning",
              message: "展示字段不能为空，请重新提交!"
            });
            return;
          }
          let data = {
            id: that.form.id, //id
            tablename: that.form.tablename, //名称
            tablecname: that.form.tablecname, //名称
            columninfo: JSON.stringify(columninfo) //字段信息
          };
          this.$apiReport
            .post({
              url: "/xjwreport/table/fetch",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              token: false,
              // qs: true,
              data: JSON.stringify(data)
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.$router.push({ path: "/report/reportTableList" });
              } else {
                this.$message.error("操作失败!");
              }
            });
        }
      });
    }
  }
};
</script>
