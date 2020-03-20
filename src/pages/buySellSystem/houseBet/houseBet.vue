<template>
  <list-page :parentData="$data"
             @sort-change="sortMethod"
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
                        prop="minMoney">
            <el-col :span="8">
              <el-input clearable
                        v-model="data.minMoney"
                        placeholder="最小值" />
            </el-col>
            <el-col class="line"
                    :span="2"
                    align="center">-</el-col>
            <el-col :span="8">
              <el-form-item prop="money_to">
                <el-input clearable
                          v-model="data.maxMoney"
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
                        prop="empName"
                        style="position: relative;">
            <el-input clearable
                      v-model="data.empName"
                      placeholder="对赌人公司/部门/姓名"
                      v-on:click.native="showHrTree = true"
                      readonly />
            <div class="elTree"
                 style="position: absolute;z-index: 2;min-width: 280px"
                 v-show="showHrTree">
              <el-tree ref="treeForm"
                       :data="treeData"
                       node-key="nodeId"
                       show-checkbox
                       :props="defaultProps"
                       @check-change="handleCheckChange"
                       :highlight-current="true"
                       :filter-node-method="filterNode"
                       check-strictly
                       :action="''"
                       empty-text="暂无数据，请检查权限"
                       auto-expand-parent
                       :default-expanded-keys="curNodeId"
                       :default-checked-keys="curNodeId"></el-tree>
            </div>
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
          <el-button style="margin-left:30px;width:50px;height:30px;border:0"
                     size="mini">
            <moreSelect @moreSelectChange="moreSelectChange"
                        style="height:40px;margin-right:5px;"></moreSelect>
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
                       :sort-orders="['ascending', 'descending']"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop="inArea"
                       label="面积(m²)"
                       :sort-orders="['ascending', 'descending']"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop="price/inArea"
                       label="单价(元/㎡)"
                       :formatter="unitPrice"
                       :sort-orders="['ascending', 'descending']"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop=""
                       label="户型"
                       :formatter="formatHouseType">
      </el-table-column>
      <el-table-column prop="amount"
                       label="对赌鑫币"
                       :sort-orders="['ascending', 'descending']"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="对赌时间"
                       :sort-orders="['ascending', 'descending']"
                       sortable="custom">
<!--                       :render-header="customFieldColumn"-->
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
import moreSelect from '@/components/moreSelect';
export default {
  components: {
    listPage,
    moreSelect,
  },
  data () {

    return {
      loading: true,
      showHrTree: false,
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      moreSelect: [],
      treeData: [],
      curNodeId: [],
      data: {
        comId: '',
        cbId: '',
        roomNo: '',
        tel: '',
        customerName: '',
        status: '',
        minMoney: '',
        maxMoney: '',
        order: '',
        empId: '',
        deptId: '',
        coId: '',
        empName: '',
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

    this.queryHouseBet(1, 'id', 'ascending');
    //读取树数据
    this.$api
      .post({
        url: "/sys/tree/bet"
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.treeData = result.data;
        } else {
          console.log("载入结果" + +result.message);
          alert(result.message);
        }
      })
      .then(() => {
        if (this.$route.query.cur != null) {
          this.curNodeId = [this.$route.query.cur];
          this.$nextTick(() => {
            this.handleCheckChange(
              this.$refs.treeForm.getNode(...this.curNodeId).data,
              true
            );
          });
        }
      })
      .catch(e => {
        console.log("读取失败");
        console.log(e);
      });
  },
  methods: {
    moreSelectChange (e) {
      debugger
      if (e != '')

        this.moreSelect = e;
      this.queryHouseBet(1, 'id', 'ascending')
    },
    sortMethod (e) {
      console.log(e, "eeee排序");
      this.queryHouseBet(1, e.prop, e.order);
    },
    Remove () {
      Object.assign(this.$data, this.$options.data.call(this));
      this.queryHouseBet(1, 'id', 'ascending');

    },
    handleCheckChange (data, checked, node) {
      this.showHrTree = false;
      if (checked == true) {
        this.data.empName = data.labelName;
        this.checkedType = data.type;
        this.$refs.treeForm.setCheckedNodes([data]);
        // this.jumpNodeId = data.nodeId;
        console.log(
          "当前类型：" + this.checkedType + ",ID：" + data.businessId
        );
        //  0公司，1部门，2员工，3职位
        if (this.checkedType === 0) {
          this.data.coId = data.businessId;
        } else if (this.checkedType === 1) {
          this.data.deptId = data.businessId;
        } else if (this.checkedType === 2) {
          this.data.empId = data.businessId;
        }
      }
    },
    filterNode (value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
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
    // customFieldColumn (h, params) {
    //   var that = this
    //   return h('span', {}, [
    //     h('span', {}, params.column.label),
    //     h('span', {          style: { 'color': params.column.property == that.data.order && that.data.orderAsc == 'DESC' ? 'red' : '', float: 'right' },
    //       on: { click: () => { that.orderBy(params.column.property, "DESC") } }        }, '↓'),
    //     h('span', {          style: { 'color': params.column.property == that.data.order && that.data.orderAsc == 'ASC' ? 'red' : '', float: 'right' },
    //       on: { click: () => { that.orderBy(params.column.property, "ASC") } }        }, '↑')
    //   ])
    // },
    orderBy (o, Asc) {
      this.data.order = o;
      this.data.orderAsc = Asc;
      this.queryHouseBetParams();
    },
    toLook (row) {
      var that = this;
      that.$router.push({ name: 'houseDetails', params: { "houseId": row.houseId } });
    },
    queryHouseBetParams () {
      this.queryHouseBet(1, 'id', 'ascending');
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
        that.loading = true;

        that.$api.get({
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
        that.options = [];
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
    queryHouseBet (currentPage, column, type) {
      debugger
      if(!column){
        column="id"
      }
      if(!type){
        type="ascending"
      }
      var that = this;
      that.loading = true;
      let params = { "limit": that.pageJson.pageSize, "page": currentPage };
      params.sortColumn = column;
      params.sortType = type;
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (this.key == 'addTime' && this.moreSelect[key] !== '') {
            params.biginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (this.key == 'followTime' && this.moreSelect[key] !== '') {
            params.biginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else {
            params[key] = this.moreSelect[key]
          }
        }
      }
      else {
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.roomNo = that.data.roomNo;
        params.status = that.data.status;
        params.customerName = that.data.customerName;
        params.empId = that.data.empId;
        params.coId = that.data.coId;
        params.deptId = that.data.deptId;
        params.tel = that.data.tel;
        params.minMoney = that.data.minMoney;
        params.maxMoney = that.data.maxMoney;
        if (that.data.timeSelect.length > 0)
          params.beginTime = that.data.timeSelect[0];
        if (that.data.timeSelect.length > 1)
          params.endTime = that.data.timeSelect[1];
      }
      console.log(params);
      this.$api.post({
        url: '/house/bet/getBetHouse',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        that.loading = false;
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
      this.queryHouseBet(val, 'id', 'descending');
    },
    handleSizeChange (val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryHouseBet(1, 'id', 'ascending');
    }
  },
}
</script>
