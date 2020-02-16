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
    &.el-input-auto {
      .el-input {
        width: auto;
      }
    }
    .cell-item-cell {
      display: flex;
      margin-top: 20px;
      margin-right: 60px;
      width: 320px;
      align-items: center;
      &:last-child {
        margin-right: 0px;
      }
    }
    &.nowarp {
      flex-wrap: nowrap !important;
    }
    @media screen and(max-width: 933px) {
      .warp-marin {
        margin-top: 10px;
      }
    }
    .Division {
      align-self: center;
      margin: 0 10px;
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
    <!-- 交房时间 && 附属配套-->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">交房时间</div>
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
          <div class="item-before">附属配套</div>
          <el-select v-model="sss"
                     placeholder="请选择附属配套">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 土地性质  -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">土地性质</div>
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
    <div class="page-cell-title">学籍信息</div>
    <!-- 小学划片 & 学籍占用 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">小学划片</div>
          <el-select v-model="sss"
                     filterable
                     placeholder="请选择小学">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="page-cell-item">
          <div class="cell-item-cell">
            <div class="item-before">学籍占用</div>
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
    </div>
    <!-- 中学划片 & 学籍占用 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">中学划片</div>
          <el-select v-model="sss"
                     filterable
                     placeholder="请选择中学">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="page-cell-item">
          <div class="cell-item-cell">
            <div class="item-before">学籍占用</div>
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
    </div>
    <div class="page-cell-title">抵押/贷款信息</div>
    <!-- 抵押 && 抵押银行-->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">抵押</div>
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
          <div class="item-before">抵押银行</div>
          <el-select v-model="sss"
                     placeholder="请选择抵押银行">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 余贷/月供 -->
    <div class="form-error-tips ">
      <div class="page-cell-item el-input-auto">
        <div class="page-cell-item nowarp">
          <div class="item-before">余贷/月供</div>
          <div class="page-cell-item">
            <div class="page-cell-item nowarp">
              <el-input v-model="sss"
                        placeholder="请输入余贷金额"></el-input>
              <div class="Division">万元</div>
            </div>
            <div class="page-cell-item nowarp warp-marin">
              <el-input v-model="sss"
                        placeholder="请输入月供"></el-input>
              <div class="Division">万元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-cell-title">历史交易</div>
    <!-- 上次交易时间/上次交易金额 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">上次交易</div>
          <el-date-picker v-model="ddd"
                          type="date"
                          placeholder="契税发票时间">
          </el-date-picker>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">上次交易金额</div>
          <el-input v-model="ddd"
                    placeholder="报税价"></el-input>
        </div>
      </div>
    </div>
    <!-- 付款方式/竣工时间 -->
    <div class="form-error-tips noMarinTop">
      <div class="page-cell-item">
        <div class="cell-item-cell">
          <div class="item-before">付款方式</div>
          <el-select v-model="sss"
                     placeholder="付款方式">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cell-item-cell">
          <div class="item-before">竣工时间</div>
          <el-date-picker v-model="sss"
                          type="date"
                          placeholder="付款方式">
          </el-date-picker>
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
      ddd: ''
    }
  },
}
</script>