import Vue from "vue";
import Vuex from "vuex";
import tagsView from "./modules/tagsView";
import cohortView from "./modules/cohortView";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tagsView,
    cohortView
  },
  getters
});

export default store;
