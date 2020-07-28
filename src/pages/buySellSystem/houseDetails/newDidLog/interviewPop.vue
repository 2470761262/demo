<style lang="less" scoped>
/deep/.didLog-content-body {
  // prettier-ignore
  width: auto !important;
  .didLog-content-sroll {
    // prettier-ignore
    min-width: 660PX !important;
  }
}
.content {
  // prettier-ignore
  padding-left: 20PX;
  .view-item {
    display: flex;
    // prettier-ignore
    margin-bottom: 30PX;
    position: relative;
    &.error-tips {
      &::after {
        content: attr(data-error);
        position: absolute;
        // prettier-ignore
        bottom: -4PX;
        // prettier-ignore
        left: 100PX;
        color: red;
        font-size: @font13;
        transform: translateY(100%);
      }
    }
    .view-item-left {
      font-size: @font16;
      flex-shrink: 0;

      // margin-right: 20PX;
      // prettier-ignore
      width: 80PX;
      position: relative;
      text-align: justify;
      // prettier-ignore
      height: 32PX;
      // prettier-ignore
      margin-right: 20PX;
      // prettier-ignore
      line-height: 32PX;
      &::after {
        display: inline-block;
        width: 100%;
        content: "";
      }
      &.is-require {
        &::before {
          content: "*";
          color: red;
          position: absolute;
          line-height: 1;
          // prettier-ignore
          left: -15PX;
          // prettier-ignore
          top: 10PX;
        }
      }
      &.is-center {
        align-self: center;
      }
    }
    .view-item-right {
      flex: 1;
      &.is-center {
        align-self: center;
      }
    }
  }
}
.house-data {
  display: flex;
  .house-image {
    // prettier-ignore
    width: 120PX;
    // prettier-ignore
    height:70PX;
    // prettier-ignore
    margin-right: 20PX;
    object-fit: cover;
  }
  .house-data-message {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .house-message-title {
      font-size: @font16;
    }
    .house-message-cell {
      display: flex;
      font-size: @font14;
      .split-line {
        width: 1px;
        background: #999;
        // prettier-ignore
        margin: 0 10PX;
      }
    }
  }
}
.radio-item {
  font-size: 0;
  display: inline-block;
  .marg5;
  input {
    display: none;
  }
  span {
    display: inline-block;
    // prettier-ignore
    padding: 5PX 20PX;
    font-size: @font14;
    border: 1px solid #999;
    border-radius: 4px;
    // prettier-ignore
    margin-right: 10PX;
  }
  input:checked + span {
    color: #fff;
    background: @backgroud;
    border-color: transparent;
  }
}

