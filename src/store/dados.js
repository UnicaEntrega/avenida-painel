const state = {
  login: {},
  usuario: {},
  chats: {},
  motoboysOnline: []
}

const mutations = {
  /** REMOVER STATE */
  removerStore: (state) => {
    state.login = {}
    state.usuario = {}
    state.chats = {}
    state.motoboysOnline = []
  },
  /** SETAR DADOS NO STATE {key:'',value:''}*/
  setDados: (state, obj) => {
    if (obj && obj.key) state[obj.key] = obj.value
  },
  abrirChat: (state,obj) => {
    state.chats['coleta'+obj.coleta_id] = obj
  },
  lidaChat: (state,obj) => {
    if (obj.coleta_id) {
      let chat = state.chats['coleta'+obj.coleta_id]
      if (chat) {
        for (let item of chat.mensagens)
          if ((obj.isCliente && item.usuario_id!==obj.usuario_id) || (!obj.isCliente && item.usuario_id!==obj.cliente_id))
            item.lida = true
        chat.naoLida = 0
      }
    }
    else {
      let chat = state.chats['motoboy'+obj.motoboy_id]
      if (chat) {
        for (let item of chat.mensagens)
          if (item.usuario_id!==obj.usuario_id)
            item.lida = true
        chat.naoLida = 0
      }
    }
    state.chats = JSON.parse(JSON.stringify(state.chats))
  },
  mensagemChat: (state, obj) => {
    if (!obj.error) {
      if (obj.coleta_id) {
        if (!state.chats['coleta'+obj.coleta_id]) state.chats['coleta'+obj.coleta_id] = {coleta_id:obj.coleta_id,cliente_id:obj.cliente_id,cliente:obj.cliente,mensagens:[],naoLida:0,finalizado:false}
        let chat = state.chats['coleta'+obj.coleta_id]
        chat.id = obj.id
        chat.finalizado = obj.finalizado
        chat.mensagens.push(obj.mensagem)
        let isCliente = (state.usuario.perfis && state.usuario.perfis.length>0 ? state.usuario.perfis[0].slug : '')==='cliente'
        if ((isCliente && obj.mensagem.usuario_id!==state.usuario.id) || (!isCliente && obj.mensagem.usuario_id===chat.cliente.usuario_id))
          chat.naoLida = parseInt(chat.naoLida)+1
      }
      else {
        if (!state.chats['motoboy'+obj.motoboy_id]) state.chats['motoboy'+obj.motoboy_id] = {motoboy_id:obj.motoboy_id,nome:obj.nome,mensagens:[],naoLida:0,finalizado:false}
        let chat = state.chats['motoboy'+obj.motoboy_id]
        chat.id = obj.id
        chat.finalizado = obj.finalizado
        chat.mensagens.push(obj.mensagem)
        if (obj.mensagem.usuario_id!==state.usuario.id)
          chat.naoLida = parseInt(chat.naoLida)+1
      }
    }
    else {
      if (obj.coleta_id) {
        let chat = state.chats['coleta'+obj.coleta_id]
        if (chat) chat.finalizado = true
      }
    }
    state.chats = JSON.parse(JSON.stringify(state.chats))
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
      for (let index in state.chats)
        t += parseInt(state.chats[index].naoLida)
    }
    catch(e) {}
    return t
  },
  getMotoboysOnline: (state) => {
    return state.motoboysOnline
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