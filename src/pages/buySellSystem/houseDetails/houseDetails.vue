
<style lang="less" scoped>
.query-cell {
  display: flex;
}
.collectHouse {
  color: yellow;
}
.underline {
  border-color: #878787;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 0px;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
<template>
  <div v-loading="loading"
       :element-loading-text="loadingtext"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="query-cell">
      <div>
        <div style=" font-size: 20px;font-weight: bold">{{houseDetails.Title}}</div>
        <div>
          <span>{{houseDetails.areaName}}</span>-
          <span>{{houseDetails.CommunityName}}</span>
        </div>
        <div class="query-cell"
             style="width:300px;overflow-x: scroll;">
          <div v-for="(item,index) in  impressionList"
               :key="index"
               class="query-cell"
               style="margin-left:10px;">
            <div>
              <span style="white-space:nowrap;">{{item.impression}}</span>
            </div>
            <span @click="deleteImpression(item.id)">X</span>
          </div>
        </div>
      </div>
      <div>
        <i class="El-icon-ice-cream-square"></i>
        <el-popover placement="bottom"
                    width="400"
                    trigger="click"
                    v-model="isShowImpression">
          <div>
            <span>仅自己可见</span>
          </div>
          <div>
            <el-input v-model="impression"
                      placeholder="建议输入5个以内"></el-input>
          </div>
          <div>
            <el-button @click="isShowImpression=false">取消</el-button>
            <el-button @click="insertImpression">添加</el-button>
          </div>
          <span slot="reference">房源印象</span>
        </el-popover>
      </div>
      <div style="margin-left:50px;font-size:30px;"
           id="qrcode">房源二维码</div>
      <div style="margin-left:50px;">
        <div style="font-size:15px;">房源编号:</div>
        <div style="font-size:15px;">{{houseDetails.HouseNo}}</div>
        <div style="font-size:12px;color:red">微信扫一扫,立即分享房源</div>
      </div>
      <div style="margin-left:50px;font-size:30px;">
        <el-dialog title="!举报"
                   :visible.sync="isShowReport">
          <div>
            <div>
              <div>
                <el-radio label="1"
                          v-model="reportType">虚假实勘</el-radio>
                <el-radio label="2"
                          v-model="reportType">虚假委托</el-radio>
                <el-radio label="3"
                          v-model="reportType">虚假钥匙</el-radio>
                <el-radio label="4"
                          v-model="reportType">虚假跟进</el-radio>
                <el-radio label="5"
                          v-model="reportType">房屋已售</el-radio>
                <el-radio label="6"
                          v-model="reportType">虚假业主号码</el-radio>
                <el-radio label="7"
                          v-model="reportType">其他</el-radio>
              </div>
              <div>
                <el-input v-model="reportMemo"
                          type="textarea"></el-input>
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
        <i :class="isCollectHouse?'el-icon-star-on  collectHouse':'el-icon-star-on ' "
           style="font-size: 50px;"
           @click="CollectHouseOrCancelCollect"></i>
        <span style="font-size:30px;">{{isCollectHouse?"已关注":"收藏"}}</span>
        <el-dialog :visible.sync="isShowSendNotice"
                   width="20%">
          <span slot="title"
                style="font-size:30px;">临时变动通知</span>
          <div>
            <div>
              <span>*</span>
              <span>请选择是否通知</span>
            </div>
            <div>
              <el-radio-group v-model="isSendNotice"
                              fill="#458B00">
                <el-radio-button label="1">通知</el-radio-button>
                <el-radio-button label="0">不通知</el-radio-button>
              </el-radio-group>
            </div>
            <span>如若选择通知，当收藏者的位移变动时，将会通过微信通知您替换的变化</span>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="isShowSendNotice = false">取 消</el-button>
            <el-button type="primary"
                       @click="updateSendNotice">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div>
      <el-button>验真通过</el-button>
    </div>
    <div class="query-cell"
         style="margin-top:30px;">
      <div style="height:400px;width:600px;">
        <el-carousel>
          <el-carousel-item v-for="(item,index) in houseFileList"
                            :key="index">
            <video :src="item.url"
                   controls="controls"
                   v-if="item.type==0"
                   style="width:100%;heigth:100%;"></video>
            <el-image :src="item.url"
                      fit="fill"
                      v-if="item.type==1"></el-image>
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
        <div class="query-cell">
          <span>小区名称:</span>
          <span>{{houseDetails.CommunityName}}</span>
          <span v-if="!isShowBuilding"
                @click="getShowBuliding">查看楼栋号</span>
          <span v-if="isShowBuilding">-{{houseDetails.BuildingName}}</span>
          <span v-if="isShowBuilding">-{{houseDetails.RoomNo}}</span>
        </div>
        <div class="query-cell"
             style="margin-top:20px;">
          <div class="query-cell">
            <div class="query-cell">
              <div style="position:relative;">
                <el-image style="width:100;height:100px;border-radius:50px;"
                          :src="houseDetails.agentPerHeadImg"></el-image>
                <div :style="[{position:'absolute'}, {'z-index':2}, {left: '-520px' }, {top:'-40px'}]">
                  <div style="text-align: center;border-radius: 13px; background-color: rgba(255,255,255,.5);width: 248px; "
                       v-if="betExpireStr">
                    <p style="padding: 10px 0px;font-size: large;font-weight: bolder">距离房源对赌结束</p>
                    <p style="padding: 0px 0 10px 0;font-size: x-large">还剩 {{ ' ' +  betExpireStr }}</p>
                  </div>
                </div>
              </div>
              <div>
                <div>{{houseDetails.agentPerName}}</div>

                <div>{{houseDetails.agentPerDepartmentName}}</div>
              </div>
              <el-button :data-tel="houseDetails.agentPerTel"
                         @click="oneTouchDialPhone">一键拨号</el-button>
            </div>
          </div>
          <div style="margin-left:20px;">
            <span>{{houseDetails.Customers}}</span>
            <br />
            <el-dropdown @command="contactOwer">
              <el-button type="primary">
                查看号码<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="houseDetails.Tel!=''"
                                  v-text="houseDetails.Tel"
                                  command=""></el-dropdown-item>
                <el-dropdown-item v-if="houseDetails.Tel1!=''"
                                  v-text="houseDetails.Tel1"
                                  command="1"></el-dropdown-item>
                <el-dropdown-item v-if="houseDetails.Tel2!=''"
                                  v-text="houseDetails.Tel2"
                                  command="2"></el-dropdown-item>
                <el-dropdown-item v-if="houseDetails.Tel3!=''"
                                  v-text="houseDetails.Tel3"
                                  command="3"></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button :data-tel="houseDetails.Tel"
                       @click="dialPhoneToFD">联系业主</el-button>
          </div>

        </div>
      </div>
    </div>
    <div>
      <el-popover placement="top"
                  width="600"
                  trigger="click"
                  v-model="isShowCertificatetype">
        <div>
          <div>
            <span>房源是否已出证</span>
          </div>
          <div>
            <span>不懂产权证</span>
            <el-radio v-model="isCertificateNo"
                      label="1">有</el-radio>
            <el-radio v-model="isCertificateNo"
                      label="0">无</el-radio>
          </div>
          <div class="query-cell">
            <span>证号</span>
            <el-input v-model="certificateNo"
                      placeholder="请输入产权证号"
                      v-if="isCertificateNo=='1'"></el-input>
          </div>
          <div>
            <el-button @click="isShowCertificatetype=false">取消</el-button>
            <el-button @click="updateCertificateNo">确定</el-button>
          </div>
        </div>
        <el-button v-if="houseDetails.isReleaseOutside!=1&&(houseDetails.AgentPer==perId||isShowButton.releaseOutsideHouse)"
                   slot="reference"
                   @click="certificateType">发布外网房源</el-button>
      </el-popover>
      <el-button v-if="houseDetails.isReleaseOutside==1&&(houseDetails.AgentPer==perId||isShowButton.cancelOutsideHouse)"
                 @click="cancelOutsideHouse">
        取消发布
      </el-button>

      <el-popover placement="top"
                  width="600"
                  trigger="manual"
                  v-model="isShowRecommend">
        <div>
          <el-input v-model="recommendMemo"
                    type="textarea"
                    placeholder="请输入原因">
          </el-input>
        </div>
        <div>
          <el-button @click="isShowRecommend=false">取消</el-button>
          <el-button @click="insertOrCancelRecommend">添加</el-button>
        </div>
        <el-button slot="reference"
                   @click="isShowRecommend=true">{{isRecommend?'取消推荐':'推荐房源'}}</el-button>
      </el-popover>

      <el-popover placement="top-start"
                  width="520"
                  v-model="addBetVisible"
                  trigger="click">
        <div style="display: inline-flex">
          <div style="width: 240px;float: left">
            <p>说明：</p>
            <p>1、对赌鑫币值封顶为{{betConf.upper}}个</p>
            <p>2、{{betConf.expireDay}}天内成交可获得{{betConf.odds}}倍鑫币</p>
            <p>3、合同审核通过前{{betConf.startHour}}小时提交为有效</p>
          </div>
          <div style="float: left;margin-left: 50px">
            <div style="margin-top: 10px;font-size: medium;color: black;">
              对赌鑫币值<input type="number"
                     v-model="betAmount"
                     style="width: 80px;text-align: center"
                     class="underline" />个
            </div>
            <span style="float: right;margin-right: 20px;font-size: small;">(对赌鑫币{{betConf.lower}}起投)</span>
          </div>
        </div>
        <div style="display: inline-flex;margin-top: 10px">
          <button @click="addBetVisible= false"
                  style=" width: 80px;margin-left: 148px;border: 0px ;background-color: #c0c4cc;font-size: medium;border-radius:5px;">取 消</button>
          <button @click="addBet"
                  style="width: 80px;margin-left: 20px;border: 0px;background-color: #0d824b;font-size: medium;border-radius:5px;">确定</button>
        </div>
        <el-button slot="reference"
                   @click="showBetView">鑫币对赌</el-button>
      </el-popover>
      <el-dialog title=""
                 :visible.sync="addBetSuccess"
                 width="232px"
                 top="300px">
        <div style="margin-top: -40px;margin-bottom: -13px;">
          <div v-if="!addBetResult.status"
               style="margin-right: 13px;">
            <span>{{addBetResult.err}}</span>
          </div>
          <div v-if="addBetResult.status" style="text-align: center;">
            <el-image style="margin-left: 20px" :src="require('../../../assets/images/beton.png')" lazy></el-image>
            <p style="">对赌已生效</p>
            <p style="margin-bottom: 10px;font-size: x-large;color: black;">{{betAmount}}鑫币已支付</p>
            <button style="margin-bottom: -10px;width: 80px;font-size: medium;border: 0px;background-color: #0d824b;border-radius:5px;">加油</button>
          </div>
        </div>
      </el-dialog>

      <el-popover placement="top"
                  width="600"
                  trigger="manual"
                  v-model="isShowChange">
        <div class="query-cell">
          <el-radio-group v-model="changeType">
            <el-radio label="4">他司售</el-radio>
            <el-radio label="6">业主自售</el-radio>
            <el-radio label="5">暂不售</el-radio>
            <el-radio label="3">无效</el-radio>
          </el-radio-group>
        </div>
        <div>
          <div v-if="changeType=='4'"
               style="display:flex">
            <span>成交公司</span>
            <el-input v-model="dealCompany"></el-input>
            <span>成交价</span>
            <el-input v-model="dealPrice"></el-input>
            <span>万元</span>
          </div>
          <div v-if="changeType=='6'">
            <el-radio v-model="subStatus"
                      label="0">疑似跳单</el-radio>
            <el-radio v-model="subStatus"
                      label="1">亲朋好友</el-radio>
          </div>
          <div v-if="changeType=='3'">
            <el-radio v-model="subStatus"
                      label="2">号码错误</el-radio>
            <el-radio v-model="subStatus"
                      label="3">空号</el-radio>
            <el-radio v-model="subStatus"
                      label="4">房源不存在</el-radio>
          </div>
        </div>
        <div>
          <el-button @click="isShowChange=false">取消</el-button>
          <el-button @click="insertChange">添加</el-button>
        </div>
        <el-button slot="reference"
                   @click="isChecking(8,'当前正在审核',0)">转房源状态</el-button>
      </el-popover>

      <el-popover placement="top"
                  width="600"
                  trigger="manual"
                  v-model="isShowCancelMethod">
        <div class="query-cell">
          <el-radio v-model="cancelMethodType"
                    label="0">委托人</el-radio>
          <el-radio v-model="cancelMethodType"
                    label="1">钥匙人</el-radio>
          <el-radio v-model="cancelMethodType"
                    label="2">实勘人</el-radio>
        </div>
        <div>
          <el-input v-model="cancelMemo"
                    placeholder="请输入取消作业人的原因"
                    type="textarea"></el-input>
        </div>
        <div>
          <el-button @click="isShowCancelMethod=false">取消</el-button>
          <el-button @click="cancelMethod">添加</el-button>
        </div>
        <el-button slot="reference"
                   @click="isShowCancelMethod=true"
                   v-if="isShowButton.cancelMethod">取消作业方法</el-button>
      </el-popover>
      <el-button @click="houseLock"
                 v-if="isShowButton.locking">{{houseDetails.isLocking==1 ?"解锁房源":"锁定房源"}}</el-button>
      <el-popover placement="top"
                  width="600"
                  trigger="manual"
                  v-model="isShowKeyStorageDept">
        <div class="query-cell">
          <span>存放门店</span>
          <el-select v-model="areaname"
                     @change="getDepartment"
                     placeholder="请选择区域"
                     style="width:100px;">
            <el-option v-for="(item,index) in areaList"
                       :key="index"
                       :label="item.deptName"
                       :value="item.id"></el-option>
          </el-select>
          <el-select v-model="departmentName"
                     @change="getKeyStorageDept"
                     placeholder="请选择门店"
                     style="width:100px;">
            <el-option v-for="(item,index) in departmentList"
                       :key="index"
                       :label="item.deptName"
                       :value="item.id"></el-option>
          </el-select>
        </div>
        <div>
          <el-button @click="isShowKeyStorageDept=false">取消</el-button>
          <el-button @click="updateKeyStorageDept">添加</el-button>
        </div>
        <el-button slot="reference"
                   @click="showKeyStorageDept"
                   v-if="agentHouseMethod.keyOwner==perId||isShowButton.updateKeyStorageDept">修改钥匙存放门店</el-button>
      </el-popover>
    </div>
    <div class="query-cell"
         style="margin-top:15px;">
      <div>
        <div>
          <span style="font-size:30px;">出色作业方</span>
          <div>
            <div style="display:flex;flex-wrap: wrap;width:700px;">
              <div style="  width: 300px; height: 150px;border: 1px solid;display:flex">
                <el-image :src="agentHouseMethod.addPerHeadImg"
                          style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"></el-image>
                <div style="margin-left:30px;">
                  <div style="font-size:20px;">{{agentHouseMethod.addPerName}}</div>
                  <div>{{agentHouseMethod.addPerDepartmentName}}</div>
                </div>
                <div style="margin-left:30px;">
                  <div>录入人</div>
                  <div :data-tel="agentHouseMethod.addPerTel"></div>
                </div>
              </div>
              <div style="  width: 300px; height: 150px;border: 1px solid;display:flex; margin-left:20px;">
                <div v-if="houseDetails.agentPerName!=null">
                  <el-image :src="houseDetails.agentPerHeadImg"
                            style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"></el-image>
                  <div style="margin-left:30px;">
                    <div style="font-size:20px;">{{houseDetails.agentPerName}}</div>
                    <div>{{houseDetails.agentPerDepartmentName}}</div>
                  </div>
                  <div style="margin-left:30px;">
                    <div>跟单人</div>
                    <div>
                      <span :data-tel="houseDetails.agentPerTel"></span>
                    </div>
                  </div>
                </div>
                <div>
                  <el-dialog title="请填写完这些信息才能申请为跟单人"
                             :visible.sync="isShowApplyAgent"
                             width="50%"
                             :close-on-click-modal="false">
                    <supplement ref="com"
                                :required="required"
                                :middleRadioTo="middleRadio"
                                :primaryRadioTo="primaryRadio"
                                :showFollow="showFollow"
                                :audioList="audioList"></supplement>
                    <span slot="footer"
                          class="dialog-footer">
                      <el-button @click="isShowApplyAgent = false">取 消</el-button>
                      <el-button type="primary"
                                 @click="applyAgent">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-button @click="isShowApplyAgent=true"
                             v-if="houseDetails.agentPerName==null ">申请跟单人</el-button>
                </div>
              </div>
              <div style="  width: 300px; height: 150px;border: 1px solid;display:flex;margin-top:20px;">
                <div v-if="agentHouseMethod.keyOwnerName!=null"
                     style="display:flex">
                  <el-image :src="agentHouseMethod.keyOwnerHeadImg"
                            style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"></el-image>
                  <div style="margin-left:30px;">
                    <div style="font-size:20px;">{{agentHouseMethod.keyOwnerName}}</div>
                    <div>{{agentHouseMethod.keyOwnerDepartmentName}}</div>
                  </div>
                </div>
                <div v-else>
                  <el-popover placement="top"
                              width="600"
                              trigger="manual"
                              v-model="isShowApplyKey">
                    <div class="query-cell">
                      <div>
                        <div>
                          <span>钥匙类型</span>
                          <el-radio v-model="keyType"
                                    label="0">钥匙</el-radio>
                          <el-radio v-model="keyType"
                                    label="1">指纹锁</el-radio>
                          <el-radio v-model="keyType"
                                    label="2">密码锁</el-radio>
                        </div>
                        <div>
                          <el-input v-if="keyType=='2'"
                                    v-model="keyCode"
                                    placeholder="请输入密码"></el-input>
                        </div>
                        <div>
                          <span>存放门店</span>
                          <el-select v-model="areaname"
                                     @change="getDepartment"
                                     placeholder="请选择区域"
                                     style="width:100px;">
                            <el-option v-for="(item,index) in areaList"
                                       :key="index"
                                       :label="item.deptName"
                                       :value="item.id"></el-option>
                          </el-select>
                          <el-select v-model="departmentName"
                                     @change="getKeyStorageDept"
                                     placeholder="请选择门店"
                                     style="width:100px;">
                            <el-option v-for="(item,index) in departmentList"
                                       :key="index"
                                       :label="item.deptName"
                                       :value="item.id"></el-option>
                          </el-select>
                        </div>
                      </div>
                      <div>
                        <el-upload :action="''"
                                   list-type="picture"
                                   :limit="1"
                                   name='{"list":7,"type":0}'
                                   :before-upload="beforeAvatarUpload"
                                   :http-request="uploadFile"
                                   :file-list="fileList.list7"
                                   :on-remove="removeImg"
                                   multiple>
                          <i class="el-icon-plus"></i>
                          <br />
                          <el-button>请上传委托图片</el-button>
                        </el-upload>
                      </div>
                      <div>
                        <img class="phone-upload-img"
                             src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                             alt="手机上传图片二维码"
                             style="height:100px;" />
                      </div>
                    </div>
                    <div>
                      <el-button @click="isShowApplyKey=false">取消</el-button>
                      <el-button @click="insertCheck(0,0)">添加</el-button>
                    </div>
                    <el-button slot="reference"
                               @click="isChecking(0,'当前正在审核中',0)">申请钥匙人</el-button>
                  </el-popover>
                </div>
                <div style="margin-left:30px;">
                  <div>钥匙人</div>
                  <div>
                    <span :data-tel="agentHouseMethod.keyOwnerTel"></span>

                    <el-popover placement="top-start"
                                width="600"
                                trigger="click"
                                v-model="isShowKey">
                      <div class="query-cell">
                        <div>
                          <div>
                            <span>钥匙类型</span>
                            <el-radio v-model="keyType"
                                      label="0">钥匙</el-radio>
                            <el-radio v-model="keyType"
                                      label="1">指纹锁</el-radio>
                            <el-radio v-model="keyType"
                                      label="2">密码锁</el-radio>
                          </div>
                          <div>
                            <el-input v-if="keyType=='2'"
                                      v-model="keyCode"
                                      placeholder="请输入密码"></el-input>
                          </div>
                          <div>
                            <span>存放门店</span>
                            <el-select v-model="areaname"
                                       @change="getDepartment"
                                       placeholder="请选择区域"
                                       style="width:100px;">
                              <el-option v-for="(item,index) in areaList"
                                         :key="index"
                                         :label="item.deptName"
                                         :value="item.id"></el-option>
                            </el-select>
                            <el-select v-model="departmentName"
                                       @change="getKeyStorageDept"
                                       placeholder="请选择门店"
                                       style="width:100px;">
                              <el-option v-for="(item,index) in departmentList"
                                         :key="index"
                                         :label="item.deptName"
                                         :value="item.id"></el-option>
                            </el-select>
                          </div>
                        </div>
                        <div>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="1"
                                     name='{"list":7,"type":4}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list7"
                                     :on-remove="removeImg"
                                     multiple>
                            <i class="el-icon-plus"></i>
                            <br />
                            <el-button>请上传委托图片</el-button>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div>
                        <el-button @click="isShowKey=false">取消</el-button>
                        <el-button @click="insertCheck(4,3)">添加</el-button>
                      </div>
                      <el-button v-if="agentHouseMethod.keyOwnerName!=null"
                                 slot="reference"
                                 @click="isChecking(4,'当前正在审核中',3)">取代</el-button>
                    </el-popover>
                  </div>
                </div>
              </div>
              <div style="  width: 300px; height: 150px;border: 1px solid;display:flex;margin-top:20px;margin-left:20px;">
                <div v-if="agentHouseMethod.onlyOwnerName!=null"
                     style="display:flex">
                  <el-image :src="agentHouseMethod.onlyOwnerHeadImg"
                            style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"></el-image>
                  <div style="margin-left:30px;">
                    <div style="font-size:20px;">{{agentHouseMethod.onlyOwnerName}}</div>
                    <div>{{agentHouseMethod.onlyOwnerDepartmentName}}</div>
                  </div>
                </div>
                <div v-else>
                  <el-popover placement="top"
                              width="600"
                              trigger="manual"
                              v-model="isShowApplyOnly">
                    <div class="query-cell">
                      <div>
                        <div>
                          <span>委托类型</span>
                          <el-radio v-model="onlyType"
                                    label="2">普通委托</el-radio>
                          <el-radio v-model="onlyType"
                                    label="1">独家委托</el-radio>
                          <el-radio v-model="onlyType"
                                    label="3">限时销售</el-radio>
                        </div>
                        <div>
                          <span>委托截止时间:</span>
                          <el-date-picker v-model="proxyMaxTime"
                                          type="datetime"
                                          value-format="yyyy-MM-dd HH:mm:ss"
                                          placeholder="选择日期"></el-date-picker>
                        </div>
                      </div>
                      <div>
                        <el-upload :action="''"
                                   list-type="picture"
                                   :limit="1"
                                   name='{"list":7,"type":1}'
                                   :before-upload="beforeAvatarUpload"
                                   :http-request="uploadFile"
                                   :file-list="fileList.list7"
                                   :on-remove="removeImg"
                                   multiple>
                          <i class="el-icon-plus"></i>
                          <br />
                          <el-button>请上传委托图片</el-button>
                        </el-upload>
                      </div>
                      <div>
                        <img class="phone-upload-img"
                             src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                             alt="手机上传图片二维码"
                             style="height:100px;" />
                      </div>
                    </div>
                    <div>
                      <el-button @click="isShowApplyOnly=false">取消</el-button>
                      <el-button @click="insertCheck(1,0)">添加</el-button>
                    </div>
                    <el-button slot="reference"
                               @click="isChecking(1,'当前正在审核中',0)">申请委托人</el-button>
                  </el-popover>
                </div>
                <div style="margin-left:30px;">
                  <div>委托人</div>
                  <div>
                    <span :data-tel="agentHouseMethod.onlyOwnerTel"></span>

                    <el-popover placement="top-start"
                                width="600"
                                trigger="click"
                                v-model="isShowOnly">
                      <div class="query-cell">
                        <div>
                          <div>
                            <span>委托类型</span>
                            <el-radio v-model="onlyType"
                                      label="2">普通委托</el-radio>
                            <el-radio v-model="onlyType"
                                      label="1">独家委托</el-radio>
                            <el-radio v-model="onlyType"
                                      label="3">限时销售</el-radio>
                          </div>
                          <div>
                            <span>委托截止时间:</span>
                            <el-date-picker v-model="proxyMaxTime"
                                            type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期"></el-date-picker>
                          </div>
                        </div>
                        <div>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="1"
                                     name='{"list":7,"type":4}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list7"
                                     :on-remove="removeImg"
                                     multiple>
                            <i class="el-icon-plus"></i>
                            <br />
                            <el-button>请上传委托图片</el-button>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div>
                        <el-button @click="isShowOnly=false">取消</el-button>
                        <el-button @click="insertCheck(4,2)">添加</el-button>
                      </div>
                      <el-button v-if="agentHouseMethod.onlyOwnerName!=null"
                                 slot="reference"
                                 @click="isChecking(4,'当前正在审核中',2)">取代</el-button>
                    </el-popover>
                  </div>
                </div>
              </div>

              <div style="  width: 300px; height: 150px;border: 1px solid;display:flex;margin-top:20px;">
                <div v-if="agentHouseMethod.realOwnerName!=null"
                     style="display:flex">
                  <el-image :src="agentHouseMethod.realOwnerHeadImg"
                            style="width: 80px;border-radius: 40px;border: 1 px solid;border: 1px solid;height: 80px;"></el-image>
                  <div style="margin-left:30px;">
                    <div style="font-size:20px;">{{agentHouseMethod.realOwnerName}}</div>
                    <div>{{agentHouseMethod.realOwnerTel}}</div>
                  </div>
                </div>
                <div v-else>
                  <el-popover placement="top"
                              width="600"
                              trigger="manual"
                              v-model="isShowApplyReal">
                    <div>
                      <div style="display:flex">
                        <div style="display:flex">
                          <span>外景图</span>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="9"
                                     name='{"list":1,"type":12,"subType":1}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list1"
                                     :on-remove="removeImg"
                                     multiple
                                     style="display:flex">
                            <div>
                              <i class="el-icon-plus"></i>
                              <el-button>上传图片</el-button>
                            </div>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div style="display:flex">
                        <div style="display:flex">
                          <span>客厅</span>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="9"
                                     name='{"list":4,"type":12,"subType":4}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list4"
                                     :on-remove="removeImg"
                                     multiple
                                     style="display:flex">
                            <div>
                              <i class="el-icon-plus"></i>
                              <el-button>上传图片</el-button>
                            </div>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div style="display:flex">
                        <div style="display:flex">
                          <span>卧室</span>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="9"
                                     name='{"list":2,"type":12,"subType":2}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list2"
                                     :on-remove="removeImg"
                                     multiple
                                     style="display:flex">
                            <div>
                              <i class="el-icon-plus"></i>
                              <el-button>上传图片</el-button>
                            </div>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div style="display:flex">
                        <div style="display:flex">
                          <span>厨房</span>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="9"
                                     name='{"list":3,"type":12,"subType":3}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list3"
                                     :on-remove="removeImg"
                                     multiple
                                     style="display:flex">
                            <div>
                              <i class="el-icon-plus"></i>
                              <el-button>上传图片</el-button>
                            </div>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div style="display:flex">
                        <div style="display:flex">
                          <span>卫生间</span>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="9"
                                     name='{"list":5,"type":12,"subType":5}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list5"
                                     :on-remove="removeImg"
                                     multiple
                                     style="display:flex">
                            <div>
                              <i class="el-icon-plus"></i>
                              <el-button>上传图片</el-button>
                            </div>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div style="display:flex">
                        <div style="display:flex">
                          <span>户型图</span>
                          <el-upload :action="''"
                                     list-type="picture"
                                     :limit="9"
                                     name='{"list":6,"type":12,"subType":6}'
                                     :before-upload="beforeAvatarUpload"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list6"
                                     :on-remove="removeImg"
                                     multiple
                                     style="display:flex">
                            <div>
                              <i class="el-icon-plus"></i>
                              <el-button>上传图片</el-button>
                            </div>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div style="display:flex">
                        <div style="display:flex">
                          <span>视频</span>
                          <el-upload :action="''"
                                     ref="videoUpload"
                                     :limit="3"
                                     name='{"list":8,"type":12,"subType":7}'
                                     :before-upload="beforeAvatarUploadVideo"
                                     :http-request="uploadFile"
                                     :file-list="fileList.list8"
                                     :on-remove="removeImg"
                                     :on-preview="handlePreviewVideo"
                                     multiple
                                     accept=".mp4"
                                     style="display:flex">
                            <div>
                              <i class="el-icon-plus"></i>
                              <el-button>上传视频</el-button>
                            </div>
                          </el-upload>
                        </div>
                        <div>
                          <img class="phone-upload-img"
                               src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                               alt="手机上传图片二维码"
                               style="height:100px;" />
                        </div>
                      </div>
                      <div>
                        <el-button @click="isShowApplyReal=false">取消</el-button>
                        <el-button @click="insertCheck(12,0)">添加</el-button>
                      </div>
                    </div>
                    <el-button slot="reference"
                               @click="isChecking(12,'当前正在审核中',0)">申请实勘人</el-button>
                  </el-popover>
                </div>
                <div style="margin-left:30px;">
                  <div>实勘人</div>
                  <div>
                    <el-popover placement="top-start"
                                width="600"
                                trigger="click"
                                offset="-100"
                                v-model="isShowReal">
                      <div>
                        <div style="display:flex">
                          <div style="display:flex">
                            <span>外景图</span>
                            <el-upload :action="''"
                                       list-type="picture"
                                       :limit="9"
                                       name='{"list":1,"type":12,"subType":1}'
                                       :before-upload="beforeAvatarUpload"
                                       :http-request="uploadFile"
                                       :file-list="fileList.list1"
                                       :on-remove="removeImg"
                                       multiple
                                       style="display:flex">
                              <div>
                                <i class="el-icon-plus"></i>
                                <el-button>上传图片</el-button>
                              </div>
                            </el-upload>
                          </div>
                          <div>
                            <img class="phone-upload-img"
                                 src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                                 alt="手机上传图片二维码"
                                 style="height:100px;" />
                          </div>
                        </div>
                        <div style="display:flex">
                          <div style="display:flex">
                            <span>客厅</span>
                            <el-upload :action="''"
                                       list-type="picture"
                                       :limit="9"
                                       name='{"list":4,"type":12,"subType":4}'
                                       :before-upload="beforeAvatarUpload"
                                       :http-request="uploadFile"
                                       :file-list="fileList.list4"
                                       :on-remove="removeImg"
                                       multiple
                                       style="display:flex">
                              <div>
                                <i class="el-icon-plus"></i>
                                <el-button>上传图片</el-button>
                              </div>
                            </el-upload>
                          </div>
                          <div>
                            <img class="phone-upload-img"
                                 src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                                 alt="手机上传图片二维码"
                                 style="height:100px;" />
                          </div>
                        </div>
                        <div style="display:flex">
                          <div style="display:flex">
                            <span>卧室</span>
                            <el-upload :action="''"
                                       list-type="picture"
                                       :limit="9"
                                       name='{"list":2,"type":12,"subType":2}'
                                       :before-upload="beforeAvatarUpload"
                                       :http-request="uploadFile"
                                       :file-list="fileList.list2"
                                       :on-remove="removeImg"
                                       multiple
                                       style="display:flex">
                              <div>
                                <i class="el-icon-plus"></i>
                                <el-button>上传图片</el-button>
                              </div>
                            </el-upload>
                          </div>
                          <div>
                            <img class="phone-upload-img"
                                 src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                                 alt="手机上传图片二维码"
                                 style="height:100px;" />
                          </div>
                        </div>
                        <div style="display:flex">
                          <div style="display:flex">
                            <span>厨房</span>
                            <el-upload :action="''"
                                       list-type="picture"
                                       :limit="9"
                                       name='{"list":3,"type":12,"subType":3}'
                                       :before-upload="beforeAvatarUpload"
                                       :http-request="uploadFile"
                                       :file-list="fileList.list3"
                                       :on-remove="removeImg"
                                       multiple
                                       style="display:flex">
                              <div>
                                <i class="el-icon-plus"></i>
                                <el-button>上传图片</el-button>
                              </div>
                            </el-upload>
                          </div>
                          <div>
                            <img class="phone-upload-img"
                                 src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                                 alt="手机上传图片二维码"
                                 style="height:100px;" />
                          </div>
                        </div>
                        <div style="display:flex">
                          <div style="display:flex">
                            <span>卫生间</span>
                            <el-upload :action="''"
                                       list-type="picture"
                                       :limit="9"
                                       name='{"list":5,"type":12,"subType":5}'
                                       :before-upload="beforeAvatarUpload"
                                       :http-request="uploadFile"
                                       :file-list="fileList.list5"
                                       :on-remove="removeImg"
                                       multiple
                                       style="display:flex">
                              <div>
                                <i class="el-icon-plus"></i>
                                <el-button>上传图片</el-button>
                              </div>
                            </el-upload>
                          </div>
                          <div>
                            <img class="phone-upload-img"
                                 src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                                 alt="手机上传图片二维码"
                                 style="height:100px;" />
                          </div>
                        </div>
                        <div style="display:flex">
                          <div style="display:flex">
                            <span>户型图</span>
                            <el-upload :action="''"
                                       list-type="picture"
                                       :limit="9"
                                       name='{"list":6,"type":12,"subType":6}'
                                       :before-upload="beforeAvatarUpload"
                                       :http-request="uploadFile"
                                       :file-list="fileList.list6"
                                       :on-remove="removeImg"
                                       multiple
                                       style="display:flex">
                              <div>
                                <i class="el-icon-plus"></i>
                                <el-button>上传图片</el-button>
                              </div>
                            </el-upload>
                          </div>
                          <div>
                            <img class="phone-upload-img"
                                 src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                                 alt="手机上传图片二维码"
                                 style="height:100px;" />
                          </div>
                        </div>
                        <div style="display:flex">
                          <div style="display:flex">
                            <span>视频</span>
                            <el-upload :action="''"
                                       ref="videoUpload"
                                       :limit="3"
                                       name='{"list":8,"type":12,"subType":7}'
                                       :before-upload="beforeAvatarUploadVideo"
                                       :http-request="uploadFile"
                                       :file-list="fileList.list8"
                                       :on-remove="removeImg"
                                       :on-preview="handlePreviewVideo"
                                       multiple
                                       accept=".mp4"
                                       style="display:flex">
                              <div>
                                <i class="el-icon-plus"></i>
                                <el-button>上传视频</el-button>
                              </div>
                            </el-upload>
                          </div>
                          <div>
                            <img class="phone-upload-img"
                                 src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                                 alt="手机上传图片二维码"
                                 style="height:100px;" />
                          </div>
                        </div>
                        <div>
                          <el-button @click="isShowReal=false">取消</el-button>
                          <el-button @click="insertCheck(4,5)">添加</el-button>
                        </div>
                      </div>
                      <el-button v-if="agentHouseMethod.realOwnerName!=null"
                                 slot="reference"
                                 @click="isChecking(4,'当前正在审核中',5)">取代</el-button>
                    </el-popover>
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
            <span style="margin-left:50px;">{{houseDetails.certificateType}}</span>
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
            <span style="margin-left:50px;">{{ houseDetails.LastTransactionAmount}}</span>
            <span v-if="houseDetails.LastTransactionAmount!=null&&houseDetails.LastTransactionAmount!=''">万元</span>
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
            <span style="margin-left:50px;">{{houseDetails.balance}}</span>
            <span v-if="houseDetails.balance!=null&&houseDetails.balance!=''">万元</span>
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
                <el-button v-for="(item,index) in  switchoverList"
                           :key="index"
                           :type="switchIndex==index?'':'info'"
                           @click="cut(index)">{{item}}</el-button>
              </el-button-group>
            </div>
            <div style="height:300px;border:1px solid #DCDFE6;width:500px;overflow-y: scroll;"
                 class="act-not">
              <div v-if="switchIndex==0">
                <div>
                  <el-radio v-model="followType"
                            label="27">出售条件变化</el-radio>
                  <el-radio v-model="followType"
                            label="28">业主心态状态</el-radio>
                  <el-radio v-model="followType"
                            label="11">其他</el-radio>
                  <div>
                    <el-input type="textarea"
                              :rows="2"
                              placeholder="请输入内容"
                              v-model="followMemo"></el-input>
                  </div>
                  <div>
                    <el-button @click="insertFollow">提交</el-button>
                  </div>
                </div>
                <div v-for="(item,index) in  followList"
                     :key="index">
                  <div>
                    <span>{{item.FollowTime}}</span>
                    <el-button @click="deleteFollow(item.id)"
                               v-if="isShowButton.deleteFollow">删除</el-button>
                  </div>
                  <div>
                    <div v-if="!item.isTellFollow">
                      <span v-if="item.followPerName!=null&&item.followPerName!=''">{{item.followPerName}}({{item.followPerDepartmentName}}),</span>
                      <span>{{item.Memo}}</span>
                    </div>
                    <div v-else>
                      <audio :src="item.Memo"
                             controls="controls"></audio>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="switchIndex==1">
                <div v-for="(item,index) in  followPairList"
                     :key="index"
                     style="height:70px;">
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
              <div>
                <div v-for="(item,index) in  followTelList"
                     :key="index"
                     style="height:70px;">
                  <div>
                    <span>{{item.FollowTime}}</span>
                  </div>
                  <div>
                    <div>
                      <span>{{item.followName}}({{item.followDepartment}}),</span>
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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt
           v-if="showFlag" />
      <video :src="dialogImageUrl"
             v-if="!showFlag"
             controls="controls"
             class="videoClass">您的浏览器不支持此视频播放</video>
    </el-dialog>
  </div>
</template>
<script>
import { HOUSEBELONGLIST } from "@/util/constMap";
import QRCode from "qrcodejs2";
import util from "@/util/util";
import supplement from "@/pages/buySellSystem/addHouse/components/supplement"
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {
    supplement
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
      ruleId: 15,
      showFollow: true,//是否显示组件的跟进
      audioList: []//音频文件
    };
  },
  before () { },
  mounted () {
    if (this.$route.params.betExpire) {
      this.betExpire = this.$route.params.betExpire;

      const chatTimer = setInterval(() => {
        console.log(chatTimer);
        this.showtime();
      }, 1000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(chatTimer);
      })
    }
    if (this.$route.params.houseId) {
      this.houseId = this.$route.params.houseId;
      util.localStorageSet("houseDetails.vue:houseId", this.houseId);
    }
    else {
      this.houseId = util.localStorageGet("houseDetails.vue:houseId");
    }
    this.getBetInfo()
    console.log(this.$route.params.houseId);
    const chatTimer = setInterval(() => {
      console.log(chatTimer);
      this.showtime();
    }, 1000);

    this.$once('hook:beforeDestroy', () => {
      clearInterval(chatTimer);
    })

    if (util.localStorageGet("logindata")) {
      this.perId = util.localStorageGet("logindata").accountId;
    }
    this.getHouseDetails();
    this.getisCollectHouse();
    this.getHouseFollow();
    this.getImpressionList();
    this.getisRecommend();
    this.getAgentRules();
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
  destroyed () {
    this.$store.commit("resetFormData");
  },
  methods: {
    getAgentRules () {
      let that = this;
      this.$api.get({
        url: '/sys/rule/function/list',
        data: {
          rId: that.ruleId
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
      this.betExpireStr = leftd + "天" + this.zerofill(lefth ,2)+ "时" + this.zerofill(leftm,2) + "分";  //返回倒计时的字符串
    },
    zerofill(number,length){
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
          this.addBetVisible = false
          this.addBetResult.status = true;
        } else {
          this.$message.error(data.message);
          this.addBetResult.status = false;
          this.addBetResult.err = data.message;
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
                    that.houseDetails.applyAgentVo.communityDesc = Arry2[1];
                    break;
                  case "户型介绍":
                    that.houseTypePresentation = Arry2[1];
                    that.houseDetails.applyAgentVo.roomDesc = Arry2[1];
                    break;
                  case "税费解析":
                    that.taxParsing = Arry2[1];
                    that.houseDetails.applyAgentVo.taxDesc = Arry2[1];
                    break;
                  case "核心卖点":
                    that.coreSellingPoint = Arry2[1];
                    that.houseDetails.applyAgentVo.saleDesc = Arry2[1];
                    break;
                }
              }
            }
            that.$store.commit("updateStep2", that.houseDetails.applyAgentVo);
            that.audioList = that.houseDetails.applyAgentVo.saleUploadAudioList;
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
