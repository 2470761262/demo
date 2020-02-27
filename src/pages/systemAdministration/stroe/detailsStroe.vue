<template>
  <div>
    <div style="float:left;border:1px solid red">
      <el-form ref="form" :v-model="form" label-width="120px">
          <div style="count">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item> 
          </div>
       
      </el-form>
    </div>
    <list-page :parentData="$data" style="float:left;border:1px solid red"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange">
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
    components:{
        listPage
    },
  data() {
    return {
      loading: false,
      tableDataColumn: [{ prop: "deptName", label: "店内小组" }],
      tableData: [{deptName:null,id:null}],
      form: {
        id: null,
        storeName: null,
        flagSale: null,
        shoreAddress: null,
        shoreTel: null,
        shoreType: null,
        storeDesc: null,
        regDate: null
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
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
//获取实体店下小组列表
    this.$api
      .get({
        url: "/stroe/" + this.$route.params.id,
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          
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
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    back() {
      this.$router.push({ path: "/sys/stroeList" });
    },
    distributeEvent(e, id) {
      this[e](id);
    },
    getOpeBtns(type) {
      let array = [{ name: "删除", isType: "1", methosName: "delDeptDetail" }];
      return array;
    },
    handleSizeChange (val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryDeptDatas(1);
    },
    handleCurrentChange (val) {
    
    },
  }
};
</script>