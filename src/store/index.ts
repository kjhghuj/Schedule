import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOpenAddBox: false,
    isReadyAdd: false,
  },
  mutations: {
    OpenBox(state, parms) {
      state.isOpenAddBox = parms;
    },
    AddNewSchedule(state, parms) {
      state.isReadyAdd = parms;
    },
  },
  actions: {
    OpenBox({commit}, parms) {
      commit('OpenBox', parms);
    },
    AddNewSchedule({commit}, parms) {
      commit('AddNewSchedule', parms);
    },
  },
  modules: {
  },
});
