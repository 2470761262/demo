<template>
  <!-- 请假申请 -->
  <div class="add-rule-container">
    <div class="center">
      <div class="main">
        <div class="panel rule">
          <div class="ipt-box">
            <div
              :class="{ 'after-tips': errorBags.has('applySubType') }"
              :data-tips="errorBags.first('applySubType')"
            >
              <label for="" class="label">请假类型</label>
              <el-select
                class="ipt"
                v-model="formData.applySubType"
                placeholder="请选择"
                v-validate="'required'"
                data-vv-as="请假类型"
                data-vv-name="applySubType"
              >
                <el-option
                  v-for="item in leaveSubTypeList"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="ipt-gather">
            <div class="ipt-box">
              <div
                :class="{ 'after-tips': errorBags.has('applyStartTime') }"
                :data-tips="errorBags.first('applyStartTime')"
              >
                <label for="" class="label">开始时间</label>
                <div class="half-ipt" @click="openDateDialog('applyStart')">
                  <span>{{ formData | applyStartTimeFilter }} </span>
                  <i></i>
                  <el-input
                    v-model="applyStartTime"
                    v-show="false"
                    v-validate="{
                      required: true,
                      isGreaterDate: [applyEndTime, '结束时间']
                    }"
                    data-vv-as="请假开始时间"
                    data-vv-name="applyStartTime"
                  >
                  </el-input>
                </div>
              </div>
            </div>
            <div class="ipt-box">
              <div
                :class="{ 'after-tips': errorBags.has('applyEndTime') }"
                :data-tips="errorBags.first('applyEndTime')"
              >
                <label for="" class="label">结束时间</label>
                <div class="half-ipt" @click="openDateDialog('applyEnd')">
                  <span>{{ formData | applyEndTimeFilter }}</span>
                  <i></i>
                  <el-input
                    v-model="applyEndTime"
                    v-show="false"
                    v-validate="'required'"
                    data-vv-as="请假结束时间"
                    data-vv-name="applyEndTime"
                  >
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="ipt-box">
            <label for="" class="label noRequire">总时长</label>
            <el-input
              class="ipt"
              v-model="formData.applyDuration"
              placeholder="请假时长根据请假时间自动计算"
              :disabled="true"
            ></el-input>
          </div>
          <div class="ipt-box">
            <div
              :class="{ 'after-tips': errorBags.has('applyReason') }"
              :data-tips="errorBags.first('applyReason')"
            >
              <label for="" class="label">请假原因</label>
              <p class="tip">请假原因会影响到您的请假审批结果，请如实填写</p>
              <el-input
                class="textarea"
                type="textarea"
                :rows="2"
                placeholder="请输入请假原因"
                v-model="formData.applyReason"
                v-validate="'required'"
                data-vv-as="请假原因"
                data-vv-name="applyReason"
              >
              </el-input>
            </div>
          </div>
          <div class="ipt-box">
            <label for="" class="label noRequire">图片</label>
            <p class="wran">最多可上传9张图，格式为JPG、JPEG，大小为600*600</p>
            <div class="btn">
              <span>上传图片</span>
              <input
                class="upload"
                type="file"
                @change="getPicture"
                accept="image/*"
                multiple
              />
            </div>
            <div>
              <el-image
                v-for="(item, index) in pictureList"
                :key="index"
                :src="item.url"
                style="width:100px;height:100px"
              ></el-image>
            </div>
          </div>
        </div>
        <h2 class="topic">审批流</h2>
        <div class="panel examine">
          <div class="timeline">
            <div
              class="timeline-item"
              v-for="(item, index) in formData.auditorList"
              :key="index"
            >
              <div class="circle"></div>
              <div class="line"></div>
              <div class="timeline-title">
                {{ item.type == 1 ? "审批人员" : "抄送人员" }}
              </div>
              <div class="timeline-content">
                <div class="person-box">
                  <div class="avatar">
                    <el-image
                      :src="
                        item.headImage ||
                          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                      "
                      fit="cover"
                    ></el-image>
                  </div>
                  <div class="name-box">
                    <div class="name">{{ item.personName }}</div>
                    <div class="job">{{ item.positionName | emptyRead }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="circle"></div>
              <div class="line"></div>
              <div class="timeline-title">抄送员</div>
              <div class="timeline-content">
                <div class="send-box">
                  <el-select
                    v-model="duplicate.value"
                    placeholder="请选择抄送人员"
                    clearable
                    filterable
                    remote
                    :remote-method="getDuplicateDate"
                    :loading="duplicate.loading"
                    value-key="value"
                    class="width100 serch-item-select"
                    @focus="duplicateFocus"
                  >
                    <el-option
                      v-for="(item, index) in duplicate.list"
                      :key="index"
                      :label="item.perName"
                      :value="index"
                    >
                    </el-option>
                  </el-select>
                  <span class="send-btn" @click="addDuplicate">添加</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel bottom">
          <div class="bottom-btn">
            <button class="reset" @click="rest">重置</button>
            <button class="save" @click="save" v-loading="submitLoding">
              保存
            </button>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="panel applyer">
          <div class="title">申请人</div>
          <div class="detail-box">
            <div class="avatar">
              <el-image
                :src="
                  userInfo.headImgUrl ||
                    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                "
                fit="cover"
              ></el-image>
            </div>
            <div class="detail">
              <div class="author-box">
                <div class="author">{{ userInfo.userName | emptyRead }}</div>
                <div class="tag">{{ userInfo.postName | emptyRead }}</div>
              </div>
              <div class="business-box">
                <div class="business">
                  {{ userInfo.parentDeptName | emptyRead
                  }}{{ userInfo.deptName | emptyRead("", "-") }}
                </div>
                <div class="icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="date-dialog"
      :show-close="false"
      :visible.sync="dialogVisible"
      :modal="false"
      width="292px"
    >
      <div>
        <ls-calendar
          :is-empty="true"
          :current="restCurrent"
          v-model="restCalendarTiem"
          choice="single"
        >
          <template v-slot:dots="{ col }">
            <div
              class="calendar-dots"
              :class="{ 'is-hide': restCalendarTiem == col.time }"
              :style="{ 'background-color': color[col.type] }"
            ></div>
          </template>
        </ls-calendar>
        <div class="bottom">
          <span
            :class="{ active: dayDuration == 0 }"
            @click="selectDayDuration(0)"
            >上午</span
          >
          <span
            :class="{ active: dayDuration == 1 }"
            @click="selectDayDuration(1)"
            >下午</span
          >
        </div>
      </div>
      <div class="dialog-footer">
        <button class="confirm" @click="confirmDayDuration">确定</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import lsCalendar from "@/pages/info/components/calendar";
import { LEAVESUBTYPE } from "@/util/constMap.js";
import util from "@/util/util.js";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: { lsCalendar },
  data() {
    return {
      color: ["#0DA88B", "#F6A420", "#EF5656"],
      restCurrent: [],
      restCalendarTiem: [],
      dialogVisible: false,
      leaveSubTypeList: LEAVESUBTYPE,
      ruleTime: [
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        },
        {
          morningTs: "",
          afternoonTs: ""
        }
      ],
      duration: "",
      activeTabName: "first",
      sidebarNavs: [
        {
          label: "适用部门",
          name: "first"
        },
        {
          label: "适用人员",
          name: "second"
        }
      ],
      openFilterPanel: false,
      value: "",
      checkList: ["复选框1"],
      dayDuration: 0,
      formData: {
        applySubType: "",
        applyReason: "",
        applyDuration: "",
        applyEndTime: "",
        applyStartStatus: "",
        applyEndStatus: "",
        applyStartTime: "",
        pictureList: [],
        auditorList: []
      }, //接口参数
      selectTimeKey: "", //点击时间弹窗的类型
      applyStartTime: "", //申请开始时间,用于时间格式对比(yyyy-MM-dd HH:mm:ss)
      applyEndTime: "", //申请结束时间,用于时间格式对比(yyyy-MM-dd HH:mm:ss)
      pictureList: [], //图片数组
      userInfo: {}, //用户信息
      duplicate: {
        value: "",
        list: [],
        loading: false
      }, //抄送json
      submitLoding: false
    };
  },
  filters: {
    /**
     * 申请开始时间解析
     */
    applyStartTimeFilter(value) {
      if (value.applyStartTime) {
        let forenoon = value.applyStartStatus == 0 ? "上午" : "下午";
        return value.applyStartTime + forenoon;
      }
      return "请选择开始时间";
    },
    applyEndTimeFilter(value) {
      if (value.applyEndTime) {
        let forenoon = value.applyEndStatus == 0 ? "上午" : "下午";
        return value.applyEndTime + forenoon;
      }
      return "请选择结束时间";
    }
  },
  mounted() {
    this.userInfo = util.localStorageGet("logindata");
  },
  methods: {
    /**
     *@example:重置
     */
    rest() {
      Object.keys(this.formData).forEach(item => {
        if (item == "pictureList" || item == "auditorList") {
          this.formData[item] = [];
        } else {
          this.formData[item] = "";
        }
      });
      this.pictureList = [];
      this.applyStartTime = "";
      this.applyEndTime = "";
    },
    /**
     * 提交申请
     */
    save() {
      this.$validator.validateAll().then(e => {
        if (e) {
          let params = {
            applyType: 1
          };
          this.addFormDataPictuer();
          Object.assign(params, JSON.parse(JSON.stringify(this.formData)));
          params.applyEndTime = this.applyEndTime;
          params.applyStartTime = this.applyStartTime;
          this.submitLoding = true;
          this.$api
            .post({
              url: "attendance/apply",
              data: params,
              headers: { "Content-Type": "application/json" }
            })
            .then(e => {
              this.$message({
                message: e.data.message
              });
              if (e.data.code == 200) {
                this.$router.push({
                  path: "/leaveDetail",
                  query: { id: e.data.data }
                });
              }
            })
            .finally(e => {
              this.submitLoding = false;
            });
        }
      });
    },
    /**
     *@example:打开时间组件弹窗
     */
    openDateDialog(key) {
      this.dialogVisible = true;
      this.selectTimeKey = key;
    },
    selectDayDuration(val) {
      this.dayDuration = val;
    },
    /**
     * @example:申请开始时间和结束时间对比
     */
    timeComparison() {
      if (
        this.applyStartTime &&
        this.applyEndTime &&
        this.applyStartTime > this.applyEndTime
      ) {
        this.$message({
          message: "开始时间不能大于结束时间",
          type: "error"
        });
        return true;
      }
      return false;
    },

    /**
     *@example:时间选择事件
     */
    async confirmDayDuration() {
      if (!this.formData.applySubType) {
        this.$message({
          message: "请选择请假类型",
          type: "error"
        });
        this.dialogVisible = false;
        return;
      }
      if (this.restCalendarTiem.length == 0) {
        this.$message({
          message: "时间未选择",
          type: "error"
        });
        return;
      }
      let timeKey = this.selectTimeKey;
      let housrs = this.dayDuration == 0 ? " 08:00:00" : " 14:00:00";
      this[timeKey + "Time"] = this.restCalendarTiem + housrs;
      let flag = await this.timeComparison();
      if (flag) {
        return;
      }
      this.formData[timeKey + "Time"] = this.restCalendarTiem;
      this.formData[timeKey + "Status"] = this.dayDuration;
      this.getApplyDuration();
      this.dialogVisible = false;
    },
    /**
     * @example:获取总时长和审批人
     */
    getApplyDuration() {
      if (this.formData.applyStartTime && this.formData.applyEndTime) {
        this.$api
          .post({
            url: "/attendance/apply/holiday/time",
            data: {
              startDate: this.formData.applyStartTime,
              startSwitch: this.formData.applyStartStatus,
              endDate: this.formData.applyEndTime,
              endSwitch: this.formData.applyEndStatus,
              applyType: this.formData.applySubType
            },
            qs: true
          })
          .then(e => {
            let result = e.data;
            if (result.code == 200) {
              this.formData.applyDuration = result.data.duration;
              this.formData.auditorList = result.data.auditorList;
            }
          });
      }
    },
    /**
     * @example:上传图片之前事件
     */
    getPicture(e) {
      console.log(file);
      let file = e.target.files;
      let isImgType = ["image/jpeg", "image/png"];
      if (file.length > 9) {
        this.$message.error("最多一次上传9张图片");
        return;
      }
      for (let index = 0; index < file.length; index++) {
        if (!isImgType.includes(file[index].type)) {
          this.$message.error("上传的图片只能是jpg,jpeg格式!");
          return;
        }
      }
      for (let index = 0; index < file.length; index++) {
        if (this.pictureList.length < 9) {
          this.uploadPictuer(file[index]);
        }
      }
    },
    /**
     * @example:图片上传
     */
    uploadPictuer(file) {
      let formData = new FormData();
      formData.append("file", file);
      this.$api
        .post({
          url: "/attendance/apply/upload",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        })
        .then(e => {
          if (e.data.code == 200) {
            this.pictureList.push(e.data.data);
          }
        });
    },
    /**
     * @example:抄送人员获取焦点
     */
    duplicateFocus() {
      if (this.duplicate.list.length == 0) {
        this.getDuplicateDate();
      }
    },
    /**
     * @example:获取抄送人员数据
     */
    getDuplicateDate(keyWord = "") {
      this.duplicate.list = [];
      this.duplicate.loading = true;
      this.$api
        .post({
          url: "/attendance/apply/persons",
          data: {
            limit: 50,
            page: 1,
            personName: keyWord
          },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.duplicate.list = result.data.list;
          }
        })
        .finally(e => {
          this.duplicate.loading = false;
        });
    },
    /**
     * @example:添加抄送人
     */
    addDuplicate() {
      if (this.formData.auditorList.length == 0) {
        this.$message({
          message: "请假的时间未选择",
          type: "error"
        });
        return;
      }
      let value = this.duplicate.list[this.duplicate.value];
      let list = JSON.parse(JSON.stringify(this.formData.auditorList)); //人员数组
      console.log(value);
      //判断是否存在该人员
      let filterAccount = list.filter(item => item.personId == value.accountId);
      if (filterAccount.length > 0) {
        this.$message({
          message: "已存在该人员",
          type: "error"
        });
        return;
      }
      //判断抄送人员数量
      let duplicateCount = list.filter(item => item.type == 2);
      if (duplicateCount.length >= 3) {
        this.$message({
          message: "抄送人员最多添加3个",
          type: "error"
        });
        return;
      }
      this.addAuitorList(value);
    },
    /**
     * @example:添加进审批人数组
     * @param {item} 人员信息
     */
    addAuitorList(item) {
      let json = {
        headImage: item.headImage,
        personDeptName: item.deptName,
        personId: item.accountId,
        personName: item.perName,
        positionName: item.positionName,
        showOrder: 1,
        type: 2
      };
      this.formData.auditorList.push(json);
    },
    /**
     * @example:添加图片参数
     */
    addFormDataPictuer() {
      //处理图片
      this.pictureList.forEach(item => {
        let json = {
          ipStr: item.ipStr,
          fileStr: item.fileStr,
          fileName: item.picName,
          mediaType: 0
        };
        this.formData.pictureList.push(json);
      });
    }
  }
};
</script>
<style lang="less">
/* 时间范围选择器面板begin */
.el-time-range-picker {
  .el-time-spinner__item {
    height: 32px;
    line-height: 32px;
  }
  .el-time-panel__footer {
    height: 36px;
    .el-time-panel__btn {
      line-height: 28px;
      font-size: @font12;
    }
  }
  .el-time-panel__content::after,
  .el-time-panel__content::before {
    height: 32px;
  }
}
/* 时间范围选择器面板end */
</style>
<style lang="less" scoped>
/deep/.date-dialog {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .bottom {
    padding: 0 16px;
    span {
      display: inline-block;
      width: 76px;
      height: 32px;
      margin-right: 10px;
      background: #f0f2f5;
      border-radius: 4px;
      line-height: 32px;
      text-align: center;
      font-size: @font16;
      color: #909399;
      cursor: pointer;
      &.active {
        background: @backgroud;
        color: #fff;
      }
    }
  }
  .dialog-footer {
    position: relative;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 16px 16px;
    margin-top: 16px;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 16px;
      right: 16px;
      height: 1px;
      background: #f0f2f5;
    }
    .confirm {
      width: 109px;
      height: 40px;
      background: @backgroud;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-size: @font16;
      outline: none;
      cursor: pointer;
    }
  }
}
/* 时间范围选择器begin */
/deep/.el-date-editor {
  width: 160px;
  height: 48px;
  .el-range__icon {
    font-size: @font14;
  }
  .el-range-input,
  .el-range-separator {
    line-height: 34px;
    font-size: @font14;
  }
  .el-range-separator {
    width: auto;
  }
}
/* 时间范围选择器end */
/*** element下拉选择面板 ***/
.el-select-dropdown__item {
  height: 40px;
  line-height: 40px;
  font-size: @font14;
}
.add-rule-container {
  flex: 1;
  display: flex;
  justify-content: center;
  height: 0;
  background: #f0f7f7;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0);
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #bbb;
  }
  *::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  .center {
    display: flex;
    padding: 24px 24px 32px 24px;
    overflow: auto;
    .topic {
      padding: 24px 0;
      line-height: 1;
      font-size: @font18;
      font-weight: bold;
      color: #303133;
    }
    .panel {
      width: 100%;
      padding: 24px;
      background: #fff;
      box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
      border-radius: 8px;
      box-sizing: border-box;
      .tip {
        width: 100%;
        height: 36px;
        padding: 0 16px;
        background: rgba(255, 150, 0, 0.07);
        line-height: 36px;
        font-size: @font16;
        color: #ff9600;
        box-sizing: border-box;
      }
    }
    .main {
      display: flex;
      flex-direction: column;
      width: 852px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .rule {
        .ipt-gather {
          display: flex;
          justify-content: space-between;
          width: 336px;
        }
        /deep/.ipt-box {
          margin-bottom: 24px;
          &:last-child {
            margin-bottom: 0;
          }
          .label {
            display: block;
            position: relative;
            padding-left: 16px;
            margin-bottom: 16px;
            line-height: 1;
            font-size: @font16;
            font-weight: bold;
            color: #303133;
            &.noRequire {
              padding-left: 0;
              &::before {
                display: none;
              }
            }
            &::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              width: 8px;
              height: 8px;
              background: #f62f2f;
              border-radius: 8px;
            }
          }
          .tip {
            width: 336px;
            height: 36px;
            margin-bottom: 16px;
            background: rgba(255, 150, 0, 0.07);
            border-radius: 2px;
            line-height: 36px;
            font-size: @font12;
            color: #ff9600;
          }
          .half-ipt {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 160px;
            height: 48px;
            padding: 0 10px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #cecece;
            box-sizing: border-box;
            cursor: pointer;
            span {
              display: inline-block;
              width: 120px;
              font-size: @font14;
              color: #909399;
            }
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              background: url("../../../assets/images/askforLeave_date.svg")
                center no-repeat;
              background-size: cover;
            }
          }
          .ipt {
            .el-input__inner {
              width: 336px;
              height: 48px;
              background: #ffffff;
              border-radius: 4px;
              border: 1px solid #cecece;
              font-size: @font16;
            }
            &.gather {
              .el-input__inner {
                width: 160px;
              }
            }
            &.is-disabled .el-input__inner {
              background-color: #f5f7fa;
            }
          }
          .textarea {
            .el-textarea__inner {
              width: 336px;
              height: 146px;
              background: #ffffff;
              border-radius: 4px;
              border: 1px solid #cecece;
              resize: none;
              font-size: @font16;
              &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                background-color: rgba(0, 0, 0, 0);
              }
              &::-webkit-scrollbar-thumb {
                border-radius: 6px;
                background-color: #bbb;
              }
              &::-webkit-scrollbar-track {
                // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #fff;
              }
            }
          }
          .wran {
            margin-bottom: 16px;
            font-size: @font12;
            color: #f33a3a;
          }
          .btn {
            position: relative;
            width: 96px;
            height: 40px;
            background: #fff;
            border: 1px solid @backgroud;
            line-height: 38px;
            border-radius: 4px;
            text-align: center;
            color: @backgroud;
            outline: none;
            .upload {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 9;
              opacity: 0;
              cursor: pointer;
            }
          }
        }
      }
      .examine {
        .timeline {
          .timeline-item {
            position: relative;
            &:last-child {
              .line {
                display: none;
              }
            }
            .circle {
              position: absolute;
              top: 0;
              left: 0;
              width: 14px;
              height: 14px;
              background: @backgroud;
              border: 5px solid @opacityBackground;
              border-radius: 14px;
            }
            .line {
              position: absolute;
              top: 34px;
              left: 12px;
              bottom: 10px;
              width: 1px;
              background: #d8d8d8;
            }
            .timeline-title {
              height: 24px;
              padding-left: 41px;
              margin-bottom: 12px;
              line-height: 24px;
              font-size: @font16;
              font-weight: bold;
              color: #303133;
            }
            .timeline-content {
              padding-left: 41px;
              .person-box {
                display: flex;
                align-items: center;
                padding: 6px 0 18px;
                .avatar {
                  width: 36px;
                  height: 36px;
                  border-radius: 36px;
                  overflow: hidden;
                  .el-image {
                    width: 100%;
                    height: 100%;
                  }
                }
                .name-box {
                  margin: 0 18px 0 8px;
                  .name {
                    padding-top: 2px;
                    margin-bottom: 8px;
                    line-height: 1;
                    font-size: @font14;
                    font-weight: bold;
                    color: #303133;
                  }
                  .job {
                    line-height: 1;
                    font-size: @font12;
                    color: #909399;
                  }
                }
                .btn {
                  width: 52px;
                  height: 24px;
                  background: #ffffff;
                  border-radius: 2px;
                  border: 1px solid @backgroud;
                  line-height: 22px;
                  text-align: center;
                  color: @backgroud;
                  outline: none;
                  cursor: pointer;
                }
              }
              .send-box {
                display: flex;
                width: 336px;
                padding: 6px;
                border-radius: 4px;
                border: 1px solid #cecece;
                box-sizing: border-box;
                /deep/.send-ipt {
                  .el-input__inner {
                    height: 36px;
                    border: none;
                    line-height: 36px;
                    font-size: @font14;
                  }
                }
                .send-btn {
                  display: inline-block;
                  width: 92px;
                  height: 36px;
                  background: @backgroud;
                  border-radius: 2px;
                  line-height: 35px;
                  text-align: center;
                  font-size: @font16;
                  color: #fff;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .bottom {
        margin-top: 24px;
        .bottom-btn {
          button {
            width: 109px;
            height: 40px;
            border: none;
            border-radius: 4px;
            text-align: center;
            line-height: 40px;
            font-size: @font16;
            outline: none;
            box-sizing: border-box;
            cursor: pointer;
            float: left;
          }
          .reset {
            margin-right: 16px;
            background: #f4f4f5;
            color: #606266;
          }
          .save {
            background: @backgroud;
            color: #fff;
          }
        }
      }
    }
    .sidebar {
      width: 414px;
      margin-left: 24px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .applyer {
        .title {
          margin-bottom: 24px;
          line-height: 1;
          font-size: @font18;
          font-weight: bold;
          color: #303133;
        }
        .detail-box {
          display: flex;
          .avatar {
            width: 52px;
            height: 52px;
            border-radius: 52px;
            overflow: hidden;
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
          .detail {
            flex: 1;
            margin-left: 12px;
            padding-top: 6px;
            .author-box {
              display: flex;
              align-items: center;
              .author {
                line-height: 1;
                font-size: @font18;
                font-weight: bold;
                color: #303133;
              }
              .tag {
                height: 16px;
                margin-left: 12px;
                padding: 0 4px;
                border-radius: 2px;
                border: 1px solid @backgroud;
                line-height: 14px;
                font-size: @font12;
                color: @backgroud;
              }
            }
            .business-box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 4px;
              .business {
                font-size: @font14;
                color: #303133;
              }
              .icon {
                width: 32px;
                height: 32px;
                transform: translateY(5px);
                margin-top: 0px;
                background: url(~@/assets/images/leaveDetail_call_phone.svg)
                  center no-repeat;
                background-size: cover;
              }
            }
          }
        }
      }
    }
  }
}
.calendar-content {
  box-shadow: none !important;
  .calendar-data {
    padding: 0;
  }
  .cell-item {
    height: 58px !important;
    line-height: 58px !important;
  }
}
.after-tips {
  &:after {
    content: attr(data-tips);
    display: block;
    color: red;
  }
}
</style>
