<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:left>
      <div style="width:300px;height:560px;background:white;">
          <div style="margin-left:10px;">
              <h2>核心盘总览</h2>
             <div >
             <div style="margin-top:10px;height:30px;width:270px;background:RoyalBlue;font-weight:bold;font-size:20px;" >
                 <div style="color:white;float: left;margin-left:10px;">我的核心盘 </div>
                 <div style="color:white;float: right;margin-right:10px;"> {{countAll}}套 </div>
             </div>
             <div style="height:30px;width:270px;background:DarkOrange;font-weight:bold;font-size:20px;">
                 <div style="color:white;float: left;margin-left:10px;">存量房总套数 </div>
                 <div style="color:white;float: right;margin-right:10px;">{{countConcern}}套 </div>
             </div>
             <div style="height:30px;width:270px;background:LightCoral;font-weight:bold;font-size:20px;">
                 <div style="color:white;float: left;margin-left:10px;">在售总套数 </div>
                 <div style="color:white;float: right;margin-right:10px;">{{countEffectiveNum}}套 </div>
             </div>
             
          </div>
          <div style="height:30px;width:270px;font-size:20px;">
                 <el-input @keyup.enter.native="queryNotConcernCommunityList()" placeholder="输入您想添加的核心盘" v-model="queryData.selectCommunity" style="margin-top:10px;width:270px"></el-input>
             </div>
             <div style="margin-top:20px;width:270px;font-size:20px;border:1px solid #D3D3D3" id="comList">
                  <div style="color:black;margin-left:10px;">搜索结果 </div>
                  <input style="display:none"  />
                  <input style="display:none"/>
                <div  v-for="(item,y) in list" :key="y"  style="height:30px;width:270px;background:white;font-weight:bold;font-size:15px;margin-top:10px;">
                  <div style="color:black;float: left;margin-left:10px;">{{item.communityName}} </div>
                  <div style="cursor:pointer;color:blue;float: right;margin-right:10px;" @click="addCommunity(item.id,item.communityName)">添加 </div>
                </div>
             </div>

            <div  v-for="(item,i) in array" :key="i" style="height:40px;width:270px;background:CornflowerBlue;font-weight:bold;margin-top:10px;">
                 <div style="color:white;float: left;margin-left:5px;font-size:15px;">{{item.communityName}}</div>
                  <div style="color:white;float: right;margin-right:15px;font-size:10px;">
                     <div>存量套数</div>
                     <div>{{item.countConcernCommunity}}套</div>
                </div>
                 <div style="color:white;float: right;margin-right:15px;font-size:10px;">
                     <div>在售套数</div>
                     <div>{{item.effectiveNum}}套</div>
                </div>
             </div>

          </div>

      </div>
    </template>
    <template v-slot:top>
        <div class="page-form-inline ">
            <el-input placeholder="楼盘名称" style="width:280px" v-model="queryData.CommunityName" >
                <template slot="prepend">楼盘名称 </template>
               </el-input>
               <el-input placeholder="栋座" v-model="queryData.BuildingName" style="margin-left:10px;width:100px"></el-input>
               <el-input placeholder="房间号" v-model="queryData.RoomNo" style="margin-left:10px;width:100px"></el-input>
       
       <el-input placeholder="姓名" style="margin-left:30px;width:240px" v-model="queryData.Customers" clearable>
        <template slot="prepend">业主</template>
        </el-input>

        <el-input placeholder="业主电话" v-model="queryData.Tel" style="margin-left:30px;width:240px" clearable>
        <template slot="prepend">电话</template>
        </el-input>

        <el-input placeholder="最小值" v-model="queryData.minPrice" style="margin-left:25px;width:160px" clearable>
        <template slot="prepend">价格</template>
        </el-input>
         <el-input placeholder="最大值" v-model="queryData.maxPrice"  style="margin-left:10px;width:100px"></el-input>
