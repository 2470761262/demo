import { Vcomposition2 } from "vcomposition2";
/**
 * @example: 日历
 */
function useCalendar(v2) {
  v2.reactive({
    calendarTiem: "",
    color: ["#0DA88B", "#F6A420", "#EF5656"],
    current: [],
    value: ""
  });
}

export const enter = function() {
  const v2 = new Vcomposition2(this);
  v2.onCreate(() => {
    v2.use([useCalendar]);
  });
};
