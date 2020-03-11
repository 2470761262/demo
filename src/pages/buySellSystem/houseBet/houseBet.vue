<template>
  <list-page :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">
        <el-form inline
                 :model="data"
                 ref="data"
                 size="medium">

          <el-form-item label="楼盘"
                        prop="customerName">

            <el-select v-model="data.comId"
                       @change="queryCBId()"
                       filterable
                       remote
                       style="width: 180px"
                       clearable
                       placeholder="请选择楼盘进行搜索"
                       @focus="remoteCommunityNameInput"
                       :remote-method="remoteMethod"
                       :loading="loading">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="data.cbId"
                       filterable
                       style="width: 132px"
                       placeholder="请选择楼栋"
                       clearable
                       @change="queryRoomNo()">
              <el-option v-for="item in cbIdList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="data.roomNo"
                       filterable
                       style="width: 132px"
                       clearable
                       placeholder="请选择房间号">
              <el-option v-for="item in roomNoList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="业主"
                        prop="customerName">
            <el-input clearable
                      v-model="data.customerName"
                      placeholder="业主姓名" />
          </el-form-item>

          <el-form-item label="电话"
                        prop="tel">
            <el-input clearable
                      v-model="data.tel"
                      placeholder="业主电话" />
          </el-form-item>

          <el-form-item label="价格"
                        prop="money_from">
            <el-col :span="8">
              <el-input clearable
                        v-model="data.moneyFrom"
                        placeholder="最小值" />
            </el-col>
            <el-col class="line"
                    :span="2"
                    align="center">-</el-col>
            <el-col :span="8">
              <el-form-item prop="money_to">
                <el-input clearable
                          v-model="data.moneyTo"
                          placeholder="最大值" />
              </el-form-item>
            </el-col>
            <el-col class="line"
                    :span="1"
                    align="center">万</el-col>
          </el-form-item>

          <el-form-item label="对赌日期"
                        prop="timeSelect">
            <el-date-picker v-model="data.timeSelect"
                            type="daterange"
                            unlink-panels
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="起"
                            end-placeholder="止">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="对赌结果"
                        prop="status">
            <el-select v-model="data.status"
                       clearable
                       style="width: 120px"
                       placeholder="对赌结果">
              <el-option v-for="item in betStatusList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="对赌人"
                        prop="empId">
            <el-input clearable
                      v-model="data.empId"
                      placeholder="" />
          </el-form-item>
          <span style='color:rgb(90,159,203);cursor:pointer;margin-left:20px'
                @click="Remove">
            清除
          </span>
          <el-button type="primary"
                     style="margin-left:10px"
                     size="mini"
                     @click="queryHouseBetParams">查询
          </el-button>
        </el-form>
      </div>
    </template>

    <template #tableColumn="cell">
      <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template>
      <!--      房源编号、楼盘名称、售价（可排序）、面积（可排序）、单价（可排序）、户型（X室X厅X卫）、对赌鑫币值、预期奖励鑫币值、对赌时间（对赌成功当日）、对赌结果、剩余天数、对赌人、操作（查看）-->
      <el-table-column prop="price"
                       label="售价(万元)"
                       :render-header="customFieldColumn">
      </el-table-column>
      <el-table-column prop="inArea"
                       label="面积(m²)"
                       :render-header="customFieldColumn">
      </el-table-column>
      <el-table-column prop="price/inArea"
                       label="单价(元/㎡)"
                       :formatter="unitPrice"
                       :render-header="customFieldColumn">
      </el-table-column>
      <el-table-column prop=""
                       label="户型"
                       :formatter="formatHouseType">
      </el-table-column>
      <el-table-column prop="amount"
                       label="对赌鑫币"
                       :render-header="customFieldColumn">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="对赌时间"
                       :render-header="customFieldColumn">
      </el-table-column>
      <el-table-column prop="status"
                       label="对赌结果"
                       :formatter="formatHouseBetStatus">
      </el-table-column>
      <el-table-column prop="brokerName"
                       label="对赌人">
      </el-table-column>
      <el-table-column prop="endTime"
                       label="到期时间">
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     size="mini"
                     @click="toLook(scope.row)">查看
          </el-button>
        </template>
      </el-table-column>

    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';

