import { Vcomposition2 } from "vcomposition2";

/**
 * @example: 设置弹框开关状态
 */
function useVisible(ctx, root) {
  ctx.ref("visible", false);

  const setvisible = bool => {
    root.visible = bool;
  };

  return {
    setvisible
  };
}

export const enter = function() {
  const v2 = new Vcomposition2(this);
  v2.onCreate(() => {
    v2.use([useVisible]);
  });
};