/deep/.el-radio {
  // prettier-ignore
  margin-right: 20PX;
  .el-radio__inner {
    // prettier-ignore
    width: 14PX;
    // prettier-ignore
    height: 14PX;
    &::after {
      // prettier-ignore
      width: 4PX;
      // prettier-ignore
      height: 4PX;
    }
  }
  .el-radio__label {
    // prettier-ignore
    font-size: @font14;
    // prettier-ignore
    padding-left: 10PX;
  }
}
.marg5 {
  margin-bottom: 5px;
}
.inline-input {
  // prettier-ignore
  height: 30PX;
  font-size: @font14;
  text-align: center;
  outline: none;
  border: 1px solid #999;
  border-radius: 4px;
  &:focus {
    border-color: @backgroud;
  }
}
.per-flex {
  display: flex;
  align-items: center;
  font-size: @font14;
  .per-msg {
    // prettier-ignore
    margin-right: 20PX;
  }
  .input-content {
    // prettier-ignore
    margin-left: 50PX;
    .inline-input {
      // prettier-ignore
      margin-left: 10PX;
    }
    /deep/.el-select {
      // prettier-ignore
      height: 32PX;
      // prettier-ignore
      width: 170PX;
      .el-input__inner {
        // prettier-ignore
        height: 32PX;
        // prettier-ignore
        line-height: 32PX;
      }
      .el-input__suffix-inner {
        i {
          // prettier-ignore
          line-height: 32PX;
        }
      }
    }
  }
}
/deep/.el-date-editor {
  // prettier-ignore
  width: 350PX;
  // prettier-ignore
  height: 40PX;
  // prettier-ignore
  line-height: 40PX;
  .el-input__icon {
    font-size: @font14;
    // prettier-ignore
    line-height: 32PX;
  }
  .el-range-separator {
    // prettier-ignore
    line-height: 32PX;
  }
  input {
    font-size: @font14;
  }
}
/deep/.el-checkbox {
  // prettier-ignore
  margin-right: 20PX;
  .el-checkbox__inner {
    // prettier-ignore
    width: 14PX;
    // prettier-ignore
    height: 14PX;
    &::after {
      // prettier-ignore
      height: 7PX;
      // prettier-ignore
      left: 4PX;
    }
  }
  .el-checkbox__label {
    font-size: @font14;
  }
}
.re-textarea {
  /deep/textarea {
    font-size: @font14;
  }
}
.file-btn {
  // prettier-ignore
  width: 70PX;
  // prettier-ignore
  height: 70PX;
  border: 1px solid #999;
  box-sizing: border-box;
  display: block;
  display: flex;
  // prettier-ignore
  margin-right: 20PX;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  i {
    font-size: @font20;
  }
  input {
    display: none;
  }
  &:hover {
    .el-icon-error {
      display: block;
    }
  }
  .el-icon-error {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    color: red;
    font-size: @font22;
    transform: translate(50%, -50%);
    cursor: pointer;
  }
}
.subMit-btn {
  display: block;
  width: fit-content;
  background: @backgroud;
  color: #fff;
  font-size: @font16;
  // prettier-ignore
  padding: 10PX 40PX;
  cursor: pointer;
  border: none;
  outline: none;
  // prettier-ignore
  margin: 0 auto 20PX;
  // prettier-ignore
  border-radius: 4PX;
  &[disabled] {
    background: #f2f2f2;
    color: black;
    cursor: no-drop;
  }
}
.flex-warp {
  display: flex;
  flex-wrap: wrap;
}
.file-image {
  // prettier-ignore
  width: 70PX;
  // prettier-ignore
  height: 70PX;
  // prettier-ignore
  margin-right: 20PX;
  position: relative;
  /deep/.el-image {
    width: 100%;
    height: 100%;
  }
  &:hover {
    .el-icon-error {
      display: block;
    }
  }
  .el-icon-error {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    color: red;
    font-size: @font22;
    transform: translate(50%, -50%);
    cursor: pointer;
  }
}
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div
        class="content"
        v-loading="loading"
        element-loading-text="添加面访中..."
      >
        <!-- 房源信息 -->
        <div class="view-item">
          <div class="view-item-left">
            委托房源:
          </div>
          <div class="view-item-right">
            <div class="house-data">
              <img class="house-image" :src="houseImage" alt="" />
              <div class="house-data-message">
                <div class="house-message-title">
                  {{ houseData.Title | emptyRead }}
                </div>
                <div class="house-message-cell">
                  <div class="house-cell-left">
                    {{
                      houseData.tradePrice || houseData.Price | emptyRead("元")
                    }}
                  </div>
                  <span class="split-line"></span>
                  <div class="house-cell-right">
                    {{ houseData.averagePrice | emptyRead("元/平") }}
                  </div>
                </div>
                <div class="house-message-cell">
                  <div class="house-cell-left">
                    {{ houseData.InArea | emptyRead("㎡") }}
                  </div>
                  <div class="split-line"></div>
                  <div class="house-cell-right">{{ houseType }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 面访对象 -->
        <div
          class="view-item"
          :class="{ 'error-tips': errorBags.has('interviewObject') }"
          :data-error="errorBags.first('interviewObject')"
        >
          <div class="view-item-left is-require is-center marg5">
            面访对象:
          </div>
          <div class="view-item-right">
            <label class="radio-item">
              <input
                data-vv-name="interviewObject"
                data-vv-as="面访对象"
                v-validate="'required'"
                type="radio"
                value="业主本人"
                v-model="form.interviewObject"
              />
              <span>业主本人</span>
            </label>
            <label class="radio-item">
              <input
                data-vv-name="interviewObject"
                data-vv-as="面访对象"
                v-validate="'required'"
                type="radio"
                value="业主家人"
                v-model="form.interviewObject"
              />
              <span>业主家人</span>
            </label>
            <label class="radio-item">
              <input
                data-vv-name="interviewObject"
                data-vv-as="面访对象"
                v-validate="'required'"
                type="radio"
                value="业主委托人"
                v-model="form.interviewObject"
              />
              <span>业主委托人</span>
            </label>
            <label class="radio-item">
              <input
                data-vv-name="interviewObject"
                data-vv-as="面访对象"
                v-validate="'required'"
                type="radio"
                value="租户"
                v-model="form.interviewObject"
              />
              <span>租户</span>
            </label>
            <label class="radio-item">
              <input
                data-vv-name="interviewObject"
                data-vv-as="面访对象"
                v-validate="'required'"
                type="radio"
                value="其他"
                v-model="form.interviewObject"
              />
              <span>其他</span>
            </label>
          </div>
        </div>
        <!-- 面访日期 -->
        <div
          class="view-item"
          :class="{ 'error-tips': errorBags.has('interviewTime') }"
          :data-error="errorBags.first('interviewTime')"
        >
          <div class="view-item-left is-require is-center">
            面访日期:
          </div>
          <div class="view-item-right">
            <el-radio
              data-vv-name="interviewTime"
              data-vv-as="面访日期"
              v-validate="'required'"
              v-model="pickerTimeValue"
              :label="item.time"
              v-for="item in pickerTime"
              :key="item.title"
              >{{ item.title }}</el-radio
            >
            <el-time-picker
              is-range
              :clearable="false"
              v-model="rangTime"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-time-picker>
          </div>
        </div>
        <!-- 面访地点 -->
        <div
          class="view-item"
          :class="{ 'error-tips': errorBags.has('interviewPlace') }"
          :data-error="errorBags.first('interviewPlace')"
        >
          <div class="view-item-left is-require is-center">
            面访地点:
          </div>
          <div class="view-item-right is-center per-flex">
            <div class="flex-warp">
              <el-radio-group
                data-vv-name="interviewPlace"
                data-vv-as="面访地点"
                v-validate="{ required: !interviewPlaceOther }"
                v-model="form.interviewPlace"
                @change="placeChange"
              >
                <el-radio label="业主出售房屋内"></el-radio>
                <el-radio label="社区周边">社区周边</el-radio>
                <el-radio label="业主其他住所">业主其他住所</el-radio>
                <el-radio label="业主工作单位"></el-radio>
                <el-radio label="门店"></el-radio>
              </el-radio-group>
              <el-radio
                :label="true"
                v-model="interviewPlaceOther"
                @change="interviewPlaceOtherChange"
                >其他</el-radio
              >
            </div>
            <input
              data-vv-name="interviewPlace"
              data-vv-as="面访地点"
              v-validate="{ required: interviewPlaceOther }"
              v-show="interviewPlaceOther"
              v-model="form.interviewPlace"
              type="text"
              placeholder="请补充"
              class="inline-input"
            />
          </div>
        </div>
        <!-- 面访人 -->
        <div class="view-item">
          <div class="view-item-left  is-center">
            面访人:
          </div>
          <div class="view-item-right is-center per-flex">
            <div class="per-msg">
              {{ loginData.userName | emptyRead }}({{
                loginData.deptName | emptyRead
              }})
            </div>
            <div class="per-msg">
              {{ loginData.tel | emptyRead }}
            </div>
            <div class="input-content">
              陪同人 :
              <el-select
                placeholder="请输入陪同人"
                value-key="accountId"
                filterable
                clearable
                remote
                :remote-method="accompanyingPersonRemote"
                @focus="accompanyingPersonFocus"
                :loading="accompanyingPersonData.loading"
                v-model="form.accompanyingPerson"
              >
                <el-option
                  v-for="item in accompanyingPersonData.list"
                  :key="item.accountId"
                  :label="item.perName"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 面访目的 -->
        <div
          class="view-item"
          :class="{ 'error-tips': errorBags.has('interviewGoal') }"
          :data-error="errorBags.first('interviewGoal')"
        >
          <div class="view-item-left  is-center is-require">
            面访目的:
          </div>
          <div class="view-item-right is-center per-flex">
            <div class="flex-warp">
              <el-checkbox-group
                v-model="form.interviewGoal"
                data-vv-name="interviewGoal"
                data-vv-as="面访目的"
                v-validate="{
                  required:
                    interviewGoalOtherValue == '' ||
                    form.interviewGoal.length != 0
                }"
              >
                <el-checkbox label="新增房源首次面访"></el-checkbox>
                <el-checkbox label="价格沟通"></el-checkbox>
                <el-checkbox label="带看回访"></el-checkbox>
                <el-checkbox label="客户约谈"></el-checkbox>
                <el-checkbox label="情感维护"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox
                v-model="interviewGoalOther"
                @change="interviewGoalOtherChange"
                >其他</el-checkbox
              >
            </div>
            <input
              data-vv-name="interviewGoal"
              data-vv-as="面访目的"
              v-validate="{
                required: interviewGoalOther && form.interviewGoal.length == 0
              }"
              v-show="interviewGoalOther"
              type="text"
              placeholder="请补充"
              class="inline-input"
              v-model="interviewGoalOtherValue"
            />
          </div>
        </div>
        <!-- 面访结果 -->
        <div
          class="view-item"
          :class="{ 'error-tips': errorBags.has('interviewResult') }"
          :data-error="errorBags.first('interviewResult')"
        >
          <div class="view-item-left  is-center is-require">
            面访结果:
          </div>
          <div class="view-item-right is-center per-flex">
            <div class="flex-warp">
              <el-checkbox-group
                v-model="form.interviewResult"
                data-vv-name="interviewResult"
                data-vv-as="面访结果"
                v-validate="{
                  required:
                    interviewResultOhterValue == '' ||
                    form.interviewResult.length != 0
                }"
              >
                <el-checkbox label="业主调价"></el-checkbox>
                <el-checkbox label="收取房源证件"></el-checkbox>
                <el-checkbox label="签署委托协议"></el-checkbox>
                <el-checkbox label="签署独家"></el-checkbox>
                <el-checkbox label="获得客户转介"></el-checkbox>
                <el-checkbox label="收取钥匙"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox
                label="其他"
                v-model="interviewResultOhter"
                @change="interviewResultOhterChange"
              ></el-checkbox>
            </div>
            <input
              data-vv-name="interviewResult"
              data-vv-as="面访结果"
              v-validate="{
                required:
                  interviewResultOhter && form.interviewResult.length == 0
              }"
              v-show="interviewResultOhter"
              type="text"
              placeholder="请补充"
              class="inline-input"
              v-model="interviewResultOhterValue"
            />
          </div>
        </div>
        <!-- 面访总结 -->
        <div
          class="view-item"
          :class="{ 'error-tips': errorBags.has('interviewSummary') }"
          :data-error="errorBags.first('interviewSummary')"
        >
          <div class="view-item-left  is-require">
            面访总结:
          </div>
          <div class="view-item-right">
            <el-input
              data-vv-name="interviewSummary"
              data-vv-as="面访总结"
              v-validate="'required'"
              class="re-textarea"
              type="textarea"
              placeholder="请输入内容"
              v-model="form.interviewSummary"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </div>
        </div>
        <!-- 上传附件 -->
        <div class="view-item">
          <div class="view-item-left">
            上传附件:
          </div>
          <div class="view-item-right flex-warp ">
            <label class="file-btn" v-loading="fileLoading">
              <i class="el-icon-folder-add"></i>
              <input
                type="file"
                @change="getFile"
                multiple="multiplt"
                accept="image/*,.mp4,.avi,text/*,.doc*,.xls*"
              />
            </label>
            <div
              class="file-image"
              v-for="item in fileListType.img"
              :key="item.id"
            >
              <el-image :src="item.url" :preview-src-list="srcList"></el-image>
              <i class="el-icon-error" @click="deleteFile(item)"></i>
            </div>
            <!-- video -->
            <a
              title="视频"
              class="file-btn"
              v-for="item in fileListType.video"
              target="_blank"
              :href="item.url"
              :key="item.id"
            >
              <i class="el-icon-error"></i>
              <i class="el-icon-video-camera-solid"></i>
            </a>
            <a
              title="文本"
              class="file-btn"
              v-for="item in fileListType.txt"
              target="_blank"
              :href="item.url"
              :key="item.id"
            >
              <i class="el-icon-error"></i>
              <i class="el-icon-s-order"></i>
            </a>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:floot>
      <button class="subMit-btn" @click="submitInterview" :disabled="loading">
        提交
      </button>
    </template>
  </fixedPopup>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SMALLThumb } from "@/util/constMap";