export default {
  components: {
    listPage
  },
  data () {

    return {
      loading: false,

      data: {
        comId: '',
        cbId: '',
        roomNo: '',
        tel: '',
        customerName: '',
        status: '',
        moneyFrom: '',
        moneyTo: '',
        order: '',
        orderAsc: '',
        timeSelect: ''
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      betStatusList: [
        { value: 0, name: '努力中' },
        { value: 1, name: '成功' },
        { value: 2, name: '失败' },
        { value: 3, name: '过期' },
      ],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: 'houseNo', label: "房源编号" },
        { prop: 'communityName', label: "楼盘名称" },
      ],
      tableData: [{
        // house: '龙腾花园-16栋-604室',
        // priceArea: '234万/100平',
        // type: '3室2厅1卫',
        // levae: '精装修',
        // economicPro: '周杰伦',

        // validateType: '通过',
        // cutPro: '周杰伦1',
        // addTime: '2019-01-01 18:00:00',
        // cellType: '号码异常',
        // operation: '3',
      }],
    }
  },
  mounted () {
    this.queryHouseBet(1);
  },
  methods: {
    Remove () {
      Object.assign(this.$data, this.$options.data.call(this));
      this.queryHouseBet(1);

    },
    queryTabData () {
      console.log(this, '111');
    },
    formatHouseType (row, column) {
      if (row.rooms) {
        return row.rooms + '室' + row.hall + '厅' + row.toilet + '卫';
      }
    },
    unitPrice (row, column) {
      if (row.rooms) {
        return Math.round(row.price * 1000 / row.inArea);
      }
    },
    formatHouseBetStatus (row, column) {
      switch (row.status) {
        case 0:
          return "努力中"
          break;
        case 1:
          return "成功"
          break;
        case 2:
          return "失败"
          break;
        case 3:
          return "过期"
          break;
        default:
          return ""
          break;
      }
    },
    customFieldColumn (h, params) {
      var that = this
      return h('span', {}, [
        h('span', {}, params.column.label),
        h('span', {          style: { 'color': params.column.property == that.data.order && that.data.orderAsc == 'DESC' ? 'red' : '', float: 'right' },
          on: { click: () => { that.orderBy(params.column.property, "DESC") } }        }, '↓'),
        h('span', {          style: { 'color': params.column.property == that.data.order && that.data.orderAsc == 'ASC' ? 'red' : '', float: 'right' },
          on: { click: () => { that.orderBy(params.column.property, "ASC") } }        }, '↑')
      ])
    },
    orderBy (o, Asc) {
      this.data.order = o;
      this.data.orderAsc = Asc;
      this.queryHouseBetParams();
    },
    toLook (row) {
      var that = this;
      that.$router.push({ name: 'houseDetails', params: { "houseId": row.id } });
    },
    queryHouseBetParams () {
      this.queryHouseBet(1);
    },
    //楼盘获取焦点 第一次点击就进行查询
    remoteCommunityNameInput () {
      if (this.options.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod (query) {
      var that = this
      if (query !== '') {
        this.loading = true;

        this.$api.get({
          url: "/mateHouse/queryCommunity",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            communityName: query
          }
        }).then((e) => {
          console.log(e.data)
          if (e.data.code == 200) {
            that.loading = false;
            that.options = e.data.data.list;

          }
        })
      } else {
        this.options = [];
      }
    },
    queryCBId () {
      var that = this
      that.data.cbId = ""
      that.data.roomNo = ''
      this.$api.get({
        url: "/mateHouse/queryComBuilding",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: that.data.comId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.cbIdList = e.data.data.list;
        }
      })
    },
    queryRoomNo () {
      var that = this
      that.data.roomNo = ''
      this.$api.get({
        url: "/mateHouse/queryBuildIngHouses",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: that.data.comId,
          cbId: that.data.cbId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.roomNoList = e.data.data.list;
        }
      })
    },
    queryHouseBet (currentPage) {
      var that = this;
      let params = { "limit": that.pageJson.pageSize, "page": currentPage };

      params.comId = that.data.comId;
      params.cbId = that.data.cbId;
      params.roomNo = that.data.roomNo;
      params.status = that.data.status;
      params.customerName = that.data.customerName;
      params.empId = that.data.empId;
      params.tel = that.data.tel;
      params.moneyFrom = that.data.moneyFrom;
      params.moneyTo = that.data.moneyTo;
      if (that.data.timeSelect.length > 0)
        params.beginTime = that.data.timeSelect[0];
      if (that.data.timeSelect.length > 1)
        params.endTime = that.data.timeSelect[1];
      params.order = that.data.order;
      params.orderAsc = that.data.orderAsc;

      console.log(params);
      this.$api.get({
        url: '/house/bet/list',
        data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        let data = e.data
        if (data.code == 200) {
          that.pageJson.total = data.data.totalCount;
          that.pageJson.currentPage = data.data.currPage;
          that.tableData = data.data.list;
        } else {
          console.log("查询对赌房源列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询对赌房源列表失败");
        console.log(e);
      })
    },
    isForBut (type) {
      let array = [
        { name: '查看', isType: '3', methosName: '' }
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
    },
    handleClick () {

    },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryHouseBetParams();
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryHouseBet(val);
    },
    handleSizeChange (val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryHouseBet(1);
    }
  },
}
</script>
