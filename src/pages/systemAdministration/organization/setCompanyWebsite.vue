<style lang="less" scoped>
.left-input-container {
  padding: 10px;

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
    <el-form ref="form"  :model="setEntity" label-width="100px">
      <el-form-item label="网站名称:" >
        <el-input v-model="setEntity.siteName"></el-input>
      </el-form-item>
      <el-form-item label="网站网址" >
        <el-input v-model="setEntity.siteUrl"></el-input>
      </el-form-item>  
      <el-form-item label="网站描述:">
        <el-input v-model="setEntity.siteTitle"></el-input>
      </el-form-item>
      <el-form-item label="业务范围" >
        <el-input v-model="setEntity.siteKeyWord"></el-input>
      </el-form-item>  
      <el-form-item label="联系电话:">
        <el-input v-model="setEntity.sitePhone"></el-input>
      </el-form-item>
      <el-form-item label="联系QQ:">
        <el-input v-model="setEntity.siteQQ"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input type="text"  v-model="setEntity.siteEmail"></el-input>
      </el-form-item>
      <el-form-item label="备案信息:">
        <el-input v-model="setEntity.siteBah"></el-input>
      </el-form-item>
      <el-form-item label="地址" >
        <el-input v-model="setEntity.siteAddress"></el-input>
      </el-form-item>
        <div>
       <el-form-item label="logo(主页):" >
        <el-upload
          class="avatar-uploader"
          ref="upLoad"
          :action="uploadUrl"
          :headers="myHeader"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="handleAvatarSuccess">
          <img v-if="setEntity.siteLogo" :src="setEntity.siteLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"  ref="upLoad" ></i>
        </el-upload>
      </el-form-item>       
        </div>
          
      <el-form-item label="背景颜色(主)">
        <el-color-picker v-model="setEntity.siteBgColor"></el-color-picker>
      </el-form-item> 
      <el-form-item label="背景颜色(辅):" >
        <el-color-picker v-model="setEntity.siteBgColor2"></el-color-picker>
      </el-form-item>
      <el-form-item label="渐变色:">
        <el-color-picker v-model="setEntity.siteBgColor3"></el-color-picker>
      </el-form-item>   
      <el-form-item label="备用色:">
        <el-color-picker v-model="setEntity.siteBgColor4"></el-color-picker>
      </el-form-item>
      <el-form-item label="大图Logo:">
        <el-upload
          ref="upLoad1"
          :action="uploadUrl"
          :headers="myHeader"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="handleSuccess">
          <img v-if="setEntity.sitebLogo" :src="setEntity.sitebLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" upLoad1></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="中图Logo:">
        <el-upload
            ref="upLoad2"
          :action="uploadUrl"
          :headers="myHeader"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="handleSuccess2">
          <img v-if="setEntity.sitemLogo" :src="setEntity.sitemLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" upLoad2></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="默认头像">
         <el-upload
           ref="upLoad3"
           :action="uploadUrl"
           :headers="myHeader"
           :show-file-list="false"
           :on-success="handleAvatarSuccess3">        
           <img v-if="setEntity.siteHeadImg" :src="setEntity.siteHeadImg" class="avatar">
           <i v-else class="el-icon-plus avatar-uploader-icon" upLoad3></i>
         </el-upload> 
      </el-form-item> 
      <el-form-item label="首页背景图" >
        <el-upload
        ref="upLoad4"
          :action="uploadUrl"
          :headers="myHeader"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="handleAvatarSuccess4">
          <img v-if="setEntity.loginBackground" :src="setEntity.loginBackground" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" upLoad4></i>
        </el-upload>
    
      </el-form-item>   
      <el-form-item label="关于我们:">
        <el-input type="text" placeholder="请输入内容" v-model="setEntity.siteInfo"></el-input>
      </el-form-item>
    </el-form>
    <div class="footerContainer el-top">
      <el-button type="primary" @click="saveSiteInfo()">确定</el-button>
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
import { TOKEN } from "@/util/constMap";
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  props: {},
  data() {
    return {
      queryData: {
          companyId:null
      },
      dialogVisible: false,
      imageUrl:null,
      uploadUrl: "",
      myHeader: "",
      setEntity:{}

    };
  },
  watch: {},
  computed: {},
  methods: {
    saveSiteInfo() {
      let params = this.setEntity;
      params.companyId = this.queryData.companyId;
      this.$api
            .post({
              url: "/company/saveSiteInfo",
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
    back() {
       this.$router.push({ path: "/sys/companyList" });
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handleAvatarSuccess(res, file){
        console.log(this.uploadUrl)
        console.log(res, file,"handleAvatarSuccess")
        this.setEntity.siteLogo = URL.createObjectURL(file.raw);
    },
    handleSuccess(res, file){
        console.log(res, file,"handleSuccess")
        this.setEntity.sitebLogo = URL.createObjectURL(file.raw);
    },
    handleSuccess2(res, file){
        console.log(res, file,"handleSuccess2")
        this.setEntity.sitemLogo = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file){
        console.log(res, file,"handleAvatarSuccess3")
        this.setEntity.siteHeadImg = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess4(res, file){
        console.log(res, file,"handleAvatarSuccess4")
        this.setEntity.loginBackground = URL.createObjectURL(file.raw);
         console.log(this.setEntity.loginBackground)
    },
  },
  created() {
    this.uploadUrl = this.$api.baseUrl() + "/noticeManage/common/picture";
    this.myHeader = { tk: util.localStorageGet(TOKEN) };
  },
  mounted() {
      
  }
};
</script>
