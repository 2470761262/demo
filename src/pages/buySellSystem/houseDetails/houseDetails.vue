
<style lang="less" scoped>
.page-content {
  padding: 35px 0 35px 35px;
  background: #fff;
  min-height: 100%;
  box-sizing: border-box;
  user-select: none;
}
.page-house-cell {
  display: flex;
  margin-top: 20px;
  &.marginTop {
    margin-top: 0;
  }
  .cell-left {
    width: 860px;
  }
  .cell-right {
    flex: 1;
    align-self: center;
    &.no-center {
      align-self: flex-start;
    }
  }
}
</style>
<template>
  <div class="page-content"
       v-loading="loading"
       :element-loading-text="loadingtext">
    <house-details-head></house-details-head>
    <section class="page-house-cell">
      <!-- 轮播图 -->
      <loopImg class="cell-left"></loopImg>
      <!-- 房屋详情 -->
      <detail class="cell-right"></detail>
      <!-- 右侧功能按钮 -->
      <sidebarList></sidebarList>
    </section>
    <!--按钮组 -->
    <buttonGroup></buttonGroup>
    <section class="page-house-cell marginTop">
      <!-- 房屋其他信息 -->
      <houseMessage class="cell-left"></houseMessage>
      <div class="cell-right no-center">
        <!-- 操作 -->
        <houseOperation></houseOperation>
        <!-- 房源任务方 -->
        <houseTask></houseTask>
      </div>
    </section>
  </div>
