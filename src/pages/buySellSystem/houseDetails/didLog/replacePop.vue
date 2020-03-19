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
    width: 80px;
    height: 80px;
  }
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
                      placeholder="请输入密码锁密码"></el-input>
          </div>
          <div class="replace-left-row">
            <h3>存放门店</h3>
            <el-select class="replace-select"
                       v-model="region.model"
                       filterable
                       :remote-method="getRegionList"
                       :loading="region.loading"
                       remote
                       @change="changeRegionValue"
                       value-key="value"
                       placeholder="请选择区域">
              <el-option v-for="item in region.list"
                         :key="item.value"
                         :label="item.name"
                         :value="item">
              </el-option>
            </el-select>
            <el-select class="replace-select"
                       v-model="stores.model"
                       filterable
                       :remote-method="getStoresList"
                       :loading="stores.loading"
                       remote
                       @change="changeStoresValue"
                       value-key="value"
                       placeholder="请选择门店">
              <el-option v-for="item in stores.list"
                         :key="item.value"
                         :label="item.name"
                         :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="replace-right">
          <div class="replace-upload">
            <i class="el-icon-upload icon"></i>
            <label class="replace-upload-but">
              <input type="file" />
              <span>请上传委托文件</span>
            </label>
          </div>
        </div>
        <div class="replace-qr">
          <el-image src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
        </div>
      </div>
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
export default {
  inject: ["houseDetails"],
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
        regionName: '',
        list: [],
        loading: false
      },
      //密码锁密码
      password: '',
      //门店
      stores: {
        model: '',
        storeName: '',
        list: [],
        loading: false
      }
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

    },
    /**
     * 区域远程搜素
     * @Date: 2020-03-19 15:20:48
     * @param {string} fitlerField  
     * @return{Array}
     */
    getRegionList (fitlerField) {
      return [];
    },
    /**
     * 区域选择改变 
     * @Date: 2020-03-19 15:22:29
     * @param {string} changeField
     */
    changeRegionValue (changeField) {

    },
    /**
     * 门店远程搜索
     * @param {string} fitlerField
     * @return: [Array]
     */
    getStoresList (fitlerField) {
      return [];
    },
    /**
     * 门店选择改变 
     * @param {string} changeField 
     */
    changeStoresValue (changeField) {

    }
  },
}

</script>

