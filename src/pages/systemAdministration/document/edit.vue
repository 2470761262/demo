<style lang="less" scoped>
.elTree {
  width: 20%;
  margin-right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
}

.elControl {
  width: 60%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
}
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        <el-tree ref="treeForm"
                 :data="treeData"
                 :default-expanded-keys="defaultCheckedKeys"
                 :default-checked-keys="defaultCheckedKeys"
                 node-key="businessId"
                 show-checkbox
                 :props="defaultProps"
                 @check-change="handleCheckChange"
                 :highlight-current="true"
                 :filter-node-method="filterNode"
                 check-strictly
                 :action="''"></el-tree>
      </div>
    </template>
    <div class="elControl">
      <el-input placeholder="请在组织结构树选择所属单位"
                v-model="unitName"
                :disabled="true">
        <template slot="prepend">所属单位</template>
      </el-input>
      <el-input placeholder="请输入标题"
                v-model="title">
        <template slot="prepend">标题</template>
      </el-input>
      <el-upload class="upload"
                 drag
                 :http-request="uploadFile"
                 :limit="1"
                 :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <el-input type="textarea"
                autosize
                placeholder="请输入备注"
                v-model="remark"></el-input>
      <el-button type="success"
                 @click="saveData"
                 plain>确定</el-button>
      <el-button type="primary"
                 @click="$router.back(-1)"
                 plain>取消</el-button>
    </div>
  </div>
</template>
<script>
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      checkedId: null,
      unitName: "",
      checkedType: null,
      title: "",
      remark: "",
      oldId: 0,
      ipStr: "",
      fileStr: "",
      picName: "",
      fileList: [],
      defaultCheckedKeys: null
    };
  },
  mounted () {
    //读取树数据
    this.$api
      .post({
        url: "/sys/account/company/tree",
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.treeData = result.data;
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
  methods: {
    handleCheckChange (data, checked, node) {
      if (checked == true) {
        this.checkedId = data.businessId;
        this.checkedType = data.type;
        this.$refs.treeForm.setCheckedNodes([data]);
        console.log(data.businessId);
        this.unitName = data.labelName;
      }
    },
    handleNodeClick (data) { },
    loadNode (node, resolve) { },
    filterNode (value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeCheck (e, data) { },
    saveData () {
      let that = this;
      if (
        that.checkedId == null ||
        that.checkedId <= 0 ||
        that.checkedType == null
      ) {
        that.$message({
          message: "请在组织结构树选择单位",
          type: "warning"
        });
        return;
      }
      if (that.title.length <= 0) {
        that.$message({
          message: "请输入标题",
          type: "warning"
        });
        return;
      }
      if (
        that.ipStr.length <= 0 ||
        that.fileStr.length <= 0 ||
        that.picName.length <= 0
      ) {
        that.$message({
          message: "请上传文件",
          type: "warning"
        });
        return;
      }
      let oldId = that.oldId;
      let params = {
        id: oldId,
        title: that.title,
        ipStr: that.ipStr,
        fileStr: that.fileStr,
        picName: that.picName,
        remark: that.remark,
        unitId: that.checkedId,
        unitType: that.checkedType
      };
      this.$api
        .post({
          url: "/document/save",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
          } else {
            console.log("保存结果：" + result.message);
          }
          //   alert(result.data);
          this.$message({
            type: "info",
            message: result.data
          });
          this.$router.push({ path: "/sys/document/list" });
        })
        .catch(e => {
          console.log("保存失败");
          console.log(e);
        });
    },
    uploadFile (uploader) {
      let that = this;
      let formData = new FormData();
      formData.append("picClass", uploader.filename);
      formData.append("file", uploader.file);
      this.$api
        .post({
          url: "/document/upload",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
          onUploadProgress: progressEvent => {
            let percent =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            uploader.onProgress({ percent: percent });
          }
        })
        .then(json => {
          uploader.onSuccess();
          console.log(json.data.data, "json.data.data");
          let data = json.data.data;
          that.ipStr = data.ipStr;
          that.fileStr = data.fileStr;
          that.picName = data.picName;
        })
        .catch(() => {
          that.$message({
            message: json.data.message,
            type: "warning"
          });
          uploader.onError();
        });
    }
  },
  created () {
    this.oldId = this.$route.query.id;
    console.log("传过来的id：" + this.oldId);
    if (typeof this.oldId === "undefined") {
      return;
    } else if (this.oldId != 0) {
      let params = { id: this.oldId };
      this.$api
        .post({
          url: "/document/detail",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            let data = result.data;
            this.title = data.title;
            if (data.DepId != null && data.DepId > 0) {
              this.checkedId = data.DepId;
              this.checkedType = 1;
            } else {
              this.checkedId = data.Coid;
              this.checkedType = 0;
            }
            this.remark = data.remark;
            this.ipStr = data.IpStr;
            this.fileStr = data.FileStr;
            this.picName = data.PicName;
            this.fileList = [
              {
                name: this.picName,
                url: this.ipStr + this.fileStr + this.picName
              }
            ];
            this.defaultCheckedKeys = [this.checkedId];
          } else {
            console.log("查询文档详情结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询文档详情失败");
          console.log(e);
        });
    }
  }
};
</script>