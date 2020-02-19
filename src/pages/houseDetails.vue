
<style lang="less" scoped>
.query-cell {
  display: flex;
}
.collectHouse {
  color: yellow;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: red;
}
</style>
<template>
  <div>
    <div class="query-cell">
      <div>
        <div style=" font-size: 20px;font-weight: bold">{{houseDetails.Title}}</div>
        <div>
          <span>{{houseDetails.areaName}}</span>-
          <span>{{houseDetails.CommunityName}}</span>
        </div>
        <div class="query-cell">
          <span>房源印象</span>
        </div>
      </div>
      <div style="margin-left:50px;font-size:30px;">房源二维码</div>
      <div style="margin-left:50px;">
        <div style="font-size:15px;">房源编号:</div>
        <div style="font-size:15px;">{{houseDetails.HouseNo}}</div>
        <div style="font-size:12px;color:red">微信扫一扫,立即分享房源</div>
      </div>
      <div style="margin-left:50px;font-size:30px;">
        <a>举报</a>
      </div>
      <div style="margin-left:50px;">
        <i
          :class="isCollectHouse?'el-icon-star-on  collectHouse':'el-icon-star-on ' "
          style="font-size: 50px;"
          @click="CollectHouseOrCancelCollect"
        ></i>
        <span style="font-size:30px;">{{isCollectHouse?"取消收藏":"收藏"}}</span>
        <el-dialog :visible.sync="isShowSendNotice" width="20%">
          <span slot="title" style="font-size:30px;">临时变动通知</span>
          <div>
            <div>
              <span>*</span>
              <span>请选择是否通知</span>
            </div>
            <div>
              <el-radio-group v-model="isSendNotice" fill="#458B00">
                <el-radio-button label="1">通知</el-radio-button>
                <el-radio-button label="0">不通知</el-radio-button>
              </el-radio-group>
            </div>
            <span>如若选择通知，当收藏者的位移变动时，将会通过微信通知您替换的变化</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShowSendNotice = false">取 消</el-button>
            <el-button type="primary" @click="updateSendNotice">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div>
      <el-button>验真通过</el-button>
    </div>
    <div class="query-cell" style="margin-top:30px;">
      <div style="height:400px;width:600px;">
        <el-carousel>
          <el-carousel-item v-for="(item,index) in fileList" :key="index">
            <video
              :src="item.url"
              controls="controls"
              v-if="item.type==0"
              style="width:100%;heigth:100%;"
            ></video>
            <el-image :src="item.url" fit="fill" v-if="item.type==1"></el-image>

          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="margin-left:100px;">
        <div class="query-cell">
          <div>
            <span style="font-size:40px;">{{houseDetails.Price}}</span>
            <span>万元</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.averagePrice}}</span>
            <span>元/平</span>
          </div>
          <div style="margin-left:20px;">
            <span>编辑</span>
          </div>
        </div>
        <div class="query-cell"
             style="margin-top:20px;">
          <div>
            <span style="font-size:20px;">{{houseDetails.houseType}}</span>
            <br />
            <span>户型</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.InArea}}</span>
            <br />
            <span>面积</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.Face}}</span>
            <br />
            <span>朝向</span>
          </div>
        </div>
        <div class="query-cell"
             style="margin-top:20px;">
          <div>
            <span style="font-size:20px;">{{houseDetails.buildtype}}</span>
            <br />
            <span>类型</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.HouseProperty}}</span>
            <br />
            <span>产权性质</span>
          </div>
          <div style="margin-left:20px;">
            <span>{{elevator}}</span>
            <br />
            <span>电梯</span>
          </div>
        </div>
        <div class="query-cell"
             style="margin-top:20px;">
          <div class="query-cell">
            <div class="query-cell">
              <div>
                <el-image
                  style="width:100;height:100px;border-radius:50px;"
                  :src="houseDetails.agentPerHeadImg"
                ></el-image>

              </div>
              <div>
                <div>{{houseDetails.agentPerName}}</div>
                <div>{{houseDetails.agentPerDepartmentName}}</div>
              </div>
              <el-button :data-tel="houseDetails.agentPerTel">一键拨号</el-button>
            </div>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.Customers}}</span>
            <br />
            <el-button :data-tel="houseDetails.Tel">联系业主</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button>发布外网房源</el-button>
      <el-button>推荐房源</el-button>
      <el-button>鑫币对赌</el-button>
      <el-button>转房源状态</el-button>
      <el-button>作业方取代</el-button>
      <el-button>取消作业方法</el-button>
      <el-button>锁定房源</el-button>
      <el-button>修改钥匙存放门店</el-button>
    </div>
    <div class="query-cell" style="margin-top:15px;">
      <div>
        <div>
          <span style="font-size:30px;">出色作业方</span>
          <div>
            <div style="display:flex;flex-wrap: wrap;width:700px;">
              <div style="  width: 300px; height: 150px;border: 1px solid;display:flex">
                <el-image
                  :src="agentHouseMethod.addPerHeadImg"
                  style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"
                ></el-image>
                <div style="margin-left:30px;">
                  <div style="font-size:20px;">{{agentHouseMethod.addPerName}}</div>
                  <div>{{agentHouseMethod.addPerDepartmentName}}</div>
                </div>
                <div style="margin-left:30px;">
                  <div>录入人</div>
                  <div :data-tel="agentHouseMethod.addPerTel"></div>
                </div>
              </div>
              <div
                style="  width: 300px; height: 150px;border: 1px solid;display:flex; margin-left:20px;"
              >
                <el-image
                  :src="houseDetails.agentPerHeadImg"
                  style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"
                ></el-image>
                <div style="margin-left:30px;">
                  <div style="font-size:20px;">{{houseDetails.agentPerName}}</div>
                  <div>{{houseDetails.agentPerDepartmentName}}</div>
                </div>
                <div style="margin-left:30px;">
                  <div>跟单人</div>
                  <div>
                    <span :data-tel="houseDetails.agentPerTel"></span>
                    <span>取代</span>
                  </div>
                </div>
              </div>
              <div
                style="  width: 300px; height: 150px;border: 1px solid;display:flex;margin-top:20px;"
              >
                <div v-if="agentHouseMethod.keyOwnerName!=null" style="display:flex">
                  <el-image
                    :src="agentHouseMethod.keyOwnerHeadImg"
                    style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"
                  ></el-image>
                  <div style="margin-left:30px;">
                    <div style="font-size:20px;">{{agentHouseMethod.keyOwnerName}}</div>
                    <div>{{agentHouseMethod.keyOwnerDepartmentName}}</div>
                  </div>
                </div>
                <div v-else>
                  <el-button>申请钥匙人</el-button>
                </div>
                <div style="margin-left:30px;">
                  <div>钥匙人</div>
                  <div>
                    <span :data-tel="agentHouseMethod.keyOwnerTel"></span>
                    <span v-if="agentHouseMethod.keyOwnerName!=null">取代</span>
                  </div>
                </div>
              </div>
              <div
                style="  width: 300px; height: 150px;border: 1px solid;display:flex;margin-top:20px;margin-left:20px;"
              >
                <div v-if="agentHouseMethod.onlyOwnerName!=null" style="display:flex">
                  <el-image
                    :src="agentHouseMethod.onlyOwnerHeadImg"
                    style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"
                  ></el-image>
                  <div style="margin-left:30px;">
                    <div style="font-size:20px;">{{agentHouseMethod.onlyOwnerName}}</div>
                    <div>{{agentHouseMethod.onlyOwnerDepartmentName}}</div>
                  </div>
                </div>
                <div v-else>
                  <el-button>申请委托人</el-button>
                </div>
                <div style="margin-left:30px;">
                  <div>委托人</div>
                  <div>
                    <span :data-tel="agentHouseMethod.onlyOwnerTel"></span>
                    <span v-if="agentHouseMethod.onlyOwnerName!=null">取代</span>
                  </div>
                </div>
              </div>

              <div
                style="  width: 300px; height: 150px;border: 1px solid;display:flex;margin-top:20px;"
              >
                <!-- <div  style="display:flex">
                <el-image
                  :src="houseDetails.agentHouseMethod.onlyOwnerHeadImg"
                  style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"
                ></el-image>
                <div style="margin-left:30px;">
                  <div style="font-size:20px;">{{houseDetails.agentHouseMethod.onlyOwnerName}}</div>
                  <div>{{houseDetails.agentHouseMethod.onlyOwnerDepartmentName}}</div>
                </div>
                </div>-->
                <div>
                  <el-button>申请实勘人</el-button>
                </div>
                <div style="margin-left:30px;">
                  <div>实勘人</div>
                  <div>
                    <span></span>
                    <!-- <span >取代</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top:20px;">
          <span style="font-size:30px;">房屋概况</span>
          <div>
            <span>房屋用途</span>
            <span style="margin-left:50px;">{{houseDetails.buildtype}}</span>
            <span style="margin-left:50px;">电梯配套</span>
            <span style="margin-left:50px;">{{elevator}}</span>
          </div>
          <div>
            <span>流通证件</span>
            <span style="margin-left:50px;">{{houseDetails.certificate_type}}</span>
            <span style="margin-left:50px;">所以权性质</span>
            <span style="margin-left:50px;">{{houseDetails.HouseProperty}}</span>
          </div>
          <div>
            <span>户口占用</span>
            <span style="margin-left:50px;">{{sign}}</span>
            <span style="margin-left:50px;">附属配套</span>
            <span style="margin-left:50px;">{{houseBelong}}</span>
          </div>
          <div>
            <span>小学划片</span>
            <span style="margin-left:50px;">{{houseDetails.primarySchool}}</span>
            <span style="margin-left:50px;">学籍占用</span>
            <span style="margin-left:50px;">{{primarySchoolRool}}</span>
          </div>
          <div>
            <span>中学划片</span>
            <span style="margin-left:50px;">{{houseDetails.middleSchool}}</span>
            <span style="margin-left:50px;">学籍占用</span>
            <span style="margin-left:50px;">{{middleSchoolRool}}</span>
          </div>
        </div>
        <div style="margin-top:20px;">
          <span style="font-size:30px;">交易信息</span>
          <div>
            <span>挂牌时间</span>
            <span style="margin-left:50px;">{{houseDetails.AddTime}}</span>
            <span style="margin-left:50px;">上次交易金额</span>
            <span style="margin-left:50px;">{{ houseDetails.LastTransactionAmount}}万元</span>
          </div>
          <div>
            <span>上次交易</span>
            <span style="margin-left:50px;">{{houseDetails.IsTwoYears}}</span>
            <span style="margin-left:50px;">土地性质</span>
            <span style="margin-left:50px;">{{landCharacteristic}}</span>
          </div>
          <div>
            <span>抵押信息</span>
            <span style="margin-left:50px;">{{houseDetails.mortgage==0?"无":houseDetails.subbranch}}</span>
            <span style="margin-left:50px;">剩余贷款</span>
            <span style="margin-left:50px;">{{houseDetails.balance}}万元</span>
          </div>
        </div>
        <div style="margin-top:20px;">
          <span style="font-size:30px;">最高描述</span>
          <div>小区介绍</div>
          <div>{{communityPresentation}}</div>
          <div>户型介绍</div>
          <div>{{houseTypePresentation}}</div>
          <div>税费情况</div>
          <div>{{taxParsing}}</div>
          <div>核心卖点</div>
          <div>{{coreSellingPoint}}</div>
        </div>
      </div>
      <div>
        <div>
          <span style="font-size:30px;">公开历史记录</span>
          <div>
            <div>
              <el-button-group>
                <el-button
                  v-for="(item,index) in  switchoverList"
                  :key="index"
                  :type="switchIndex==index?'':'info'"
                  @click="cut(index)"
                >{{item}}</el-button>
              </el-button-group>
            </div>
            <div
              style="height:300px;border:1px solid #DCDFE6;width:500px;overflow-y: scroll;"
              class="act-not"
            >
              <div v-if="switchIndex==0">
                <div>
                  <el-radio v-model="followType" label="27">出售条件变化</el-radio>
                  <el-radio v-model="followType" label="28">业主心态状态</el-radio>
                  <el-radio v-model="followType" label="11">其他</el-radio>
                  <div>
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="followMemo"></el-input>
                  </div>
                  <div>
                    <el-button @click="insertFollow">提交</el-button>
                  </div>
                </div>
                <div v-for="(item,index) in  followList" :key="index">
                  <div>
                    <span>{{item.FollowTime}}</span>
                    <el-button v-if="item.loginRoleId==1" @click="deleteFollow(item.id)">删除</el-button>
                  </div>
                  <div>
                    <div v-if="!item.isTellFollow">
                      <span
                        v-if="item.followPerName!=null&&item.followPerName!=''"
                      >{{item.followPerName}}({{item.followPerDepartmentName}}),</span>
                      <span>{{item.Memo}}</span>
                    </div>
                    <div v-else>
                      <audio :src="item.Memo" controls="controls"></audio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { HOUSEBELONGLIST } from "@/util/constMap";
