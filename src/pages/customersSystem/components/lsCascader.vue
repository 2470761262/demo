<style lang="less" scoped>
@import url(../less/popScroll);
.head-input {
  .head-input();
}
.foot-left-tips {
  width: 220px;
  text-align: center;
  font-size: 16px;
  color: #666;
  padding-top: 10px;
}
.fool-right-scroll {
  .fool-right-scroll();
}
</style>
<template>
  <down-content
    :down-ul-flag="cascaderRenderList.length > 0"
    icon-class="iconwodefangyuan iconfont"
  >
    <template v-slot:head>
      <div class="head-input">
        <input
          type="text"
          v-model="cascaderCommunity.input"
          @input="communityInput"
          @focus="openScroll('cascaderCommunity')"
          placeholder="请选择带看楼盘"
        />
        <input
          type="text"
          @input="buildInput"
          @focus="openScroll('cascaderBuild')"
          placeholder="楼栋"
          v-model="cascaderBuild.input"
          v-if="cascaderCommunity.next"
        />
        <input
          type="text"
          @input="houseInput"
          placeholder="房间号"
          @focus="openScroll('cascaderHouse')"
          v-model="cascaderHouse.input"
          v-if="cascaderBuild.next"
        />
      </div>
    </template>
    <template v-slot:fool>
      <div class="foot-left-tips" v-show="getLevel !== 0">
        {{ tipsList[getLevel] }}
      </div>
      <ul
        class="fool-right-scroll"
        :class="{
          'is-childred-one': getLevel === 0,
          'scroll-pad-bor': getLevel !== 0
        }"
      >
        <li
          v-for="item in cascaderRenderList"
          :key="item.value"
          @click="checkListItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </template>
  </down-content>
</template>

<script>
import util from "@/util/util";
import downContent from "../customersDetail/components/downContent";
export default {
  props: ["value"],
  components: {
    downContent
  },
  computed: {
    /**
     * @example: 获取当前的激活等级
     * @return: [number]
     */
    getLevel() {
      let level = 0;
      if (this.activeName === "cascaderBuild") level = 1;
      else if (this.activeName === "cascaderHouse") level = 2;
      return level;
    }
  },
  methods: {
    queryBuildingHouse(page, name, callBack) {
      let _that = this;
      if (!_that.cascaderCommunity.inputValue) {
        _that.$message({
          type: "info",
          message: "请先选择楼盘"
        });
        return;
      }
      if (!_that.cascaderBuild.inputValue) {
        _that.$message({
          type: "info",
          message: "请先选择楼栋"
        });
        return;
      }
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          qs: true,
          data: {
            roomNo: name,
            comId: _that.cascaderCommunity.inputValue, //当前选择的楼盘id
            cbId: _that.cascaderBuild.inputValue, //当前选择的楼栋id
            page: page
          }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询房间");
            callBack(result.data.list);
          } else {
            console.log("查询房间" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("查询房间失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    queryCommunityBuilding(page, name, callBack) {
      //"mateHouse/queryComBuilding"
      let _that = this;
      if (!_that.cascaderCommunity.inputValue) {
        _that.$message({
          type: "info",
          message: "请先选择楼盘"
        });
        return;
      }
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          qs: true,
          data: {
            comBuildingName: name,
            comId: _that.cascaderCommunity.inputValue, //当前选择的楼盘id
            page: page
          }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询楼栋");
            callBack(result.data.list);
          } else {
            console.log("查询楼栋" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("查询楼栋失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    queryCommunity(page, name, callBack) {
      let _that = this;
      this.$api
        .get({
          url: "/community/communityList",
          qs: true,
          data: { communityName: name, page: page }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log(result, "查询楼盘");
            callBack(result.data.list);
          } else {
            console.log("查询楼盘" + result.message);
            _that.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("查询楼盘失败catch");
          console.log(e);
        })
        .finally(() => {});
    },
    //楼盘Input输入input事件
    communityInput: util.debounce(300, function(e) {
      // Todo
      // remot get data
      console.log(e.target.value, "输入楼盘名称搜索");
      let _that = this;
      _that.queryCommunity(1, e.target.value, function(e) {
        _that.cascaderRenderList = e;
      });
    }),

    //楼栋输入input事件
    buildInput: util.debounce(300, function(e) {
      // Todo
      // remot get data
      console.log(e.data, "输入楼栋名称搜索");
    }),

    //房间号input输入input事件
    houseInput: util.debounce(300, function(e) {
      // Todo
      // remot get data
      console.log(e.data, "输入楼房间号名称搜索");
    }),

    checkListItem(item) {
      const level = this.getLevel;

      //设置选中的数据添加到一个集合
      this.$set(this.checkList, level, item);

      this.$emit("input", this.checkList);

      //把当前设置的之后的值都删除掉，保证一致
      this.checkList.splice(level + 1, this.checkList.length - 1);

      this[this.activeName].input = item.name;
      this[this.activeName].inputValue = item.value;
      console.log(this[this.activeName], "发生纠纷");
      this[this.activeName].next = true;

      //设置其他next为false
      this[this.activeName].children.forEach((childName, index) => {
        this[childName].input = "";
        this[childName].next = false;
      });

      this.cascaderRenderList = [];
    },

    /**
     * @example: 激活时把对应的list给renderList
     * @param {cascaderName} string
     */

    openScroll(cascaderName) {
      let _that = this;
      this.cascaderRenderList = this[cascaderName].list;
      if (cascaderName == "cascaderCommunity") {
        //焦点到楼盘输入框后
        _that.queryCommunity(1, _that.cascaderCommunity.input, function(e) {
          _that.cascaderRenderList = e;
        });
      } else if (cascaderName == "cascaderBuild") {
        //焦点到楼栋号
        _that.queryCommunityBuilding(1, _that.cascaderBuild.input, function(e) {
          _that.cascaderRenderList = e;
        });
      } else if (cascaderName == "cascaderHouse") {
        //焦点到房间号
        _that.queryBuildingHouse(1, _that.cascaderHouse.input, function(e) {
          _that.cascaderRenderList = e;
        });
      }
      this.activeName = cascaderName;
    }
  },
  data() {
    return {
      tipsList: ["", "请选择楼栋号:", "请选择房间号:"],
      activeName: "", // 当前激活的cascader
      checkList: [], //选择的集合
      cascaderCommunity: {
        input: "",
        inputValue: "",
        next: false,
        list: [
          //测试数据
          { key: 1, value: "楼盘" }
        ],
        children: ["cascaderBuild", "cascaderHouse"]
      },

      cascaderBuild: {
        input: "",
        inputValue: "",
        next: false,

        list: [
          //测试数据
          { key: 1, value: "01号楼" },
          { key: 2, value: "02号楼" },
          { key: 3, value: "03号楼" },
          { key: 4, value: "04号楼" },
          { key: 5, value: "05号楼" },
          { key: 3, value: "06号楼" },
          { key: 4, value: "07号楼" },
          { key: 5, value: "08号楼" }
        ],

        children: ["cascaderHouse"]
      },

      cascaderHouse: {
        input: "",
        inputValue: "",
        next: false,

        list: [
          //测试数据
          { key: 1, value: "1301" },
          { key: 2, value: "1302" },
          { key: 3, value: "1303" },
          { key: 4, value: "1304" },
          { key: 5, value: "1305" },
          { key: 3, value: "1306" },
          { key: 4, value: "1307" },
          { key: 5, value: "1308" }
        ],

        children: []
      },

      cascaderRenderList: []
    };
  }
};
</script>
