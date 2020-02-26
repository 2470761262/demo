import Vue from "vue";
import Vuex from "vuex";
import addHouse from "@/store/addHouse/addHouse";
import menuRid from "@/store/menuRid/menuRid";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    addHouse,
    menuRid
  }
});
export default store;