import util from "@/util/util";
import { LOGINDATA } from "@/util/constMap";

export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData
    }),
    houseType() {
      let { Rooms, hall, toilet, balcony } = this.houseData;
      return `${Rooms || 0}-${hall || 0}-${toilet || 0}-${balcony || 0}`;
    },
    houseImage() {
      if (this.houseData.saleUploadPicDtoList.length == 0) {
        return this.$options.filters.defaultImg();
      }
      return this.houseData.saleUploadPicDtoList[0].picUrl + SMALLThumb;
    },
    fileListType() {
      let typeList = {
        img: [],
        video: [],
        txt: []
      };
      this.fileList.forEach((item, index) => {
        if (".jpeg,.jpg,.png,.svg,.gif".includes(item.ext)) {
          typeList.img.push(item);
        } else if (".mp4,.avi".includes(item.ext)) {
          typeList.video.push(item);
        } else {
          typeList.txt.push(item);
        }
      });
      return typeList;
    },
    //预览大图
    srcList() {
      return this.fileListType.img.map(item => item.url);
    }
  },
  data() {
    return {
      fileLoading: false,
      loading: false,
      loginData: util.localStorageGet(LOGINDATA),
      pickerTimeValue: "",
      pickerTime: [
        { title: "今天", time: util.format(new Date(), "yyyy-MM-dd") },
        {
          title: "昨天",
          time: util.format(
            new Date().getTime() - 3600 * 1000 * 24,
            "yyyy-MM-dd"
          )
        }
      ],
      fileList: [], //文件数组
      rangTime: ["00:00:00", "23:59:59"],
      form: {
        interviewObject: "", //面访对象
        // interviewTime: [], //面访日期
        interviewPlace: "", //面访地点
        interviewGoal: [], //面访目的
        interviewResult: [], //面访结果
        accompanyingPerson: "", //陪同人
        interviewSummary: "" //面访总结
      },
      interviewPlaceOther: false, //面访地点其他
      interviewGoalOther: false, //面访目的其他
      interviewGoalOtherValue: "", //面访目的其他Input
      interviewResultOhter: false, //面访结果其他
      interviewResultOhterValue: "", //面访结果其他Input
      accompanyingPersonData: {
        // 陪同人select
        list: [],
        loading: false
      }
    };
  },
  methods: {
    ...mapMutations(["setParam"]),
    /**
     * @example: 删除上传文件
     * @param {object} item 删除文件对象
     */
    deleteFile(item) {
      this.$api
        .delete({
          url: `saleHouseInterview/file/${item.id}`,
          data: {
            url: item.url
          },
          qs: true
        })
        .then(e => {
          if (e.data.code == 200) {
            this.fileList.splice(
              this.fileList.findIndex(fitem => item.id == fitem.id),
              1
            );
            this.$message.success(e.data.message);
          } else {
            this.$message.error(e.data.message);
          }
        });
    },
    /**
     * @example: 获取上传文件
     */
    getFile(e) {
      let file = event.target.files;
      if (!(this.fileList.length + file.length <= 9)) {
        this.$message.error("最多只能上传9个文件");
        return;
      }
      this.fileLoading = true;
      Promise.allSettled([...file].map(item => this.uploadFilte(item)))
        .then(e => {
          e.forEach(vItem => {
            if (vItem.status == "fulfilled" && vItem.value) {
              this.fileList.push(vItem.value);
            }
          });
        })
        .finally(() => {
          this.fileLoading = false;
        });
    },
    uploadFilte(file) {
      let formData = new FormData();
      formData.append("file", file);
      return this.$api
        .post({
          data: formData,
          url: "/saleHouseInterview/file",
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(e => {
          if (e.data.code == 200) {
            return e.data.data;
          }
        });
    },
    /**
     * @example: 面访地点RadioChange
     */
    placeChange() {
      this.interviewPlaceOther = false;
    },
    /**
     * @example:
     */
    interviewPlaceOtherChange() {
      this.form.interviewPlace = "";
    },
    /**
     * @example: 面访目的其他change
     */
    interviewGoalOtherChange(item) {
      if (!item) {
        this.interviewGoalOtherValue = "";
      }
    },
    /**
     * @example: 面访结果其他change
     */
    interviewResultOhterChange(item) {
      if (!item) {
        this.interviewResultOhterValue = "";
      }
    },
    /**
     * @example:陪同人获取焦点
     */
    accompanyingPersonFocus() {
      if (this.accompanyingPersonData.list.length == 0) {
        this.accompanyingPersonRemote();
      }
    },
    /**
     * @example: 陪同人远程获取数据
     */
    accompanyingPersonRemote(value) {
      this.accompanyingPersonData.loading = true;
      return this.$api
        .post({
          url: "/saleHouseInterview/followers",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            page: 1,
            limit: 40,
            keyWord: value?.trim()
          }
        })
        .then(e => {
          let { data } = e;
          if (data.code == 200) {
            this.accompanyingPersonData.list = data.data.list;
          }
        })
        .finally(() => {
          this.accompanyingPersonData.loading = false;
        });
    },
    /**
     * @example: 提交
     */
    submitInterview() {
      this.$validator.validateAll().then(e => {
        if (e) {
          this.loading = true;
          let params = {
            houseId: this.houseId, //房源ID
            customerType: this.form.interviewObject, // 面访对象
            startTime: `${this.pickerTimeValue} ${this.rangTime[0]}`, // 添加面访时间
            endTime: `${this.pickerTimeValue} ${this.rangTime[1]}`, //添加面访时间
            place: this.form.interviewPlace, // 面访地点
            timeStr: `${this.pickerTimeValue} ${this.rangTime[0]}-${this.rangTime[1]}`,
            purpose:
              this.interviewGoalOther && this.interviewGoalOtherValue != ""
                ? [
                    ...this.form.interviewGoal,
                    this.interviewGoalOtherValue
                  ].join(",")
                : this.form.interviewGoal.join(","), // 面访目的
            result:
              this.interviewResultOhter && this.interviewResultOhterValue != ""
                ? [
                    ...this.form.interviewResult,
                    this.interviewResultOhterValue
                  ].join(",")
                : this.form.interviewResult.join(","),
            summary: this.form.interviewSummary // 面访总结
          };

          if (this.form.accompanyingPerson != "") {
            const {
              perName,
              perDept,
              deptName,
              accountId
            } = this.form.accompanyingPerson;
            params.follower = accountId; //陪同人
            params.followerName = perName; //陪同人名称
            params.followerDeptId = perDept; //陪同人部门id
            params.followerDeptName = deptName; //陪同人部门id
          }
          if (this.fileList.length > 0) {
            this.params.files = this.fileList.map(item => item.id);
          }
          return this.$api
            .post({
              url: "/saleHouseInterview",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: params
            })
            .then(e => {
              let { data } = e;
              if (data.code == 200) {
                this.loading = false;
                this.$emit("update:visible", false);
                this.setParam({
                  paramName: "interviewUpdate",
                  value: Math.floor(Math.random() * 1000)
                });
                this.$message.success(data.message);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