import util from "@/util/util";
export default {
  components: {},
  data () {
    return {
      houseId: 0, //房源id
      houseDetails: "", //房源详情数据
      fileList: [], //视频和图片数组
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
      totalPage: 0, //分页的数量
      page: 1
    };
  },
  before () { },
  mounted () {
    if (this.$route.query.houseId) {
      this.houseId = this.$route.query.houseId;
    }
    let params = {
      houseId: this.houseId,
      perId: 35365
    };
    this.getHouseDetails(params);
    this.getisCollectHouse(params);
    this.getHouseFollow();
    this.$nextTick(() => {
      const el = document.querySelector(".act-not");
      console.log(el);
      const offsetHeight = el.offsetHeight;
      el.onscroll = () => {
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        if (offsetHeight + scrollTop - scrollHeight >= -1) {
          if (this.page < this.totalPage) {
            ++this.page;
            this.getHouseFollow();
          }
        }
      };
    });
  },
  methods: {
    cut(index) {
      this.switchIndex = index;
    },
    reloadList() {
      this.page = 1;
      this.totalPage = 0;
      switch (this.switchIndex) {
        case 0:
          this.followList = [];
          this.getHouseFollow();
          break;
      }
    },
    getHouseDetails(params) {
      let that = this;
      this.$api
        .get({
          url: "/agent_house//getHouseDetail",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.houseDetails = result.data;
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
            if (that.houseDetails.SchoolRool.indexOf(":") != -1) {
              that.primarySchoolRool = that.houseDetails.SchoolRool.substring(
                that.houseDetails.SchoolRool.indexOf(":") + 1,
                that.houseDetails.SchoolRool.lastIndexOf("$")
              );
              that.middleSchoolRool = that.houseDetails.SchoolRool.substring(
                that.houseDetails.SchoolRool.lastIndexOf(":") + 1,
                that.houseDetails.SchoolRool.length
              );
            }
            if (that.houseDetails.remark.indexOf("$") != -1) {
              var Arry1 = that.houseDetails.remark.split("$");
              for (var i = 0; i < Arry1.length; i++) {
                var Arry2 = Arry1[i].split("@");
                switch (Arry2[0]) {
                  case "小区介绍":
                    that.communityPresentation = Arry2[1];
                    break;
                  case "户型介绍":
                    that.houseTypePresentation = Arry2[1];
                    break;
                  case "税费解析":
                    that.taxParsing = Arry2[1];
                    break;
                    picList;
                  case "核心卖点":
                    that.coreSellingPoint = Arry2[1];
                    break;
                }
              }
            }
            that.houseDetails.saleUploadVideoDtoList.forEach(element => {
              var video = {
                type: 0,
                id: element.id,
                url: element.videoUrl
              };
              that.fileList.push(video);
            });
            that.houseDetails.saleUploadPicDtoList.forEach(element => {
              var pic = {
                type: 1,
                id: element.id,
                url: element.picUrl
              };
              that.fileList.push(pic);
            });
          } else {
            that.$message(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("请求失败");
          }
        });
    },
    getisCollectHouse(params) {
      let that = this;
      this.$api
        .get({
          url: "/agent_house_Collect/isCollectHouse",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isCollectHouse = true;
          } else {
            that.$message(result.message);
          }
        })
        .catch(e => {});
    },
    CollectHouseOrCancelCollect() {
      let that = this;
      let ajaxurl = "";
      let params = {
        houseId: that.houseId,
        perId: 35365
      };
      if (that.isCollectHouse) {
        ajaxurl = "/agent_house_Collect/cancelCollectHouse";
      } else {
        ajaxurl = "/agent_house_Collect/collectHouse";
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
            if (ajaxurl == "/agent_house_Collect/collectHouse") {
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
    updateSendNotice() {
      let that = this;
      let ajaxurl = "";
      let params = {
        houseId: that.houseId,
        perId: 35365,
        isSendNotice: that.isSendNotice
      };
      this.$api
        .post({
          url: "/agent_house_Collect/updateSendNotice",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.isShowSendNotice = false;
        });
    },
    getHouseFollow() {
      let that = this;
      let params = {
        page: that.page,
        limit: 5,
        perId: 35365,
        houseId: that.houseId
      };
      this.$api
        .get({
          url: "/agent_house_follow/geteHouseFollowList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          console.log(e);
          let result = e.data;
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
        })
        .catch();
    },
    deleteFollow(followId) {
      let that = this;
      let params = { followId: followId, houseId: that.houseId, perId: 35365 };
      this.$api
        .post({
          url: "/agent_house_follow/deleteFollow",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.reloadList();
        });
    },
    insertFollow() {
      let that = this;
      let params = {
        memo: that.followMemo,
        houseId: that.houseId,
        followPer: 35365,
        followWay: that.followType,
        followType: "常态跟进"
      };
      if (that.followMemo.length < 10) {
        that.$message("跟进内容不能少于10个字");
        return;
      }
      this.$api
        .post({
          url: "/agent_house_follow/insertFollow",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.reloadList();
        });
    }
  }
};
</script>  