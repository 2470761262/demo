<template>
  <div class="head-fun-right">
    <el-upload
      action="http://bweb.yongxinjia.com/houseResource/importTel"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-success="importSuccess"
      :headers="uploadHeader"
      list-type="picture">
      <button
        class="btn-primary anchor-point"
        data-anchor="资源库管理一键导入"
      >
        <i class="iconTemplateImport iconfont"></i>
        一键导入
      </button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    <a
      class="btn-primary anchor-point"
      data-anchor="资源库管理模板下载"
      :href="downloadHref"
    >
      <i class="iconTemplateDownload iconfont"></i>
      模板下载
    </a>
  </div>
</template>
<script>
import { TOKEN } from "@/util/constMap";
import util from "@/util/util";
export default {
  data() {
    return {
      uploadHeader: {
        tk: util.localStorageGet(TOKEN)
      },
      downloadHref:"http://bweb.yongxinjia.com/houseResource/template?tk="+util.localStorageGet(TOKEN)
    }
  },
  methods: {
    importSuccess(response, file, fileLis) {
      if (response.code == 200) {
        this.$message({
          message: response.message,
          type: 'success'
        });
      } else {
        this.$message.error(response.message);
      }
    },
    beforeAvatarUpload(file) {
      const isExcel = file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isExcel) {
        this.$message.error('上传文件只能是 excel 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 5MB!');
      }
      return isExcel && isLt2M;
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/pages/customersSystem/addCustomers/less/form.less";
.head-fun-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .btn-primary {
    .btn-primary;
    display: flex;
    align-items: center;
    margin-left: 30px;
    font-size: @font16;
    border-radius: 30px;
    padding-top: 7px;
    padding-bottom: 7px;
    height: auto;
    i {
      font-size: @font16;
      margin-right: 5px;
    }
    &.house-back {
      background: @backgroud;
      color: #fff;
      box-shadow: 0 4px 10px @opacityBackground;
    }
    &:hover {
      text-decoration-line: none;
    }
  }
}
</style>
