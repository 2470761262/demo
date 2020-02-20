import loadding from "@/components/successLoading";
export default componentsName => {
  return {
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: import(`@/${componentsName}`), //配对房源,
    // 异步组件加载时使用的组件
    loading: loadding,
    // 加载失败时使用的组件
    error: {
      template:
        "<p style='text-align: center;'>哎呀,网络不好加载失败哒,试下重新刷新~~</p>"
    },
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 0,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 6000
  };
};
