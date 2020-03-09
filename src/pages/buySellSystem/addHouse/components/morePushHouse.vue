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
    <div class="page-cell-for-add">
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
                         v-model="item.communityId"
                         placeholder="楼栋">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="for-add-td select-nobor">
              <el-select filterable
                         v-model="item.buildingId"
                         placeholder="房间号">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="for-add-td select-nobor select-pad-width_70">
              <div class="tr-flex">
                <el-input placeholder="售价"
                          v-model="item.price"></el-input>
                <span>万</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    houseType: {
      type: String
    }
  },
  data () {
    return {
      addHouseType: this.houseType,
      text: '',
      tableForList: '',//共多少套
      tableAvgPirce: '',//总售价多少钱
      tableFor: [],//表格
      options: [
        { label: '测试', value: 1 },
        { label: '测试', value: 2 }
      ]
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
        for (let i = 0; i < parseInt(e); i++) {
          this.tableFor.push({
            communityId: '',
            buildingId: '',
            price: that.tableAvgPirce ? that.tableAvgPirce / parseInt(e) : ''
          })
        }
      }
    },
    //输入的总价钱设置tab的平均值
    tableAvgPirceChange (e) {
      let that = this;
      if (!/[^\d]/g.test(e)) {
        this.tableFor.forEach((item) => {
          item.price = that.tableAvgPirce / that.tableFor.length;
        })
      }
    },
    houseTypeChange (e) {
      this.$emit('update:houseType', e);
    },
  },
}
</script>
