<style >
.as{
  margin-top:10px;
}
</style>
</style>
<template>
  <list-page :parentData="$data"
             @handleClick="handleClick"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
            <template v-slot:inputTo>
      <div class="query-cell" >
        <el-button type="primary"
                   size="mini"
                   @click="toAddConfig">添加系统规则</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
         
      <!-- <template v-for="(item) in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template> -->
      <el-table-column label="范围">
        <template v-slot="scope">
          {{scope.row.parRange}}
        </template>
      </el-table-column>
      <el-table-column label="关联对象">
        <template v-slot="scope">
          {{scope.row.sysParObj}}
        </template>
      </el-table-column>
      <el-table-column label="对象名称">
        <template v-slot="scope" >
          {{scope.row.sysParType}}
        </template>
      </el-table-column>
      <el-table-column label="参数1">
        <template v-slot="scope" >
          {{scope.row.paraNum}}
        </template>
      </el-table-column>
       <el-table-column label="参数2">
        <template v-slot="scope" >
          {{scope.row.paraTwoNum}}
        </template>
      </el-table-column>
       <el-table-column label="参数3">
        <template v-slot="scope" >
          {{scope.row.paraNumStr}}
        </template>
      </el-table-column>
       <el-table-column label="参数4">
        <template v-slot="scope" >
          {{scope.row.paraFourNum}}
        </template>
      </el-table-column>
       <el-table-column label="是否允许">
       <template v-slot="scope" >
         {{scope.row.paraFourNum}}
         </template>
      </el-table-column>
       <el-table-column label="备注">
        <template v-slot="scope" >
          {{scope.row.remark}}
        </template>
      </el-table-column>
       <el-table-column label="是否有效">
        <template v-slot="scope" >
          {{scope.row.del==0?"有效":"无效"}}
        </template>
      </el-table-column>
       <el-table-column label="公司">
        <template v-slot="scope" >
          {{scope.row.companyName}}
        </template>
      </el-table-column>

       <el-table-column prop="operation"
                       label="操作"
                       fixed="right"
                       key="992">
        <template v-slot="scope">
          <!-- <div v-if="scope.row.operation!=''"> -->
          <el-button type="info"
                     size="mini"
                     @click="distributeEvent(item.methosName,scope.row.id,scope.row.sysParNo,scope.row.sysParName,scope.row.sysParType,scope.row.memo)"
                     v-for="(item,index) in isForBut(2)"
                     :key="index" class="as">{{item.name}}</el-button>
          <!-- </div> -->
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
      loading: true, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 5 //每页条数
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      configId:null,
      tableDataColumn: [
        { prop: 'communityName', label: "房源坐落" },
        { prop: 'price', label: "售价(万元)" },
        { prop: 'area', label: "面积(㎡)" },
        { prop: 'type', label: "户型" },
        { prop: 'levae', label: "装修程度" },
        { prop: 'creatorName', label: "经济人" },
        { prop: 'createTime', label: "录入时间" },
        { prop: 'checkStatus', label: "状态" }
      ],
      tableData: [{
        house: '龙腾花园-16栋-604室',
        price: '234',
        area: '1252',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '周杰伦',
        addTime: '2019-01-01 18:00:00',
        cellType: '待店长验真',
        operation: '1',
      }, {
        house: '龙腾花园-16栋-604室',
        price: '234',
        area: '12',
        type: '3室2厅1卫',
        levae: '精装修',
        economicPro: '周杰伦1',
        addTime: '2019-01-01 18:00:00',
        cellType: '待店长验真',
        operation: '3',
      }],

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
       elTabs: {
        activeName: "tab1",

      },
      queryData: {
        houseName: '',
        taskName: '',
        selectValue: '',
        timeSelect: '',
      }
    }
  },
  mounted () {
    this.queryVerifyHouseByParams(1);
  },
  methods: {
    queryVerifyHouseByParams () {
      this.queryVerifyHouseDatas(1);
    },
    queryVerifyHouseDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage,sysParId:this.$route.query.configId };
      console.log(params);
      let that = this;
      this.$api.get({
        url: '/Set/list',
        data: params,
        token: false
      }).then((e) => {
       
        let result = e.data;
        that.loading = false; 
        if (result.code == 200) {
          console.log(result.data);
          
         for(var i=0;i<result.data.list.length;i++){
            
                 switch(result.data.list[i].parRange){
                     case "0" :
                         result.data.list[i].parRange="个人";
                     case "1" :
                         result.data.list[i].parRange="部门";
                         break;
                          case "2" :
                         result.data.list[i].parRange="部门名下";
                         break;
                          case "3" :
                         result.data.list[i].parRange="公司";
                         break;


                 }
                 console.log(result.data.list[i].sysParObj);
                    switch(result.data.list[i].sysParObj){
                     case "0" :
                         result.data.list[i].sysParObj="默认";
                     case "1" :
                         result.data.list[i].sysParObj="人员";
                         break;
                          case "2" :
                         result.data.list[i].sysParObj="部门";
                         break;
                          case "3" :
                         result.data.list[i].sysParObj="岗位";
                         break;


                 }
            }
          that.pageJson.total = result.data.totalCount;
          that.pageJson.currentPage = result.data.currPagecurrPagecurrPage;
          that.tableData = result.data.list;
          console.log(that.tableData);
          
        } else {
          console.log("查询系统参数配置列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询系统参数配置列表失败");
        console.log(e);
      })
    },

        toAddConfig () {
      this.$router.push({ path: "/menuFrame/addConfig" });
    },
    
    updateDelRight(id,sysParNo,sysParName,sysParType,memo ){
          this.$api.get({
        url: '/Set/companyUpdateDel',
        data: {
          del:0,
          id:id
        },
        token: false
      }).then((e) => {
       
        let result = e.data;
        if (result.code == 200) {  
           this.$alert('', '修改成功', {
            dangerouslyUseHTMLString: false
          });
        } else {
          console.log("查询系统参数配置列表结果：" + result.message);
        
        }
      }).catch((e) => {
        console.log("查询系统参数配置列表失败");
        console.log(e);
      })
    },
     updateDelLeft(id,sysParNo,sysParName,sysParType,memo ){
          this.$api.get({
        url: '/Set/companyUpdateDel',
        data: {
          del:1,
          id:id
        },
        token: false
      }).then((e) => {
       
        let result = e.data;
        if (result.code == 200) {  
           this.$alert('', '修改成功', {
            dangerouslyUseHTMLString: false
          });
          
        } else {
          console.log("修改失败" + result.message);
        
        }
      }).catch((e) => {
        console.log("修改失败");
        console.log(e);
      })
    },
    distributeEvent (e, id,sysParNo,sysParName,sysParType,memo) {
      this[e](id,sysParNo,sysParName,sysParType,memo);
    },
    isForBut (type) {
      let array = [
       
        { name: '转有效', isType: '1,2,3', methosName: 'updateDelRight' },
        { name: '转无效', isType: '1,2,3', methosName: 'updateDelLeft' },
      ]
      return array.filter((item) => {
        return item.isType.includes(type)
      })
    },
    handleClick () {

    },
     created() {
      this.configId=this.$route.query.configId;
    
    console.log(this.configId);
     
  },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1);
    },
    handleCurrentChange (val) {
     this.queryVerifyHouseDatas(val);
    },
  },
}
</script>