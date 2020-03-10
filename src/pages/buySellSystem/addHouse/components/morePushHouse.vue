<style lang="less" scoped>
@import url(../../../../assets/publicLess/addHouse.less);
.page-cell-for-add {
  .for-add-table {
    margin-top: 45px;
    display: inline-table;
    .for-add-header {
      display: table-header-group;
    }
    .for-add-tbody {
      display: table-row-group;
      .for-add-td {
        padding: 20px 0;
        border-bottom: 2px dashed #f4f4f4;
      }
    }
    .for-add-tr {
      display: table-row;
      .for-add-td {
        display: table-cell;
        width: 105px;
        text-align: center;
        font-size: 15px;
        padding-right: 90px;
        &:first-child {
          padding-right: 0;
        }
      }
    }
  }
}
.tr-flex {
  display: flex;
  position: relative;
  span {
    align-self: flex-end;
    position: absolute;
    right: -10px;
  }
}
</style>
<template>
  <div class="page-cell-addHouse form-error-tips">
    <div id="addHouseType">
      <div class="page-cell-item">
        <div class="item-before"
             data-before="*"></div>
        <el-radio-group v-model="addHouseType"
                        @change="houseTypeChange"
                        size="mini">
          <el-radio label="basicInformation">单套录入</el-radio>
          <el-radio label="morePushHouse">多套录入</el-radio>
        </el-radio-group>
        <span class="addhouse-tips">(多套录入仅支持同一小区同一业主)</span>
      </div>
    </div>
    <!--  -->
    <div class="page-cell-item-flex">
      <div class="page-cell-item select-nobor">
        <div class="item-before"
             data-before="*">楼盘</div>
        <el-select filterable
                   v-model="text"
                   placeholder="请选择楼盘名称">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="page-cell-item select-nobor select-pad-width_70">
        <el-input placeholder="套数"
                  maxLength="2"
                  @input="houseListChange"
                  v-model="tableForList">
          <div slot="prepend"
               class="item-before">共</div>
          <div slot="append"
               class="item-before">套</div>
        </el-input>
      </div>
      <div class="page-cell-item select-nobor select-pad-width_70">
        <el-input placeholder="钱"
                  @input="tableAvgPirceChange"
                  v-model="tableAvgPirce">
          <div slot="prepend"
               class="item-before">总售价</div>
          <div slot="append"
               class="item-before">万</div>
        </el-input>
      </div>
    </div>
    <div class="page-cell-for-add"
         v-if="tableFor.length > 0">
      <div class="for-add-table">
        <div class="for-add-header">
          <div class="for-add-tr">
            <div class="for-add-td">序号</div>
            <div class="for-add-td">楼栋</div>
            <div class="for-add-td">房间号</div>
            <div class="for-add-td">售价</div>
          </div>
        </div>
        <div class="for-add-tbody">
          <div class="for-add-tr"
               v-for="(item,index) in tableFor"
               :key="index">
            <div class="for-add-td">{{index+1}}</div>
            <div class="for-add-td select-nobor">
              <el-select filterable
                         v-model="text"
                         placeholder="楼栋">
                <el-option v-for="item in options"
                           :key="item.title"
                           :label="item.title"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="for-add-td select-nobor">
              <el-select filterable
                         v-model="text"
                         placeholder="房间号">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.title"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="for-add-td select-nobor select-pad-width_70">
              <div class="tr-flex">
                <el-input placeholder="售价"
                          v-model="text"></el-input>
                <span>万</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 业主姓名 -->
    <div class="form-error-tips maging-top_60 margin-bot_20 ">
      <div class="page-cell-item select-nobor center-flex">
        <el-input placeholder="请输入业主姓名"
                  v-model="text">
          <div slot="prepend"
               class="item-before"
               data-before="*"> 业主姓名</div>
        </el-input>
        <div class="input-after-checkbox">
          <el-radio-group v-model="text"
                          size="mini">
            <el-radio :label="item.label"
                      v-for="(item, index) in sexList"
                      :key="index">{{ item.title }}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 电话号码 -->
    <div class="form-error-tips margin-bot_20">
      <div class="page-cell-item select-nobor">
        <el-input placeholder="默认拨打为第一个号码"
                  v-model="text">
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
         v-for="(item,index) in addTel"
         :key="index">
      <div class="page-cell-item select-nobor">
        <el-input placeholder="请输入业主电话号码"
                  v-model="text">
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
      <div class="form-error-tips">
        <div class="page-cell-item">
          <div class="item-before"
               data-before="*">房屋证件</div>
          <el-select v-model="text"
                     placeholder="请选择房屋证件">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.title"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 售价 -->
      <div class="form-error-tips select-pad-width_100">
        <div class="page-cell-item select-nobor">
          <el-input placeholder="请输入售价"
                    v-model="text">
            <div slot="prepend"
                 class="item-before"
                 data-before="*">售价</div>
            <div slot="append"
                 class="item-after item-before-col">万</div>
          </el-input>
        </div>
      </div>
      <!-- 底价 -->
      <div class="form-error-tips select-pad-width_100">
        <div class="page-cell-item select-nobor">
          <el-input placeholder="请输入底价"
                    v-model="text">
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
        <el-input placeholder="请输入产权证号"
                  v-model="text">
          <div slot="prepend"
               class="item-before">证号</div>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
let sex = [
  { title: "女生", label: 0 },
  { title: "先生", label: 1 }
];
export default {
  props: {
    houseType: {
      type: String
    }
  },
  data () {
    return {
      addHouseType: this.houseType,
      sexList: sex,
      addTel: [],//123电话号码数组
      tableForList: '',//共多少套
      tableAvgPirce: '',//总售价多少钱
      tableFor: [],//表格
      options: [
        { label: '测试', value: 1 },
        { label: '测试', value: 2 }
      ],
      text: '',
    }
  },
  activated () {
    this.addHouseType = this.houseType;
  },
  methods: {
    //输入的套数改变
    houseListChange (e) {
      let that = this;
      if (!/[^\d]/g.test(e)) {
        this.tableFor = [];
        for (let i = 0; i < parseInt(e); i++) {
          this.tableFor.push({
            communityId: '',
            buildingId: '',
            price: that.tableAvgPirce ? (that.tableAvgPirce / parseInt(e)).toFixed(2) : ''
          })
        }
      }
    },
    //输入的总价钱设置tab的平均值
    tableAvgPirceChange (e) {
      let that = this;
      if (!/[^\d]/g.test(e)) {
        this.tableFor.forEach((item) => {
          item.price = (that.tableAvgPirce / that.tableFor.length).toFixed(2);
        })
      }
    },
    //添加电话号码
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
    //删除电话号码
    removeTelToList () {
      this.addTel.splice(index, 1);
    },
    houseTypeChange (e) {
      this.$emit('update:houseType', e);
    },
  },
}
</script>
