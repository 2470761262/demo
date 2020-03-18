
<template>
  <list-page @sort-change="sortMethod"
             :parentData="$data"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <!-- 楼盘 -->
      <div class="page-form-inline budingMarinSet">

        <el-select v-model="data.comId"
                   @focus="remoteInput"
                   @change="queryCBId()"
                   filterable
                   remote
                   clearable
                   placeholder="请输入楼盘名称搜索"
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
                   clearable
                   placeholder="请选择楼栋"
                   @change="queryRoomNo()">
          <el-option v-for="item in cbIdList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="data.roomNo"
                   filterable
                   placeholder="请选择房间号">
          <el-option v-for="item in roomNoList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="业主姓名" v-model="data.customName"  style="margin-left:30px;width:240px" clearable />
         
        <el-input placeholder="业主电话" v-model="data.tel"  style="margin-left:30px;width:240px" clearable />
        <el-input placeholder="最小面积" v-model="data.minInArea"  style="margin-left:30px;width:120px" clearable />------
        <el-input placeholder="最大面积" v-model="data.maxInArea"  style="width:120px" clearable />
        <el-input placeholder="最低售价" v-model="data.minPrice"  style="margin-left:30px;width:120px" clearable />------
        <el-input placeholder="最高售价" v-model="data.maxPrice"  style="width:120px" clearable />
        <el-date-picker v-model="data.timeSelect"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <span style='color:rgb(90,159,203);cursor:pointer;margin-left:20px'
              @click="remove">
          清除
        </span>
        <span>

          <el-checkbox style='margin-left:10px'
                       @click="keySelect()" /> 钥匙</span>
        <span>
          <el-checkbox style='margin-left:10px;background:#fff'
                       @click="onlySelect()" /> 独家</span>

        <el-button type="primary"
                   style="margin-left:30px"
                   size="mini"
                   @click="queryMyAgentParams">查询</el-button>
        <el-button style="margin-left:30px;width:50px;height:30px;border:0"
                   size="mini">
          <moreSelect @moreSlectChange="moreSlectChange"
                      style="height:40px;margin-right:5px;"></moreSelect>
        </el-button>
        <el-button style="margin-left:80px;width:50px;height:30px;border:0"
                   size="mini">
          <definitionmenu class="menuMarin"
                          :renderList="tableColumnField"
                          :tableColumn="tableColumn"
                          @change="tabColumnChange"></definitionmenu>
        </el-button>
      </div>
    </template>

    <template #tableColumn="">
      <!-- <el-table-column label="房源编号">
        <template v-slot="scope">
          {{scope.row.HouseNo}}
        </template>
      </el-table-column>
      <el-table-column label="楼盘名称">
        <template v-slot="scope">
          {{scope.row.CommunityName}}
        </template>
      </el-table-column>
      <el-table-column label="栋座">
        <template v-slot="scope">
          {{scope.row.BuildingName}}栋 — {{scope.row.RoomNo}}室
        </template>
      </el-table-column>
      <el-table-column label="售价(万元)">
        <template v-slot="scope">
          {{scope.row.Price}}
        </template>
      </el-table-column>
      <el-table-column label="面积(㎡)">
        <template v-slot="scope">
          {{scope.row.InArea}}
        </template>
      </el-table-column>
      <el-table-column label="单价(元/㎡)">
        <template v-slot="scope">
          {{Math.round(scope.row.Price*10000/scope.row.InArea)+"元/m²"}}
        </template>
      </el-table-column>
      <el-table-column label="户型">
        <template v-slot="scope">
          {{scope.row.Rooms+"室"+scope.row.hall+"厅"+scope.row.toilet+"卫"}}
        </template>
      </el-table-column>
      <el-table-column label ="录入时间">
        <template v-slot="scope">
          {{scope.row.AddTime}}
        </template>
      </el-table-column> -->
      <template v-for="(item) in tableColumnField">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop"
                         :formatter="item.formart"
                         :sort-orders="['ascending', 'descending']"
                         :sortable="item.order">
        </el-table-column>
      </template>
      <el-table-column label="操作"
                       fixed="right"
                       width="150"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     size="mini"
                     @click="toLook(scope.row.id)">查看</el-button>
          <el-button type="info"
                     size="mini"
                     @click="toHouseData(scope.row.id,scope.row.communityName,scope.row.AgentName,scope.row.agentper)">调配</el-button>

          <el-dialog title="跟单人将调配至本公司人员"
                     :visible.sync="dialogVisible"
                     :modal-append-to-body='false'
                     width="20%">
            <el-select v-model="AgentPerId"
                       @change="queryAddPerId"
                       key-value="accountID"
                       filterable
                       remote
                       clearable
                       placeholder="请输入跟单人姓名进行搜索"
                       :loading="loading">
              <el-option v-for="item in AgentPerList"
                         :key="item.accountID"
                         :label="item.perName"
                         :value="item">
                <span style="float: left">{{item.perName}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{item.deptName}}</span>
              </el-option>
            </el-select>
            <span slot="footer"
                  class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary"
                         @click="updateAgentPer">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>

    </template>
  </list-page>
