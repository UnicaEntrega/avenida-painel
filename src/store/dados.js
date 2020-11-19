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
  removerChat: (state,coleta_id) => {
    delete state.chats['coleta'+coleta_id]
    state.chats = JSON.parse(JSON.stringify(state.chats))
  },
  lidaChat: (state,obj) => {
    let chat = state.chats['coleta'+obj.coleta_id]
    if (chat) {
      for (let item of chat.mensagens)
        if ((obj.isCliente && item.usuario_id!==obj.usuario_id) || (!obj.isCliente && item.usuario_id!==obj.cliente_id))
          item.lida = true
        chat.naoLida = 0
      state.chats = JSON.parse(JSON.stringify(state.chats))
    }
  },
  mensagemChat: (state, obj) => {
    if (!obj.error) {
      let chat = state.chats['coleta'+obj.coleta_id]
      if (!chat) chat = {coleta_id:obj.coleta_id,updated_at:obj.updated_at,mensagens:[]}
      chat.mensagens.push(obj.mensagem)
      let isCliente = (state.usuario.perfis && state.usuario.perfis.length>0 ? state.usuario.perfis[0].slug : '')==='cliente'
      if ((isCliente && obj.mensagem.usuario_id!==state.usuario.id) || (!isCliente && obj.mensagem.usuario_id===chat.cliente.usuario_id))
        chat.naoLida++
      state.chats = JSON.parse(JSON.stringify(state.chats))
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
  },
  getTotalNaoLidas: (state) => {
    let t = 0
    try {
      let isCliente = (state.usuario.perfis && state.usuario.perfis.length>0 ? state.usuario.perfis[0].slug : '')==='cliente'
      for (let index in state.chats)
        for (let item of state.chats[index].mensagens)
          if (!item.lida && ((isCliente && item.usuario_id!==state.usuario.id) || (!isCliente && item.usuario_id===state.chats[index].cliente.usuario_id)))
            t++
    }
    catch(e) {}
    return t
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