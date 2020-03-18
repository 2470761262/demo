<style lang="less" scoped>
.query-cell {
  display: flex;
}
</style>
<template>
  <div>
    <template>
    <list-page :parentData="$data"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="query-cell">
        <el-input placeholder="岗位名称"
                  v-model="queryData.RoleName"
                  clearable>
          <template slot="prepend">岗位名</template>
        </el-input>
        <el-button type="primary"
                   style="margin-left:10px"
                   size="mini"
                   @click="queryRoleByParams">查询</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="toAddRolePage">添加岗位</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :key="item.prop">
        </el-table-column>
      </template>
      <el-table-column prop="operation"
                       label="操作"
                       fixed="right"
                       key="operation">
        <template v-slot="scope">
          <div v-if="scope.row.operation!=''">
            <el-button type="info"
                       size="mini"
                       @click="distributeEvent(item.methosName,scope.row)"
                       v-for="(item,index) in getOpeBtns(scope.row.operation)"
                       :key="index">{{item.name}}</el-button>
          </div>
        </template>
      </el-table-column>
    </template>
  </list-page>
  </template>

  </div>
</template>

<script>
import listPage from "@/components/listPage";
import getMenuRid from '@/minxi/getMenuRid';
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data () {
    return {
      loading: false, //控制表格加载动画提示
      queryData: {
        RoleName: ""
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10//每页条数
      },
      companyId : null,
      tableDataColumn: [
       // { prop: "id", label: "岗位" },
        { prop: "RoleName", label: "岗位名" },
        { prop: "ModDate", label: "修改时间" },
        { prop: "del", label: "有效状态",width:"100px" },
        { prop: "RoleDesc", label: "岗位描述" },
        { prop: "AddName", label: "添加人" },
        { prop: "AddTime", label: "添加时间" },
        //{ prop: "OldRoleId", label: "OldRoleId" },
      ],
      tableData: [],
      dialogVisible: false,
    }
  },
  mounted () {
    let companyId = JSON.parse(this.$route.query.id);
    this.companyId = companyId;
    this.sidebarFlag = true;
    this.queryRoleDatas(1);
  },
  methods: {
    queryRoleByParams () {
      this.queryRoleDatas(1);
    },
    queryRoleDatas (currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.RoleName != null) {
        params.RoleName = this.queryData.RoleName;
      }
      if(this.companyId){
        params.companyId = this.companyId;
      }
      this.$api.post({
        url: '/role/roleList',
        data: params,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.pageJson.total = result.data.totalCount;
          this.pageJson.currentPage = result.data.currPage;

          for(var i=0;i<result.data.list.length;i++){
            switch (result.data.list[i].del){
              case 0:
                result.data.list[i].del= " 有效 ";
                break;
              case 1:
                result.data.list[i].del = "无效";
                break;
            }
          }
          this.tableData = result.data.list;
        } else {
          console.log("查询岗位管理列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询岗位管理列表失败");
        console.log(e);
      })
    },
    toAddRolePage () {
      this.$router.push({ path: "/sys/addRoleManagementList",query:{companyId: this.companyId}});
    },
    editRoleDetail (row) {
      this.$router.push({ path: "/sys/editRoleDetail", query: { RoleId: row.id } });
    },
    delRoleDetail (row) {
      this.$api.post({
        url: '/role/delete/' + row.id ,
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$alert('', '删除成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.go(-1);
        }
      }).catch((e) => {
        console.log("删除失败");
        console.log(e);
      })
    },
    distributeEvent (e, row ) {
      this[e](row );
    },
    getOpeBtns (type) {
      let array = [
        { name: '编辑', isType: '1', methosName: 'editRoleDetail' },
        { name: '删除', isType: '1', methosName: 'delRoleDetail' },
        { name: '角色设置', isType: '1', methosName: 'PositionDetail' },
      ]
      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryRoleDatas(1);
    },
    handleCurrentChange (val) {
      this.queryRoleDatas(val);
    },
    PositionDetail(row){
      this.$router.push({ path: "/sys/positionManager", query: { id: row.id  ,name:row.RoleName} });
    },

  }
};
</script>
