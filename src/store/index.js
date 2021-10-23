import { createStore } from 'vuex'

import actions from './actions'
import mutations from './mutations'

export default createStore({
  state: {
    movies: [],
    shows: [],
    actors: []
  },
  mutations,
  actions,
  modules: {}
})
