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
      Tips：新增看板后就可以查看看板列表信息了！
    </div>
    <el-form
      ref="form"
      :rules="rules"
      @submit.native.prevent
      :model="form"
      label-width="80px"
    >
      <div class="page-form-inline">
        <el-form-item label="看板名称" prop="dispalyname">
          <el-input
            placeholder="请输入看板名称"
            v-model="form.dispalyname"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="看板编码"
          prop="dispalycode"
          class="margin-left_20"
        >
          <el-input
            placeholder="如：NEW_HOUSE_DAILY"
            v-model="form.dispalycode"
          ></el-input>
        </el-form-item>

        <el-form-item label="数据表" prop="tableid" class="margin-left_20">
          <el-select
            data-anchor="选择数据表 => select"
            filterable
            remote
            class="anchor-point"
            :remote-method="remoteTableName"
            data-vv-name="tableid"
            data-vv-as="数据表"
            v-validate="'required'"
            v-model="form.tableid"
            placeholder="请选择数据表"
            @focus="remoteTableNameInput"
            @change="remoteTableNameChange"
            :loading="selectPageTable.loading"
            :disabled="disabled"
          >
            <el-option
              data-anchor="选择数据表 => select => option"
              class="anchor-point"
              v-for="item in selectPageTable.list"
              :key="'数据表' + item.id"
              :label="item.tablecname || item.tablename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="page-form-inarea" prop="columninfo">
        <div
          class="page-form-inline "
          v-for="(columnitem, index) in columninfo"
          :key="'显示字段' + index"
        >
          <el-form-item :label="'展示字段' + (index + 1)" prop="column">
            <el-select
              data-anchor="请选择展示字段 => select"
              filterable
              remote
              class="anchor-point"
              data-vv-name="columinfo"
              data-vv-as="展示字段"
              v-validate="'required'"
              v-model="columnitem.column"
              @change="remoteColumninfoChange(index, $event)"
              :loading="selectPageColumn.loading"
              placeholder="请选择展示字段"
              clearable
            >
              <el-option
                data-anchor="添加展示字段 => select => option"
                class="anchor-point"
                v-for="item in selectPageColumn.list"
                :key="'显示字段' + item.column"
                :label="item.name"
                :value="item.column"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段名称">
            <el-input
              placeholder="请输入字段名称"
              v-model="columnitem.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据类型">
            <el-input
              placeholder="数据类型只读"
              v-model="columnitem.dataType"
              readonly
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
      <div class="page-form-inarea" prop="columninfo">
        <div
          class="page-form-inline "
          v-for="(columnitem, index) in ordercol"
          :key="'展示字段' + index"
        >
          <el-form-item :label="'排序字段' + (index + 1)" prop="column">
            <el-select
              data-anchor="请选择排序字段 => select"
              filterable
              remote
              class="anchor-point"
              data-vv-name="buildingId"
              data-vv-as="排序字段"
              v-validate="'required'"
              v-model="columnitem.column"
              @change="remoteOrderColChange(index, $event)"
              :loading="selectPageColumn.loading"
              placeholder="请选择排序字段"
            >
              <el-option
                data-anchor="添加排序字段 => select => option"
                class="anchor-point"
                v-for="item in selectPageColumn.list"
                :key="item.column"
                :label="item.name"
                :value="item.column"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段名称">
            <el-input
              placeholder="请输入字段名称"
              v-model="columnitem.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序类型">
            <el-select
              data-anchor="请选择排序类型 => select"
              class="anchor-point"
              v-model="columnitem.orderType"
              v-validate="'required'"
              data-vv-name="orderType"
              data-vv-as="排序类型"
              placeholder="请选择排序类型"
            >
              <el-option
                data-anchor="选择排序类型 => select => option"
                class="anchor-point"
                v-for="item in orderType"
                :key="item.label"
                :label="item.title"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <div
            v-if="index == 0"
            slot="append"
            data-anchor="新增看板排序字段添加 => click"
            @click="addOrderCol"
            class="item-after item-before-col anchor-point"
          >
            <i class="el-icon-circle-plus-outline"></i>
            <div>添加</div>
          </div>
          <div
            v-if="index"
            slot="append"
            data-anchor="新增看板排序字段删除 => click"
            @click="removeOrderCol(index)"
            class="item-after item-before-col anchor-point"
          >
            <i class="el-icon-remove-outline"></i>
            <div>删除</div>
          </div>
        </div>
      </div>
      <div class="page-form-inline ">
        <el-form-item label="授权字段" prop="authcol">
          <el-select
            data-anchor="请选择授权字段 => select"
            filterable
            remote
            class="anchor-point"
            data-vv-name="buildingId"
            data-vv-as="授权字段"
            v-validate="'required'"
            v-model="authcol.column"
            @change="remoteAuthColChange"
            :loading="selectPageColumn.loading"
            placeholder="请选择授权字段"
          >
            <el-option
              data-anchor="添加授权字段 => select => option"
              class="anchor-point"
              v-for="item in selectPageColumn.list"
              :key="item.column"
              :label="item.name"
              :value="item.column"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段名称">
          <el-input
            placeholder="请输入字段名称"
            v-model="authcol.name"
          ></el-input>
        </el-form-item>
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
        tableid: [{ required: true, message: "表不能为空", trigger: "change" }],
        tableid: [{ required: true, message: "表不能为空", trigger: "change" }],
        dispalycode: [
          { required: true, message: "编码不能为空", trigger: "blur" }
        ],
        dispalyname: [
          { required: true, message: "楼栋名称不能为空", trigger: "blur" }
        ]
      },
      form: {
        tableid: "",
        dispalyname: "",
        dispalycode: ""
      },
      columninfo: [
        {
          column: "",
          name: "",
          dataType: "",
          remark: ""
        }
      ],
      selectColumn: null,
      ordercol: [
        {
          column: "",
          name: "",
          orderType: ""
        }
      ],
      authcol: {
        column: "",
        name: ""
      },
      orderType: [
        { title: "顺序", label: "asc" },
        { title: "倒序", label: "desc" }
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
      buttonDisable: true
    };
  },
  mounted() {
    let that = this;
    this.$api
      .get({
        url: "/agent_house/nextSaveButton"
      })
      .then(e => {
        e.data.data.functionRuleList.forEach(element => {
          if (element.rUrl == "submitCommReplenish") {
            that.buttonDisable = false;
          }
        });
      })
      .catch(e => {});
  },
  methods: {
    //查询表
    remoteTableName(e) {
      let that = this;
      that.selectPageTable.loading = true;
      this.$apiReport
        .get({
          url: "/xjwreport/table/nameList", //带权限
          data: {
            page: 1,
            limit: 50,
            tablecname: e == undefined ? "" : e.trim()
          },
          qs: true,
          token: false
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            that.selectPageTable.list = data.data;
            that.selectPageTable.loading = false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    remoteTableNameInput() {
      if (this.selectPageTable.list.length == 0) {
        this.remoteTableName();
      }
    },
    //表选择更改事件
    remoteTableNameChange(e) {
      console.log(e);
      this.columninfo = [{ column: "", name: "", dataType: "", remark: "" }];
      this.ordercol = [{ column: "", name: "", orderType: "" }];
      this.authcol = { column: "", name: "" };
      if (!e) {
        this.selectPageColumn.list = [];
        return;
      }
      let findResultIndex = this.selectPageTable.list.findIndex(item => {
        return item.id == e;
      });
      let findResult = this.selectPageTable.list[findResultIndex];
      this.selectPageColumn.list = JSON.parse(findResult.columninfo);
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
    //排序字段更改事件
    remoteOrderColChange(index, e) {
      if (!e) {
        this.ordercol[index].orderType = "";
        this.ordercol[index].name = "";
        this.ordercol[index].remark = "";
        return;
      }
      let item = this.selectPageColumn.list.find(item => {
        return item.column == e;
      });
      this.ordercol[index].orderType = "";
      this.ordercol[index].name = item.name;
      this.ordercol[index].remark = item.remark;
    },
    //授权字段更改事件
    remoteAuthColChange(e) {
      if (!e) {
        this.authcol.name = "";
        return;
      }
      let item = this.selectPageColumn.list.find(item => {
        return item.column == e;
      });
      this.authcol.name = item.name;
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
    addOrderCol() {
      this.ordercol.push({
        column: "",
        name: "",
        orderType: ""
      });
    },
    removeOrderCol(index) {
      this.ordercol.splice(index, 1);
    },
    apply() {
      var that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          let columninfo = that.columninfo.filter(item => {
            return item.column !== "";
          });
          if (!columninfo || columninfo.length == 0) {
            this.$alert("", "展示字段不能为空，请重新提交", {
              dangerouslyUseHTMLString: false
            });
            return;
          }
          let ordercol = that.ordercol.filter(item => {
            return item.column !== "";
          });
          if (!ordercol || ordercol.length == 0) {
            this.$alert("", "排序字段不能为空，请重新提交", {
              dangerouslyUseHTMLString: false
            });
            return;
          }
          if (!that.authcol.column) {
            this.$alert("", "授权字段不能为空，请重新提交", {
              dangerouslyUseHTMLString: false
            });
            return;
          }
          let data = {
            dispalyname: that.form.dispalyname, //名称
            dispalycode: that.form.dispalycode, //编码
            tableid: parseInt(that.form.tableid), //表id
            columninfo: JSON.stringify(columninfo), //材料说明
            ordercol: JSON.stringify(ordercol), //证明材料
            authcol: JSON.stringify(that.authcol) //楼盘补充type默认为4
          };
          this.$apiReport
            .post({
              url: "/xjwreport/displayboard/conf",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              token: false,
              // qs: true,
              data: JSON.stringify(data)
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$alert("", "提交成功", {
                  dangerouslyUseHTMLString: false
                });
                this.$router.push({ path: "/report/reportList" });
              } else {
                this.$alert("", "提交失败，请检查数据或联系管理员！", {
                  dangerouslyUseHTMLString: false
                });
              }
            });
        }
      });
    }
  }
};
</script>
