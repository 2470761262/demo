<style lang="less" scoped>
@import url("../../../static/publicLess/addHouse.less");
.item-before {
  width: 110px !important;
}
.form-error-tips {
  &.noMarinTop {
    margin-top: 0;
  }
  .page-cell-item {
    flex-wrap: wrap;
    .cell-item-cell {
      display: flex;
      margin-top: 20px;
      margin-right: 60px;
      width: 320px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
}
.item-flex {
  flex: 1;
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
    .item-flex-avg {
      flex: 0 0 50%;
      padding: 0 5px;
      box-sizing: border-box;
      .el-radio {
        width: 100%;
      }
    }
  }
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-title">补充信息</div>
    <!-- 房屋用途 && 房屋结构 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">房屋用途</div>
          <el-select v-model="sss"
                     placeholder="请选择房屋用途">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">房屋结构</div>
          <el-select v-model="sss"
                     placeholder="请选择房屋结构">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 产权性质 && 房屋现状 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">产权性质</div>
          <el-select v-model="sss"
                     placeholder="请选择产权性质">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">房屋现状</div>
          <el-select v-model="sss"
                     placeholder="请选择房屋现状">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 房屋来源 && 户型结构 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">房屋来源</div>
          <el-select v-model="sss"
                     placeholder="请选择房屋来源">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">户型结构</div>
          <el-select v-model="sss"
                     placeholder="请选择户型结构">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 户口情况 && 电梯 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">户口情况</div>
          <div class="item-flex">
            <el-radio-group v-model="sss"
                            size="mini">
              <div v-for="(item, index) in List"
                   class="item-flex-avg"
                   :key="index">
                <el-radio :label="item"
                          border>{{ item }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">电梯</div>
          <div class="item-flex">
            <el-radio-group v-model="sss"
                            size="mini">
              <div v-for="(item, index) in List"
                   class="item-flex-avg"
                   :key="index">
                <el-radio :label="item"
                          border>{{ item }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <!-- 户口情况 && 电梯 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">户口情况</div>
          <div class="item-flex">
            <el-radio-group v-model="sss"
                            size="mini">
              <div v-for="(item, index) in List"
                   class="item-flex-avg"
                   :key="index">
                <el-radio :label="item"
                          border>{{ item }}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">房屋用途</div>
          <el-select v-model="sss"
                     placeholder="请选择房屋用途">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "supplement",
  data () {
    return {
      options: [],
      List: ["占用", "未占用"],
      sss: '',
    }
  },
}
</script>