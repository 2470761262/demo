<template>
  <div>
    <div style="float:left;border:0px solid blue;text-align:center;padding : 0px 80px 0px 30px;">
      <el-form ref="form" :v-model="form" label-width="120px" text-align:cente>
        <!-- <h1 style="text-align :center;">店面信息</h1> -->
        <el-form-item label="店面">
          <el-input
            v-model="form.storeName"
            :readonly="true"
            style="width:200px;border:0px solid  red"
          ></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input
            v-model="form.flagSale"
            :readonly="true"
            style="width:200px;border:0px solid  red"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="form.shoreAddress"
            :readonly="true"
            style="width:200px;border:0px solid  red"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="form.shoreTel"
            :readonly="true"
            style="width:200px;border:0px solid  red"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input
            v-model="form.shoreType"
            :readonly="true"
            style="width:200px;border:0px solid  red"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.storeDesc"
            :readonly="true"
            style="width:200px;border:0px solid  red"
          ></el-input>
        </el-form-item>
        <el-form-item label="开业时间">
          <el-input
            v-model="form.regDate"
            :readonly="true"
            style="width:200px;border:0px solid  red"
          ></el-input>
        </el-form-item>
        <!-- <div style="text-align:center;"> -->
        <el-form-item>
          <el-input
            placeholder="小组名"
            list="deptNameList"
            v-model="queryData.keyWord"
            style="width:300px;border:0px solid  red;margin:0px 20px 0px 0px"
            @focus="findByParams()"
            clearable
          >
            <template slot="prepend">要添加的小组</template>
          </el-input>
          <datalist id="deptNameList">
            <option>关闭</option>
            <option v-for="item in deptNameList" :key="item">{{item.deptName}}</option>
          </datalist>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
        <!-- </div> -->
      </el-form>
    </div>

    <list-page
      :parentData="$data"
      style="float:left;border:0px solid red"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :key="item.prop"
          ></el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" fixed="right" key="operation">
          <template v-slot="scope">
            <div v-if="scope.row.operation!=''">
              <el-button
                type="info"
                size="mini"
                @click="distributeEvent(item.methosName,scope.row.id)"
                v-for="(item,index) in getOpeBtns(scope.row.operation)"
                :key="index"
              >{{item.name}}</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>


<script>
import listPage from "@/components/listPage";
export default {
  components: {
    listPage
  },
  data() {
    return {
      loading: false,
      stroeDeptEntity: {
        sId: null,
        deptID: null,
        memo: null
      },
      queryData: {
        keyWord: "",
        coId: 0,
        pId: -2,
        isLocked: 1
      },
      deptNameList: [],
      tableDataColumn: [{ prop: "deptName", label: "店内小组" }],
      tableData: [{ deptName: null, id: null }],
      form: {
        id: null,
        storeName: null,
        flagSale: null,
        shoreAddress: null,
        shoreTel: null,
        shoreType: null,
        storeDesc: null,
        regDate: null
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 10, //总记录数
        pageSize: 10 //每页条数
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
    
  },
  mounted() {
    this.list();
    this.deptList(1);
  },
  methods: {
    deptList(currentPage) {
      //获取实体店下小组列表
      let params = {
        limit: this.pageJson.pageSize,
        page: currentPage,
        id: this.$route.params.id
      };
      this.$api
        .post({
          url: "/stroe/byId ",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.pageJson.total = result.data.totalCount;
            this.pageJson.currentPage = result.data.currPage;
            this.tableData = result.data.list;
          } else {
            console.log("查询实体店详情结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询实体店详情失败");
          console.log(e);
        });
    },
    list() {
      this.$api
        .post({
          url: "/stroe/" + this.$route.params.id,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            for (var i = 0; i < result.data.length; i++) {
              switch (result.data[i].flagSale) {
                case "0":
                  result.data[i].flagSale = "文职";
                  break;
                case "1":
                  result.data[i].flagSale = "职务";
                  break;
              }
              switch (result.data[i].shoreType) {
                case 0:
                  result.data[i].shoreType = "加盟店";
                  break;
                case 1:
                  result.data[i].shoreType = "直营店";
                  break;
              }
            }
            this.form = result.data;
          } else {
            console.log("查询实体店详情结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询实体店详情失败");
          console.log(e);
        });
    },
    onSubmit() {
    
      console.log(this.queryData.keyWord);
      this.deptNameList.forEach(item => {
        if (item.deptName.indexOf(this.queryData.keyWord) != -1) {
          this.stroeDeptEntity.sId = this.id;
          this.stroeDeptEntity.deptID = item.deptId;
        }
      });
      console.log("this", this.stroeDeptEntity);

      this.$api
        .post({
          url: "/stroe/deptName/add",
          data: this.stroeDeptEntity,
          token: false,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            this.$alert("", "添加成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/stroeList" });
            console.log(result.data);
            this.$message({ message: result.message });
          }
        })
        .catch(e => {
          console.log("添加失败");
          console.log(e);
        });
    },
    back() {
      this.$router.push({ path: "/sys/stroeList" });
    },
    distributeEvent(e, id) {
      this[e](id);
    },
    delDeptDetail(id){

      let params ={ id:this.id,
                    deptId:id};
      this.$api.post({
        url: '/stroe/deptName/del',
        data:params,
        token: false,
        //qs:true,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.$alert('', '删除成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/sys/stroeList"});
        }
      }).catch((e) => {
        console.log("删除失败");
        console.log(e);
      })
    },
    getOpeBtns(type) {
      let array = [{ name: "删除", isType: "1", methosName: "delDeptDetail" }];
      return array;
    },
    findByParams() {
      let params = this.queryData;
      params.id = this.id;
      if (this.queryData.keyWord != null && this.queryData.keyWord != "") {
        params.keyWord = this.queryData.keyWord;
      }
      this.$api
        .post({
          url: "/stroe/deptName",
          data: params,
         token: false,
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            debugger;
            this.deptNameList = result.data;
            console.log(this.deptNameList);
          } else {
            console.log("查询实体店详情结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询实体店详情失败");
        });
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryDeptDatas(1);
    },
    handleCurrentChange(val) {
      this.deptList(val);
    }
  }
};
</script>