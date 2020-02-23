<style lang="less" scoped>
@import url("../../../../assets/publicLess/addHouse.less");
.green{
  color:#0D824B
}
</style>
<template>
  <div class="page-cell-addHouse">
    <div class="form-error-tips border"
         :class="{'after-tips':errorBags.has('onlyOrMany')}"
         :data-tips="errorBags.first('onlyOrMany')">
      <div class="page-cell-item">
        <div slot="prepend"
             class="item-before"
             data-before="*"></div>
        <el-radio-group v-model="formData.onlyOrMany"
                        data-vv-name="onlyOrMany"
                        data-vv-as="录入"
                        v-validate="'required'"
                        size="mini">
          <el-radio :label="item.label"
                    border
                    v-for="(item, index) in onlyList"
                    :key="index">{{ item.title }}</el-radio>
        </el-radio-group>
         <div class="tips">(多套录入仅支持同一小区同一业主)</div>
      </div>
     
    </div>
    <!-- 楼盘名称 -->
    <div style="display:flex">
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('communityId')}"
         :data-tips="errorBags.first('communityId')">
      <div class="page-cell-item">
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
        <div class="item-after">
          补充楼盘<i class="el-icon-question"></i>
        </div>
      </div>
    </div>
    <!-- 栋座 -->
    <div class="form-error-tips "
         :class="{'after-tips':errorBags.has('buildingId')}"
         :data-tips="errorBags.first('buildingId')">
      <div class="page-cell-item interval" >
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
    <div class="form-error-tips "
         :class="{'after-tips':errorBags.has('roomId')}"
         :data-tips="errorBags.first('roomId')">
      <div class="page-cell-item interval">
        <div class="item-before"
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
    <div class="page-cell-title">业主信息</div>
    <!-- 业主姓名 -->
    <div style="display:flex">
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('customerName')}"
         :data-tips="errorBags.first('customerName')">
      <div class="page-cell-item">
        <el-input placeholder="请输入业主姓名"
                  data-vv-name="customerName"
                  data-vv-as="业主姓名"
                  v-validate="'required'"
                  v-model="formData.customerName">
          <div slot="prepend"
               class="item-before"
               data-before="*">业主姓名</div>
        </el-input>
      </div>
    </div>
    <!-- 称谓 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('sex')}"
         :data-tips="errorBags.first('sex')">
      <div class="page-cell-item">

        <el-radio-group v-model="formData.sex"
                        data-vv-name="sex"
                        data-vv-as="称谓"
                        v-validate="'required'"
                        size="mini">
          <el-radio :label="item.label"
                    border
                    v-for="(item, index) in sexList"
                    :key="index">{{ item.title }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    </div>
    <!-- 电话号码 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('tel')}"
         :data-tips="errorBags.first('tel')">
      <div class="page-cell-item">
        <el-input placeholder="请输入业主电话号码"
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
            <i class="el-icon-circle-plus-outline green" ></i>
            <div>新增</div>
          </div>
        </el-input>
      </div>
    </div>
    <!-- 电话号码 for -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('tel'+item)}"
         :data-tips="errorBags.first('tel'+item)"
         v-for="(item,index) in addTel"
         :key="index">
      <div class="page-cell-item">
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
    <div class="page-cell-title">基础信息</div>
    <!-- 售价 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('price')}"
         :data-tips="errorBags.first('price')">
      <div class="page-cell-item">
        <el-input placeholder="请输入售价"
                  v-validate="'required|decimal:2'"
                  data-vv-name="price"
                  data-vv-as="售价"
                  v-model="formData.price">
          <div slot="prepend"
               class="item-before"
               data-before="*">售价</div>
          <div slot="append"
               class="item-after item-before-col">万元</div>
        </el-input>
      </div>
    </div>
    <!-- 底价 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('bottomPrice')}"
         :data-tips="errorBags.first('bottomPrice')">
      <div class="page-cell-item">
        <el-input placeholder="请输入底价"
                  data-vv-name="bottomPrice"
                  data-vv-as="底价"
                  v-validate="'required|decimal:2'"
                  v-model="formData.bottomPrice">
          <div slot="prepend"
               class="item-before"
               data-before="*">底价</div>
          <div slot="append"
               class="item-after item-before-col">万元</div>
        </el-input>
      </div>
    </div>
    <!-- 面积 -->
    <div class="form-error-tips"
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
    </div>
    <!-- 房型 -->
    <div class="form-error-tips"
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
    </div>
    <!-- 朝向 -->
    <div class="form-error-tips">
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
    </div>
    <!-- 装修 -->
    <div class="form-error-tips">
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
    </div>
    <!-- 房屋证件 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before">房屋证件</div>
        <el-select v-model="formData.certificateType"
                   placeholder="请选择房屋证件">
          <el-option v-for="item in certificateType"
                     :key="item.label"
                     :label="item.title"
                     :value="item.label">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="page-cell-title">房源标题</div>
    <!-- 房源标题 -->
    <div class="form-error-tips"
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
    </div>
  </div>
</template>
<script>
let sex = [
  { title: "女士", label: 0 },
  { title: "先生", label: 1 }
];
let onlyOrMany= [
  { title: "单套录入", label: 0 },
  { title: "多套录入", label: 1 }
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
import { Validator } from 'vee-validate';
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
  methods: {
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
      // return new Promise((r,s)=>{
      return this.$validator.validateAll().then((e) => {
        if (e) {
          //存入Vuex;
          that.$store.commit("updateStep1", that.formData);
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
      console.log(this.formData);
      return this.$api.post({
        url: '/draft_house',
        data: that.formData,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false
      }).then((e) => {
        if (e.data.code == 200) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      }).catch((e) => {
        console.log(e);
        return Promise.resolve(false);
      })
    },
  },
  data () {
    return {
      step: {},
      addTel: [],
      sexList: sex,
      onlyList:onlyOrMany,
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
      renovationList: renovation
    };
  }
};
</script>
