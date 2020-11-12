import { Vcomposition2 } from "vcomposition2";

/**
 * @example: 设置loading
 */
function useInitLoading(ctx, root) {
  ctx.ref("loading", true);

  const setLoading = bool => {
    root.loading = bool;
  };
  return {
    setLoading
  };
}

/**
 * @description  初始化
 * 本来想都拆开来的,普通 经纪人 店长各初始化需要的form数据
 * 但其实本来就是强耦合
 */
function useInitForm(ctx, root) {
  ctx.ref("score", [1, 2, 3, 4, 5]);
  ctx.ref("form", {
    activeScore: "",
    plan: "", //明日计划 >> (普通,经纪人,店长)
    growth: "", //今日成长与问题 >> (普通,经纪人,店长)
    excavate: "", //今日挖掘优质房源 >> (经纪人,店长)
    clientDemand: "", //急购客户需求 >> (经纪人,店长)
    share: "" //案例分享 >> (店长)
  });

  ctx.ref("config", {
    plan: false,
    growth: false,
    excavate: false,
    clientDemand: false,
    share: false
  });

  //修改config
  const setConfig = options => {
    root.config = { ...root.config, ...options };
  };
  /**
   * @example: 重置表单
   */
  const resetForm = () => {
    this.$router.go();
  };
  /**
   * @example: 验证表单
   */
  const validateForm = () => {
    this.$validator.validate().then(e => {});
  };
  return {
    setConfig,
    resetForm,
    validateForm
  };
}

/**
 * @example: 设置类型
 */
function useSetConfig() {
  /**
   * Todo 获取判断当前显示 在这获取接口
   */
  this.setConfig({
    growth: true,
    plan: true
  });
  this.setLoading(false);
}
export const enter = function() {
  const v2 = new Vcomposition2(this);

  v2.onCreate(() => {
    v2.use([useInitLoading, useInitForm]);
    v2.use([useSetConfig]);
  });
};
