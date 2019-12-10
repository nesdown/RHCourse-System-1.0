import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [],
    language: require('./assets/ukr-flag.png'),
    successfulAdd: false,
    successfulEdit: false
  },
  mutations: {
    sortRecords: (state, payload) => {
      state.records = [...payload];
      console.log(state.records);
    },
    toggleLanguage: (state) => {
      let langs = [require('./assets/ukr-flag.png'), require('./assets/rus-flag.jpg')];
      if (state.language === langs[0]) { 
        state.language = langs[1];
      } else {
        state.language = langs[0];
      } 
    },
    successfulAddChange: (state, payload) => {
      state.successfulAdd = payload;
      console.log(state.successfulAdd);
    },
    successfulEditChange: (state, payload) => {
      state.successfulEdit = payload;
      console.log(state.successfulEdit);
    },
  },
  actions: {
    asyncSortRecords: ({ commit }, payload) => {
      axios.post('/admin/sortRecords', payload)
        .then(res => commit('sortRecords', res.data))
        .catch(err => console.log(err));
    },
    asyncSortRecordsTrade: ({commit}, payload) => {
      axios.post('/admin/sortRecordsTrade', payload)
        .then(res => commit('sortRecords', res.data))
        .catch(err => console.log(err));
    }
  }
})