</template>
<script>
import listPage from '@/components/listPage';
import getMenuRid from '@/minxi/getMenuRid';
import moreSelect from '@/components/moreSelect';
import definitionmenu from '@/components/definitionMenu';
export default {
  mixins: [getMenuRid,],
  components: {
    listPage,
    definitionmenu,
    moreSelect
  },
  data () {

    return {
      loading: false,

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
        maxPrice: "",
        keyOwner: "",
        isOnly: ""
      },
      AgentPerId: '',
      dialogVisible: false,
      options: [],
      agentName: '',
      agentper: '',
      newAgentName: '',
      cbIdList: [],
      roomNoList: [],
      AgentPerList: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableColumnField: [
        { prop: 'houseNo', label: '房源编号', width: '170', order: false, disabled: true, default: true },
        { prop: 'communityName', label: '小区名称', order: false, width: '150', disabled: true, default: true },
        { prop: 'buildingName', label: '楼栋号', width: '90', order: false, disabled: true, default: true },
        { prop: 'roomNo', label: '房间号', width: '110', order: false, disabled: true, default: true },
        { prop: 'inArea', label: '面积(m²)', width: '110', order: 'custom', disabled: false, default: true, formart: item => item.inArea + 'm²' },
        { prop: 'price', label: '售价(万元)', width: '120', order: 'custom', disabled: false, default: true, formart: item => item.price + '万元' },
        { prop: 'seenNum', label: '被看次数', width: '120', order: false, disabled: false, default: true },
        { prop: 'outfollow', label: '未跟进天数', width: '120', order: false, disabled: false, default: true },
        { prop: 'notLookNum', label: '未被看天数', width: '120', order: false, disabled: false, default: true },
        { prop: 'addTime', label: '添加时间', width: '120', order: false, disabled: false, default: false },
        { prop: 'AgentName', label: '跟单人', width: '120', order: false, disabled: false, default: true },
        { prop: '', label: '户型', width: '150', order: false, disabled: false, default: true, formart: item => item.rooms + '室' + item.hall + '厅' + item.toilet + '卫' },
        { prop: 'unitpaice', label: '单价(元/㎡)', width: '120', order: 'custom', disabled: false, default: false, format: item => item.unitpaice + '元/㎡' },
        { prop: 'face', label: '朝向', width: '120', order: false, disabled: false, default: false },
        { prop: 'floor', label: '楼层', width: '120', order: false, disabled: false, default: false },
        { prop: 'decoration', label: '装修', width: '120', order: false, disabled: false, default: false },
        { prop: 'addName', label: '添加人', width: '120', order: false, disabled: false, default: false }

      ],
      tableColumn: [],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [

        ]
      },
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '待验真'
      }, {
        value: '选项3',
        label: '客户验真'
      }, {
        value: '选项4',
        label: '店长验真'
      }, {
        value: '选项5',
        label: '验真失败'
      }, {
        value: '选项6',
        label: '已过期'
      }],
      moreSlect: {},
      queryData: {
        CommunityName: '',
        timeSelect: '',
        roomNo: '',
        cbId: '',
        isOnly: '',
        keyOwner: ''
      },

    }
  },
  mounted () {
    this.queryMyAgent(1, 'id', 'ascending');

  },
  methods: {
    moreSlectChange (e) {
      if (e != '')
        this.moreSlect = e;
      this.queryMyAgent(1, 'id', 'ascending')


    },
    sortMethod (e) {
      console.log(e, "eeee排序");
      this.querylist(1, e.prop, e.order);
    },
    toHouseData (id, CommunityName) {
      var that = this
      that.dialogVisible = true
      console.log("得到房源id为:" + id + "------楼盘名称" + CommunityName);
      that.toHouseId = id;
      that.toComName = CommunityName;
    },
    querylistByParams () {
      console.log(this.queryData.timeSelect);
      this.querylist(1, 'id', 'ascending');
    },
    keySelect () {
      if (this.queryData.keyOwner != '') {
        this.queryData.keyOwner = '';
      } else {
        this.queryData.keyOwner = '1';
      }
    },
    onlySelect () {
      if (this.queryData.isOnly != '') {
        this.queryData.isOnly = '';
      } else {
        this.queryData.isOnly = '1';
      }
    },
    getName (name) {
      this.newAgentName = name;
      console.log("==========" + this.newAgentName)
    },
    querylist (currentPage) {
      let params = { limit: this.pageJson.pageSize + '', page: currentPage + '', sortColumn: 'id' };
      let that = this;

      if (this.queryData.CommunityName != null && this.queryData.CommunityName != '') { params.comId = this.queryData.CommunityName; }
      if (this.queryData.BuildingName != null && this.queryData.BuildingName != '') { params.BuildingName = this.queryData.BuildingName; }
      if (this.queryData.RoomNo != null && this.queryData.RoomNo != '') { params.RoomNo = this.queryData.RoomNo; }
      if (this.queryData.Customers != null && this.queryData.Customers != '') { params.customName = this.queryData.Customers; }
      if (this.queryData.Tel != null && this.queryData.Tel != '') { params.tel = this.queryData.Tel; }
      if (this.queryData.minPrice != null && this.queryData.minPrice != '') { params.minPrice = this.queryData.minPrice; }
      if (this.queryData.maxPrice != null && this.queryData.maxPrice != '') { params.maxPrice = this.queryData.maxPrice; }
      if (this.queryData.minInArea != null && this.queryData.minInArea != '') { params.minInArea = this.queryData.minInArea; }
      if (this.queryData.maxInArea != null && this.queryData.maxInArea != '') { params.maxInArea = this.queryData.maxInArea; }
      if (this.queryData.timeSelect != null && this.queryData.timeSelect[0] != null && this.queryData.timeSelect[0] != '') { params.beginTime = this.queryData.timeSelect[0]; }
      if (this.queryData.timeSelect != null && this.queryData.timeSelect[1] != null && this.queryData.timeSelect[1] != '') { params.endTime = this.queryData.timeSelect[1]; }

      this.$api.post({
        url: '/myHouse/getMyAgent',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        that.loading = false;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          that.pageJson.total = result.data.totalCount;
          that.pageJson.currentPage = result.data.currPage;
          that.tableData = result.data.data;
        } else {
          console.log("查询我的跟单列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的跟单失败");
        console.log(e);
      })
    },
    queryOnly () {
      if (this.data.isOnly != '') {
        this.data.isOnly = '';
      } else {
        this.data.isOnly = '1';
      }
      this.queryMyAgent(1, 'id', 'ascending');
    },
    queryAddPerId (row) {
      let data = JSON.stringify(row)
      var that = this
      that.newAgentName = data.perName;
      this.$api.get({
        url: "/mateHouse/queryComBuilding",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: that.comId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.cbIdList = e.data.data.list;
        }
      })
    },
    remove () {
      this.data.comId = "";
      this.data.cbId = "";
      this.data.roomNo = "";
      this.data.timeSelect = "";
      this.data.timeSelect = '';
      this.data.customName = "";
      this.data.tel = "";
      this.data.minInArea = "";
      this.data.maxInArea = "";
      this.data.minPrice = "";
      this.data.maxPrice = "";
      this.data.keyOwner = "";
      this.data.isOnly = "";
      this.queryMyAgent(1, 'id', 'ascending');
    },
    queryCompanyPerList () {
      var that = this
      this.$api.get({
        url: '/employee/companyPerList',
        token: false
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          that.AgentPerList = result.data;
        } else {
          console.log("查询同公司下的所有经纪人失败");
        }
      }).catch((e) => {
        console.log("查询同公司下的所有经纪人失败");
      })
    },
    updateAgentPer () {
      var that = this

      console.log("得到跟单人id为:" + that.newAgentName + "======" + JSON.stringify(that.AgentPerId.accountID));
      console.log("得到房源id为:" + that.toHouseId + "------楼盘名称" + that.toComName)
      let params = { houseId: parseInt(that.toHouseId) + '', newAgentPer: parseInt(JSON.stringify(that.AgentPerId.accountID)), oldAgentPer: parseInt(that.agentper), newAgentName: that.AgentPerId.perName };

      this.$api.post({
        url: '/agent_house/updateAgentPer',

        data: params,
        qs: true,
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
        } else {
          console.log("修改失败");
        }
      }).catch((e) => {
        console.log("修改失败");
      })
      that.dialogVisible = false
      this.queryMyAgentParams();
    },
    toHouseData (id, CommunityName, agentName, agentper) {
      var that = this
      that.queryCompanyPerList();
      that.agentName = agentName;
      that.agentper = agentper;
      that.dialogVisible = true
      console.log("得到房源id为:" + id + "------楼盘名称" + CommunityName);
      that.toHouseId = id;
      that.toComName = CommunityName;
    },
    tabColumnChange (e) {
      this.tableColumn = e;
    },
    queryTabData () {
      console.log(this, '111');
    },
    formatHouseType (row, column) {
      return row.Rooms + '室' + row.hall + '厅' + row.toilet + '卫';
    },

    toLook (id) {
      var that = this;
      that.$router.push({ name: 'houseDetails', params: { "houseId": id } });
    },
    queryMyAgentParams () {
      this.queryMyAgent(1, 'id', 'ascending');
    },
    remoteInput () {

      if (this.data.comId.length == 0) {
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
            communityName: query,
            page: 1,
            limit: 50
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
      this.$api.get({
        url: "/mateHouse/queryComBuilding",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
        qs: true,
        data: {
          comId: that.data.comId,
          page: 1,
          limit: 50
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.data.roomNo = '';
          that.data.cbId = '';
          that.cbIdList = e.data.data.list;
        }
      })
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
    },
    queryMyAgent (currentPage, column, type) {
      var that = this;
      let params = { "limit": that.pageJson.pageSize, "page": currentPage - 1 };
      params.sortColumn = column;
      params.sortType = type;
      if (Object.keys(this.moreSlect).length != 0) {
        for (let key in this.moreSlect) {
          if (this.key == 'addTime' && this.moreSlect[key] !== '') {
            params.biginTime = this.moreSlect[key][0];
            params.endTime = this.moreSlect[key][1];
          } else {
            params[key] = this.moreSlect[key]
          }
        }
      }
      else {
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.roomNo = that.data.roomNo;
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
        params.customName = that.data.customName;
        params.tel = that.data.tel;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
        params.keyOwner = this.data.keyOwner;
        params.isOnly = this.data.isOnly;
      }
      this.$api.post({
        url: '/myHouse/getMyAgent',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
      }).then((e) => {
        console.log(e.data);
        let data = e.data
        if (data.code == 200) {
          that.pageJson.total = data.data.dataCount;
          that.tableData = data.data.data;
        } else {
          console.log("查询我的跟单列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的跟单列表失败");
        console.log(e);
      })
    },

    handleClick () {

    },
    queryTabData () {
      this.$emit("queryTabData");
      console.log(this.queryData);
      this.queryMyAgentParams(1);
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryMyAgent(1, 'id', 'ascending');
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.queryMyAgent(val, 'id', 'ascending');
    },
  },
}
</script>
