<style lang="less" scoped>
</style>
<template>
  <list-page @sort-change="sortMethod"
             :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select v-model="data.comId"
                     @focus="remoteInput"
                     @change="queryCBId"
                     filterable
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
          <el-select v-model="data.cbId"
                     filterable
                     clearable
                     placeholder="楼栋"
                     @change="queryRoomNo">
            <el-option v-for="item in cbIdList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
          <el-select v-model="data.roomNo"
                     filterable
                     @change="querySaleNotTrackParams"
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
                    @change="querySaleNotTrackParams"
                    v-model="data.customName"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">电话</h3>
          <el-input placeholder="业主电话"
                    v-model="data.tel"
                    class="set-input200"
                    @change="querySaleNotTrackParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input placeholder="最小值"
                    v-model="data.minPrice"
                    @change="querySaleNotTrackParams"
                    clearable
                    class="set-input90" />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxPrice"
                    @change="querySaleNotTrackParams"
                    clearable
                    class="set-input90" />
        </div>
        <div class="query-content-cell cell-interval45">
          <definitionmenu :renderList="tableColumnField"
                          :tableColumn="tableColumn"
                          @change="tabColumnChange"></definitionmenu>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">面积</h3>
          <el-input placeholder="最小面积"
                    v-model="data.minInArea"
                    class="set-input90"
                    @change="querySaleNotTrackParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大面积"
                    v-model="data.maxInArea"
                    class="set-input90"
                    @change="querySaleNotTrackParams"
                    clearable />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">作业类型</h3>
          <el-select v-model="workType"
                     value-key="item.value"
                     @change="querySaleNotTrackParams"
                     placeholder="请选择类型">
            <el-option v-for="item in option"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker v-model="data.timeSelect"
                          type="daterange"
                          class="set-data-pricker"
                          @change="querySaleNotTrackParams"
                          :default-time="['00:00:00', '23:59:59']"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
          <span class="query-cell-suffix handlebut"
                @click="remove">清除</span>
        </div>
        <div class="query-content-cell cell-interval45">
          <el-button type="primary"
                     size="mini"
                     @click="querySaleNotTrackParams">查询</el-button>
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect :configRule="{deptParentId: false,store:false,personnel:false}" @moreSelectChange="moreSelectChange"></moreSelect>
        </div>
      </div>
    </template>
    <template #tableColumn>
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
                       fixed="right"
                       width="150">
        <template v-slot="scope">
          <el-button type="primary"
                     size="mini"
                     @click="distributeEvent(item.methosName,scope.row.id)"
                     v-for="(item,index) in isForBut(2)"
                     :key="index">{{item.name}}</el-button>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import moreSelect from "@/components/moreSelect";
