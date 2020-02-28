<style lang="less" scoped>
//@import url("../../../../assets/publicLess/addHouse.less");
.page-cell-addHouse {
  padding: 0 50px;
}
.page-cell-item-flex {
  display: flex;
}
.form-error-tips {
  position: relative;
  &.select-pad-width_100 {
    margin-left: 20px;
    .item-before {
      width: 60px !important;
    }
    /deep/.el-input__inner {
      width: 110px !important;
      padding-right: 0 !important;
    }
  }
  &.after-tips {
    &::after {
      position: absolute;
      content: attr(data-tips);
      color: red;
      font-size: 13px;
      bottom: 0;
      transform: translateY(100%);
    }
  }
  .page-cell-item {
    display: flex;
    display: -webkit-box; // flex 导致文本居中有问题，把前缀优先暂无问题
    /deep/.el-input__inner {
      width: 180px;
    }
    .el-input-group {
      width: auto;
    }
    /deep/.el-input-group__prepend {
      padding: 0;
      border: none;
      background: none;
      white-space: normal;
    }
    /deep/.el-input-group__append {
      padding: 0;
      background: none;
      border: none;
      .item-before-col {
        text-align: center;
        margin-left: 10px;
        color: #1d8957;
      }
    }
    &.select-nobor {
      /deep/.el-input__inner {
        border: none;
        border-bottom: 1px solid #c0c4cc;
        border-radius: 0;
      }
    }
    .item-before {
      position: relative;
      width: 80px;
      margin-right: 10px;
      height: 40px;
      line-height: 40px;
      text-align: justify;
      font-size: 15px;
      padding-left: 10px;
      box-sizing: border-box;
      color: #666;
      &::before {
        content: attr(data-before);
        color: red;
        position: absolute;
        left: 0;
      }
      &::after {
        content: "";
        width: 100%;
        display: inline-block;
      }
    }
  }
}

