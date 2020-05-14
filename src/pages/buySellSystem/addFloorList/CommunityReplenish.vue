<style lang="less" scoped>
.page-form-inline {
  display: flex;
  /deep/.el-input-group__append {
    color: #606266;
    background: none;
    border: none;
  }
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
</style>
<template>
  <div class="content-warp">
    <div class="page-form-tips">
      Tips：楼盘信息补充成功后，管理员将尽快进行审核！
    </div>
    <el-form
      ref="form"
      :rules="rules"
      @submit.native.prevent
      :model="form"
      label-width="80px"
      label-position="left"
    >
      <div class="page-form-inline">
        <el-form-item label="楼盘名称" prop="communityName">
          <el-input
            placeholder="请输入楼盘名称"
            v-model="form.communityName"
          ></el-input>
        </el-form-item>
      </div>

      <div class="page-form-inline">
        <el-form-item label="楼栋" prop="comBuildingName">
          <el-input
            placeholder="请输入楼栋名称"
            v-model="form.comBuildingName"
          ></el-input>
        </el-form-item>
      </div>

      <div class="page-form-inline">
        <el-form-item label="房间号" prop="buildIngHouses">
          <el-input
            placeholder="请输入房间号"
            v-model="form.buildIngHouses"
          ></el-input>
        </el-form-item>
      </div>

      <!-- <div class="page-form-inline set-el-textarea">
        <el-form-item label="审核类型" prop="type">
          <el-select
            v-model="form.type"
            placeholder="类型"
            class="set-select150"
            clearable
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="page-form-inline set-el-textarea">
        <el-form-item label="对应数值" prop="value">
          <el-input placeholder="" v-model="form.value"></el-input>
        </el-form-item>
      </div> -->

      <div class="page-form-inline set-el-textarea">
        <el-form-item label="材料说明" prop="ReplenishRemark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="请输入材料说明"
            :maxlength="300"
            show-word-limit
            v-model="form.ReplenishRemark"
          ></el-input>
        </el-form-item>
      </div>
      <div class="set-el-textarea">
        <el-form-item label="材料说明" prop="prove">
          <el-upload
            drag
            :on-preview="handlePreview"
            :limit="9"
            name="1"
            action
            :before-upload="beforeAvatarUpload"
            :http-request="uploadSectionFile"
            :on-remove="removeImg"
            :file-list="form.proveImg"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <div class="text-center">
            最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600
          </div>
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
  mixins: [getMenuRid],
  data() {
    return {
      rules: {
        prove: [
          { required: true, message: "证明材料不能为空", trigger: "change" }
        ],
        communityName: [
          { required: true, message: "楼盘名称不能为空", trigger: "blur" }
        ],
        comBuildingName: [
          { required: true, message: "楼栋名称不能为空", trigger: "blur" }
        ],
        buildIngHouses: [
          { required: true, message: "房间号不能为空", trigger: "blur" }
        ],
        ReplenishRemark: [
          { required: true, message: "材料说明不能为空", trigger: "blur" }
        ]
      },
      form: {
        type: "",
        communityName: "",
        comBuildingName: "",
        buildIngHouses: "",
        ReplenishRemark: "",
        proveImg: [],
        prove: []
      },
      typeOptions: [
        {
          value: "0",
          label: "材料"
        },
        {
          value: "1",
          label: "面积"
        },
        {
          value: "2",
          label: "房型"
        },
        {
          value: "3",
          label: "业主号码"
        }
      ],

      dialogImageUrl: "",
      dialogVisible: false,
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
    handlePreview(file) {
      this.dialogImageUrl = file.url; // file.url;
      this.dialogVisible = true;
      this.showFlag = true;
    },
    beforeAvatarUpload(file) {
      // 上传图片前处理函数
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      let that = this;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是jpg,jpeg 格式!");
      }
      return isJPG;
    },
    uploadSectionFile(uploader) {
      let that = this;
      let formData = new FormData();
      formData.append("picClass", uploader.filename);
      formData.append("draftid", 1);
      formData.append("file", uploader.file);
      this.$api
        .post({
          url: "/draft-house/picture",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
          onUploadProgress: progressEvent => {
            //静读条
            let percent =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            uploader.onProgress({ percent: percent });
          }
        })
        .then(json => {
          uploader.onSuccess();
          let data = json.data.data;
          that.form.proveImg.push({
            name: data.id,
            url: data.url,
            id: data.id
          });
          that.form.prove.push(data.url);
          this.$refs["form"].validateField("prove");
        })
        .catch(() => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
          uploader.onError();
        });
    },
    removeImg(file) {
      if (file.id) {
        this.form.proveImg = this.form.proveImg.filter(item => {
          return item.url != file.url;
        });
        this.form.prove = this.form.prove.filter(item => {
          return item != file.url;
        });
        this.$refs["form"].validateField("prove");
        this.$api.delete({
          url: `/draft_house/picture/${file.id}`,
          qs: true,
          data: {
            url: file.url
          }
        });
      }
    },
    apply() {
      var that = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api
            .get({
              url: "/CommunityReplenish/add",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              token: false,
              qs: true,
              data: {
                communityName: that.form.communityName, //楼盘名称
                comBuildingName: that.form.comBuildingName, //楼栋名称
                buildIngHouses: that.form.buildIngHouses, //房间号
                ReplenishRemark: that.form.ReplenishRemark, //材料说明
                proveImg: that.form.prove.join(","), //证明材料
                type: 4 //楼盘补充type默认为4
              }
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$alert("", "补充楼盘申请提交成功，请尽快进行审核", {
                  dangerouslyUseHTMLString: false
                });
                this.$router.push({ path: "/buySellSystem/addHouse" });
              } else {
                this.$alert("", "补充楼盘提交失败，请重新提交", {
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
