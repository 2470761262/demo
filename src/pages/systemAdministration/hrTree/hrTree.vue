<style lang="less" scoped>
.elTree {
  width: 20%;
  margin-right: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
}

.elControl {
  width: 60%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 15px 15px 15px;
  border-radius: 10px;
  float: left;
}
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        <el-tree
          ref="treeForm"
          :data="treeData"
          :default-expanded-keys="defaultCheckedKeys"
          :default-checked-keys="defaultCheckedKeys"
          node-key="businessId"
          show-checkbox
          :props="defaultProps"
          @check-change="handleCheckChange"
          :highlight-current="true"
          :filter-node-method="filterNode"
          check-strictly
          :action="''"
        ></el-tree>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      checkedId: null,
      unitName: "",
      checkedType: null,
      title: "",
      remark: "",
      oldId: 0,
      ipStr: "",
      fileStr: "",
      picName: "",
      fileList: [],
      defaultCheckedKeys: null
    };
  },
  mounted() {
    //读取树数据
    this.$api
      .post({
        url: "/sys/account/company/tree",
        token: false
      })
      .then(e => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.treeData = result.data;
        } else {
          console.log("载入结果" + +result.message);
          alert(result.message);
        }
      })
      .catch(e => {
        console.log("读取失败");
        console.log(e);
      });
  },
  methods: {
    handleCheckChange(data, checked, node) {
      if (checked == true) {
        this.checkedId = data.businessId;
        this.checkedType = data.type;
        this.$refs.treeForm.setCheckedNodes([data]);
        console.log(data.businessId);
        this.unitName = data.labelName;
      }
    },
    handleNodeClick(data) {},
    loadNode(node, resolve) {},
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeCheck(e, data) {}
  }
};
</script>