<style lang="less" scoped>
.right{
    float:right;
}
.wrapper{
    .newsTitle{
        text-align: center;
        font-size: 30px;
        font-weight: 1200;
    }
    .newsAddTime{
        margin-top: 5px;
        text-align: center
    }
    .newsContent{
        margin-top: 5px;
        border: 1px solid black;
        min-height: 300px
    }
}
</style>
<template>
  <div class="wrapper">
    <el-row>
        <el-col :span="24"><div v-html="noticeEntity.newsTitle" class="newsTitle"></div></el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><div v-html="noticeEntity.addDate" class="newsAddTime"></div></el-col>
    </el-row>
    <el-row>
         <el-col :span="24"><div class="right">查看阅读情况</div></el-col>
    </el-row>
     <el-row>
        <el-col :span="24"><div v-html="noticeEntity.newsContent" class="newsContent"></div></el-col>
    </el-row>
     <el-row>
        <el-col :span="24"><div v-html="'发布人：'+noticeEntity.perName" class="right"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
        noticeId:0,
        noticeEntity:null
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
      this.noticeId=this.$route.query.noticeId;
  },
  mounted() {
      console.log("准备查询公告详情");
          this.$api.get({
        url: '/noticeManage/'+this.noticeId,
        token: false
      }).then((e) => {
        console.log(e.data);
        let result = e.data;
        if (result.code == 200) {
          console.log(result.message);
          console.log(result.data);
          this.noticeEntity=result.data;
        } else {
          console.log("查询公告详情结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询公告详情失败");
        console.log(e);
      })    
  }
};
</script>