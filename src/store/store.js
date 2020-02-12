import Vue from "vue";
import Vuex from "vuex";
import addHouse from "@/store/addHouse/addHouse";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    addHouse
  }
});
export default store;
