const state = {
  login: {},
  usuario: {}
}

const mutations = {
  /** REMOVER STATE */
  removerStore: (state) => {
    state.login = {}
    state.usuario = {}
  },
  /** SETAR DADOS NO STATE {key:'',value:''}*/
  setDados: (state, obj) => {
    if (obj && obj.key) state[obj.key] = obj.value
  }
}

const getters = {
  getLogin: (state) => {
    return state.login
  },
  getUsuario: (state) => {
    return state.usuario
  }
}

const actions = {
  async limparStore(context) {
    context.commit('removerStore',context.state) 
  }
}

export default {
  namespaced: false,
  getters,
  mutations,
  actions,
  state
}