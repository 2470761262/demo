<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="page-form-inline ">
        <el-input placeholder="楼盘名称"
                  style="width:280px"
                  v-model="queryData.CommunityName">
          <template slot="prepend">楼盘名称 </template>
        </el-input>
        <el-input placeholder="栋座"
                  v-model="queryData.BuildingName"
                  style="margin-left:10px;width:100px"></el-input>
        <el-input placeholder="房间号"
                  v-model="queryData.RoomNo"
                  style="margin-left:10px;width:100px"></el-input>
        <el-input placeholder="姓名"
                  style="margin-left:30px;width:240px"
                  v-model="queryData.Customers"
                  clearable>
          <template slot="prepend">业主</template>
        </el-input>

        <el-input placeholder="业主电话"
                  v-model="queryData.Tel"
                  style="margin-left:30px;width:240px"
                  clearable>
          <template slot="prepend">电话</template>
        </el-input>

        <el-input placeholder="最小值"
                  v-model="queryData.minPrice"
                  style="margin-left:25px;width:160px"
                  clearable>
          <template slot="prepend">价格</template>
        </el-input>
        <el-input placeholder="最大值"
                  v-model="queryData.maxPrice"
                  style="margin-left:10px;width:100px"></el-input>
        <br />
        <el-input placeholder="最小值"
                  v-model="queryData.minInArea"
                  style="width:160px"
                  clearable>
          <template slot="prepend">面积</template>
        </el-input>
        <el-input placeholder="最大值"
                  v-model="queryData.maxInArea"
                  style="margin-left:10px;width:100px"></el-input>

        <!-- <el-select v-model="value"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <template slot="prepend">房源状态</template> -->
        <el-date-picker v-model="queryData.timeSelect"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary"
                   style="margin-left:30px"
                   size="mini"
                   @click="querylistByParams">查询</el-button>
      </div>

    </template>

    <template #tableColumn="">

      <el-table-column label="房源编号">
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
          {{scope.row.BuildingName}}栋--{{scope.row.RoomNo}}室
        </template>
      </el-table-column>
      <!-- <el-table-column label="房间号">
        <template v-slot="scope">
          {{scope.row.RoomNo}}
        </template>
      </el-table-column> -->

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
      <!-- <el-table-column label="装修程度">
        <template v-slot="scope">
          {{scope.row.Decoration}}
        </template>
      </el-table-column> -->
      <el-table-column label="录入时间">
        <template v-slot="scope">
          {{scope.row.AddTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     @click="toHouseDetail(scope.row.id)"
                     size="mini">查看</el-button>
          <el-button type="info"
                     size="mini"
                     @click="toHouseData(scope.row.id,scope.row.CommunityName)">调配</el-button>
          <el-dialog title="跟单调配至本公司人员"
                     :visible.sync="dialogVisible"
                     :modal-append-to-body='false'
                     width="20%">
            <el-select v-model="AgentPerId" @change="queryAddPerId()"
                       filterable
                       remote
                       clearable
                       placeholder="请输入跟单人姓名进行搜索" :loading="loading">
              <el-option v-for="item in AgentPerList" :key="item.accountID"
                         :label="item.perName" :value="item.accountID">
                         <span style="float: left">{{item.perName}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{item.deptName}}</span>
              </el-option>
            </el-select>
            <span slot="footer"  class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateAgentPer">确 定</el-button>
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
export default {
  mixins: [getMenuRid],

  components: {
    listPage
  },
  data () {
    return {
      AgentPerId:'',
      toHouseId:'',
      toComName:'',
      dialogVisible: false,
      value: '',
      input: '',
      addPer: '',
      AgentPerList:[],
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: 'HouseNo', label: "房源编号" },
        { prop: 'CommunityName', label: "楼盘名称" },
        { prop: 'Price', label: "售价(万元)" },
        { prop: 'InArea', label: "面积(m²)" },
        { prop: 'PropertyFee', label: "均价(元/平)" },
        { prop: 'hall', label: "户型" },
        { prop: 'Decoration', label: "装修程度" },
        { prop: 'AgentPer', label: "跟单人" },
        { prop: 'AddTime', label: "录入时间" }
      ],
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
      queryData: {
        communityName: '',
        timeSelect: '',

      },

    }
  },
  mounted () {
    this.querylist(1);
    this. queryCompanyPerList();
  },
  methods: {
    toHouseData(id,CommunityName){
      var that = this
      that.dialogVisible =  true
      console.log("得到房源id为:"+id+"------楼盘名称"+CommunityName);
      that.toHouseId = id;
      that.toComName = CommunityName;
    },
     querylistByParams () {
      console.log(this.queryData.timeSelect);
      this.querylist(1);
    },
    querylist (currentPage) {
      let params = { limit: this.pageJson.pageSize + '', page: currentPage + '', listType: 'myAgent' };
      let that = this;
      if (this.queryData.CommunityName != null && this.queryData.CommunityName != '') { params.CommunityName = this.queryData.CommunityName; }
      if (this.queryData.BuildingName != null && this.queryData.BuildingName != '') { params.BuildingName = this.queryData.BuildingName; }
      if (this.queryData.RoomNo != null && this.queryData.RoomNo != '') { params.RoomNo = this.queryData.RoomNo; }
      if (this.queryData.Customers != null && this.queryData.Customers != '') { params.Customers = this.queryData.Customers; }
      if (this.queryData.Tel != null && this.queryData.Tel != '') { params.Tel = this.queryData.Tel; }
      if (this.queryData.minPrice != null && this.queryData.minPrice != '') { params.minPrice = this.queryData.minPrice; }
      if (this.queryData.maxPrice != null && this.queryData.maxPrice != '') { params.maxPrice = this.queryData.maxPrice; }
      if (this.queryData.minInArea != null && this.queryData.minInArea != '') { params.minInArea = this.queryData.minInArea; }
      if (this.queryData.maxInArea != null && this.queryData.maxInArea != '') { params.maxInArea = this.queryData.maxInArea; }
      if (this.queryData.timeSelect != null && this.queryData.timeSelect[0] != null && this.queryData.timeSelect[0] != '') { params.minAddTime = this.queryData.timeSelect[0]; }
      if (this.queryData.timeSelect != null && this.queryData.timeSelect[1] != null && this.queryData.timeSelect[1] != '') { params.maxAddTime = this.queryData.timeSelect[1]; }
      this.$api.post({
        url: '/agent_house/myHouseList',
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
          that.tableData = result.data.list;
        } else {
          console.log("查询我的跟单列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的跟单失败");
        console.log(e);
      })
    },
    queryAddPerId () {
      var that = this
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
    //跳转房源详情页面
    toHouseDetail (id) {
      this.$router.push({ name: "houseDetails", params: { houseId: id } });
    },

    distributeEvent (e, id) {
      this[e](id);
    },
    queryCompanyPerList(){
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
    updateAgentPer(){
       var that = this
        console.log("得到跟单人id为:"+that.AgentPerId);
        console.log("得到房源id为:"+that.toHouseId+"------楼盘名称"+that.toComName)
       let params = { AgentPer:that.AgentPerId+'' , houseId : that.toHouseId+''};
        this.$api.post({
        url: '/agent_house/updateAgentPer',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: params,
        token: false
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
      this.querylistByParams ();
    },
    handleClick () {},
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.querylist(1);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.querylist(val);
    },
  },
}
</script>