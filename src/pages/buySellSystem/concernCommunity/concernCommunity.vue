<style lang="less" scoped>
.left-query-content {
  width: 357px;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  .query-title {
    padding-top: 25px;
    padding-bottom: 5px;
    font-weight: normal;
    font-size: 15px;
  }
  .query-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    .query-body-cell {
      display: flex;
      padding: 10px 55px 10px 30px;
      justify-content: space-between;
      font-size: 15px;
      .cell-title {
        color: #fff;
      }
      .cell-data {
        color: #fff;
        .cell-data-value {
          font-size: 18px;
          text-decoration: underline;
        }
        &::after {
          content: attr(data-suffix);
        }
      }
      &:nth-child(1) {
        background-image: linear-gradient(to right, #533fee, #4685ef);
      }
      &:nth-child(2) {
        background-image: linear-gradient(to right, #ff8b00, #ffb818);
      }
      &:nth-child(3) {
        background-image: linear-gradient(to right, #c1542d, #fc4e11);
      }
    }
    .query-body-select {
      flex: 1;
      margin-top: 20px;
    }
    .query-item-attention {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-image: linear-gradient(to right, #1b86bc, #4e46cd);
      font-size: 15px;
      padding: 5px 15px 5px 20px;
      margin-bottom: 5px;
      position: relative;
      &:hover .attention-cell-remove {
        display: block;
      }
      .attention-cell-remove {
        position: absolute;
        right: 0px;
        padding-left: 4px;
        top: 50%;
        font-size: 18px;
        transform: translate(100%, -50%);
        cursor: pointer;
        display: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
      .attention-middel,
      .attention-right {
        text-align: center;
      }
      .attention-left {
        font-size: 18px;
        width: 18px * 7;
      }
      .attention-left,
      .attention-middel-title {
        color: #fff;
      }
      .attention-middel-data {
        margin-top: 5px;
        background: #fff;
        border-radius: 30px;
        padding: 5px 0;
        font-weight: 600;
      }
    }
  }
}
.page-num-center {
  text-align: center;
}
</style>
<template>
  <list-page :parentData="$data"
             @sort-change="sortMethod"
             :dblclick="true"
             @cellDblClick="toHouseDetail"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:left>
      <section class="left-query-content">
        <h3 class="query-title">核心盘总览</h3>
        <div class="query-body">
          <div class="query-body-cell">
            <div class="cell-title">我的核心盘</div>
            <div class="cell-data">
              <span class="cell-data-value">{{countAll}}</span>
              <span calss="cell-data-suffix">个</span>
            </div>
          </div>
          <div class="query-body-cell">
            <div class="cell-title">存量房总套数</div>
            <div class="cell-data">
              <span class="cell-data-value">{{countConcern}}</span>
              <span calss="cell-data-suffix">套</span>
            </div>
          </div>
          <div class="query-body-cell">
            <div class="cell-title">在售总套数</div>
            <div class="cell-data">
              <span class="cell-data-value">{{countEffectiveNum}}</span>
              <span calss="cell-data-suffix">套</span>
            </div>
          </div>
          <div class="query-body-select">
            <el-paging-select v-model="queryData.selectCommunity"
                              keyValue="communityName"
                              valueKey="id"
                              clearable
                              type="radio"
                              frist
                              placeholder="选择您想添加的核心盘"
                              @load="queryNotConcernCommunityList"
                              @change="queryNotConcernCommunityList"
                              @valueChange="selectChangeValue"
                              :isPageEnd="isPageEnd"
                              :loading="loadingSelect"
                              :disabled="(item,index)=>{return filterRoomDisabled().includes(list[index].communityName+'$'+item.id)}"
                              :data="list"></el-paging-select>
          </div>
          <template v-for="(item,i) in resultArray">
            <div class="query-item-attention"
                 :key="i">
              <div class="attention-left overText">{{item.communityName || '暂无'}}</div>
              <div class="attention-middel">
                <div class="attention-middel-title">在售套数</div>
                <div class="attention-middel-data">{{item.effectiveNum}}套</div>
              </div>
              <div class="attention-right">
                <div class="attention-middel-title">存量套数</div>
                <div class="attention-middel-data">{{item.countConcernCommunity}}套</div>
              </div>
              <div title="取消关注"
                   @click="concernOFF(item.id)"
                   class="attention-cell-remove el-icon-circle-close"></div>
            </div>
          </template>
          <div class="page-num-center">
            <el-pagination background
                           :page-size="4"
                           :hide-on-single-page="array.length < 4"
                           small
                           :current-page.sync="paginationCurrentPage"
                           layout="prev, pager, next"
                           :total="array.length">
            </el-pagination>
          </div>
        </div>
      </section>
    </template>
    <template v-slot:top>
      <!-- 楼盘 -->
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select v-model="comId"
                     @focus="remoteInput"
                     @change="queryCBId"
                     remote
                     clearable
                     placeholder="楼盘名称"
                     :remote-method="remoteMethod"
                     :loading="loading">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
          <el-select v-model="cbId"
                     filterable
                     clearable
                     placeholder="楼栋"
                     @change="queryRoomNo">
            <el-option v-for="item in cbIdList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
          <el-select v-model="roomNo"
                     filterable
                     @change="querylistByParams"
                     placeholder="房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">业主</h3>
          <el-input placeholder="姓名"
                    class="set-input120"
                    @change="querylistByParams"
                    v-model="queryData.customName"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input placeholder="业主电话"
                    v-model="queryData.tel"
                    class="set-input200"
                    @change="querylistByParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input placeholder="最小值"
                    v-model="queryData.minPrice"
                    class="set-input90"
                    @change="querylistByParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="queryData.maxPrice"
                    class="set-input90"
                    @change="querylistByParams"
                    clearable />
          <span class="query-cell-suffix">万</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <definitionmenu :renderList="tableDataColumn"
                          :tableColumn="tableColumn"
                          @change="tabColumnChange"></definitionmenu>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">面积</h3>
          <el-input placeholder="最小值"
                    v-validate="'decimal:2|noZero1'"
                    v-model="queryData.minInArea"
                    class="set-input90"
                    @change="changeAreaBut"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="queryData.maxInArea"
                    class="set-input90"
                    @change="changeAreaButMax"
                    clearable />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">房源状态</h3>
          <el-select clearable
                     placeholder="房源状态"
                     class="set-select100"
                     v-model="houseType">
            <el-option v-for="item in houseTypeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval45">
          <label class="query-checkbox">
            <input type="checkbox"
                   @click="keySelect" />
            <span>钥匙</span>
          </label>
          <label class="query-checkbox">
            <input type="checkbox"
                   @click="onlySelect" />
            <span>独家</span>
          </label>
        </div>
        <div class="query-content-cell cell-interval45">
          <el-button type="primary"
                     size="mini"
                     @click="querylistByParams">查询</el-button>
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect @moreSelectChange="moreSelectChange"></moreSelect>
        </div>
      </div>
    </template>
    <template v-slot:tableColumn>
      <template v-for="(item) in tableColumn">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop"
                         :formatter="item.formart"
                         show-overflow-tooltip
                         :sort-orders="['ascending', 'descending']"
                         :sortable="item.order"></el-table-column>
      </template>
      <el-table-column label="操作"
                       width="170"
                       fixed="right">
        <template v-slot="scope">
          <el-button type="primary"
                     size="mini"
                     @click="toSale(scope.row.comId,scope.row.cbId,scope.row.bhId,scope.row.communityName,scope.row.buildingName,scope.row.roomNo)">{{ scope.row.houseType | setRowButName}}</el-button>
          <el-button type="primary"
                     @click="toHouseDetail(scope.row)"
                     size="mini">查看</el-button>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import util from "@/util/util";
import listPage from "@/components/listPage";
import moreSelect from "@/components/moreSelect";
import getMenuRid from "@/minxi/getMenuRid";
import houseContrast from "@/minxi/houseContrast";
import definitionmenu from "@/components/definitionMenu";
import "@/assets/publicLess/pageListQuery.less";
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    moreSelect,
    definitionmenu
  },
  data () {
    return {
      paginationCurrentPage: 1,
      selectCommunityNum: 1,
      isPageEnd: false,
      list: [],
      loadingSelect: false,
      addComId: [],
      input: "",
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      houseTypeList: [
        { value: "3", label: "店公共盘" },
        { value: "4", label: "在售无跟单" },      
        { value: "1", label: "无号码" },
        { value: "2", label: "成交房源" },
        { value: "5", label: "潜在出售" }
      ],
      state: [
        { value: "1", label: "房源编号1" },
        { value: "2", label: "房源编号2" },
        { value: "3", label: "房源编号3" }
      ],
      tableDataColumn: [
        {
          prop: "houseNo",
          label: "房源编号",
          width: "190",
          order: false,
          disabled: false,
          default: true,
          formart: item => this.houseNoFormat(item.houseNo)
        },
        {
          prop: "communityName",
          label: "楼盘名称",
          width: "130",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "price",
          label: "售价(万元)",
          width: "120px",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.price + "万元"
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "110px",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.inArea + "m²"
        },
        {
          prop: "unitPrice",
          label: "均价(元/平)",
          width: "130px",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitPrice + "元/㎡"
        },
        //{
        // prop: "decoration",
        // label: "装修程度",
        //  width: "110px",
        //  order: false,
        //  disabled: false,
        //  default: true
        // },
        {
          prop: "seenNum",
          label: "被看次数",
          width: "120",

          disabled: false,
          default: true
        },

        {
          prop: "houseType",
          label: "房源状态",
          width: "110px",
          order: false,
          disabled: false,
          default: true,
          formart: item => this.houseTypeFormat(item.houseType)
        }, //自己补充
        {
          prop: "agentName",
          label: "跟单人",
          width: "110px",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "",
          label: "户型",
          width: "110px",
          order: false,
          disabled: false,
          default: true,
          formart: item => this.houseFormat(item.rooms, item.hall, item.toilet)
        }
      ],
      tableColumn: [],
      tableData: [],
      moreSelect: [],
      elTabs: {
        activeName: "tab1",
        list: []
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      option: [],
      array: [],
      countEffectiveNum: "",
      countConcern: "",
      countAll: "",
      comId: "",
      cbId: "",
      roomNo: "",
      houseType: "",
      selectPage: 1,
      queryData: {
        communityName: "",
        isOnly: "",
        minInArea: "",
        keyOwner: "",
        selectCommunity: ""
      }
    };
  },
  computed: {
    resultArray () {
      return this.array.slice(
        (this.paginationCurrentPage - 1) * 4,
        this.paginationCurrentPage * 4
      );
    }
  },
  filters: {
    setRowButName (value) {
      switch (String(value)) {
        case 2:
          return "转跟单";
        case 3:
        case 5:
          return "转在售";
        case 4:
          return "录入";
        default:
          return "转在售";
      }
    }
  },
  mounted () {
    this.queryVerifyHouseDatas(1, "id", "descending");
    this.queryConcernCount();
    //  this.queryNotConcernCommunityList();
  },
  methods: {
    changeAreaBut () {
      let that = this;

      if (util.isNumber(that.queryData.minInArea)) {
        that.$message({
          message: "值必须为大于等于0的正数",
          type: "warning"
        });
      } else if (
        that.queryData.maxInArea != "" &&
        that.queryData.minInArea > that.queryData.maxInArea
      ) {
        that.$message({
          message: "最大值必须大于最小值",
          type: "warning"
        });
      } else {
        this.querylistByParams();
      }
    },
    changeAreaButMax () {
      let that = this;

      if (util.isNumber(that.queryData.maxInArea)) {
        that.$message({
          message: "值必须为大于等于0的正数",
          type: "warning"
        });
      } else if (
        that.queryData.minInArea != "" &&
        that.queryData.minInArea > that.queryData.maxInArea
      ) {
        that.$message({
          message: "最大值必须大于最小值",
          type: "warning"
        });
      } else {
        this.querylistByParams();
      }
    },
    //当前选择已经关注这个这个核心盘则不让在重复选择
    filterRoomDisabled () {
      return this.array
        .map(item => {
          return item.communityName + "$" + item.id;
        })
        .join(",");
    },
    houseNoFormat (houseNo) {
      let type;
      if (houseNo == null && houseNo == "") {
        type = "--";
      } else {
        type = houseNo;
      }
      return type;
    },

    houseFormat (rooms, hall, toilet) {
      let ro,
        ha,
        to = "";
      if (rooms != null && rooms != "" && rooms != undefined) {
        ro = rooms + "室";
      } else {
        ro = "0" + "室";
      }
      if (hall != null && hall != "" && hall != undefined) {
        ha = hall + "厅";
      } else {
        ha = "0" + "厅";
      }
      if (toilet != null && toilet != "" && toilet != undefined) {
        to = toilet + "卫";
      } else {
        to = "0" + "卫";
      }
      return ro + ha + to;
    },
    houseTypeFormat (houseType) {
      let type;
      if (houseType == 1) {
        type = "无号码";
      } else if (houseType == 2) {
        type = "暂不售";
      } else if (houseType == 3) {
        type = "店公共盘";
      } else if (houseType == 4) {
        type = "在售无跟单";
      } else if (houseType == 5) {
        type = "潜在出售";
      } else if (houseType == 6) {
        type = "--";
      } else {
        type = "状态未知";
      }
      return type;
    },
    remove () {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.queryVerifyHouseDatas(1, "id", "descending");
    },
    sortMethod (e) {
      this.queryVerifyHouseDatas(1, e.prop, e.order);
    },
    tabColumnChange (e) {
      let that = this;
      that.tableColumn = e;
    },
    toSale (comId, cbId, bhId, communityName, buildingName, roomNo) {
      var that = this;
      that.$router.push({
        path: "/buySellSystem/addHouse",
        disabledStatus: false,
        query: {
          comId: comId,
          cbId: cbId,
          bhId: bhId,
          communityName: communityName,
          buildingName: buildingName,
          roomNo: roomNo,
          flag: "potentia",
          customerName: null,
          tel: null
        }
      });
    },
    moreSelectChange (e) {
      this.moreSelect = e;
    },
    keySelect () {
      if (this.queryData.keyOwner != "") {
        this.queryData.keyOwner = "";
      } else {
        this.queryData.keyOwner = "1";
      }
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    onlySelect () {
      if (this.queryData.isOnly != "") {
        this.queryData.isOnly = "";
      } else {
        this.queryData.isOnly = "1";
      }
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    selectedCommunity (e) {
      this.$confirm("是否确定关注该楼盘?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addCommunity(e);
          this.querylistByParams();
          this.$message({
            message: "关注成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    concernOFF (id) {
      this.$confirm("是否确定取消关注该楼盘?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteConcern(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteConcern (comId) {
      this.$api
        .post({
          url: "/concern_community/concernOFF",
          qs: true,
          data: { comId: comId }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: result.message
            });
            this.queryConcernCount();
            this.querylistByParams();
          } else {
            this.$message({
              type: "success",
              message: result.message
            });
          }
          this.$router.push({ path: "/buySellSystem/concernCommunity" });
        })
        .catch(e => {
          this.$message.error("取消关注失败");
          console.log(e);
        });
    },
    querylistByParams () {
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    addCommunity (id) {
      let params = { CommunityID: id + "" };
      this.$api
        .post({
          url: "/concern_community/add",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.queryConcernCount();
            this.querylistByParams();
          } else {
            console.log("添加关注" + result.message);
            this.$message.error(result.message);
          }
        })
        .catch(e => {
          this.$message.error("添加关注 失败");
          console.log(e);
        });
    },
    queryVerifyHouseDatas (currentPage, column, type) {
      let params = { limit: this.pageJson.pageSize, page: currentPage - 1 };
      let that = this;
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          console.log(this.moreSelect);
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.biginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.biginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        if (this.comId != null && this.comId != "") {
          params.comId = this.comId;
        }
        if (this.cbId != null && this.cbId != "") {
          params.cbId = this.cbId;
        }
        if (this.queryData.isOnly != null && this.queryData.isOnly != "") {
          params.isOnly = this.queryData.isOnly;
        }
        if (this.queryData.keyOwner != null && this.queryData.keyOwner != "") {
          params.keyOwner = this.queryData.keyOwner;
        }
        if (this.roomNo != null && this.roomNo != "") {
          params.roomNo = this.roomNo;
        }
        if (
          this.queryData.Customers != null &&
          this.queryData.Customers != ""
        ) {
          params.customName = this.queryData.Customers;
        }
        if (this.queryData.Tel != null && this.queryData.Tel != "") {
          params.tel = this.queryData.Tel;
        }
        if (this.queryData.minPrice != null && this.queryData.minPrice != "") {
          params.minPrice = this.queryData.minPrice;
        }
        if (this.queryData.maxPrice != null && this.queryData.maxPrice != "") {
          params.maxPrice = this.queryData.maxPrice;
        }
        if (
          this.queryData.minInArea != null &&
          this.queryData.minInArea != ""
        ) {
          params.minInArea = this.queryData.minInArea;
        }
        if (
          this.queryData.maxInArea != null &&
          this.queryData.maxInArea != ""
        ) {
          params.maxInArea = this.queryData.maxInArea;
        }
        if (this.houseType != null && this.houseType != "") {
          params.houseType = this.houseType;
        }
      }
      if (column == "" || type == null || type == undefined) {
        params.sortColumn = "id";
      } else {
        params.sortColumn = column;
      }
      if (type == "" || type == null || type == undefined) {
        params.sortType = "descending";
      } else {
        params.sortType = type;
      }
      this.$api
        .post({
          url: "/myHouse/getMyKernelHouse",
          data: params,
          qs: true
        })
        .then(e => {
          that.loading = false;
          console.log(e.data);
          if (e.data.code == 200) {
            typeof e.data.data.data;
            that.pageJson.total = e.data.data.dataCount;
            that.tableData = e.data.data.data;
          } else {
            this.$message.error(e.data.message);
            this.$message.error;
          }
        })
        .catch(e => {
          console.log("查询我的核心盘失败");
          console.log(e);
        });
    },
    queryConcernCount () {
      this.$api
        .post({
          url: "/concern_community/CommunityCount",
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log("统计结果" + result.data);
            this.array = result.data;
            var countConcern = 0;
            var countEffectiveNum = 0;
            var countAll = 0;
            for (var j = 0; j < this.array.length; j++) {
              countConcern =
                countConcern + parseInt(this.array[j].countConcernCommunity);
              countEffectiveNum =
                countEffectiveNum + parseInt(this.array[j].effectiveNum);
              countAll++;
            }
            this.countConcern = countConcern;
            this.countAll = countAll;
            this.countEffectiveNum = countEffectiveNum;
            return this.array.forEach(item => {
              return item.array;
            });
            this.querylist(1);
          } else {
            console.log("查询核心盘统计结果then：" + result.message);
            this.$message.error(result.message);
          }
        })
        .catch(e => {
          console.log("查询核心盘统计结果失败catch");
          console.log(e);
        });
    },
    selectChangeValue (value) {
      //  console.log(value, "value");
      if (value) {
        this.addCommunity(value);
        this.querylistByParams();
        this.$message({
          message: "关注成功",
          type: "success"
        });
      }
    },
    queryNotConcernCommunityList (name, type) {
      if (type == "change") {
        console.log(type);
        this.selectPage = 1;
        this.list = [];
        this.queryData.selectCommunity = "";
        this.isPageEnd = false;
      }
      let _that = this;
      if (!this.isPageEnd) {
        this.loadingSelect = true;
      }
      this.$api
        .post({
          url: "/concern_community/notConcernCommunityList",
          data: { CommunityName: name, page: _that.selectPage, limit: 10 },
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            if (type == "change") {
              console.log(type);
              this.selectPage = 1;
              this.list = [];
              this.queryData.selectCommunity = "";
              this.isPageEnd = false;
            }
            console.log(this.selectPage);
            if (result.data.totalPage >= this.selectPage) {
              ++this.selectPage;
            } else {
              this.isPageEnd = true;
              return false;
            }
            var arrayCommunity = result.data.list;
            this.list = [...this.list, ...arrayCommunity];
          } else {
            console.log("查询未关注楼盘then：" + result.message);
          }
        })
        .catch(e => {
          console.log("查询未关注楼盘失败catch");
          console.log(e);
        })
        .finally(() => {
          this.loadingSelect = false;
        });
      // }
    },
    remoteInput () {
      if (this.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        this.loading = true;
        this.$api
          .post({
            url: "/concern_community/queryCommunityConcern",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            data: {
              comId: query,
              page: 1,
              limit: 50
            }
          })
          .then(e => {
            console.log("=========================" + e);
            if (e.data.code == 200) {
              console.log("=========================" + e.data.code);
              that.loading = false;
              that.options = e.data.data;
            }
          });
      }
    },
    queryCBId () {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.comId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNo = "";
            that.cbId = "";
            this.cbIdList = e.data.data.list;
          }
        });
      console.log("queryCBId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + this.comId);
    },
    queryRoomNo () {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.comId,
            cbId: this.cbId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNo = "";
            this.roomNoList = e.data.data.list;
          }
        });
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: this.comId,
            cbId: this.cbId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.roomNo = "";
            this.roomNoList = e.data.data.list;
          }
        });
      this.querylistByParams();
    },
    //跳转房源详情页面
    toHouseDetail (row) {
      var that = this;
      console.log("房源状态："+row.houseType);
      //店公共盘,在售无跟单, 进入BSAgentHouse房源详情
      if (row.houseType == 3 || row.houseType == 4) {
        console.log('进入bsagenthouse房源详情');
        that.$router.push({
          name: "houseDetails",
          params: { houseId: row.id }
        });
      }else if(row.houseType == 2){ //暂不售
        console.log('进入历史房源房源详情');
        that.$router.push({
          name: "historyDetails",
          params: { houseId: row.id,tradeType:1 }
        });   
      }else if (row.houseType == 5) {//潜在出售
           console.log('进入交易房源（tradeHouseTbl）详情');
           that.$router.push({
             name:"historyDetails",
             params:{houseId:row.id,tradeType:0}
           })
           
      }else if (row.houseType == 1|| row.houseType == 6) {//无号码
           console.log('进入楼盘详情')
           console.log("/building/geBuildingDetail/"+row.id);
           that.$notify({
            title: "警告",
            message: '楼盘详情页面未实现，接口已经有了',
            type: "warning",
            offset: 60
          });
      }else {
           that.$notify({
            title: "警告",
            message: '房源状态未知，无法查看',
            type: "warning",
            offset: 60
          });
      }
    },

    handleClick () { },
    handleSizeChange (val) {
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1, "id", "ascending");
    },
    handleCurrentChange (val) {
      this.queryVerifyHouseDatas(val, "id", "ascending");
    }
  }
};
</script>
