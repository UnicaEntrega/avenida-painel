const state = {
  login: {},
  usuario: {},
  chats: {}
}

const mutations = {
  /** REMOVER STATE */
  removerStore: (state) => {
    state.login = {}
    state.usuario = {}
    state.chats = {}
  },
  /** SETAR DADOS NO STATE {key:'',value:''}*/
  setDados: (state, obj) => {
    if (obj && obj.key) state[obj.key] = obj.value
  },
  abrirChat: (state,obj) => {
    state.chats['coleta'+obj.coleta_id] = obj
  },
  mensagemChat: (state, obj) => {
    console.log(obj,state)
    if (!obj.error) {
      if (!state.chats['coleta'+obj.coleta_id])
        state.chats['coleta'+obj.coleta_id] = {coleta_id:obj.coleta_id,updated_at:obj.updated_at,mensagens:[]}
      state.chats['coleta'+obj.coleta_id].mensagens.push(obj.mensagem)
    }
  }
}

const getters = {
  getLogin: (state) => {
    return state.login
  },
  getUsuario: (state) => {
    return state.usuario
  },
  getChats: (state) => {
    return state.chats
  }
}

const actions = {
  async limparStore(context) {
    context.commit('removerStore',context.state) 
  },
  mensagemChat(context, obj) {
    context.commit('mensagemChat',obj)
  }
}

export default {
  namespaced: false,
  getters,
  mutations,
  actions,
  state
}