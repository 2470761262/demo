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
.editorContainer {
  width: 100%;
}
.upload-demo {
  display: none;
}
.myQuillEditor {
  height: 500px;
}
</style>
<template>
  <div>
    <template>
      <div class="elTree">
        <el-tree
          ref="treeForm"
          :data="treeData"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
          node-key="businessId"
          show-checkbox
          :props="defaultProps"
          @check-change="handleCheckChange"
          :highlight-current="true"
          :filter-node-method="filterNode"
          check-strictly
          :action="''"
          v-loading="treeLoading"
        ></el-tree>
      </div>
    </template>
    <div class="elControl">
      <el-input
        placeholder="请在组织结构树选择所属单位"
        v-model="unitName"
        :disabled="true"
      >
        <template slot="prepend">所属单位</template>
      </el-input>
      <el-input placeholder="请输入标题" v-model="title">
        <template slot="prepend">规则标题</template>
      </el-input>
      <el-select v-model="typeValue" placeholder="请选择规则类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-main>
        <div class="editorContainer">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :headers="myHeader"
            :on-success="handleAvatarSuccess"
          >
            <el-button size="small" type="primary" id="btnUpload"
              >点击上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <quill-editor
            class="myQuillEditor"
            v-model="newsContent"
            :options="editorOption"
            ref="QuillEditor"
          ></quill-editor>
        </div>
      </el-main>
      <el-button type="success" @click="saveData" plain>确定</el-button>
      <el-button type="primary" @click="$router.back(-1)" plain>取消</el-button>
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import util from "@/util/util";
import { TOKEN } from "@/util/constMap";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"] // remove formatting button
];
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid],
  components: { quillEditor },
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
      newsContent: null,
      defaultCheckedKeys: null,
      defaultExpandedKeys: null,
      uploadUrl: "",
      myHeader: "",
      editorOption: {
        placeholder: "请输入公告内容",
        readOnly: false,
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  console.log(value);
                  document.getElementById("btnUpload").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video: function(v) {
                if (v) {
                  alert("不支持上传视频");
                }
              },
              link: function(v) {
                if (v) {
                  var href = prompt("Enter the URL");
                  this.quill.format("link", href);
                }
              }
            }
          }
        }
      },
      options: [
        {
          value: "0",
          label: "业务线行程量化考核规则"
        },
        {
          value: "1",
          label: "鑫家网系统规则"
        }
      ],
      typeValue: "",
      treeLoading: true
    };
  },
  mounted() {
    //读取树数据
    this.$api
      .post({
        url: "/sys/tree/doc",
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
      })
      .finally(() => {
        this.treeLoading = false;
      });

    this.quill = this.$refs.QuillEditor.quill;
  },
  methods: {
    handleCheckChange(data, checked) {
      if (checked == true) {
        this.checkedId = data.businessId;
        this.checkedType = data.type;
        this.$refs.treeForm.setCheckedNodes([data]);
        console.log(data.businessId);
        this.unitName = data.labelName;
      }
    },
    handleNodeClick() {},
    loadNode() {},
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeCheck() {},
    saveData() {
      let that = this;
      if (
        that.checkedId == null ||
        that.checkedId <= 0 ||
        that.checkedType == null
      ) {
        that.$message({
          message: "请在组织结构树选择单位",
          type: "warning"
        });
        return;
      }
      if (that.title.length <= 0) {
        that.$message({
          message: "请输入标题",
          type: "warning"
        });
        return;
      }
      if (that.newsContent.length <= 0) {
        that.$message({
          message: "请输入规则内容",
          type: "warning"
        });
        return;
      }
      if (
        that.typeValue == null ||
        (that.typeValue != "0" && that.typeValue != "1")
      ) {
        that.$message({
          message: "请选择规则类型",
          type: "warning"
        });
        return;
      }
      let oldId = that.oldId;
      let params = {
        id: oldId,
        title: that.title,
        unitId: that.checkedId,
        unitType: that.checkedType,
        content: that.newsContent,
        type: that.typeValue
      };
      this.$api
        .post({
          url: "/docRules/save",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
          } else {
            console.log("保存结果：" + result.message);
          }
          //   alert(result.data);
          this.$message({
            type: "info",
            message: result.data
          });
          this.$router.push({ path: "/sys/docRules/list" });
        })
        .catch(e => {
          console.log("保存失败");
          console.log(e);
        });
    },
    handleAvatarSuccess(res) {
      // 如果上传成功
      if (res.code == 200) {
        let imageUrl = res.data.url;
        // 获取富文本组件实例
        let quill = this.$refs.QuillEditor.quill;
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，imageUrl为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", imageUrl);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        alert("图片插入失败");
      }
    }
  },
  created() {
    this.uploadUrl = this.$api.baseUrl() + "/docRules/picture";
    this.myHeader = { tk: util.localStorageGet(TOKEN) };
    this.oldId = this.$route.query.id;
    console.log("传过来的id：" + this.oldId);
    if (typeof this.oldId === "undefined") {
      return;
    } else if (this.oldId != 0) {
      let params = { id: this.oldId };
      this.$api
        .post({
          url: "/docRules/detail",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            let data = result.data;
            this.title = data.title;
            if (data.DepId != null && data.DepId > 0) {
              this.checkedId = data.DepId;
              this.checkedType = 1;
            } else {
              this.checkedId = data.Coid;
              this.checkedType = 0;
            }
            this.defaultCheckedKeys = [this.checkedId];
            this.defaultExpandedKeys = [this.checkedId];
            this.title = data.RulesTitle;
            this.newsContent = data.RulesContent;
            this.typeValue = data.RulesType + "";
          } else {
            console.log("查询详情结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询详情失败");
          console.log(e);
        });
    }
  }
};
</script>