.center-flex {
  align-items: center;
}
.input-after-checkbox {
  margin-left: 30px;
}
.margin-bot_20 {
  margin-bottom: 20px;
}
.maging-top_60 {
  margin-top: 60px;
}
.dividing_line {
  height: 1px;
  background: #c0c4cc;
  margin-top: 20px;
}
.cell-tabs {
  flex-wrap: wrap;
  margin-top: 60px;
  .page-cell-item-flex {
    flex: 0 0 50%;
    align-items: center;
    font-size: 15px;
    margin-top: 20px;
    .cell-tabs-item-title {
      width: 80px;
      margin-right: 25px;
      font-size: inherit;
      color: #c0c0c0;
      text-align: justify;
      height: 40px;
      line-height: 40px;
      &:after {
        display: inline-block;
        width: 100%;
        content: "";
      }
    }
    .cell-tabs-item-data {
      font-size: inherit;
      color: #666;
      display: flex;
      .item-deep-data {
        color: inherit;
      }
      .but-append {
        cursor: pointer;
        margin-left: 10px;
        color: #0d824b;
        align-self: center;
        &::before {
          content: attr(data-tips);
          font-size: 13px;
          text-decoration: underline;
        }
      }
    }
  }
}
.min-input {
  border: none;
  outline: none;
  border-bottom: 1px solid #999;
  width: 40px;
  text-align: center;
  font-size: 15px;
}
</style>
<template>
  <div class="page-cell-addHouse">
    <!-- 楼盘名称 -->
    <div class="page-cell-item-flex">
      <div class="form-error-tips"
           :class="{'after-tips':errorBags.has('communityId')}"
           :data-tips="errorBags.first('communityId')">
        <div class="page-cell-item select-nobor">
          <div class="item-before"
               data-before="*">楼盘</div>
          <el-select filterable
                     remote
                     :remote-method="remoteCommunityName"
                     data-vv-name="communityId"
                     data-vv-as="楼盘名称"
                     v-validate="'required'"
                     v-model="formData.communityId"
                     placeholder="请选择楼盘名称"
                     @focus="remoteCommunityNameInput"
                     @change="remoteCommunityNameChange"
                     :loading="selectPageCommunit.loading">
            <el-option v-for="item in selectPageCommunit.list"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 栋座 -->
      <div class="form-error-tips select-pad-width_100"
           :class="{'after-tips':errorBags.has('buildingId')}"
           :data-tips="errorBags.first('buildingId')">
        <div class="page-cell-item">
          <div class="item-before"
               data-before="*">栋座</div>
          <el-select filterable
                     remote
                     :remote-method="remoteBuildingNo"
                     data-vv-name="buildingId"
                     data-vv-as="栋座"
                     v-validate="'required'"
                     v-model="formData.buildingId"
                     @change="remoteBuildingNoChange"
                     :loading="selectPageeBuildingNo.loading"
                     placeholder="请选择栋座">
            <el-option v-for="item in selectPageeBuildingNo.list"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 房间号 -->
      <div class="form-error-tips select-pad-width_100"
           :class="{'after-tips':errorBags.has('roomId')}"
           :data-tips="errorBags.first('roomId')">
        <div class="page-cell-item ">
          <div class="item-before "
               data-before="*">房间号</div>
          <el-select filterable
                     remote
                     :remote-method="remoteRoomNo"
                     data-vv-name="roomId"
                     data-vv-as="房间号"
                     v-validate="'required'"
                     v-model="formData.roomId"
                     :loading="selectPageRoomNo.loading"
                     @change="remoteRoomNoChange"
                     placeholder="请选择房间号">
            <el-option v-for="item in selectPageRoomNo.list"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 业主姓名 -->
    <div class="form-error-tips maging-top_60 margin-bot_20 "
         :class="{'after-tips':errorBags.has('customerName')}"
         :data-tips="errorBags.first('customerName')">
      <div class="page-cell-item select-nobor center-flex">
        <el-input placeholder="请输入业主姓名"
                  data-vv-name="customerName"
                  data-vv-as="业主姓名"
                  v-validate="'required'"
                  v-model="formData.customerName">
          <div slot="prepend"
               class="item-before"
               data-before="*"> 业主姓名</div>
        </el-input>
        <div class="input-after-checkbox">
          <el-radio-group v-model="formData.sex"
                          size="mini">
            <el-radio :label="item.label"
                      v-for="(item, index) in sexList"
                      :key="index">{{ item.title }}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 电话号码 -->
    <div class="form-error-tips margin-bot_20"
         :class="{'after-tips':errorBags.has('tel')}"
         :data-tips="errorBags.first('tel')">
      <div class="page-cell-item select-nobor">
        <el-input placeholder="默认拨打为第一个号码"
                  v-model="formData.tel"
                  data-vv-name="tel"
                  data-vv-as="电话号码"
                  v-validate="'required|phone'">
          <div slot="prepend"
               class="item-before"
               data-before="*">手机号</div>
          <div slot="append"
               @click="addTelToList"
               class="item-after item-before-col">
            <i class="el-icon-circle-plus-outline"></i>
            <div>新增</div>
          </div>
        </el-input>
      </div>
    </div>
    <!-- 电话号码 for -->
    <div class="form-error-tips margin-bot_20"
         :class="{'after-tips':errorBags.has('tel'+item)}"
         :data-tips="errorBags.first('tel'+item)"
         v-for="(item,index) in addTel"
         :key="index">
      <div class="page-cell-item select-nobor">
        <el-input placeholder="请输入业主电话号码"
                  v-model="formData['tel'+item]"
                  :data-vv-name="'tel'+item"
                  :data-vv-as="'电话号码'+item"
                  v-validate="'phone'">
          <div slot="prepend"
               class="item-before">手机号{{item}}</div>
          <div slot="append"
               @click="removeTelToList(index,item)"
               class="item-after item-before-col">
            <i class="el-icon-circle-plus-outline"></i>
            <div>删除</div>
          </div>
        </el-input>
      </div>
    </div>
    <div class="page-cell-item-flex maging-top_60 margin-bot_20">
      <!-- 房屋证件 -->
      <div class="form-error-tips"
           :class="{'after-tips':errorBags.has('certificateType')}"
           :data-tips="errorBags.first('certificateType')">
        <div class="page-cell-item">
          <div class="item-before">房屋证件</div>
          <el-select v-model="formData.certificateType"
                     v-validate="'required'"
                     data-vv-name="certificateType"
                     data-vv-as="房屋证件"
                     placeholder="请选择房屋证件">
            <el-option v-for="item in certificateType"
                       :key="item.label"
                       :label="item.title"
                       :value="item.label">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 售价 -->
      <div class="form-error-tips select-pad-width_100"
           :class="{'after-tips':errorBags.has('price')}"
           :data-tips="errorBags.first('price')">
        <div class="page-cell-item select-nobor">
          <el-input placeholder="请输入售价"
                    v-validate="'required|decimal:2'"
                    data-vv-name="price"
                    data-vv-as="售价"
                    v-model="formData.price">
            <div slot="prepend"
                 class="item-before"
                 data-before="*">售价</div>
            <div slot="append"
                 class="item-after item-before-col">万</div>
          </el-input>
        </div>
      </div>
      <!-- 底价 -->
      <div class="form-error-tips select-pad-width_100"
           :class="{'after-tips':errorBags.has('bottomPrice')}"
           :data-tips="errorBags.first('bottomPrice')">
        <div class="page-cell-item select-nobor">
          <el-input placeholder="请输入底价"
                    data-vv-name="bottomPrice"
                    data-vv-as="底价"
                    v-validate="'required|decimal:2'"
                    v-model="formData.bottomPrice">
            <div slot="prepend"
                 class="item-before"
                 data-before="*">底价</div>
            <div slot="append"
                 class="item-after item-before-col">万</div>
          </el-input>
        </div>
      </div>
    </div>
    <!-- 证号 -->
    <div class="form-error-tips margin-bot_20">
      <div class="page-cell-item select-nobor">
        <el-input placeholder="请输入产权证号">
          <div slot="prepend"
               class="item-before">证号</div>
        </el-input>
      </div>
    </div>
    <div class="dividing_line"></div>
    <div class="cell-tabs page-cell-item-flex">
      <div class="page-cell-item-flex form-error-tips"
           :class="{'after-tips':errorBags.has('area')}"
           :data-tips="errorBags.first('area')">
        <div class="cell-tabs-item-title">面积</div>
        <div class="cell-tabs-item-data">
          <div class="item-deep-data">
            <input type="text"
                   placeholder="填写"
                   data-vv-name="area"
                   data-vv-as="面积"
                   v-validate="'decimal:2'"
                   v-model="formData.area"
                   class="min-input"
                   v-if="changeBut.price">
            <span v-else>89平方</span>
          </div>
          <div class="but-append"
               :data-tips="changeBut.price ? '完成' : '修改'"
               @click="changeBut.price = !changeBut.price"><i class="el-icon-question"></i></div>
        </div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">房型</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">物业公司</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">评估价</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">房屋朝向</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">电梯</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">房屋用途</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">土地性质</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">产权性质</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">户型结构</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">房屋结构</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">小学划片</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">竣工时间</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
      <div class="page-cell-item-flex">
        <div class="cell-tabs-item-title">中学划片</div>
        <div class="cell-tabs-item-data">89平米</div>
      </div>
    </div>
    <!-- 面积 -->
    <!-- <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('area')}"
         :data-tips="errorBags.first('area')">
      <div class="page-cell-item">
        <el-input placeholder="请输入面积"
                  data-vv-name="area"
                  data-vv-as="面积"
                  v-validate="'decimal:2'"
                  v-model="formData.area">
          <div slot="prepend"
               class="item-before">面积</div>
          <div slot="append"
               class="item-after item-before-col">平米</div>
        </el-input>
      </div>
    </div> -->
    <!-- 房型 -->
    <!-- <div class="form-error-tips"
         :class="{'after-tips':getErrorFlag}"
         :data-tips="getErrorText">
      <div class="page-cell-item">
        <div class="item-before">房型</div>
        <div class="item-input-groud">
          <el-input v-model="formData.room"
                    v-validate="'numeric|max:2'"
                    data-vv-name="room"
                    data-vv-as="室">
            <div slot="append"
                 class="item-after item-before-col">室</div>
          </el-input>
          <el-input v-model="formData.hall"
                    v-validate="'numeric|max:2'"
                    data-vv-name="hall"
                    data-vv-as="厅">
            <div slot="append"
                 class="item-after item-before-col">厅</div>
          </el-input>
          <el-input v-model="formData.toilet"
                    v-validate="'numeric|max:2'"
                    data-vv-name="toilet"
                    data-vv-as="卫">
            <div slot="append"
                 class="item-after item-before-col">卫</div>
          </el-input>
          <el-input v-model="formData.balcony"
                    v-validate="'numeric|max:2'"
                    data-vv-name="balcony"
                    data-vv-as="阳台">
            <div slot="append"
                 class="item-after item-before-col">阳台</div>
          </el-input>
        </div>
      </div>
    </div> -->
    <!-- 朝向 -->
    <!-- <div class="form-error-tips">
      <div class="page-cell-item">
        <div slot="prepend"
             class="item-before">朝向</div>
        <el-radio-group v-model="formData.face"
                        size="mini">
          <el-radio :label="item.label"
                    border
                    v-for="(item, index) in orientationList"
                    :key="index">{{ item.title }}</el-radio>
        </el-radio-group>
      </div>
    </div> -->
    <!-- 装修 -->
    <!-- <div class="form-error-tips">
      <div class="page-cell-item">
        <div slot="prepend"
             class="item-before">装修类型</div>
        <el-radio-group v-model="formData.decoration"
                        size="mini">
          <el-radio :label="item.label"
                    border
                    v-for="(item, index) in renovationList"
                    :key="index">{{ item.title }}</el-radio>
        </el-radio-group>
      </div>
    </div> -->
    <!-- 房源标题 -->
    <!-- <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('title')}"
         :data-tips="errorBags.first('title')">
      <div class="page-cell-item">
        <el-input placeholder="请输入房源标题"
                  data-vv-name="title"
                  data-vv-as="房源标题"
                  :maxlength="20"
                  v-validate="'required'"
                  v-model="formData.title">
          <div slot="prepend"
               class="item-before"
               data-before="*">房源标题</div>
        </el-input>
      </div>
    </div> -->
  </div>
