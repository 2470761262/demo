import { Vcomposition2 } from "vcomposition2";
import util from "@/util/util";
/**
 * @example: 日历
 */
function useCalendar(v2) {
  v2.reactive({
    calendarTiem: ["2020-11-05", "2020-11-23"],
    color: ["#0DA88B", "#F6A420", "#EF5656"],
    current: []
  });
  v2.onComputed("collapseTile", () => {
    return util.format(this.root.calendarTiem, "yyyy年MM月dd日");
  });
}
/**
 * @example: select
 */

function useSelect(v2, root) {
  v2.ref("value", "");
}

/**
 * @example: 分页
 */
function usePage(v2) {
  v2.ref("page", {
    currentPage: 1,
    total: 20,
    pagesize: 10
  });
}
/**
 * @example: 折叠面板
 */

function useCollapse(v2) {
  v2.ref("activeCollapse", "calendar");
}

export const enter = function() {
  const v2 = new Vcomposition2(this);
  v2.onCreate(() => {
    v2.use([useCalendar, useCollapse, useSelect, usePage]);
  });
};
