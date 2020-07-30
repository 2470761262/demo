<style lang="less" scoped></style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div style="margin-top:8px;">
        <el-select
          class="anchor-point"
          v-model="pop.value"
          filterable
          remote
          @focus="handleGetStroe"
          :remote-method="getStroeDepartment"
          placeholder="请选择"
          @change="change"
        >
          <el-option
            class="anchor-point"
            v-for="item in pop.list"
            :key="item.id"
            :label="item.deptName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="pop-but">
        <el-button
          class="anchor-point"
          size="small"
          :class="'button-back'"
          @click="result"
          :loading="pop.loading"
          >提交</el-button
        >
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import "../less/didLogCss.less";
import { mapState } from "vuex";
export default {
  data() {
    return {
      pop: {
        list: [],
        loading: false,
        keyStroge: "",
        value: ""
      }
    };
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id
    })
  },
  methods: {
    result() {
      let that = this;
      if (this.pop.keyStroge == "") {
        this.$message("存放门店未选择");
        return;
      }
      let params = {
        Eid: this.houseId,
        KeyStorageDept: this.pop.keyStroge
      };
      this.$emit("update:visible", false);
      this.$api
        .post({
          url: "/agentHouse/property/updateKeyStorageDept",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
        })
        .catch(e => {});
    },
    change(e) {
      console.log(e);
      this.pop.keyStroge = e;
    },
    handleGetStroe() {
      if (this.pop.list.length == 0) this.getStroeDepartment();
    },
    getStroeDepartment(value = "") {
      console.log(value, "value");
      this.$api
        .get({
          url: "/department/getByCompanyId",
          data: {
            keyWord: value
          }
        })
        .then(e => {
          this.pop.list = e.data.data;
        })
        .catch(e => {});
    }
  }
};
</script>
