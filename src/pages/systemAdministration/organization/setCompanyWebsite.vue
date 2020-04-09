<style lang="less" scoped>
.flex-row {
  display: flex;
  &.flex-row40 {
    /deep/.el-form-item {
      flex: 0 0 40%;
    }
  }
  /deep/.el-form-item {
    flex: 0 0 20%;
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
    }
  }
}
.form-content {
  background: #fff;
  min-height: 100%;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
}
.flex-centent {
  text-align: center;
  padding: 5px 0;
}
</style>
<template>
  <div class="form-content">
    <el-form ref="form"
             :model="setEntity"
             :rules="rules"
             label-width="130px">
      <div class="flex-row">
        <el-form-item label="网站名称:"
                      prop="siteName">
          <el-input v-model="setEntity.siteName"></el-input>
        </el-form-item>
        <el-form-item label="网站网址"
                      prop="siteUrl">
          <el-input v-model="setEntity.siteUrl"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:"
                      prop="sitePhone">
          <el-input v-model="setEntity.sitePhone"></el-input>
        </el-form-item>
        <el-form-item label="联系QQ:"
                      prop="siteQQ">
          <el-input v-model="setEntity.siteQQ"></el-input>
        </el-form-item>
      </div>
      <div class="flex-row">
        <el-form-item label="业务范围"
                      prop="siteKeyWord">
          <el-input v-model="setEntity.siteKeyWord"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:"
                      prop="siteEmail">
          <el-input type="text"
                    v-model="setEntity.siteEmail"></el-input>
        </el-form-item>
        <el-form-item label="备案信息:"
                      prop="siteBah">
          <el-input v-model="setEntity.siteBah"></el-input>
        </el-form-item>
        <el-form-item label="地址"
                      prop="siteAddress">
          <el-input v-model="setEntity.siteAddress"></el-input>
        </el-form-item>
      </div>
      <div class="flex-row">
        <el-form-item label="背景颜色(主)"
                      porp="siteBgColor">
          <el-color-picker v-model="setEntity.siteBgColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景颜色(辅):"
                      porp="siteBgColor2">
          <el-color-picker v-model="setEntity.siteBgColor2"></el-color-picker>
        </el-form-item>
        <el-form-item label="渐变色:"
                      porp="siteBgColor3">
          <el-color-picker v-model="setEntity.siteBgColor3"></el-color-picker>
        </el-form-item>
        <el-form-item label="备用色:"
                      porp="siteBgColor4">
          <el-color-picker v-model="setEntity.siteBgColor4"></el-color-picker>
        </el-form-item>
      </div>
      <div class="flex-row flex-row40">
        <el-form-item label="logo(主页):">
          <el-upload :action="uploadUrl"
                     :limit='1'
                     :on-exceed="exceed"
                     :headers="header"
                     :on-preview="preview"
                     :show-file-list="true"
                     list-type="picture-card"
                     :before-upload="beforeAvatarUpload"
                     :on-success="resultImgNane('siteLogo')">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="大图Logo:">
          <el-upload :action="uploadUrl"
                     :limit='1'
                     :on-preview="preview"
                     :on-exceed="exceed"
                     :headers="header"
                     :show-file-list="true"
                     list-type="picture-card"
                     :before-upload="beforeAvatarUpload"
                     :on-success="resultImgNane('sitebLogo')">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="flex-row flex-row40">
        <el-form-item label="中图Logo:">
          <el-upload :action="uploadUrl"
                     :limit='1'
                     :on-preview="preview"
                     :on-exceed="exceed"
                     :headers="header"
                     :show-file-list="true"
                     list-type="picture-card"
                     :before-upload="beforeAvatarUpload"
                     :on-success="resultImgNane('sitemLogo')">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="默认头像:">
          <el-upload :action="uploadUrl"
                     :limit='1'
                     :on-preview="preview"
                     :on-exceed="exceed"
                     :headers="header"
                     :show-file-list="true"
                     list-type="picture-card"
                     :before-upload="beforeAvatarUpload"
                     :on-success="resultImgNane('siteHeadImg')">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="flex-row flex-row40">
        <el-form-item label="网站描述:">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    v-model="setEntity.siteTitle"></el-input>
        </el-form-item>
      </div>
      <div class="flex-row flex-row40">
        <el-form-item label="关于我们:">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入内容"
                    v-model="setEntity.siteInfo"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="footerContainer el-top">
      <el-button type="primary"
                 @click="saveSiteInfo()">确定</el-button>
      <el-button type="primary"
                 @click="back()">返回</el-button>
    </div>
    <el-image-viewer v-if="showViewer"
                     :on-close="()=>{this.showViewer = false  }"
                     :url-list="[dialogImageUrl]">
    </el-image-viewer>
  </div>
</template>

<script>
import util from "@/util/util";
import { TOKEN } from "@/util/constMap";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: {
    ElImageViewer
  },
  data() {
    return {
      uploadUrl: "",
      header: {},
      rules: {
        siteUrl: [
          {
            pattern: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
            message: "请输入正确的网站网址",
            trigger: "change"
          }
        ],
        sitePhone: [
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "change"
          }
        ],
        siteQQ: [
          {
            pattern: /^[1-9][0-9]{4,10}$/,
            message: "请输入正确的qq",
            trigger: "change"
          }
        ],
        siteEmail: [
          {
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            message: "请输入正确的邮箱",
            trigger: "change"
          }
        ]
      },
      setEntity: {
        siteName: "",
        siteUrl: "",
        sitePhone: "",
        siteQQ: "",
        siteKeyWord: "",
        siteEmail: "",
        siteBah: "",
        siteAddress: "",
        siteBgColor: "",
        siteBgColor2: "",
        siteBgColor3: "",
        siteBgColor4: "",
        siteTitle: "",
        siteInfo: "",
        siteLogo: "",
        sitebLogo: "",
        sitemLogo: "",
        siteHeadImg: ""
      },
      showViewer: false,
      dialogImageUrl: ""
    };
  },
  created() {
    this.uploadUrl = this.$api.baseUrl() + "/noticeManage/common/picture";
    this.header = { tk: util.localStorageGet(TOKEN) };
  },
  methods: {
    back() {
      this.$router.push({ path: "/sys/companyList" });
    },
    saveSiteInfo() {
      let params = this.setEntity;
      params.companyid = this.$route.query.companyId;
      this.$api
        .post({
          url: "/company/saveSiteInfo",
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
            this.$router.push({ path: "/sys/companyList" });
            console.log(result.data);
            this.$message({ message: result.message });
          }
        })
        .catch(e => {
          console.log("添加失败");
          console.log(e);
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      return isJPG;
    },
    resultImgNane(ImgName) {
      return function(res, file) {
        if (res.code == 200) {
          this.setEntity[ImgName] = res.data.url;
        }
      }.bind(this);
    },
    preview(file) {
      if (file.response.code == 200) {
        this.dialogImageUrl = file.response.data.url;
        this.showViewer = true;
      }
    },
    exceed() {
      this.$message.error("超出上传上限");
    }
  }
};
</script>

