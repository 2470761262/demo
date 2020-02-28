<template>
  <list-page
    :parentData="$data"
    @handleClick="handleClick"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="page-inline budingMarinSet">
        
        <el-input placeholder="姓名" style="width:240px" v-model="queryData.Customers" clearable>
          <template slot="prepend">业主</template>
        </el-input>
        <el-input
          placeholder="业主电话"
          v-model="queryData.Tel"
          style="margin-left:10px;width:240px"
          clearable>
          <template slot="prepend">电话</template>
        </el-input>

        <el-input placeholder="最小值" v-model="queryData.minPrice" style="margin-left:10px;width:160px" clearable>
          <template slot="prepend">价格</template>
        </el-input>
        <el-input placeholder="最大值" v-model="queryData.maxPrice" style="width:100px" clearable></el-input>
        <br />
        <el-input placeholder="最小值" v-model="queryData.minInArea" style="margin-left:3px;width:160px" clearable>
          <template slot="prepend">面积</template>
          </el-input>—
        <el-input placeholder="最大值" v-model="queryData.maxInArea" style="width:100px" clearable></el-input>
        <el-button type="primary" style="margin-left:30px"
          size="mini" @click="queryMyRelatedHouseList(1)">查询</el-button>
      </div>
      <template>
        <el-select v-model="workType" value-key="item.value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
</template>
  <el-date-picker v-model="queryData.timeSelect" type="daterange" range-separator="至"
      value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    </template>
    <template #tableColumn>
      <el-table-column label="房源编号">
        <template v-slot="scope">{{scope.row.HouseNo}}</template>
      </el-table-column>
      <el-table-column label="楼盘名称">
        <template v-slot="scope">{{scope.row.CommunityName}}</template>
      </el-table-column>
      <el-table-column label="售价(万元)">
        <template v-slot="scope">{{scope.row.Price}}</template>
      </el-table-column>
      <el-table-column label="面积(㎡)">
        <template v-slot="scope">{{scope.row.InArea}}</template>
      </el-table-column>
      <el-table-column label="单价(元/㎡)">
        <template v-slot="scope"> {{Math.round(scope.row.Price*10000/scope.row.InArea)+"元/m²"}}</template>
      </el-table-column>
      <el-table-column label="户型">
        <template v-slot="scope">{{scope.row.Rooms+"室"+scope.row.hall+"厅"+scope.row.toilet+"卫"}}</template>
      </el-table-column>
      <el-table-column label="作业类型">
        <template v-slot="scope">{{scope.row.Decoration}}</template>
      </el-table-column>
      <el-table-column label="跟单人">
        <template v-slot="scope">{{scope.row.Decoration}}</template>
      </el-table-column>
      <el-table-column label="录入时间">
        <template v-slot="scope">{{scope.row.AddTime}}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" key="992">
        <template v-slot="scope">
          <el-button type="info" size="mini"
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
export default {
  components: {
    listPage
  },
  data() {
    return {
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "HouseNo", label: "房源编号" },
        { prop: "CommunityName", label: "楼盘名称" },
        { prop: "Price", label: "售价(万元)" },
        { prop: "InArea", label: "面积(m²)" },
        { prop: "PropertyFee", label: "均价(元/平)" },
        { prop: "Decoration", label: "户型" },
        { prop: "Decoration", label: "装修程度" },
        { prop: "AddTime", label: "录入时间" }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: []
      },
      options: [{
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "草稿"
        },
        {
          value: "3",
          label: "录入"
        },
        {
          value: "4",
          label: "钥匙"
        },
        {
          value: "5",
          label: "委托"
        },
        {
          value: "6",
          label: "实勘"
        },
        {
          value: "7",
          label: "锁定"
        }],
        value: '',
        workType:'',
      queryData: {
        communityName: '',
         timeSelect:'',
      }
    };
  },
  mounted() {
    this.queryMyRelatedHouseListByParams(1);
  },
  methods: {
    queryMyRelatedHouseListByParams() {
      this.queryMyRelatedHouseList(1);
    },
    queryMyRelatedHouseList(currentPage) {
      let params = {
        limit: this.pageJson.pageSize + "",
        page: currentPage + ""
      };
      let that = this;
      if (this.queryData.Customers != null && this.queryData.Customers != '') { params.Customers = this.queryData.Customers;}
      if (this.queryData.Tel != null && this.queryData.Tel != '') { params.Tel = this.queryData.Tel;}
      if (this.queryData.minPrice != null&& this.queryData.minPrice != '') { params.minPrice = this.queryData.minPrice;}
      if (this.queryData.maxPrice != null&& this.queryData.maxPrice != '') { params.maxPrice = this.queryData.maxPrice;}
      if (this.queryData.minInArea != null&& this.queryData.minInArea != '') { params.minInArea = this.queryData.minInArea;}
      if (this.queryData.maxInArea != null&& this.queryData.maxInArea != '') { params.maxInArea = this.queryData.maxInArea;}
       if (this.queryData.timeSelect!=null && this.queryData.timeSelect[0] != null&& this.queryData.timeSelect[0] != '') { params.minAddTime = this.queryData.timeSelect[0];}
      if (this.queryData.timeSelect!=null &&this.queryData.timeSelect[1] != null&& this.queryData.timeSelect[1] != '') { params.maxAddTime = this.queryData.timeSelect[1];}
      if (that.workType != null&& that.workType != '') { 
        console.log("options的值！！！"+that.workType);
        params.workType = that.workType;
        }   
      this.$api.post({
          url: "/agent_house/myRelatedHouseList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
          token: false
        }).then(e => {
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
            console.log("查询我的房源列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询我的房源列表失败");
          console.log(e);
        });
    },
    queryTabData() {},
    distributeEvent(e, id) {
      this[e](id);
    },
    isForBut(type) {
      let array = [{ name: "查看", isType: "1,2,3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    handleClick() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryMyRelatedHouseList(val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageJson.pageSize = val;
      this.queryMyRelatedHouseList(1);
    }
  }
};
</script>