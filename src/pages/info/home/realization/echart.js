import { Vcomposition2 } from "vcomposition2";
import echarts from "@/util/echartsConfig";
import config from "./echartConfig";

function useSelect(v2, root) {
  v2.reactive({
    //门店select下拉框开关;
    deptSelectFlag: false,
    //经纪人select下拉框开关
    agentSelectFlag: false
  });

  //修改select下拉框状态
  const changeSelectFlag = (keyValue, bool) => {
    bool === undefined
      ? (root[keyValue] = !root[keyValue])
      : (root[keyValue] = bool);
  };
  return {
    changeSelectFlag
  };
}
function useEchart(v2, root) {
  //初始化Echart
  const initEchart = echartDom => {
    v2.ref(echartDom, echarts.init(this.$refs[echartDom]));
  };

  //渲染echart
  const renderEchart = (eDom, echartData) => {
    if (!this.root[eDom]) initEchart(eDom);
    this.root[eDom].setOption(config(echartData));
  };

  return {
    renderEchart
  };
}
/**
 * @example: 渲染echartEnter
 *
 *
 */
export const echartEnter = function() {
  const v2 = new Vcomposition2(this);

  v2.onCreate(() => {
    v2.use(useSelect).use(useEchart);
  });

  v2.onMounted(() => {
    this.renderEchart("leftEchart", {
      lease: 335,
      deal: 310,
      project: 234
    });
    this.renderEchart("rightEchart", {
      lease: 2000,
      deal: 98000,
      project: 1000
    });
  });
};