<br/>
        <el-input placeholder="最小值" v-model="queryData.minInArea" style="width:160px" clearable>
        <template slot="prepend">面积</template>
        </el-input>
        <el-input placeholder="最大值" v-model="queryData.maxInArea" style="margin-left:10px;width:100px" ></el-input>
       
      <el-select v-model="queryData.houseStates" style="margin-left:10px" placeholder="请选择" clearable> 
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        <template slot="prepend">房源状态</template>
        <el-button type="primary"
                     style="margin-left:30px"
                     size="mini"
                     @click="querylistByParams()">查询</el-button>
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
      <el-table-column label="装修程度">
        <template v-slot="scope">
          {{scope.row.Decoration}}
        </template>
      </el-table-column>
      <el-table-column label="跟单人">
        <template v-slot="scope">
          {{scope.row.agentPerName}}
        </template>
      </el-table-column>
      <el-table-column label="录入时间">
        <template v-slot="scope">
          {{scope.row.AddTime}}
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
      list:[1,2,3,4,5,6],
        input:'',
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
        communityName: ''
      }
    }
  },
  mounted () {
    this.querylist(1);
    this.queryConcernCount();
  },
  methods: {
    querylistByParams () {
      this.querylist(1);
    },
    addCommunity(id,name){
        console.log("参数-----id:"+id+"---name："+name);
        let params = { CommunityID: id+'', CommunityName: name+''};
        this.$api.post({
        url: '/concern_community/add',
        headers: { "Content-Type": "application/json;charset=UTF-8" },
       data: params,
        token: false
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          alert(result.message);
        } else {
          console.log("添加关注" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
         alert("添加关注失败");
        console.log(e);
      })

    },
    querylist (currentPage) {
      let params = { limit: this.pageJson.pageSize+'', page: currentPage+''};
      let that = this;
      if (this.queryData.CommunityName != null && this.queryData.CommunityName != '') { params.CommunityName = this.queryData.CommunityName;}
      if (this.queryData.BuildingName != null && this.queryData.BuildingName != '') { params.BuildingName = this.queryData.BuildingName;}
      if (this.queryData.RoomNo != null && this.queryData.RoomNo != '') { params.RoomNo = this.queryData.RoomNo;}
      if (this.queryData.Customers != null && this.queryData.Customers != '') { params.Customers = this.queryData.Customers;}
      if (this.queryData.Tel != null && this.queryData.Tel != '') { params.Tel = this.queryData.Tel;}
      if (this.queryData.minPrice != null&& this.queryData.minPrice != '') { params.minPrice = this.queryData.minPrice;}
      if (this.queryData.maxPrice != null&& this.queryData.maxPrice != '') { params.maxPrice = this.queryData.maxPrice;}
      if (this.queryData.minInArea != null&& this.queryData.minInArea != '') { params.minInArea = this.queryData.minInArea;}
      if (this.queryData.maxInArea != null&& this.queryData.maxInArea != '') { params.maxInArea = this.queryData.maxInArea;}
      this.$api.post({
        url: '/concern_community/list',
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
          console.log("查询我的核心盘列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询我的核心盘失败");
        console.log(e);
      })
    },
    queryConcernCount(){
         this.$api.post({
        url: '/concern_community/CommunityCount',
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log("统计结果"+result.data);
          var array = result.data;
          this.array = array;
          var countConcern = 0;
          var countEffectiveNum = 0;
          var countAll=0;
          for(var j=0;j <array.length;j++) {
              countConcern=countConcern+parseInt(array[j].countConcernCommunity) ;
              countEffectiveNum = countEffectiveNum+parseInt(array[j].effectiveNum) ;
              countAll++;
         } 
           this.countConcern = countConcern;
           this.countAll = countAll;
           this.countEffectiveNum=countEffectiveNum;
          console.log("总数："+countConcern);
           return array.forEach(item => {
            return item.array;
        });

        } else {
          console.log("查询核心盘统计结果then：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询核心盘统计结果失败catch");
        console.log(e);
      })
    },

queryNotConcernCommunityList(){

   var communityName = this.queryData.selectCommunity;
   this.hasClassA
      this.$api.post({
        url: '/concern_community/notConcernCommunityList?CommunityName='+communityName,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        
        if (result.code == 200) {
          console.log(result.message);
          console.log("楼盘列表"+result.data);
          var that = this;
           var arrayCommunity = result.data;
          this.list = arrayCommunity;
           return list.forEach(item => {
            return item.list;
        });
        alert(result.message);

        } else {
          console.log("查询未关注楼盘then：" + result.message);
          
        }
      }).catch((e) => {
        console.log("查询未关注楼盘失败catch");
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