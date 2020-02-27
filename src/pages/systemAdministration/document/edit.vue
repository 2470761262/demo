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
          :default-expanded-keys="[1]"
          node-key="nodeId"
          show-checkbox
          :props="defaultProps"
          @check-change="handleCheckChange"
          :highlight-current="true"
          :filter-node-method="filterNode"
          check-strictly
        ></el-tree>
      </div>
    </template>
    <div class="elControl">
      <el-input placeholder="请在组织结构树选择所属单位" v-model="unitName" readonly="true" disabled="true">
        <template slot="prepend">所属单位</template>
      </el-input>
      <el-input placeholder="请输入标题" v-model="title">
        <template slot="prepend">标题</template>
      </el-input>
      <el-upload class="upload" drag action="https://jsonplaceholder.typicode.com/posts/" limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <el-input type="textarea" autosize placeholder="请输入备注" v-model="textarea1"></el-input>
    </div>
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
      unitName: null
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