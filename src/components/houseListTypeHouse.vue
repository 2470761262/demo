<style lang="less" scoped>
.house-type-title {
  margin-top: 20px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
}
.page-col {
  margin-top: 20px;
  .house-type-item {
    height: 120px;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item-cell {
      display: flex;
      justify-content: space-between;
      .item-cell-title {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
      }
      .item-cell-data {
        //display: flex;
        .item-cell-data-title {
          display: inline-block;
          color: #fff;
          background: var(--color--primary);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          line-height: 30px;
          text-align: center;
          font-size: 18px;
          vertical-align: baseline;
        }
        .item-cell-data-tips {
          display: inline-block;
          font-size: 16px;
          vertical-align: bottom;
        }
      }
    }
    .item-cell-tips {
      font-size: 18px;
      color: #333;
    }
  }
}
</style>
<template>
  <div>
    <div class="house-type-title">热门</div>
    <el-row :gutter="20">
      <el-col :sm="8"
              :md="6"
              :lg="6"
              class="page-col">
        <div class="house-type-item">
          <div class="item-cell">
            <div class="item-cell-title overText">我的房源</div>
            <div class="item-cell-data overText">
              <div class="item-cell-data-title">33</div>
              <div class="item-cell-data-tips">套</div>
            </div>
          </div>
          <div class="item-cell-tips overText">我的个人作业房源</div>
        </div>
      </el-col>
      <el-col :sm="8"
              :md="6"
              :lg="6"
              class="page-col">
        <div class="house-type-item">
          <div class="item-cell">
            <div class="item-cell-title overText">我的房源</div>
            <div class="item-cell-data overText">
              <div class="item-cell-data-title">33</div>
              <div class="item-cell-data-tips">套</div>
            </div>
          </div>
          <div class="item-cell-tips overText">我的个人作业房源</div>
        </div>
      </el-col>
      <el-col :sm="8"
              :md="6"
              :lg="6"
              class="page-col">
        <div class="house-type-item"
             @click="goToNewHouse()">
          <div class="item-cell">
            <div class="item-cell-title overText">新增房源</div>
            <div class="item-cell-data overText">
              <div class="item-cell-data-title">8</div>
              <div class="item-cell-data-tips">套</div>
            </div>
          </div>
          <div class="item-cell-tips overText">三天内的新增房源</div>
        </div>
      </el-col>
      <el-col :sm="8"
              :md="6"
              :lg="6"
              class="page-col">
        <div class="house-type-item">
          <div class="item-cell">
            <div class="item-cell-title overText">我的房源</div>
            <div class="item-cell-data overText">
              <div class="item-cell-data-title">33</div>
              <div class="item-cell-data-tips">套</div>
            </div>
          </div>
          <div class="item-cell-tips overText">我的个人作业房源</div>
        </div>
      </el-col>
    </el-row>

    <div class="house-type-title ">推荐房源</div>
    <el-row :gutter="20">
      <el-col :sm="8"
              :md="6"
              :lg="6"
              v-for="(index) in 4"
              :key="index"
              class="page-col">
        <div class="house-type-item">
          <div class="item-cell">
            <div class="item-cell-title overText">必看房源</div>
            <div class="item-cell-data overText">
              <div class="item-cell-data-title">33</div>
              <div class="item-cell-data-tips">套</div>
            </div>
          </div>
          <div class="item-cell-tips overText">推广任务房源</div>
        </div>
      </el-col>
    </el-row>
    <div class="house-type-title ">房源资源库</div>
    <el-row :gutter="20">
      <el-col :sm="8"
              :md="6"
              :lg="6"
              v-for="(index) in 4"
              :key="index"
              class="page-col">
        <div class="house-type-item">
          <div class="item-cell">
            <div class="item-cell-title overText">资源库</div>
            <div class="item-cell-data overText">
              <div class="item-cell-data-title">33</div>
              <div class="item-cell-data-tips">套</div>
            </div>
          </div>
          <div class="item-cell-tips overText">您的房源淘宝地</div>
        </div>
      </el-col>
    </el-row>
    <div class="house-type-title ">其他</div>
    <el-row :gutter="20">
      <el-col :sm="8"
              :md="6"
              :lg="6"
              v-for="(index) in 4"
              :key="index"
              class="page-col">
        <div class="house-type-item">
          <div class="item-cell">
            <div class="item-cell-title overText">钥匙房源</div>
            <div class="item-cell-data overText">
              <div class="item-cell-data-title">33</div>
              <div class="item-cell-data-tips">套</div>
            </div>
          </div>
          <div class="item-cell-tips overText">有要是的可带看房源</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'houseListTypeHouse',
  data () {
    return {

    }
  },
  methods: {
    goToNewHouse () {
      this.$router.push({ path: '/menuFrame/newAgentHouse' });
    }
  },
}
</script>