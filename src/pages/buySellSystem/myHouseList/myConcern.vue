<style scoped>
.Impression-body{
  width: 300px;
  background-color: white;
  height: 500px;
}
.tag-all{
   margin-top: 8px;
}
.Impression-tag{
  margin-top: 12px;
  margin-left: 12px
}
.opset{
  float: right;
  margin-right: 10px
}
</style>
<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:left>
      <div class="Impression-body">
      <div style="height:30px">
        <el-input placeholder="请输入您添加过的房源印象" clearable></el-input>
      </div>
      <div style="height:30px">
      <el-button class="opset" type="text" @click="open">一键清除</el-button>
        <el-button class="opset" type="text" @click="open">一键还原</el-button></div>
      <div class="tag-all">
        
        <span  v-for="item in ImpressionList" :key="item.value" >
          <el-tag class="Impression-tag"  size="mini" type="success" closable>
            {{item.impression}}
            </el-tag>
        </span>
      </div>
      </div>
      </template>   
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

        <el-select v-model="value"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <template slot="prepend">房源状态</template>
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
          {{scope.row.BuildingName}}
        </template>
      </el-table-column>
      <el-table-column label="房间号">
        <template v-slot="scope">
          {{scope.row.RoomNo}}
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
      <el-table-column label="被看次数">
        <template v-slot="scope">
          {{scope.row.seenNum}}
        </template>
      </el-table-column>
      <el-table-column label="未被看天数">
        <template v-slot="scope">
          {{scope.row.noSeenDay}}
        </template>
      </el-table-column>
      <el-table-column label="跟单人">
        <template v-slot="scope">
          {{scope.row.AgentPerName}}
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <el-button type="info"
                     @click="toHouseDetail(scope.row.id)"
                     size="mini">查看</el-button>
          <el-popconfirm confirmButtonText='我要取消'
                         cancelButtonText='还是不了吧'
                         icon="el-icon-info"
                         iconColor="red"
                         title="确定取消关注这个房源吗？">
            <el-button type="info"
                       slot="reference"
                       @click="concernOFF(scope.row.id)"
                       size="mini">取消关注</el-button>
          </el-popconfirm>
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
      Impression:'',
      dialogVisible: false,
      value: '',
      input: '',
      addPer: '',
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 5 //每页条数
      },
      tableDataColumn: [
        { prop: 'HouseNo', label: "房源编号" },
        { prop: 'CommunityName', label: "楼盘名称" },
        { prop: 'Price', label: "售价(万元)" },
        { prop: 'InArea', label: "面积(m²)" },
        { prop: 'PropertyFee', label: "均价(元/平)" },
        { prop: 'hall', label: "户型" },
        { prop: 'AddTime', label: "录入时间" }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [

        ]
      },
      ImpressionList:[],
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
    this.queryHouseImpression ();
  },
  methods: {
    queryHouseImpression () {
      var that = this
      this.$api.get({
        url: "/agentHouse/impression/getHouseImpressionList",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
      }).then((e) => {
        console.log(e.data.code);
        if(e.data.code){
          this.Impression = e.data.data;
        that.ImpressionList = e.data.data;
        }
      })
    },
    concernOFF (id) {
      this.$api.post({
        url: "/concernHouseOFF/" + id,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        token: false,
      }).then((e) => {
        alert("取消关注成功");
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
          comId: that.form.comId
        }
      }).then((e) => {
        if (e.data.code == 200) {
          that.cbIdList = e.data.data.list;
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    //跳转房源详情页面
    toHouseDetail (id) {
      this.$router.push({ path: "/buySellSystem/houseDetails", query: { houseId: id } });
    },
    //清除
    open () {
        this.$confirm('此操作将清除所有印象, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
        url: '/agent_house/myCollectHouseList',
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
    distributeEvent (e, id) {
      this[e](id);
    },
    isForBut (type) {
      let array = [
        { name: '查看', isType: '1,2,3', methosName: '' }
      ]
      return array.filter((item) => {
        this.item.push("12222222222222222222222222222222222")
        return item.isType.includes(type)
      })
    },
    handleClick () {

    },
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