import houseContrast from "@/minxi/houseContrast";
import definitionmenu from "@/components/definitionMenu";
import '@/assets/publicLess/pageListQuery.less';
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    definitionmenu,
    moreSelect
  },
  data () {
    return {
      loading: true,
      workType: "",
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: "",
        customName: "",
        tel: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: ""
      },
      option: [
        { value: "1", label: "全部" },
        { value: "2", label: "草稿" },
        { value: "3", label: "录入" },
        { value: "4", label: "钥匙" },
        { value: "5", label: "委托" },
        { value: "6", label: "实勘" },
        { value: "7", label: "锁定" }
      ],
      options: [],
      cbIdList: [],
      roomNoList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumnField: [
        {
          prop: "houseNo",
          label: "房源编号",
          width: "170",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "communityName",
          label: "小区名称",
          order: false,
          width: "150",
          disabled: true,
          default: true
        },
        {
          prop: "buildingName",
          label: "楼栋号",
          width: "90",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "roomNo",
          label: "房间号",
          width: "110",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "110",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.inArea + "m²"
        },
        {
          prop: "price",
          label: "售价(万元)",
          width: "120",
          order: "custom",
          disabled: false,
          default: true,
          formart: item => item.price + "万元"
        },
        {
          prop: "seenNum",
          label: "被看次数",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "outfollow",
          label: "未跟进天数",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "noSeenDay",
          label: "未被看天数",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "addTime",
          label: "添加时间",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "agentPerName",
          label: "跟单人",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "houseType",
          label: "户型",
          width: "150",
          order: false,
          disabled: false,
          default: true,
          formart: item =>
            (item.rooms || 0) + "室" + (item.hall || 0) + "厅" + (item.toilet || 0) + "卫"
        },
        {
          prop: "unitPrice",
          label: "单价(元/㎡)",
          width: "130",
          order: "custom",
          disabled: false,
          default: true,
          format: item => item.unitPrice + "元/㎡"
        },
        {
          prop: "face",
          label: "朝向",
          width: "120",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "floor",
          label: "楼层",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "decoration",
          label: "装修",
          width: "120",
          order: false,
          disabled: false,
          default: true
        }
      ],
      tableColumn: [],
      tableData: [],
      moreSelect: {},
      sortColumn: "id",//排序字段
      sortType: "descending",//排序类型
    };
  },
  mounted () {
    this.querySaleNotTrack(1);
  },
  methods: {
    sortMethod (e) {
      this.transitionOrderList.forEach(Element => {
        if (Element.key == e.prop) {
          this.sortColumn = Element.value;
          if (e.order == "descending") {
            this.sortType = "ascending";
          }
          else {
            this.sortType = "descending";
          }
        }
      });
      this.querySaleNotTrack(1);
    },
    moreSelectChange (e) {
      this.moreSelect = e;
      this.querySaleNotTrack(1);
    },
    remove () {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.querySaleNotTrack(1);
    },
    distributeEvent (e, id) {
      var that = this;
      console.log("hhhhhhhhhhhhhhhhhh", id);
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    tabColumnChange (e) {
      this.tableColumn = e;
    },
    queryTabData () {
      console.log(this, "111");
    },
    toLook (id) {
      var that = this;
      that.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    querySaleNotTrackParams () {
      this.querySaleNotTrack(1);
    },
    remoteInput () {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    isForBut (type) {
      let array = [{ name: "查看", isType: "1,2,3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    remoteMethod (query) {
      var that = this;
      if (query !== "") {
        that.loading = true;

        that.$api
          .get({
            url: "/community/myRelated",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
            data: {
              communityName: query,
              page: 1,
              limit: 50
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
            }
          });
      } else {
        that.options = [];
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
            comId: that.data.comId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.data.cbId = "";
            that.cbIdList = e.data.data.list;
          }
        });
      this.querySaleNotTrackParams();
    },
    queryRoomNo () {
      var that = this
      this.$api.get({
        url: "/mateHouse/queryBuildIngHouses",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: that.data.comId,
          cbId: that.data.cbId,
          page: 1,
          limit: 50
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.data.roomNo = '';
          that.roomNoList = e.data.data.list;
        }
      })
      this.querySaleNotTrackParams();
    },
    querySaleNotTrack (currentPage) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      if (that.workType != null && that.workType != "") {
        console.log("option的值！！！" + that.workType);
        params.workType = that.workType;
      }
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.beginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          }
          else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.beginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          }
          else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.roomNo = that.data.roomNo;
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
        params.customName = that.data.customName;
        params.tel = that.data.tel;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
        params.minPrice = that.data.minPrice;
        params.maxPrice = that.data.maxPrice;
      }
      params.sortColumn = that.sortColumn;
      params.sortType = that.sortType;
      this.$api
        .post({
          url: "/myHouse/getMyRelated",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.dataCount;

            that.tableData = data.data.data;
          } else {
            console.log("查询我的相关列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询我的相关列表失败");
          console.log(e);
        });
    },

    handleClick () { },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.querySaleNotTrackParams(1);
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.querySaleNotTrack(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.querySaleNotTrack(val);
    }
  }
};
</script>
