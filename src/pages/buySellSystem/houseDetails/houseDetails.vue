
<style lang="less" scoped>
.query-cell {
  display: flex;
}
.collectHouse {
  color: yellow;
}
</style>
<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingtext"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="query-cell">
      <div>
        <div style=" font-size: 20px;font-weight: bold">{{houseDetails.Title}}</div>
        <div>
          <span>{{houseDetails.areaName}}</span>-
          <span>{{houseDetails.CommunityName}}</span>
        </div>
        <div class="query-cell" style="width:300px;overflow-x: scroll;">
          <div
            v-for="(item,index) in  impressionList"
            :key="index"
            class="query-cell"
            style="margin-left:10px;"
          >
            <div>
              <span style="white-space:nowrap;">{{item.impression}}</span>
            </div>
            <span @click="deleteImpression(item.id)">X</span>
          </div>
        </div>
      </div>
      <div>
        <i class="El-icon-ice-cream-square"></i>
        <el-popover placement="bottom" width="400" trigger="click" v-model="isShowImpression">
          <div>
            <span>仅自己可见</span>
          </div>
          <div>
            <el-input v-model="impression" placeholder="建议输入5个以内"></el-input>
          </div>
          <div>
            <el-button @click="isShowImpression=false">取消</el-button>
            <el-button @click="insertImpression">添加</el-button>
          </div>
          <span slot="reference">房源印象</span>
        </el-popover>
      </div>
      <div style="margin-left:50px;font-size:30px;">房源二维码</div>
      <div style="margin-left:50px;">
        <div style="font-size:15px;">房源编号:</div>
        <div style="font-size:15px;">{{houseDetails.HouseNo}}</div>
        <div style="font-size:12px;color:red">微信扫一扫,立即分享房源</div>
      </div>
      <div style="margin-left:50px;font-size:30px;">
        <el-dialog title="!举报" :visible.sync="isShowReport">
          <div>
            <div>
              <div>
                <el-radio label="1" v-model="reportType">虚假实勘</el-radio>
                <el-radio label="2" v-model="reportType">虚假委托</el-radio>
                <el-radio label="3" v-model="reportType">虚假钥匙</el-radio>
                <el-radio label="4" v-model="reportType">虚假跟进</el-radio>
                <el-radio label="5" v-model="reportType">房屋已售</el-radio>
                <el-radio label="6" v-model="reportType">虚假业主号码</el-radio>
                <el-radio label="7" v-model="reportType">其他</el-radio>
              </div>
              <div>
                <el-input v-model="reportMemo" type="textarea"></el-input>
              </div>
              <div>
                <el-button @click="isShowReport=false">取消</el-button>
                <el-button @click="insertReport">确定</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
        <a @click="isChecking(11,'该房源已被举报，当前正在审核中',0)">举报</a>
      </div>
      <div style="margin-left:50px;">
        <i
          :class="isCollectHouse?'el-icon-star-on  collectHouse':'el-icon-star-on ' "
          style="font-size: 50px;"
          @click="CollectHouseOrCancelCollect"
        ></i>
        <span style="font-size:30px;">{{isCollectHouse?"已关注":"收藏"}}</span>
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
        <div class="query-cell" style="margin-top:20px;">
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
        <div class="query-cell" style="margin-top:20px;">
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
        <div class="query-cell" style="margin-top:20px;">
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
      <el-popover placement="top" width="600" trigger="click" v-model="isShowCertificatetype">
        <div>
          <div>
            <span>房源是否已出证</span>
          </div>
          <div>
            <span>不懂产权证</span>
            <el-radio v-model="isCertificateNo" label="1">有</el-radio>
            <el-radio v-model="isCertificateNo" label="0">无</el-radio>
          </div>
          <div class="query-cell">
            <span>证号</span>
            <el-input v-model="certificateNo" placeholder="请输入产权证号" v-if="isCertificateNo=='1'"></el-input>
          </div>
          <div>
            <el-button @click="isShowCertificatetype=false">取消</el-button>
            <el-button @click="updateCertificateNo">确定</el-button>
          </div>
        </div>
        <el-button
          v-if="houseDetails.is_release_outside!=1&&houseDetails.AgentPer==35365"
          slot="reference"
          @click="certificateType"
        >发布外网房源</el-button>
      </el-popover>
      <el-button>推荐房源</el-button>
      <el-button>鑫币对赌</el-button>
      <el-button>转房源状态</el-button>
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

                    <el-popover placement="top" width="600" trigger="click" v-model="isShowKey">
                      <div class="query-cell">
                        <div>
                          <div>
                            <span>钥匙类型</span>
                            <el-radio v-model="keyType" label="0">钥匙</el-radio>
                            <el-radio v-model="keyType" label="1">指纹锁</el-radio>
                            <el-radio v-model="keyType" label="2">密码锁</el-radio>
                          </div>
                          <div>
                            <el-input v-if="keyType=='2'" v-model="keyCode" placeholder="请输入密码"></el-input>
                          </div>
                          <div>
                            <span>存放门店</span>
                            <el-select
                              v-model="areaname"
                              @change="getDepartment"
                              placeholder="请选择区域"
                              style="width:100px;"
                            >
                              <el-option
                                v-for="(item,index) in areaList"
                                :key="index"
                                :label="item.deptName"
                                :value="item.id"
                              ></el-option>
                            </el-select>
                            <el-select
                              v-model="departmentName"
                              @change="getKeyStorageDept"
                              placeholder="请选择门店"
                              style="width:100px;"
                            >
                              <el-option
                                v-for="(item,index) in departmentList"
                                :key="index"
                                :label="item.deptName"
                                :value="item.id"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                        <div>
                          <el-upload
                            :action="''"
                            list-type="picture"
                            :limit="1"
                            :before-upload="beforeAvatarUpload"
                            :http-request="uploadFile"
                            :file-list="picList"
                            :on-remove="removeImg"
                            multiple
                          >
                            <i class="el-icon-plus"></i>
                            <br />
                            <el-button>请上传委托图片</el-button>
                          </el-upload>
                        </div>
                        <div>
                          <img
                            class="phone-upload-img"
                            src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                            alt="手机上传图片二维码"
                            style="height:100px;"
                          />
                        </div>
                      </div>
                      <div>
                        <el-button @click="isShowKey=false">取消</el-button>
                        <el-button @click="insertReplace(3)">添加</el-button>
                      </div>
                      <span
                        v-if="agentHouseMethod.keyOwnerName!=null"
                        slot="reference"
                        @click="isChecking(4,'当前正在审核中',3)"
                      >取代</span>
                    </el-popover>
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

                    <el-popover placement="top" width="600" trigger="click" v-model="isShowOnly">
                      <div class="query-cell">
                        <div>
                          <div>
                            <span>委托类型</span>
                            <el-radio v-model="onlyType" label="27">普通委托</el-radio>
                            <el-radio v-model="onlyType" label="28">独家委托</el-radio>
                            <el-radio v-model="onlyType" label="11">限时销售</el-radio>
                          </div>
                          <div></div>
                        </div>
                        <div>
                          <el-upload
                            :action="''"
                            list-type="picture"
                            :limit="1"
                            :before-upload="beforeAvatarUpload"
                            :http-request="uploadFile"
                            :file-list="picList"
                            :on-remove="removeImg"
                            multiple
                          >
                            <i class="el-icon-plus"></i>
                            <br />
                            <el-button>请上传委托图片</el-button>
                          </el-upload>
                        </div>
                        <div>
                          <img
                            class="phone-upload-img"
                            src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                            alt="手机上传图片二维码"
                            style="height:100px;"
                          />
                        </div>
                      </div>
                      <div>
                        <el-button @click="isShowOnly=false">取消</el-button>
                        <el-button>添加</el-button>
                      </div>
                      <span
                        v-if="agentHouseMethod.onlyOwnerName!=null"
                        slot="reference"
                        @click="ShowBox(1)"
                      >取代</span>
                    </el-popover>
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
              <div v-if="switchIndex==1">
                <div v-for="(item,index) in  followPaitList" :key="index" style="height:70px;">
                  <div>
                    <span>{{item.FollowTime}}</span>
                  </div>
                  <div>
                    <div>
                      <span>{{item.lookPerName}}({{item.lookPerNameDepartmentName}}),</span>
                      <span>{{item.Memo}}</span>
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
  data() {
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
      followPaitList: [], //房源被带看数组
      totalPage: 0, //分页的数量
      page: 1, //第几页
      impression: "", //印象
      isShowImpression: false, //是否显示印象弹窗
      impressionList: [], //印象数组
      isShowOnly: false, //是否显示委托弹窗
      onlyType: -1, //委托类型
      expirationDate: "", //委托截止日期
      picList: [], //图片数组
      isShowKey: false,
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
      keyStorageDept: "" //存放钥匙的门店
    };
  },
  before() {},
  mounted() {
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
    this.getImpressionList();
    this.$nextTick(() => {
      const el = document.querySelector(".act-not");
      const offsetHeight = el.offsetHeight;
      el.onscroll = () => {
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        if (offsetHeight + scrollTop - scrollHeight >= 0) {
          if (this.page < this.totalPage) {
            ++this.page;
            this.cutData();
          }
        }
      };
    });
  },
  methods: {
    ShowBox(type) {
      this.picList = [];
      switch (type) {
        case 0:
          this.isShowKey = true;
          break;
        case 1:
          this.isShowOnly = true;
        default:
          break;
      }
    },
    removeImg(file, fileList) {
      if (file.id) {
        this.picList = this.picList.filter(item => {
          return item.url != file.url;
        });
        this.$api.delete({
          url: `/agentHouse/followPic/delete/${file.id}`,
          qs: true,
          data: {
            url: file.url
          }
        });
      }
    },
    uploadFile(uploader) {
      console.log(uploader);
      let that = this;
      let formData = new FormData();
      formData.append("addName", 35365);
      formData.append("type", 4);
      formData.append("file", uploader.file);
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
          that.picList.push({ id: data.id, name: data.id, url: data.url });
        })
        .catch(() => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
          uploader.onError();
        });
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
    cut(index) {
      this.switchIndex = index;
      this.reloadList();
    },
    reloadList() {
      this.page = 1;
      this.totalPage = 0;
      this.followList = [];
      this.followPaitList = [];
      this.cutData();
    },
    cutData() {
      switch (this.switchIndex) {
        case 0:
          this.getHouseFollow();
          break;
        case 1:
          this.getHousePairFollowList();
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
          url: "/agentHouse/collect/isCollectHouse",
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
          url: "/agentHouse/collect/updateSendNotice",
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
          url: "/agentHouse/follow/getHouseFollowList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
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
    getHousePairFollowList() {
      let that = this;
      let params = {
        page: that.page,
        limit: 5,
        perId: 35365,
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
          that.followPaitList = [...that.followPaitList, ...result.data.list];
          that.totalPage = result.data.totalPage;
        })
        .catch();
    },
    deleteFollow(followId) {
      let that = this;
      let params = { followId: followId, houseId: that.houseId, perId: 35365 };
      this.$api
        .post({
          url: "/agentHouse/follow/deleteFollow",
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
          url: "/agentHouse/follow/insertFollow",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          that.$message(e.data.message);
          that.reloadList();
          that.followMemo = "";
        });
    },
    insertImpression() {
      let that = this;
      let params = {
        houseId: that.houseId,
        creator: 35365,
        impression: that.impression
      };
      if (that.impression.length == 0) {
        that.$message("印象不能为空");
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
          that.isShowImpression = false;
          that.getImpressionList();
        });
    },
    getImpressionList() {
      let that = this;
      let params = {
        houseId: that.houseId,
        creator: 35365
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
          that.impressionList = result.data;
        });
    },
    deleteImpression(impressionId) {
      let that = this;
      let params = {
        impressionId: impressionId,
        deleter: 35365
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
          that.getImpressionList();
        });
    },
    updateCertificateNo() {
      if (this.isCertificateNo == "0") {
        this.$message("房屋未出证,无法发布到外网");
        this.isShowCertificatetype = false;
      } else {
        let params = {
          houseId: this.houseId,
          houseType: 0,
          perId: 35365,
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
    certificateType() {
      let params = {
        houseId: this.houseId,
        houseType: 0,
        perId: 35365
      };
      if (
        this.houseDetails.certificate_type == null ||
        this.houseDetails.certificate_type == ""
      ) {
        this.isShowCertificatetype = true;
      } else {
        this.releaseOutsideHouse(params);
      }
    },
    releaseOutsideHouse(params) {
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
          that.houseDetails.is_release_outside = 1;
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
    isShowPop(type, replaceType, istrue) {
      let that = this;
      switch (type) {
        case 11:
          that.isShowReport = istrue;
          break;
        case 4:
          if (replaceType == 3) {
            that.isShowKey = istrue;
            if(istrue){
                that.getArea();
            }
            
          }
          break;
        default:
          break;
      }
    },
    isChecking(type, memo, replaceType) {
      let that = this;
      let params = {
        houseId: that.houseId,
        type: type,
        memo: memo
      };
      that.picList = [];
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
          that.isShowPop(type, replaceType, true);
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
            that.isShowPop(type, replaceType, false);
          }
        });
    },
    insertReport() {
      let that = this;
      let params = {
        Eid: that.houseId,
        Type: 11,
        AddPer: 35365,
        OldOwner: 0,
        NewOwner: 35365,
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
    getArea() {
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
          that.areaList = result.data;
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("获取失败");
          }
        });
    },
    getDepartment(value) {
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
          that.departmentList = result.data;
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("获取失败");
          }
        });
    },
    getKeyStorageDept(value) {
      let that = this;
      that.keyStorageDept = value;
    },
    insertReplace(type) {
      let that = this;
      let obj= that.conditionalStatement(type);
      let arry =obj.conditionList;
      let params=obj.params;
      
      for (var i = 0; i < arry.length; i++) {
        if (arry[i].condition) {
          that.$message(arry[i].memo);
          return;
        }
      }
      that.isShowPop(4,type,false);
      this.$api
        .post({
          url: "/agentHouse/propertyCheck/insertReplace",
          data: params,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          },
          token: false
        })
        .then(e => {
           console.log(e);
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          } else {
            that.$message("操作失败");
          }
        });
    },
    conditionalStatement(replaceType) {
      let that = this;
      let params = {
        Eid: that.houseId,
        Type: 4,
        AddPer: 35365,
        NewOwner: 35365,
        ReplaceType:replaceType,
        picList:[]
      };
      let resultobj={};
      let conditionList = [];
      switch (replaceType) {
        case 3:
          conditionList.push({
            condition: util.isNull(that.keyType),
            memo: "取代的钥匙类型未选择"
          });
          if (that.keyType == "2") {
            conditionList.push({
              condition: util.isNull(that.keyCode),
              memo: "钥匙锁密码未填"
            });
            params.keyCode=that.keyCode;
          }
          conditionList.push({
            condition: util.isNull(that.keyStorageDept),
            memo: "存放门店未选择"
          });
          conditionList.push({
            condition: util.isNull(that.picList.join(",")),
            memo: "委托图片未上传"
          });
          params.OldOwner=that.agentHouseMethod.keyOwner;
          params.keyType=that.keyType;
          params.KeyStorageDept=that.keyStorageDept;
          params.picList.push(that.picList[0].id);
          break;
        default:
          break;
      }
      resultobj.conditionList=conditionList;
      resultobj.params=params;
      return resultobj;
    }
  }
};
</script>  