</template>
<script>
import { HOUSEBELONGLIST } from "@/util/constMap";
import QRCode from "qrcodejs2";
import util from "@/util/util";
import supplement from "@/pages/buySellSystem/addHouse/components/supplement"
import getMenuRid from '@/minxi/getMenuRid';
import houseDetailsHead from './components/houseDetailsHead';
import loopImg from './components/loopImg';
import detail from './components/detail';
import sidebarList from '@/components/sidebarList';
import buttonGroup from './components/buttonGroup';
import houseMessage from './components/houseMessage';
import houseOperation from './components/houseOperation';
import houseTask from './components/houseTask';
export default {
  mixins: [getMenuRid],
  components: {
    supplement,
    houseDetailsHead,//房源详情头部
    loopImg, // 轮播
    detail, // 右边的详情
    sidebarList,
    buttonGroup,// 按钮群
    houseMessage,
    houseOperation,
    houseTask //房源任务方
  },
  data () {
    return {
      houseId: 0, //房源id
      betExpire: 0, //对赌过期时间
      betAmount: 0, //对赌过期时间
      addBetVisible: false, //对赌窗口可见
      addBetSuccess: false, //对赌成功窗口
      betExpireStr: "", //房源id
      addBetResult: {
        status: false,
        err: "",
      },
      betConf: {
        startHour: 0,
        expireDay: 0,
        odds: 0,
        upper: 0,
        lower: 0,
      },
      houseDetails: "", //房源详情数据
      houseFileList: [], //视频和图片数组
      elevator: "无配套", //电梯配套
      sign: "未占用", //户口情况
      houseBelong: "无",
      agentHouseMethod: "", //作业方
      primarySchoolRool: "", //小学学籍占用
      middleSchoolRool: "", //中学学籍占用
      landCharacteristic: "", //土地性质
      communityPresentation: "", //小区介绍
      houseTypePresentation: "", //户型介绍
      taxParsing: "", //税费情况
      coreSellingPoint: "", //核心卖点
      isCollectHouse: false, //是否收藏
      isShowSendNotice: false, //是否显示下发通知框
      isSendNotice: 1, //下发通知标记
      switchoverList: ["跟进记录", "被看详情", "电话修改记录"],
      switchIndex: 0,
      followType: "27", //跟进类型
      followMemo: "",
      followList: [], //跟进数组
      followPairList: [], //房源被带看数组
      followTelList: [],//电话修改记录
      totalPage: 0, //分页的数量
      page: 1, //第几页
      impression: "", //印象
      isShowImpression: false, //是否显示印象弹窗
      impressionList: [], //印象数组
      isShowOnly: false, //是否显示委托弹窗
      isShowApplyOnly: false, //是否显示申请委托弹窗
      onlyType: "", //委托类型
      proxyMaxTime: "", //委托截止日期
      fileList: {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: [],
        list7: [],
        list8: []
      }, //取代或者申请的图片和视频数组
      isShowKey: false, //是否显示申请钥匙弹窗
      isShowApplyKey: false, //是否显示取代钥匙弹窗
      keyType: "", //钥匙类型
      keyCode: "", //密码锁密码
      loading: false,
      loadingtext: "正在发布",
      isShowCertificatetype: false, //是否显示填写产权证号弹窗
      certificateNo: "", //产权证号
      isCertificateNo: "1", //是否有产权证号
      isShowReport: false, //是否显示举报弹窗
      reportType: "1", //举报类型
      reportMemo: "", //举报内容
      areaList: [], //区域数组
      areaname: "", //选择的区域
      departmentList: [], //部门数组
      departmentName: "", //选择的部门
      keyStorageDept: "", //存放钥匙的门店
      isShowApplyReal: false, //是否显示实勘人弹窗
      dialogImageUrl: "", //放大的视频或者图片路径
      showFlag: false, //是显示图片还是视频
      dialogVisible: false, //是否展示放大的图片或者视频
      isShowReal: false, //是否显示取代实勘人的弹窗
      isShowKeyStorageDept: false, //是否显示修改钥匙存放门店弹窗
      cancelMethodType: "0",//
      isShowCancelMethod: false,
      cancelMemo: "",
      changeType: "4",//转换类型
      isShowChange: false,//是否显示转状态弹窗
      dealCompany: "",//成交公司
      dealPrice: "",//成交价
      subStatus: "",//子类型
      perId: "",//登录人id
      isRecommend: false,//是否推荐
      isShowRecommend: false,//是否展示推荐弹窗
      recommendMemo: "",//推荐的原因
      isShowBuilding: false,//是否显示楼栋号
      isShowApplyAgent: false,//是否显示申请跟单人弹窗
      required: true,//判断非空
      middleRadio: 0,//小学占用级
      primaryRadio: 0,//中学占用年级
      isShowButton: {
        locking: false,
        releaseOutsideHouse: false,
        cancelOutsideHouse: false,
        cancelMethod: false,
        deleteFollow: false,
        updateKeyStorageDept: false
      },//是否显示按钮
      showFollow: true,//是否显示组件的跟进
      audioList: []//音频文件
    };
  },
  before () { },
  mounted () {
    // if (this.$route.params.betExpire) {
    //   this.betExpire = this.$route.params.betExpire;

    //   const chatTimer = setInterval(() => {
    //     console.log(chatTimer);
    //     this.showtime();
    //   }, 1000);

    //   this.$once('hook:beforeDestroy', () => {
    //     clearInterval(chatTimer);
    //   })
    // }
    // if (this.$route.params.houseId) {
    //   this.houseId = this.$route.params.houseId;
    //   util.localStorageSet("houseDetails.vue:houseId", this.houseId);
    // }
    // else {
    //   this.houseId = util.localStorageGet("houseDetails.vue:houseId");
    // }
    // this.getBetInfo()
    // console.log(this.$route.params.houseId);
    // const chatTimer = setInterval(() => {
    //   console.log(chatTimer);
    //   this.showtime();
    // }, 1000);

    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(chatTimer);
    // })

    // if (util.localStorageGet("logindata")) {
    //   this.perId = util.localStorageGet("logindata").accountId;
    // }
    // this.getHouseDetails();
    // this.getisCollectHouse();
    // this.getHouseFollow();
    // this.getImpressionList();
    // this.getisRecommend();
    // this.getAgentRules();
    // this.$nextTick(() => {
    //   const el = document.querySelector(".act-not");
    //   const offsetHeight = el.offsetHeight;
    //   el.onscroll = () => {
    //     const scrollTop = el.scrollTop;
    //     const scrollHeight = el.scrollHeight;
    //     if (offsetHeight + scrollTop - scrollHeight >= 0) {
    //       if (this.page < this.totalPage) {
    //         ++this.page;
    //         this.cutData();
    //       }
    //     }
    //   };
    // });
  },
  destroyed () {
    this.$store.commit("resetFormData");
  },
  methods: {
    getAgentRules () {
      let that = this;
      this.$api.get({
        url: '/sys/rule/function/list',
        data: {
        },
        token: false
      }).then((e) => {
        e.data.data.functionRuleList.forEach(element => {
          if (that.isShowButton.hasOwnProperty(element.rUrl)) {
            that.isShowButton[element.rUrl] = true;
          }
        })
      }).catch((e) => {
      })
    },
    applyAgent () {
      let params = this.$refs.com.formData;
      let that = this;
      this.$refs.com.validateAllNotUpdata().then((e) => {
        if (e) {
          params.houseId = that.houseId;
          if (that.$refs.com.audioFile.id) {
            params.audioId = that.$refs.com.audioFile.id;
          }
          that.isShowApplyAgent = false;
          that.loading = true;
          that.$api
            .post({
              url: "/agentHouse/propertyCheck/applyAgent",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: params
            })
            .then(e => {
              let result = e.data;
              that.loading = false;
              if (result.code == 200) {
                that.getHouseDetails();
              }
              else {
                that.$message(result.message)
              }
            })
            .catch(e => {
              that.loading = false;
              that.$message(e.message)
            });
        }
      });

    },
    contactOwer (cmd) {
      console.log(cmd);
      let p = {};
      p["contactPhone" + cmd] = this.houseDetails["Tel" + cmd];
      p["isLookPhone"] = true;
      this.dailPhone(1, p);
    },
    showtime () {
      if (!this.betExpire) {
        return
      }
      var nowtime = new Date(),  //获取当前时间
        endtime = new Date(this.betExpire);  //定义结束时间
      var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
        leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
        lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
        leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
        lefts = Math.floor(lefttime / 1000 % 60);
      this.betExpireStr = leftd + "天" + this.zerofill(lefth, 2) + "时" + this.zerofill(leftm, 2) + "分";  //返回倒计时的字符串
    },
    zerofill (number, length) {
      return (Array(length).join(0) + number).slice(-length);
    },
    showBetView () {
      var that = this;
      this.$api.get({
        url: '/house/bet/conf',
        data: null,
        token: false
      }).then((e) => {
        console.log(e.data);
        let data = e.data
        if (data.code == 200) {
          this.addBetVisible = true;
          this.betConf.startHour = data.data.startHour;
          this.betConf.expireDay = data.data.expireDay;
          this.betConf.odds = data.data.odds;
          this.betConf.upper = data.data.upper;
          this.betConf.lower = data.data.lower;
        } else {
          this.addBetVisible = false;
          console.log("查询对赌房源列表结果：" + data.message);
          this.$message.error({ message: data.message, offset: 400 });
        }
      }).catch((e) => {
        console.log("查询对赌房源列表失败");
        this.$message.error({ message: e, offset: 400 });
      })
    },
    getBetInfo () {
      var that = this;
      this.$api.get({
        url: '/house/bet/inBet/' + that.houseId,
        data: null,
        token: false
      }).then((e) => {
        console.log(e.data);
        let data = e.data
        if (data.code == 200) {
          this.betExpire = data.data.EndTime;
        } else {
          console.log("查询对赌房源列表结果：" + result.message);
          this.$message.error({ message: data.message, offset: 400 });
        }
      }).catch((e) => {
        console.log("查询对赌房源列表失败");
        console.log(e);
      })
    },
    addBet () {
      var that = this;
      if (that.betAmount < that.betConf.lower || that.betAmount > that.betConf.upper) {
        this.$message.error({ message: that.betConf.lower + "起投！封顶" + that.betConf.upper, offset: 400 });
        return
      }
      let params = { "HouseId": that.houseId, "Amount": that.betAmount };
      this.$api.post({
        url: '/house/bet/add',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let data = e.data
        this.addBetSuccess = true;
        if (data.code == 200) {
          this.getBetInfo();
          that.addBetVisible = false
          that.addBetResult.status = true;
        } else {
          this.$message.error(data.message);
          that.addBetResult.status = false;
          that.addBetResult.err = data.message;
        }
      }).catch((e) => {
        console.log("查询对赌房源列表失败");
        console.log(e);
      })
    },
    dialPhoneToFD () {
      let p = {
        "contactPhone": this.houseDetails.Tel,
        "contactPhone1": this.houseDetails.Tel1,
        "contactPhone2": this.houseDetails.Tel2,
        "contactPhone3": this.houseDetails.Tel3
      }
      this.dailPhone(1, p);
    },
    oneTouchDialPhone () {
      let phone = this.houseDetails.agentPerTel;
      if (!phone) {
        this.$message({
          message: "该经纪人号码为空"
        })
        return;
      }
      let p = {
        "contactPhone": phone
      }
      this.dailPhone(0, p);
    },
    ////contactPerType,电话联系人类型，0为经纪人，1为业主
    dailPhone (contactPerType, phoneObj) {
      let that = this;
      //console.log(that.houseDetails);
      this.$confirm("确定一键拨号吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          console.log(that.houseDetails);
          let oldParams = {
            "houseId": that.houseId,
            "houseType": 0,
            "housePrice": that.houseDetails.Price,
            "houseArea": that.houseDetails.InArea,
            "contactPerType": contactPerType,//电话联系人类型，0为经纪人，1为业主
            "remark": that.houseDetails.Title          };
          let dailParams = {};
          Object.assign(dailParams, oldParams, phoneObj);
          if (contactPerType == 0) {//联系人类型如果是经纪人，才需要联系人id
            dailParams.contactPerId = that.houseDetails.AgentPer;//联系人id
            dailParams.unitName = that.houseDetails.agentPerDepartmentName;
            dailParams.contactPerName = that.houseDetails.agentPerName;
          } else {
            dailParams.unitName = that.houseDetails.CommunityName;//联系人是业主，名称取小区名
            dailParams.contactPerName = that.houseDetails.Customers;
          }
          that.$api
            .post({
              url: "/noticeManage/common/OneTouchDialPhone",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: dailParams
            })
            .then(e => {
              let result = e.data;
              console.log(result);
              if (result.code == 200) {
                this.$message({
                  type: "info",
                  message: "请注意查收微信消息"
                });
              } else {
                this.$message({
                  type: "info",
                  message: result.message
                });
              }
            })
            .catch(e => {
              console.log("【【【【uups,一键拨号失败】】】】");
              console.log(e);
              this.$message({
                type: "info",
                message: "一键拨号失败"
              });
            });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消拨号"
          });
        });
    },
    insertOrCancelRecommend () {
      let that = this;
      let url = "/agentHouse/recommend/insertRecommend"
      if (this.isRecommend) {
        url = "/agentHouse/recommend/cancelRecommend";
      }
      if (this.recommendMemo == "") {
        this.$message("原因未填");
        return;
      }
      that.recommendMemo = "";
      that.isShowRecommend = false;
      this.$api
        .post({
          url: url,
          data: {
            Eid: that.houseId,
            Memo: that.recommendMemo
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isRecommend = !that.isRecommend;
          }
          else {
            that.$message(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
          else {
            that.$message("请求失败");
          }
        });
    },
    getisRecommend () {
      let that = this;
      this.$api
        .get({
          url: "/agentHouse/recommend/isRecommend",
          data: {
            houseId: this.houseId
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isRecommend = false;
          }
          else {
            that.isRecommend = true;
          }
        })
        .catch(e => {
          that.isRecommend = true;
          //that.$message("请求失败");
        });
    },
    houseLock () {
      let that = this;
      let isLocking = this.houseDetails.isLocking == 1 ? 0 : 1;
      if (this.houseDetails.isLocking == undefined) {
        this.$message("操作失败");
        return;
      }
      let params = {
        Eid: this.houseId,
        Islocking: isLocking
      };
      this.$api
        .post({
          url: "/agentHouse/property/locking",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
          if (result.code == 200) {
            that.houseDetails.isLocking = isLocking;
          }
        })
        .catch(e => {
          that.$message("请求失败");
        });
    },
    cancelMethod () {
      let that = this;
      if (this.cancelMemo == undefined) {
        this.$message("取消原因未填");
        return;
      }
      let params = {
        Eid: this.houseId,
        cancelType: this.cancelMethodType,
        cancelMemo: this.cancelMemo
      };
      that.isShowCancelMethod = false;
      this.$api
        .post({
          url: "/agentHouse/property/cancelMethod",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
          if (result.code == 200) {
            that.getHouseDetails();
            that.cancelMemo = "";
          }
          else {
            that.$message(result.message);
          }

        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }

        });
    },
    updateKeyStorageDept () {
      let that = this;
      if (this.keyStorageDept == "") {
        this.$message("存放门店未选择");
        return;
      }
      let params = {
        Eid: this.houseId,
        KeyStorageDept: this.keyStorageDept
      };
      this.isShowKeyStorageDept = false;
      this.$api
        .post({
          url: "/agentHouse/property/updateKeyStorageDept",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
        })
        .catch(e => {
          that.$message("请求失败");
        });
    },
    showKeyStorageDept () {
      this.isShowKeyStorageDept = true;
      this.keyStorageDept = "";
      this.areaname = "";
      this.departmentName = "";
      this.getArea();
    },
    handlePreviewVideo (file) {
      if (!file.id) {
        this.dialogImageUrl = window.URL.createObjectURL(file.raw); // file.url;
      } else {
        this.dialogImageUrl = file.url;
      }

      this.dialogVisible = true;
      this.showFlag = false;
    },
    removeImg (file, fileList) {
      if (file.id) {
        this.fileList[file.listName] = this.fileList[file.listName].filter(
          item => {
            return item.url != file.url;
          }
        );
        this.$api.delete({
          url: `/agentHouse/followPic/delete/${file.id}`,
          qs: true,
          data: {
            url: file.url
          }
        });
      }
    },
    uploadFile (uploader) {
      let obj = JSON.parse(uploader.filename);
      let that = this;
      let formData = new FormData();
      formData.append("type", obj.type);
      formData.append("file", uploader.file);
      if (obj.subType != undefined) {
        formData.append("subType", obj.subType);
      }
      this.$api
        .post({
          url: "/agentHouse/followPic/upload",
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
          that.fileList["list" + obj.list].push({
            id: data.id,
            name: data.id,
            url: data.url,
            listName: "list" + obj.list
          });
        })
        .catch(() => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
          uploader.onError();
        });
    },
    beforeAvatarUploadVideo (file) {
      // 上传图片前处理函数
      console.log("");
      const isJPG = file.type === "video/mp4";
      let that = this;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是mp4 格式!");
      }
      return isJPG;
    },
    beforeAvatarUpload (file) {
      // 上传图片前处理函数
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      let that = this;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是jpg,jpeg 格式!");
      }
      return isJPG;
    },
    cut (index) {
      this.switchIndex = index;
      this.reloadList();
    },
    reloadList () {
      this.page = 1;
      this.totalPage = 0;
      this.followList = [];
      this.followPairList = [];
      this.followTelList = []
      this.cutData();
    },
    cutData () {
      switch (this.switchIndex) {
        case 0:
          this.getHouseFollow();
          break;
        case 1:
          this.getHousePairFollowList();
          break;
        case 2:
          this.getTelFollowList();
          break;
      }
    },
    getHouseDetails () {
      let that = this;
      let params = {
        houseId: this.houseId
      }
      this.$api
        .post({
          url: "/agent_house//getHouseDetail",
          data: params,
          //headers: { "Content-Type": "application/json;charset=UTF-8" },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.houseDetails = result.data;
            let qrcode = new QRCode("qrcode", {
              render: "canvas",
              width: 150,
              height: 150,
              text: that.houseDetails.shareQRCode,
            });
            that.agentHouseMethod = that.houseDetails.agentHouseMethod;
            that.elevator = util.analysisElevator(that.houseDetails.Elevator);
            that.sign = util.analysisSign(that.houseDetails.sign);
            that.houseBelong = util.analysisHouseBelong(
              HOUSEBELONGLIST,
              that.houseDetails.HouseBelong
            );
            that.landCharacteristic = util.analysisLandCharacteristic(
              that.houseDetails.LandCharacteristic
            );
            if (that.houseDetails.SchoolRool != null && that.houseDetails.SchoolRool.indexOf(":") != -1) {
              that.primarySchoolRool = that.houseDetails.SchoolRool.substring(
                that.houseDetails.SchoolRool.indexOf(":") + 1,
                that.houseDetails.SchoolRool.lastIndexOf("$")
              );
              that.middleSchoolRool = that.houseDetails.SchoolRool.substring(
                that.houseDetails.SchoolRool.lastIndexOf(":") + 1,
                that.houseDetails.SchoolRool.length
              );
            }
            if (!util.isNotNull(that.primarySchoolRool) && that.primarySchoolRool == "占用") {
              that.primaryRadio = 1;
            }
            else {
              that.primaryRadio = 0;
            }
            if (!util.isNotNull(that.middleSchoolRool) && that.middleSchoolRool == "占用") {
              that.middleRadio = 1;
            }
            else {
              that.primaryRadio = 0;
            }

            if (that.houseDetails.remark != null && that.houseDetails.remark.indexOf("$") != -1) {
              var Arry1 = that.houseDetails.remark.split("$");
              for (var i = 0; i < Arry1.length; i++) {
                var Arry2 = Arry1[i].split("@");
                switch (Arry2[0]) {
                  case "小区介绍":
                    that.communityPresentation = Arry2[1];
                    that.$store.state.addHouse.formData.step2.communityDesc = Arry2[1];
                    break;
                  case "户型介绍":
                    that.houseTypePresentation = Arry2[1];
                    that.$store.state.addHouse.formData.step2.roomDesc = Arry2[1];
                    break;
                  case "税费解析":
                    that.taxParsing = Arry2[1];
                    that.$store.state.addHouse.formData.step2.taxDesc = Arry2[1];
                    break;
                  case "核心卖点":
                    that.coreSellingPoint = Arry2[1];
                    that.$store.state.addHouse.formData.step2.saleDesc = Arry2[1];
                    break;
                }
              }
            }
            if (that.houseDetails.applyAgentVo != null) {
              that.$store.commit("updateStep2", that.houseDetails.applyAgentVo);
              that.audioList = that.houseDetails.applyAgentVo.saleUploadAudioList;
            }
            that.houseDetails.saleUploadPicDtoList.forEach(element => {
              var pic = {
                type: 1,
                id: element.id,
                url: element.picUrl
              };
              that.houseFileList.push(pic);
            });
            that.houseDetails.saleUploadVideoDtoList.forEach(element => {
              var video = {
                type: 0,
                id: element.id,
                url: element.videoUrl
              };
              that.houseFileList.push(video);
            });

          } else {
            that.$message(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            //that.$message("请求失败");
          }
        });
    },
    getisCollectHouse () {
      let that = this;
      this.$api
        .get({
          url: "/agentHouse/collect/isCollectHouse",
          data: {
            houseId: that.houseId
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isCollectHouse = true;
          }
        })
        .catch(e => { });
    },
    CollectHouseOrCancelCollect () {
      let that = this;
      let ajaxurl = "";
      let params = {
        houseId: that.houseId
      };
      if (that.isCollectHouse) {
        ajaxurl = "/agentHouse/collect/cancelCollectHouse";
      } else {
        ajaxurl = "/agentHouse/collect/collectHouse";
      }
      this.$api
        .post({
          url: ajaxurl,
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isCollectHouse = !that.isCollectHouse;
            if (ajaxurl == "/agentHouse/collect/collectHouse") {
              that.isShowSendNotice = true;
            }
          } else {
            that.$message(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    updateSendNotice () {
      let that = this;
      let ajaxurl = "";
      let params = {
        houseId: that.houseId,
        isSendNotice: that.isSendNotice
      };
      this.$api
        .post({
          url: "/agentHouse/collect/updateSendNotice",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.isShowSendNotice = false;
        });
    },
    getHouseFollow () {
      let that = this;
      let params = {
        page: that.page,
        limit: 5,
        houseId: that.houseId
      };
      this.$api
        .get({
          url: "/agentHouse/follow/getHouseFollowList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            result.data.list.forEach(item => {
              if (item.FollowType.includes("电话")) {
                item.Memo = item.Memo.replace("voice:", "");
                item.isTellFollow = true;
              } else {
                item.isTellFollow = false;
              }
            });
            that.followList = [...that.followList, ...result.data.list];
            that.totalPage = result.data.totalPage;
          }
        })
        .catch();
    },
    getHousePairFollowList () {
      let that = this;
      let params = {
        page: that.page,
        limit: 5,
        houseId: that.houseId
      };
      this.$api
        .get({
          url: "/agentHouse/pairFollow/getHousePairFollowList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.followPairList = [...that.followPairList, ...result.data.list];
            that.totalPage = result.data.totalPage;
          }
        })
        .catch();
    },
    getTelFollowList () {
      let that = this;
      let params = {
        page: that.page,
        limit: 5,
        houseId: that.houseId
      };
      this.$api
        .get({
          url: "/agentHouse/telUpdate/getTelFollowList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.followTelList = [...that.followTelList, ...result.data.list];
            that.totalPage = result.data.totalPage;
          }
        })
        .catch();
    },
    deleteFollow (followId) {
      let that = this;
      let params = { followId: followId, houseId: that.houseId };
      this.$api
        .post({
          url: "/agentHouse/follow/deleteFollow",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          if (e.data.code == 200) {
            that.reloadList();
          }
          else {
            that.$message(e.data.message)
          }
        }).catch(e => {
          that.$message(e.data.message)
        });
    },
    insertFollow () {
      let that = this;
      let params = {
        memo: that.followMemo,
        houseId: that.houseId,
        followWay: that.followType,
        followType: "常态跟进"
      };
      if (that.followMemo.length < 10) {
        that.$message("跟进内容不能少于10个字");
        return;
      }
      this.$api
        .post({
          url: "/agentHouse/follow/insertFollow",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);
          if (e.data.code == 200) {
            that.reloadList();
            that.followMemo = "";
          }

        });
    },
    insertImpression () {
      let that = this;
      let params = {
        houseId: that.houseId,
        impression: that.impression
      };
      let arry = that.impression.split('');
      let set = new Set(arry);
      if (that.impression.length == 0) {
        that.$message("印象不能为空");
        return;
      }
      if (that.impression.length > 5) {
        this.$message("不能超过5个字");
        return;
      }
      if (set.size == 1) {
        this.$message("不能都是相同的字符");
        return;
      }
      this.$api
        .post({
          url: "/agentHouse/impression/insertImpression",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);
          if (e.data.code == 200) {
            that.isShowImpression = false;
            that.getImpressionList();
          }

        }).catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    getImpressionList () {
      let that = this;
      let params = {
        houseId: that.houseId
      };
      this.$api
        .get({
          url: "/agentHouse/impression/getImpressionList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.impressionList = result.data;
          }

        });
    },
    deleteImpression (impressionId) {
      let that = this;
      let params = {
        impressionId: impressionId
      };
      this.$api
        .post({
          url: "/agentHouse/impression/deleteImpression",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);
          if (e.data.code == 200) {
            that.getImpressionList();
          }
        });
    },
    updateCertificateNo () {
      if (this.isCertificateNo == "0") {
        this.$message("房屋未出证,无法发布到外网");
        this.isShowCertificatetype = false;
      } else {
        let params = {
          houseId: this.houseId,
          houseType: 0,
          certificateType: 1,
          certificateNo: this.certificateNo
        };
        if (this.certificateNo.length == 0) {
          this.$message("产权证号未填");
          return;
        }
        this.isShowCertificatetype = false;
        this.releaseOutsideHouse(params);
      }
    },
    certificateType () {
      let params = {
        houseId: this.houseId,
        houseType: 0
      };
      if (
        this.houseDetails.certificateType == null ||
        this.houseDetails.certificateType == ""
      ) {
        this.isShowCertificatetype = true;
      } else {
        this.releaseOutsideHouse(params);
      }
    },
    releaseOutsideHouse (params) {
      let that = this;
      that.loading = true;
      this.$api
        .post({
          url: "/outsideHouse/releaseOutsideHouse",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.loading = false;
          that.$message(e.data.message);
          if (e.data.code == 200) {
            that.houseDetails.isReleaseOutside = 1;
          }

        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("发布失败");
          }
          that.loading = false;
        });
    },
    cancelOutsideHouse () {
      let that = this;
      let params = {
        HouseNo: that.houseDetails.HouseNo
      }
      this.$api
        .post({
          url: "/outsideHouse/cancelOutsideHouse",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);

          if (e.data.code == 200) {
            that.houseDetails.isReleaseOutside = 0;
          }

        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("发布失败");
          }
        });
    },
    isShowPop (type, replaceType, istrue) {
      let that = this;
      switch (type) {
        case 11:
          that.isShowReport = istrue;
          break;
        case 4:
          if (replaceType == 3) {
            that.isShowKey = istrue;
            if (istrue) {
              that.getArea();
            }
          } else if (replaceType == 2) {
            that.isShowOnly = istrue;
          } else if (replaceType == 5) {
            that.isShowReal = istrue;
          }
          break;
        case 0:
          that.isShowApplyKey = istrue;
          if (istrue) {
            that.getArea();
          }
          break;
        case 1:
          that.isShowApplyOnly = istrue;
          break;
        case 12:
          that.isShowApplyReal = istrue;
          break;
        case 8:
          that.isShowChange = istrue;
          break;
        default:
          break;
      }
    },
    clear () {
      for (var key in this.fileList) {
        this.fileList[key] = [];
      }
      this.keyType = "";
      this.keyStorageDept = "";
      this.keyCode = "";
      this.areaname = "";
      this.departmentName = "";
      this.onlyType = "";
      this.proxyMaxTime = "";
    },
    isChecking (type, memo, replaceType) {
      let that = this;
      let params = {
        houseId: that.houseId,
        type: type,
        memo: memo
      };
      that.clear();
      if (replaceType != 0) {
        params.replaceType = replaceType;
      }
      this.$api
        .get({
          url: "/agentHouse/propertyCheck/isChecking",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          if (e.data.code == 200) {
            that.isShowPop(type, replaceType, true);
          }
          else {
            that.$message(e.data.message);
          }

        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
            that.isShowPop(type, replaceType, false);
          }
        });
    },
    insertReport () {
      let that = this;
      let params = {
        Eid: that.houseId,
        Type: 11,
        OldOwner: 0,
        OwnerMemo: that.reportMemo,
        reportType: that.reportType
      };
      if (that.reportMemo.length == 0) {
        that.$message("举报内容不能为空");
        return;
      }
      that.isShowReport = false;
      this.$api
        .post({
          url: "/agentHouse/propertyCheck/insertReport",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    getArea () {
      let that = this;
      let params = {
        id: 10
      };
      that.keyStorageDept = "";
      this.$api
        .get({
          url: "/department/isArea",
          data: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.areaList = result.data;
          }

        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("获取失败");
          }
        });
    },
    getDepartment (value) {
      let that = this;
      let params = {
        id: value
      };
      this.$api
        .get({
          url: "/department/byParId",
          data: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          token: false
        })
        .then(e => {
          let result = e.data;
          that.keyStorageDept = "";
          if (result.code == 200) {
            that.departmentList = result.data;
          }

        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("获取失败");
          }
        });
    },
    getKeyStorageDept (value) {
      let that = this;
      that.keyStorageDept = value;
    },
    insertCheck (type, replaceType) {
      let that = this;
      let obj = that.getCheckObj(type, replaceType);
      let url = obj.url;
      let arry = obj.conditionList;
      let params = obj.params;
      for (var i = 0; i < arry.length; i++) {
        if (!arry[i].condition) {
          that.$message(arry[i].memo);
          return;
        }
      }
      that.isShowPop(type, replaceType, false);
      this.$api
        .post({
          url: url,
          data: params,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("操作失败");
          }
        });
    },
    getCheckObj (type, replaceType) {
      let that = this;
      let switchType = type;
      let url = "/agentHouse/propertyCheck/insertApplyFor";
      let params = {
        Eid: that.houseId,
        Type: type,
        picList: []
      };
      let resultobj = {};
      let conditionList = [];
      if (replaceType != 0) {
        params.ReplaceType = replaceType;
        switchType = replaceType;
        url = "/agentHouse/propertyCheck/insertReplace";
      }
      this.$validator;
      switch (switchType) {
        case 3:
        case 0:
          conditionList.push({
            condition: util.isNotNull(that.keyType),
            memo: "钥匙类型未选择"
          });
          if (that.keyType == "2") {
            conditionList.push({
              condition: util.isNotNull(that.keyCode),
              memo: "钥匙锁密码未填"
            });
            params.keyCode = that.keyCode;
          }
          conditionList.push({
            condition: util.isNotNull(that.keyStorageDept),
            memo: "存放门店未选择"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list7"].join(",")),
            memo: "委托图片未上传"
          });
          params.OldOwner = that.agentHouseMethod.keyOwner;
          params.keyType = that.keyType;
          params.KeyStorageDept = that.keyStorageDept;
          params.followMemo = "提交了钥匙申请";
          that.fileList["list7"].forEach(element => {
            params.picList.push(element.id);
          });
          break;
        case 2:
        case 1:
          conditionList.push({
            condition: util.isNotNull(that.onlyType),
            memo: "委托类型未选择"
          });
          conditionList.push({
            condition: util.isNotNull(that.proxyMaxTime),
            memo: "委托截止未选择"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list7"].join(",")),
            memo: "委托图片未上传"
          });
          params.OldOwner = that.agentHouseMethod.onlyOwner;
          params.onlyType = that.onlyType;
          params.ProxyMaxTime = that.proxyMaxTime;
          params.followMemo = "提交了委托申请";
          that.fileList["list7"].forEach(element => {
            params.picList.push(element.id);
          });
          break;
        case 12:
        case 5:
          conditionList.push({
            condition: util.isNotNull(that.fileList["list1"].join(",")),
            memo: "外景图未上传"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list4"].join(",")),
            memo: "客厅未上传"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list2"].join(",")),
            memo: "卧室未上传"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list3"].join(",")),
            memo: "厨房未上传"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list5"].join(",")),
            memo: "卫生间未上传"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list6"].join(",")),
            memo: "户型图未上传"
          });
          conditionList.push({
            condition: util.isNotNull(that.fileList["list8"].join(",")),
            memo: "视频未上传"
          });
          params.OldOwner = that.agentHouseMethod.realOwner;
          params.followMemo = "提交了实勘申请";
          for (var key in that.fileList) {
            if (key != "list7") {
              that.fileList[key].forEach(element => {
                params.picList.push(element.id);
              });
            }
          }
          break;
        default:
          break;
      }
      resultobj.conditionList = conditionList;
      resultobj.params = params;
      resultobj.url = url;
      return resultobj;
    },
    insertChange () {
      let that = this;
      let params = {
        Eid: that.houseId,
        Type: 8,
        NewSaleTag: that.changeType
      };
      switch (this.changeType) {
        case "4":
          if (this.dealCompany == "") {
            this.$message("成交公司未未填");
            return;
          }
          if (this.dealPrice1 != "" && util.isNumber(this.dealPrice)) {
            this.$message("只能填入数字");
            return;
          }
          params.dealCompany = this.dealCompany;
          params.dealPrice = this.dealPrice;
          params.followMemo = "他司售";
          break;
        case "6":
          if (this.subStatus != "0" && this.subStatus != "1") {
            this.$message("业主自售类型未选择");
            return;
          }
          params.subStatus = this.subStatus;
          params.followMemo = "业主自售";
          break;
        case "3":
          if (this.subStatus != "3" && this.subStatus != "2" && this.subStatus != "4") {
            this.$message("无效类型类型未选择");
            return;
          }
          params.subStatus = this.subStatus;
          params.followMemo = "无效";
          break;
        case "5":
          params.followMemo = "暂不售";
          break;
        default:

          break;
      }
      that.isShowPop(8, 0, false);
      this.$api
        .post({
          url: "/agentHouse/propertyCheck/insertChange",
          data: params,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("操作失败");
          }
        });
    },
    getShowBuliding () {
      let that = this;
      this.$api
        .get({
          url: "/agent_house/isShowBuilding",
          data: {
            houseId: that.houseId
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          token: false
        })
        .then(e => {
          if (e.data.code == 200) {
            that.isShowBuilding = true;
          }
          else {
            that.isShowBuilding = false;
            that.$message(e.data.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("操作失败");
          }
        });
    }
  }
};
</script>
