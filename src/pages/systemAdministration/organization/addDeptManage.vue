<style lang="less" scoped>
.left-input-container {
  padding: 10px;
  font-size: 1rem;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-radius: 0.5rem;
  .el-input {
    width: 80%;
  }
  span {
    margin-right: 10px;
    margin-left: 5px;
  }
}
.el-top {
  margin-top: 50px;
}
</style>
<template>
  <div class="wrapper">
    <div class="left-input-container">
      <span>部门名称</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="DeptEntity.deptName"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>部门名首拼</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="DeptEntity.header"
                maxlength="10"
                show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>电话</span>
      <el-input type="text"
                placeholder="请输入内容"
                v-model="DeptEntity.tel"
                data-vv-name="tel"
                data-vv-as="电话号码"
                v-validate="'required|phone'"></el-input>
                {{errorBags.first('tel')}}
    </div>
    <div class="left-input-container">
      <span>开业时间</span>
      <el-input type="date" placeholder="请输入内容" v-model="DeptEntity.regDate" show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>部门类型</span>
      <el-select type="text"
                 placeholder="1综合，2业务，3行政，4联营"
                 v-model="DeptEntity.deptType"
                 show-word-limit>
        <el-option label="综合" :value="1" />
        <el-option label="业务" :value="2" />
        <el-option label="行政" :value="3" />
        <el-option label="联营" :value="4" />
      </el-select>
      <el-select type="text"
                 placeholder="是否片区"
                 v-model="DeptEntity.isArea"
                 show-word-limit>
        <el-option label="是片区" :value="1" />
        <el-option label="不是片区" :value="0" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>部门编码</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="DeptEntity.deptCode"
        maxlength="100"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
       <el-button type="info" @click="getDialogVisible()">选择负责人</el-button>
       <el-dialog title="请选择:" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
          <list-page :parentData="$data" 
          highlight-current-row  
          @handleSizeChange="handleSizeChange" 
          @handleCurrentChange="handleCurrentChange"  
          @current-change="handleChange"  >
              <template v-slot:tableColumn="cell">            
                <template v-for="item in cell.tableData">  
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :key="item.prop"
                  ></el-table-column>
                </template>
            </template>           
          </list-page>
       </el-dialog>
      <el-input type="text" v-model="DeptEntity.managerPerName" show-word-limit></el-input>
    </div>
    <div class="left-input-container">
      <span>加入类型</span>
      <el-select type="text"
                 placeholder="请输入内容"
                 v-model="DeptEntity.joinType"
                 show-word-limit>
        <el-option label="直营" :value="1" />
        <el-option label="加盟" :value="2" />
        <el-option label="联营" :value="3" />
      </el-select>
    </div>
    <div class="left-input-container">
      <span>部门属性</span>
      <el-select type="text"
                 placeholder="请输入内容"
                 v-model="DeptEntity.joinType"
                 show-word-limit>
        <el-option label="运营期" :value="1" />
        <el-option label="拓展期" :value="2" />

      </el-select>
    </div>
    <div class="left-input-container">
      <span>地址</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="DeptEntity.address"
        maxlength="100"
        show-word-limit
      ></el-input>
    </div>
    <div class="left-input-container">
      <span>部门描述</span>
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="DeptEntity.deptDesc"
        maxlength="100"
        show-word-limit
      ></el-input>
    </div>

    <div class="footerContainer el-top">
      
      <el-button type="primary" @click="saveDept()">确定</el-button>
      <el-button type="primary" @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: {
    listPage
    },
  props: {},
  data() {
    return {
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "",
        isLocked:null, //0 查询锁定,1 查询未锁定,2 查询异常用户
        del:0 ,//0 查询在职员工,1 查询离职员工,2 查询待离职员工
        type:0 //0 内部  1 游客
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 5 //每页条数
      },
      tableDataColumn: [       
        { prop: "perName", label: "姓名" },
        { prop: "deptName", label: "部门" },        
        { prop: "companyName", label: "公司" },
        { prop: "positionName", label: "岗位" },      
      ],
      currentRow: null,
      tableData: [],
      DeptEntity: {
        deptName: null,
        header: null,
        tel: null,
        joinType: null,
        regDate: null,
        deptType: null,
        deptCode: null,
        managerPer: null,
        address: null,
        deptDesc: null,
        coId: null,
        deptParentID: null,
        isArea: null,
        isCom : null,
        backUrl: null,
        managerPerName:null
      },
      dialogVisible:false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    getDialogVisible(){
      this.dialogVisible = true;
       this.getPrincipal(1);
    },
    getPrincipal(currentPage){
      let params = { limit: this.pageJson.pageSize, page: currentPage, };
      params.coId = this.DeptEntity.coId;
      params.postId =
      this.$api.post({
        url: '/employee/selectPrincipal',
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
          this.tableData = result.data.list;

        } else {
          console.log("查询负责人列表结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询负责人列表失败");
        console.log(e);
      })
    },
    handleClose(){
      this.dialogVisible = false;
    },
    saveDept() {
    if(/^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.DeptEntity.tel)){
      let params = this.DeptEntity;
      this.$api
        .post({
          url: "/department/add",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "添加成功", {
              dangerouslyUseHTMLString: false
            });
            if (this.backUrl === "hrTree") {
              this.$router.push({ path: "/sys/hrTree/hrTree" });
            } else {
              this.$router.push({ path: "/sys/deptManageList" });
            }
            console.log(result.data);
            this.$message({ message: result.message });
          }
        })
        .catch(e => {
          debugger;
          console.log("添加失败");
          console.log(e);
        });
      }else{
        this.$alert("","请填写正确的电话号码!!!", {
              dangerouslyUseHTMLString: false
            });
      }
    },
    back () {
      this.$router.push({ path: "/sys/DeptManageList" });
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.getPrincipal(1);
    },
    handleCurrentChange (val) {
      this.getPrincipal(val);
    },
    handleChange(row){
    console.log(row);
    this.DeptEntity.managerPer = row.accountId;
    this.DeptEntity.managerPerName = row.perName;
    },
  },
  created () { },
  mounted () {
    console.log(this.$route.params.ParentId,this.$route.params.deptParentID )
    if (this.$route.params.ParentId != null) {
      this.DeptEntity.coId = this.$route.params.ParentId;
      this.DeptEntity.deptParentID = 0;
    }
    if (this.$route.params.deptParentID != null) {
      this.DeptEntity.coId = this.$route.params.ParentId;
      this.DeptEntity.deptParentID = this.$route.params.deptParentID;
    }
    if (this.$route.params.back != null) {
      this.backUrl = this.$route.params.back;
    }
    console.log(this.DeptEntity.coId ,this.DeptEntity.deptParentID )
  }
  
};
</script>
