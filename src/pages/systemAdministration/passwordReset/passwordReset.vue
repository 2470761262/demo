<style lang="less">
  .elTree {
    width: 200px;
    margin-right: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    padding: 0 15px 15px;
    border-radius: 10px;
    /deep/.el-input {
      margin: 10px 0 10px;
    }
  }
</style>

<template v-slot:tree>
  <div class="elTree">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText">
    </el-input>
    <el-tree
      ref="tree2"
      :data="treeData"
      :default-expanded-keys="[1]"
      node-key="id"
      show-checkbox
      :props="defaultProps"
      @check-change="checkChange"
      @check="checkcheck"
      :highlight-current="true"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  import listPage from "@/components/listPage";
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    components: {
      listPage
    },
    data() {
      return {
        treeData: [
          {
            id: 1,
            label: "总公司",
            children: [
              {
                id: 2,
                label: "xx区域1",
                children: [
                  {
                    id: 3,
                    label: "xx门店",
                    children: [
                      {
                        id: 4,
                        label: "xx经纪人"
                      },
                      {
                        id: 44,
                        label: "xx经纪人"
                      }
                    ]
                  }
                ]
              },
              {
                id: 5,
                label: "xx区域2",
                children: [
                  {
                    id: 6,
                    label: "xx门店",
                    children: [
                      {
                        id: 7,
                        label: "xx经纪人"
                      }
                    ]
                  }
                ]
              },
              {
                id: 8,
                label: "xx区域2",
                children: [
                  {
                    id: 9,
                    label: "xx门店",
                    children: [
                      {
                        id: 10,
                        label: "xx经纪人"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        filterText: "",
        defaultProps: {
          children: "children",
          label: "label"
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    },
    methods: {
      checkcheck(e, data) {
        console.log(e, data);
        //  console.log(this.$refs.tree2.getNode(44), "getNode");
      },
      getCurrentKey() {
        console.log(this.$refs.tree2.getCurrentKey(), "getCurrentKey");
        //  this.$refs.tree2.setCurrentKey(44);
      },
      checkChange(e, data, childData) {
        //console.log(e, data, childData, "checkChange");
        //console.log(this.$refs.tree2.getCheckedKeys(), "id");
        // console.log(this.$refs.tree2.getCheckedNodes());
        //console.log(this.$refs.tree2.getNode(false, true));
      },
      //树输入筛选
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //树点击
      handleNodeClick(e) {
        console.log(e);
        alert(e);
      },
      //筛选查询
      queryTabData() {},
      handleClick() {},
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        console.log(`每1页 ${val} 条`);
      }
    }
  };
</script>
