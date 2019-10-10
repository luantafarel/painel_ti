import state from './state'
import mutations from './mutations'
import actions from './actions'

const auth = {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations
}

export default auth