</template>
<script>
let sex = [
  { title: "女生", label: 0 },
  { title: "先生", label: 1 }
];
let orientation = [
  { title: "东", label: 1 },
  { title: "南", label: 2 },
  { title: "西", label: 3 },
  { title: "北", label: 4 },
  { title: "东南", label: 5 },
  { title: "东北", label: 6 },
  { title: "西南", label: 7 },
  { title: "西北", label: 8 },
];
let renovation = [
  { title: "毛胚", label: 1 },
  { title: "简单装", label: 2 },
  { title: "精装修", label: 3 },
  { title: "豪华装修", label: 4 }
]
let certificateType = [
  { title: "不动产权证", label: 1 },
  { title: "购房合同", label: 2 },
  { title: "拆迁安置协议书", label: 3 },
]
//import { mapState } from "vuex";
import util from '@/util/util';
export default {
  name: "basicInformation",
  computed: {
    getErrorFlag () {
      let ErroeField = ['houseRoom', 'houseHall', 'houseToilet', 'houseBalcony'];
      return ErroeField.some(item => this.errorBags.has(item));
    },
    getErrorText () {
      let ErroeField = ['houseRoom', 'houseHall', 'houseToilet', 'houseBalcony'];
      for (let index = 0; index < ErroeField.length; index++) {
        if (this.errorBags.first(ErroeField[index]) != null) {
          return this.errorBags.first(ErroeField[index]);
        }
      }
    },
    formData () {
      this.$set(this.$data, "step", JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step1)))
      return this.step
    }
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        //deff 获取到修改的属性
        let deffData = util.diffGet(this.$store.state.addHouse.formData.step1, this.formData);
        //判断当前是否有修改，如果有修改则length大于0
        let flag = Object.keys(deffData).length > 0 ? true : false;
        //判断store存储的是否与这次相同，相同则不commit
        if (this.$store.state.addHouse.isformDataNoCommit != flag) {
          this.$store.commit("updateIsformDataNoCommit", flag);
        }
        //把修改的过的值给与deffData用于传送后台，如果在一次进入也可以顺便把这个值清空
        this.deffData = deffData;
      }
    }
  },
  methods: {
    //跳转到补充楼盘页面
    toHouse () {
      var that = this;
      that.$router.push({ path: '/buySellSystem/CommunityReplenish' });
    },
    //查询楼盘
    remoteCommunityName (e) {
      let that = this;
      that.selectPageCommunit.loading = true;
      this.$api.post({
        url: '/mateHouse/queryCommunity',
        data: {
          page: 1,
          limit: 50,
          communityName: e == undefined ? '' : e.trim(),
        },
        qs: true,
        token: false
      }).then((e) => {
        let data = e.data;
        if (data.code == 200) {
          that.selectPageCommunit.list = data.data.list;
          that.selectPageCommunit.loading = false;
        }
      }).catch((e) => {
        console.log(e);
      })
    },
    //楼盘获取焦点
    remoteCommunityNameInput () {
      if (this.selectPageCommunit.list.length == 0) {
        this.remoteCommunityName();
      }
    },
    //楼盘选择更改事件
    remoteCommunityNameChange (e) {
      let findResultIndex = this.selectPageCommunit.list.findIndex((item) => {
        return item.value == e;
      })
      this.formData.communityName = this.selectPageCommunit.list[findResultIndex].name;
      this.formData.buildingId = '';
      this.formData.roomId = '';
      this.formData.buildingNo = '';
      this.formData.roomNo = '';
      this.selectPageeBuildingNo.list = [];
      this.selectPageRoomNo.list = [];
      this.remoteBuildingNo();
    },
    //查询栋座
    remoteBuildingNo (e) {
      let that = this;
      //验证楼盘
      that.$validator.validate("communityId", this.formData.communityId).then((result) => {
        if (result) {
          that.selectPageeBuildingNo.loading = true;
          that.$api.post({
            url: '/mateHouse/queryComBuilding',
            data: {
              page: 1,
              limit: 50,
              comBuildingName: e == undefined ? '' : e.trim(),
              comId: that.formData.communityId
            },
            qs: true,
            token: false
          }).then((e) => {
            let data = e.data;
            if (data.code == 200) {
              that.selectPageeBuildingNo.list = data.data.list;
              that.selectPageeBuildingNo.loading = false;
            }
          }).catch((e) => {
            console.log(e);
          })
        }
      })
    },
    //栋座选择更改事件
    remoteBuildingNoChange (e) {
      let findResultIndex = this.selectPageeBuildingNo.list.findIndex((item) => {
        return item.value == e;
      })
      this.formData.buildingNo = this.selectPageeBuildingNo.list[findResultIndex].name;
      this.formData.roomNo = '';
      this.formData.roomId = '';
      this.selectPageRoomNo.list = [];
      this.remoteRoomNo();
    },
    //查询房间号
    remoteRoomNo (e) {
      let that = this;
      //验证楼栋
      that.$validator.validate("buildingId", this.formData.buildingId).then((result) => {
        if (result) {
          that.selectPageRoomNo.loading = true;
          that.$api.post({
            url: '/mateHouse/queryBuildIngHouses',
            data: {
              page: 1,
              limit: 50,
              comId: that.formData.communityId,
              cbId: this.formData.buildingId,
              roomNo: e == undefined ? '' : e.trim(),
              isNotSale: 1
            },
            qs: true,
            token: false
          }).then((e) => {
            let data = e.data;
            if (data.code == 200) {
              that.selectPageRoomNo.list = data.data.list;
              that.selectPageRoomNo.loading = false;
            }
          }).catch((e) => {
            console.log(e);
          })
        }
      })
    },
    //房间号选择更改事件
    remoteRoomNoChange (e) {
      let findResultIndex = this.selectPageRoomNo.list.findIndex((item) => {
        return item.value == e;
      })
      this.formData.roomNo = this.selectPageRoomNo.list[findResultIndex].name;
    },
    removeTelToList (index, item) {
      this.addTel.splice(index, 1);
      this.formData['tel' + item] = '';
    },
    //添加电话号码123
    addTelToList () {
      let defaultList = [1, 2, 3];
      if (this.addTel.length < 3) {
        for (let index = 0; index < defaultList.length; index++) {
          if (!this.addTel.includes(defaultList[index])) {
            this.addTel.push(defaultList[index]);
            break;
          }
        }
      }
      this.addTel.sort();
    },
    //验证
    validateAll () {
      let that = this;
      return this.$validator.validateAll().then((e) => {
        if (e) {
          return true;
        }
        return false;

      }).then((e) => {
        if (e) {
          return this.upLoadData();
        } else {
          return false;
        }
      })
    },
    //创建
    upLoadData (e) {
      let that = this;
      let data = {
        ...that.deffData
      }
      let method = 'post';
      if (that.$store.state.addHouse.formData.id != '') {
        data.id = that.$store.state.addHouse.formData.id;
        method = 'put';
      }
      if (Object.keys(this.deffData).length == 0) {//没有做出修改
        return true;
      }
      return this.$api[method]({
        url: '/draft-house',
        data: data,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false
      }).then((e) => {
        if (e.data.code == 200) {
          //存入Vuex;
          if (e.data.data != null) {
            that.$store.commit('updateId', e.data.data)
          }
          that.$store.commit("updateStep1", that.deffData);
          return true;
        } else {
          return false;
        }
      }).catch((e) => {
        return false;
      })
    },
  },
  data () {
    return {
      step: {},
      addTel: [],
      sexList: sex,
      changeBut: {
        price: false
      },
      certificateType: certificateType,
      options: [],
      selectPageCommunit: { // 楼栋
        list: [],
        loading: false
      },
      selectPageeBuildingNo: {// 栋座
        list: [],
        loading: false
      },
      selectPageRoomNo: {// 房间号
        list: [],
        loading: false
      },
      orientationList: orientation,
      renovationList: renovation,
      deffData: {}
    };
  }
};
</script>
