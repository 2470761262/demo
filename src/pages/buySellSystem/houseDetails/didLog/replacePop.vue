<style lang="less" scoped>
.replace-content {
  display: flex;
  margin-top: 30px;
  align-items: center;
  .replace-left {
    .replace-left-row {
      margin-top: 30px;
      &:first-child {
        margin-top: 0px;
      }
      display: flex;
      align-items: center;
      h3 {
        margin-right: 20px;
        font-weight: normal;
        font-size: 15px;
      }
      .raido-group {
        margin-top: 0;
        .raido-group-label {
          margin-bottom: 0;
          span {
            font-size: 15px;
          }
          i::before {
            width: 5px;
            height: 5px;
            margin-right: 5px;
          }
        }
      }
      .replace-select {
        width: 120px;
        & + .replace-select {
          margin-left: 20px;
        }
        /deep/.el-input__icon {
          line-height: 27px;
        }
        /deep/.el-input__inner {
          height: 27px;
          padding: 0;
          line-height: 27px;
          border: 1px solid #d5d5d5;
          text-indent: 10px;
          box-sizing: border-box;
        }
      }
      &.passWord-input {
        h3 {
          width: 60px;
        }
        /deep/.el-input {
          flex: 1;
          .el-input__inner {
            height: 27px;
            line-height: 27px;
          }
        }
      }
    }
  }
  .replace-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    .replace-upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
      .icon {
        font-size: 60px;
      }
      .replace-upload-but {
        cursor: pointer;
        border: 1px solid #999;
        border-radius: 4px;
        color: black;
        padding: 3px 2px;
        box-sizing: border-box;
        input {
          display: none;
        }
        span {
          font-size: 13px;
        }
      }
    }
  }
  .replace-qr {
    position: relative;
    width: 80px;
    height: 80px;
    .icon {
      position: absolute;
      color: black;
      top: -5px;
      right: -5px;
      font-size: 14px;
      background: black;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      z-index: 10;
      color: #fff;
      text-align: center;
      line-height: 20px;
      display: none;
    }
    &:hover .icon {
      display: block;
    }
  }
}
.fieldError {
  font-size: 15px;
  color: red;
}
.pop-but {
  /deep/span {
    font-size: 12px !important;
  }
  .button-back {
    background: #108f51;
    /deep/span {
      color: #fff;
    }
  }
}
#uploadFile {
  display: none;
}
</style>
<template>
  <fixedPopup v-bind="$attrs"
              v-on="$listeners">
    <template>
      <div class="replace-content">
        <div class="replace-left">
          <div class="replace-left-row">
            <h3>钥匙类型</h3>
            <div class="raido-group">
              <label class="raido-group-label"
                     v-for="(item,index) in pop.checkList"
                     :key="index">
                <input type="radio"
                       :value="item.value"
                       v-model="pop.model">
                <i></i>
                <span>{{item.title}}</span>
              </label>
            </div>
          </div>
          <div class="replace-left-row passWord-input"
               v-if="pop.model==2">
            <h3>密码</h3>
            <el-input v-model="password"
                      data-vv-as="密码锁"
                      data-vv-name="password"
                      v-validate="{required:pop.model==2}"
                      placeholder="请输入密码锁密码"></el-input>
          </div>
          <div class="replace-left-row">
            <h3>存放门店</h3>
            <el-select data-vv-as="区域"
                       data-vv-name="region"
                       v-validate="'required'"
                       class="replace-select"
                       v-model="region.model"
                       filterable
                       :loading="region.loading"
                       @focus="getRegionList"
                       @change="changeRegionValue"
                       placeholder="请选择区域">
              <el-option v-for="item in region.list"
                         :key="item.id"
                         :label="item.deptName"
                         :value="item.id">
              </el-option>
            </el-select>
            <el-select data-vv-as="门店"
                       data-vv-name="stores"
                       v-validate="'required'"
                       class="replace-select"
                       v-model="stores.model"
                       filterable
                       :loading="stores.loading"
                       placeholder="请选择门店">
              <el-option v-for="item in stores.list"
                         :key="item.id"
                         :label="item.deptName"
                         :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="replace-right">
          <div class="replace-upload">
            <i class="el-icon-upload icon"></i>
            <label class="replace-upload-but">
              <input type="file"
                     @change="getFileChange" />
              <input type="text"
                     v-model="fileLoad.id"
                     data-vv-as="文件"
                     data-vv-name="fileLoad"
                     v-validate="'required'"
                     id="uploadFile" />
              <span>请上传委托文件</span>
            </label>
          </div>
        </div>
        <div class="replace-qr">
          <el-image :src="fileLoad.url || fileLoad.qrImg"
                    fit="cover"
                    :preview-src-list="[fileLoad.url ? fileLoad.url : fileLoad.qrImg]">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <i class="el-icon-close icon"
             v-if="fileLoad.url"
             @click="removeImg"></i>
        </div>
      </div>
      <div class="fieldError">{{ errorBags.all()[0] }}</div>
      <div class="pop-but">
        <el-button size="small"
                   @click="hidePop">取消</el-button>
        <el-button size="small"
                   class="button-back"
                   :loading="pop.loading"
                   @click="result">确定</el-button>
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import '../less/didLogCss.less';
import util from '@/util/util';
import { LOGINDATA } from '@/util/constMap';
import houseCheck from '../common/houseCheck';
export default {
  inject: ["houseId"],
  props: {
    replaceType: {
      type: Number
    }
  },
  data () {
    return {
      pop: {
        model: 0,
        checkList: [
          { title: '钥匙', value: 0 },
          { title: '指纹锁', value: 1 },
          { title: '密码锁', value: 2 }
        ]
      },
      //区域
      region: {
        model: '',
        list: [],
        loading: false
      },
      //密码锁密码
      password: '',
      //门店
      stores: {
        model: '',
        list: [],
        loading: false
      },
      fileLoad: {//上传文件
        id: null,
        qrImg: 'http://sys.lsxjy.com.cn/images/androidDownload.png',
        url: ''
      },
    }
  },
  methods: {
    /**
     * 关闭弹窗
     */
    hidePop () {
      this.$emit('update:visible', false)
    },
    /**
     * submit
     */
    result () {
      this.$validator
        .validateAll().then((e) => {
          if (e) {
            let url = `/agentHouse/propertyCheck/${this.replaceType == 0 ? 'insertApplyFor' : 'insertReplace'}`;
            let params = {
              Eid: this.houseId.id,
              Type: this.replaceType,
              picList: [this.fileLoad.id],
              keyType: this.pop.model,
              KeyStorageDept: this.stores.model, // 门店ID
              followMemo: '提交了钥匙申请'
            }
            if (this.replaceType == 4) {
              params.ReplaceType = 3;
            }
            //密码锁密码
            if (this.pop.model == 2) {
              params.keyCode = this.password;
            }
            this.hidePop();
            houseCheck.insertCheck(url, params).then((e) => {
              if (e.data.code == 200) {
                this.$message.success(e.data.message);
              }
            }).catch((e) => {
              this.$message.error(e.data.message);
            })
          }
        })
    },
    /**
     *  删除图片
     */
    removeImg () {
      houseCheck.removeImg(this.fileLoad.id, this.fileLoad.url).then((e) => {
        if (e.data.code == 200) {
          this.fileLoad.id = null;
          this.fileLoad.url = this.fileLoad.qrImg;
          this.$message.success('删除成功~');
        }
      }).catch(() => {
        this.$message.error('删除失败~');
      })
    },
    /**
    * 上传文件
    * @param {e} event  
    */
    getFileChange (event) {
      let file = event.target.files;
      let isImgType = ["image/jpeg", "image/png"];
      if (this.fileLoad.id != null) {
        this.$message.error("最多一次上传1张图片");
        return;
      }

      if (!isImgType.includes(file[0].type)) {
        this.$message.error("上传的图片只能是jpg,jpeg格式!");
        return;
      }
      this.upLoadFile(file[0]);
    },
    /**
     * 上传文件
     * @param {file} file 
     */
    upLoadFile (file) {
      let formData = new FormData();
      formData.append("type", this.replaceType);
      formData.append("file", file);
      this.$api
        .post({
          url: "/agentHouse/followPic/upload",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
        .then(json => {
          if (json.data.code == 200) {
            this.fileLoad.id = json.data.data.id;
            this.fileLoad.url = json.data.data.url;
          }
        })
        .catch(() => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
        });
    },
    /**
     * 区域远程搜素
     * @Date: 2020-03-19 15:20:48
     * @param {string} fitlerField  
     */
    getRegionList (fitlerField) {
      let _that = this;
      if (this.region.list.length != 0) {
        return;
      }
      this.region.loading = true;
      this.$api.get({
        url: "/department/isArea",
        data: {
          id: 10 // util.localStorageGet(LOGINDATA).companyId
        }
      }).then(e => {
        let result = e.data;
        if (result.code == 200) {
          this.region.list = result.data;
        }
      }).catch(e => {
        if (e.response != undefined) {
          this.$message(e.response.data.message);
        } else {
          this.$message("获取失败");
        }
      }).finally(() => {
        this.region.loading = false;
      })
    },
    /**
     * 区域选择改变 
     * @Date: 2020-03-19 15:22:29
     * @param {string} changeField
     */
    changeRegionValue (changeField) {
      this.stores.model = '';
      this.getStoresList(changeField);
    },
    /**
     * 门店远程搜索
     * @param {string} fitlerField
     */
    getStoresList (fitlerField) {
      let _that = this;
      this.stores.loading = true;
      this.$api.get({
        url: "/department/byParId",
        data: {
          id: fitlerField
        }
      }).then(e => {
        let result = e.data;
        if (result.code == 200) {
          this.stores.list = result.data;
        }
      }).catch(e => {
        if (e.response != undefined) {
          this.$message(e.response.data.message);
        } else {
          this.$message("获取失败");
        }
      }).finally(() => {
        this.stores.loading = false;
      })
    },
  },
}

</script>

