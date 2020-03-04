<style lang="less" scoped>
.query-data-pad {
  padding: 0 20px;
}
.page-query-data {
  display: flex;
  .page-query-data-title {
    font-size: 14px;
    line-height: 32px;
    margin-right: 15px;
  }
  .page-query-data-tag {
    flex: 1;
    .query-tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.select-tabs {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
}
.select-tabs-cell {
  display: flex;
  .select-tabs-item {
    display: flex;
    align-items: center;
    margin-right: 80px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    .tabs-item-title {
      font-size: 16px;
    }
    .el-icon-sort {
      font-size: 16px;
    }
  }
}
.select-checkbox {
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
  input {
    display: none;
  }
  span {
    display: flex;
    align-items: center;
    font-size: 16px;
    &::after {
      content: "";
      border: 1px solid #767676;
      width: 17px;
      height: 17px;
      box-sizing: border-box;
      margin-left: 10px;
      line-height: 1;
      text-align: center;
    }
  }
  input[type="checkbox"]:checked + span {
    &::after {
      content: "\2713";
    }
  }
  input[type="radio"]:checked + span {
    &::after {
      content: "\2713";
    }
  }
}
.select-for-warp {
  min-height: 400px;
  .select-for-item {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #dbdbdb;
    .select-for-item-img {
      width: 140px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .select-for-item-data {
      margin-left: 50px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item-data-top {
        display: flex;
        align-items: center;
        .item-data-top-no {
          color: #adadad;
          font-size: 16px;
          margin-right: 80px;
        }
        .item-data-top-tag {
          display: flex;
          .top-tag-item {
            font-size: 14px;
            padding: 2px 8px;
            background: var(--color--primary);
            border-radius: 4px;
            color: #fff;
          }
        }
      }
      .item-data-middle {
        font-size: 22px;
        color: #636363;
      }
      .item-data-bottom {
        display: flex;
        .item-data-bottom-detali {
          color: #636363;
          font-size: 14px;
          align-self: flex-end;
          margin-right: 80px;
        }
        .item-data-bottom-price {
          font-size: 20px;
          color: #e5a670;
          line-height: 1;
        }
        .item-data-bottom-avgPirce {
          align-self: flex-end;
          margin-left: 10px;
          color: #636363;
        }
      }
    }
    .select-for-item-but {
      margin: 0 30px;
      height: 50px;
      width: 50px;
      color: #fff;
      font-size: 30px;
      align-self: center;
      background: var(--color--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.select-page-nav {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
.flex-cell {
  display: flex;

  .flex-cell-tab {
    flex: 1;
    width: 0;
  }
  .menuMarin {
    margin-right: 60px;
    margin-left: 20px;
  }
}
</style>
<template>
  <div class="query-data-pad">
    <div class="page-query-data"
         v-if="dynamicTags.length>0 || querySelectFlag">
      <div class="page-query-data-title">所有房源></div>
      <div class="page-query-data-tag">
        <el-tag :key="index"
                class="query-tag"
                v-for="(tag,index) in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
          {{tag.title}}{{tag.value}}
        </el-tag>
      </div>
      <div class="select-tabs-cell">
        <label class="select-checkbox">
          <input type="checkbox">
          <span>钥匙</span>
        </label>
        <label class="select-checkbox">
          <input type="checkbox">
          <span>独家</span>
        </label>
      </div>
    </div>
    <!-- 缩小时不显示 -->
    <div class="select-tabs"
         v-if="!querySelectFlag">
      <div class="select-tabs-cell">
        <div class="select-tabs-item">
          <div class="tabs-item-title">默认排序</div>
        </div>
        <div class="select-tabs-item">
          <div class="tabs-item-title">价格</div>
          <i class="el-icon-sort"></i>
        </div>
        <div class="select-tabs-item">
          <div class="tabs-item-title">面积</div>
          <i class="el-icon-sort"></i>
        </div>
      </div>
      <!-- <div class="select-tabs-cell">
        <label class="select-checkbox">
          <input type="checkbox">
          <span>钥匙</span>
        </label>
        <label class="select-checkbox">
          <input type="checkbox">
          <span>独家</span>
        </label>
      </div> -->
    </div>
    <div class="select-for-warp"
         v-loading="loading"
         element-loading-text="我在去获取数据的路上了~">
      <template v-if="!querySelectFlag">
        <template v-if="renderList.length > 0">
          <div class="select-for-item"
               v-for="(item,index) in renderList"
               :key="index">
            <div class="select-for-item-img">
              <img :src="item.picUrl">
            </div>
            <div class="select-for-item-data">
              <div class="item-data-top">
                <div class="item-data-top-no overText">{{item.houseNo}}</div>
                <div class="item-data-top-tag">
                  <div class="top-tag-item overText">钥匙</div>
                </div>
              </div>
              <div class="item-data-middle overText">{{item.title}}</div>
              <div class="item-data-bottom">
                <div class="item-data-bottom-detali overText">雍华名苑/{{item.inArea}}㎡/{{item.rooms}}房2厅1卫</div>
                <div class="item-data-bottom-price overText">￥{{item.price}}万</div>
                <div class="item-data-bottom-avgPirce overText">{{item.unitpaice}}元/平</div>
              </div>
            </div>
            <div class="select-for-item-but" >
              <i class="el-icon-document icon" @click="toHouseDetail(item.id)"></i>
            </div>
          </div>
        </template>
        <template v-else>
          <el-alert title="暂无数据"
                    type="info"
                    center
                    show-icon>
          </el-alert>
        </template>
      </template>
      <template v-else>
        <div class="flex-cell">
          <div class="flex-cell-tab">
            <el-table :data="renderList"
                      v-if="tableColumn.length >0"
                      @sort-change="sortMethod"
                      :default-sort="{prop: 'price', order: 'descending'}"
                      border>
              <el-table-column v-for="(item,index) in tableColumn"
                               :key="index"
                               :prop="item.prop"
                               :label="item.label"
                               :width="item.width"
                               :sortable="item.order"
                               :sort-orders="['ascending', 'descending']"
                               show-overflow-tooltip>
              </el-table-column>
              <el-table-column fixed="right"
                               label="操作"
                               width="80px">
                <template slot-scope="scope">
                  <el-button size="mini"
                             type="primary"
                             @click="navTabItem(scope.$index, scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <definitionmenu class="menuMarin"
                          :renderList="tableColumnField"
                          :tableColumn="tableColumn"
                          @change="tabColumnChange"></definitionmenu>
        </div>
      </template>
    </div>
    <div class="select-page-nav">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="pageJson.currentPage"
                     layout="total, prev, pager, next, jumper"
                     :total="pageJson.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import definitionmenu from '@/components/definitionMenu';
export default {
  inject: ["form", "Slider"],
  components: {
    definitionmenu,
  },
  props: {
    querySelectFlag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (value, ordvalue) {
        this.renderTag(value);
        this.getHouseData(JSON.parse(JSON.stringify(value)));
      }
    }
  },
  data () {
    return {
      dynamicTags: [],
      renderList: [],
      loading: false,
      pageJson: {
        total: 1,
        currentPage: 1
      },
      tableColumnField: [
        { prop: 'houseNo', label: '房源编号', width: '170', order: false, disabled: true, default: true },
        { prop: '1', label: '楼盘名称', order: false, width: '150', disabled: true, default: true },
        { prop: 'price', label: '售价(万元)', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '2', label: '面积(㎡)', width: '120', order: 'custom', disabled: false, default: true },
        { prop: 'unitpaice', label: '单价(元/㎡)', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '3', label: '户型', width: '120', order: false, disabled: false, default: true },
        { prop: '4', label: '被看次数', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '5', label: '未跟进天数', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '6', label: '未被看天数', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '7', label: '录入时间', width: '120', order: 'custom', disabled: false, default: true },
        { prop: '8', label: '杀杀杀', width: '120', order: 'custom', disabled: false, default: false },
        { prop: '9', label: '杀35杀杀', width: '150', order: 'custom', disabled: false, default: false }
      ],
      tableColumn: []
    }
  },
  methods: {
    tabColumnChange (e) {
      this.tableColumn = e;
    },
    navTabItem (index, row) {
      console.log(index, row);
    },
    toHouseDetail(id){
  this.$router.push({name: "houseDetails",
        params: { houseId: id}});
    
    },
    //远程排序
    sortMethod (item) {
      console.log(item);
    },
    InitPageJson () {
      this.pageJson = { total: 1, currentPage: 1 }
    },
    getHouseData (value, initPage = true) {
      let that = this;
      this.loading = true;
      Object.keys(value).forEach((item) => {
        if (value[item] instanceof Array) {
          value[item] = value[item].join(',')
        }
      })
      let restuleParms = Object.assign({}, value, { page: that.pageJson.currentPage, limit: 8 });
      return this.$api.get({
        url: "/mateHouse",
        token: false,
        data: restuleParms,
      }).then((e) => {
        let data = e.data;
        if (initPage)
          that.InitPageJson();
        if (data.code == 200) {
          that.renderList = data.data.list;
          that.pageJson.total = data.data.totalPage;
        }
      }).finally(() => {
        that.loading = false;
      })
    },
    //创建需要渲染的标签
    renderTag (value) {
      let that = this;
      //清空
      this.dynamicTags = [];
      //价格
      if (this.Slider.priceSlider[1] != 20) {
        this.dynamicTags.push({ title: `价格:${value.minPrice}-${value.maxPrice}万`, field: "price", arr: false })
      }
      //面积
      if (this.Slider.areaSlider[1] != 20) {
        this.dynamicTags.push({ title: `面积:${value.minInArea}-${value.maxInArea}万`, field: "area", arr: false })
      }
      //楼层
      if (this.Slider.flootSlider[1] != -2) {
        this.dynamicTags.push({ title: `面积:${value.minFloor}-${value.maxFloor}层`, field: "floot", arr: false })
      }
      //商圈
      this.appendFormTag(value.business, '商圈', 'business');
      //房型
      this.appendFormTag(value.houseType, '房型', 'houseType');
      //装修
      this.appendFormTag(value.renovation, '装修', 'renovation');
      //房屋用途
      this.appendFormTag(value.purpose, '房屋用途', 'purpose');
      //朝向
      this.appendFormTag(value.face, '朝向', 'face');
      //小学
      this.appendFormTag(value.primarySchool, '小学', 'primarySchool');
      //中学
      this.appendFormTag(value.middleSchool, '中学', 'middleSchool');
    },
    appendFormTag (to, titleName, fieldName) {
      //房型
      to.forEach((item) => {
        this.dynamicTags.push({ title: `${titleName}:`, value: `${item}`, field: `${fieldName}`, arr: true })
      })
    },
    filterSplice (e) {
      return this.form[e.field].findIndex((item) => {
        return item == e.value;
      })
    },
    //标签关闭
    handleClose (e) {
      if (e.arr) { // 删除多选
        this.form[e.field].splice(this.filterSplice(e), 1);
      } else { // 删除 slider

        if (e.field == 'price') {
          this.Slider.priceSlider = [20, 20];
          this.form.maxPrice = '';
          this.form.minPrice = '';
        }
        if (e.field == 'area') {
          this.Slider.areaSlider = [20, 20];
          this.form.maxInArea = '';
          this.form.minInArea = '';
        }
        if (e.field == 'floot') {
          this.Slider.flootSlider = [-2, -2];
          this.form.maxFloor = '';
          this.form.minFloor = '';
        }
      }
    },
    //跳转第几页
    handleCurrentChange (e) {
      this.pageJson.currentPage = e;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), false)
    },
  },
}
</script>
