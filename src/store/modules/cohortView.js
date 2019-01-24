const cohortView = {
  state: {
    all_mainCondId: [],
    all_minorCondId: []
  },
  mutations: {
    //主要条件
    Push_MainCondId: (state, mainCondId) => {
      state.all_mainCondId.push(mainCondId);
      // console.log(state.all_mainCondId);
    },
    Update_MainCondId: (state, mainCondId) => {
      state.all_mainCondId[mainCondId.id] = mainCondId;
    },
    Change_MainCondId: (state, id) => {
      state.all_mainCondId.splice(id, 1);
      state.all_mainCondId.forEach(m => {
        if (m.id > id) {
          m.id = m.id - 1;
        }
      });
      // console.log(state.all_mainCondId);
    },
    //次要条件
    Push_MinorCondId: (state, minorCondId) => {
      state.all_minorCondId.push(minorCondId);
      // console.log(state.all_minorCondId);
    },
    Update_MinorCondId: (state, minorCondId) => {
      state.all_minorCondId[minorCondId.id] = minorCondId;
    },
    Change_MinorCondId: (state, id) => {
      state.all_minorCondId.splice(id, 1);
      state.all_minorCondId.forEach(m => {
        if (m.id > id) {
          m.id = m.id - 1;
        }
      });
      // console.log(state.all_minorCondId);
    }
  },
  actions: {}
};

export default cohortView;
