<style lang="less" scoped>
.right {
  float: right;
}
.el-aside {
  border: 1px solid black;
  min-height: 600px;
}
.innerContainer {
  border: 1px solid red;
}
.el-header {
  margin-top: 10px;
}
.el-top{
    margin-top: 500px;
}

.treeTitle {
  font-size: 20px;
  text-align: center;
  border-radius: 1em;
  background-color: bisque;
}
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

.editorContainer {
  width: 100%;
  margin-top: 130px;
}
.myQuillEditor {
  height: 500px;
}
.upload-demo {
  display: none;
}
</style>
<template>
  <div >
    <el-container>
  
      <el-container>
        <el-header>
         
          <div class="left-input-container">
            <span>参数编号-参数名称-参数类型</span>
          <div>
             {{configId}}-{{configName}}-{{configNo}}
            </div>
          
          </div>
           <div class="left-input-container">
            <span>公司参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
           
          </div>
         <div class="left-input-container">
            <span>参数范围&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="notice.configNo"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
           <div class="left-input-container">
            <span>关联对象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
           <el-select
            v-model="notice.configObject"
            >
            <el-option value="0">
                默认
            </el-option>
             <el-option value="1">
                人员
            </el-option>
             <el-option value="2">
                部门
            </el-option>
             <el-option value="3">
                岗位
            </el-option>
            </el-select>
          </div>
           <div class="left-input-container">
            <span>参数一&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="notice.paraNum1"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
           <div class="left-input-container">
            <span>参数二&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="notice.paraNum2"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
           <div class="left-input-container">
            <span>参数三&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="notice.paraNum3"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
           <div class="left-input-container">
            <span>参数四&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="notice.paraNum4"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
           <div class="left-input-container">
            <span>备注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="notice.configMemo"
              maxlength="10"
              show-word-limit
            ></el-input>
          </div>
           <div class="left-input-container">
            <span>时间单位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-select
            v-model="unit"
            >
            <el-option value="0">
                小时
            </el-option>
             <el-option value="1">
                天
            </el-option>
             <el-option value="2">
                月
            </el-option>
            </el-select>
          </div>
        </el-header>
      
        <div class="footerContainer el-top">
          <el-button type="primary" @click="sendNotice">发送</el-button>
          <el-button>取消</el-button>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
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
  ["link","image"],
  ["clean"] // remove formatting button
];
export default {
  //https://kang-bing-kui.gitbook.io/quill/wen-dang-document/themes 官网帮助文档
  components: { quillEditor },
  props: {},
  data() {
    return {
      quill:null,
     
      notice:{
           configId:null,
      paraNum1:null,
      paraNum2:null,
      paraNum3:null,
      comId:"1",
      configObject:null,
       paraNum4:null,
        newsTitle: null,
        newsContent: null,
        addPer:null,//44430,
        receiveAcountIds:null,//[44430],
        sendWay:null,
        configNo:null,
        configMemo:null,
         configName:null,
        newsClass:null ,
        newsType:null,
        sendType:null 
      },
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
                  document.getElementById('btnUpload').click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video:function(v){
                if (v) {
                  alert("不支持上传视频");
                } 
              },
              link:function(v){
                if (v) {
                  var href = prompt('Enter the URL');
                   this.quill.format("link", href);

                } 
              }
            }
          }
        }        
      },
      newsClassOption: [
        {
          value: "1",
          label: "买卖房源"
        },
        {
          value: "2",
          label: "买卖客户"
        }
        ,
         {
          value: "3",
          label: "租赁房源"
        },
         {
          value: "4",
          label: "租赁客户"
        }
        ,
         {
          value: "5",
          label: "用户管理"
        }
      ],


    };
  },
  watch: {},
  computed: {},
  methods: {
    sendNotice(){
      if(this.notice.comId==null){
        this.$message({
          showClose: true,
          message: '公司参数',
          type: 'warning'
        });
        return;
      }
      if(this.notice.configNo==null){
        this.$message({
          showClose: true,
          message: '参数名称',
          type: 'warning'
        });
        return;
      }
      if(this.notice.configMemo==null){
        this.$message({
          showClose: true,
          message: '参数编号',
          type: 'warning'
        });
        return;
      }
      if(this.notice.paraNum4==null){
        this.$message({
          showClose: true,
          message: '参数1',
          type: 'warning'
        });
        return;
      }
    if(this.notice.paraNum3==null){
        this.$message({
          showClose: true,
          message: '参数2',
          type: 'warning'
        });
        return;
      } if(this.notice.paraNum2==null){
        this.$message({
          showClose: true,
          message: '参数3',
          type: 'warning'
        });
        return;
      }
if(this.notice.paraNum1==null){
        this.$message({
          showClose: true,
          message: '参数4',
          type: 'warning'
        });
        return;
      }
      this.$api.get({
        url: '/Set/companyAdd',
        data: {
          sysParType:this.notice.newsClass,
          sysParNo:this.notice.configNo,
          sysParName:this.notice.configMemo,
          memo:this.notice.configName,
          addName:"35491",
        },
        token: false,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
              this.$alert('', '添加成功', {
            dangerouslyUseHTMLString: false
          });
          this.$router.push({ path: "/menuFrame/systemConfigList"});
          console.log(result.data);
          this.$message({message:result.message});
        } else {
          console.log("添加失败:" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("添加失败");
        console.log(e);
      })
    },

  },
 created() {
      this.configId=this.$route.query.configId;
      console.log(this.$route.query.configId);
  },
 
};
</script>