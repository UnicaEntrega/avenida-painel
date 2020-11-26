<template>
	<q-page style="height: 80vh">
		<div class="grid-chat">
			<div class="lista-conversas shadow-3">
				<q-scroll-area class="full-height">
					<q-list separator>
						<q-item v-for="(item,index) in getChats" :key="index" clickable>
							<q-item-section @click="abrirMensagem(item)">
								<q-item-label>
									{{item.coleta_id ? 'Coleta '+item.coleta_id : 'Motoboy '+(item.motoboy ? item.motoboy.nome : item.nome)}}
								</q-item-label>
								<q-item-label caption>
									Resumo da mensagem
								</q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-chip v-if="item.naoLida>0" color="negative" text-color="white">{{item.naoLida}}</q-chip>
							</q-item-section>
						</q-item>
					</q-list>
				</q-scroll-area>
			</div>
			<div class="q-pa-md">
				<q-scroll-area class="full-height">
					<div v-for="(item,index) in (getChats[conversa.coleta_id ? 'coleta'+conversa.coleta_id : 'motoboy'+conversa.motoboy_id] || {}).mensagens" :key="index">
						<mensagem-enviada :item="item" v-if="item.usuario_id===getUsuario.id"/>
						<mensagem-recebida :item="item" v-else/>
					</div>
					<div v-if="!conversa.coleta_id && !conversa.motoboy_id" class="text-center">Não foi selecionada nenhuma conversa.</div>
					<div ref="input" style="height:48px;"></div>
				</q-scroll-area>
			</div>
		</div>
				
		<q-page-sticky position="bottom" :offset="[10, 18]" expand v-if="conversa.coleta_id || conversa.motoboy_id">
			<div class="q-px-lg full-width grid-input">
				<div></div>
				<q-input ref="mensagem" class="round-input" v-model="mensagem" placeholder="Inserir mensagem" bg-color="grey-2" rounded borderless dense v-on:keyup.enter="enviarMensagem()">
					<q-btn class="shadow-2" slot="after" icon="send" dense round color="primary" @click="enviarMensagem()"></q-btn>
				</q-input>
			</div>
		</q-page-sticky>

		<q-page-sticky position="top-right" :offset="[30, 18]" expand>
			<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
				<q-btn v-if="fabBool" icon="keyboard_arrow_down" color="primary" fab-mini @click="scrollDown"></q-btn>
			</transition>
		</q-page-sticky>

		<q-page-sticky position="top" :offset="[30, 18]" expand>
			<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
				<q-btn v-if="usuarioPerfil!=='cliente' && conversa.problema===true && conversa.resolvido===false" icon="check" color="primary" label="Resolvido" @click="enviarResolvido"></q-btn>
			</transition>
		</q-page-sticky>
		<q-scroll-observer @scroll="fabScroll"></q-scroll-observer>
	</q-page>
</template>
<script>
import MensagemRecebida from "../components/Chat/MensagemRecebida.vue"
import MensagemEnviada from "../components/Chat/MensagemEnviada.vue"
import { scroll } from 'quasar'
export default {
	components: {
		MensagemRecebida, MensagemEnviada
	},
	data() {
		return {
			mensagem: "",
			conversa: {},
			fabBool: false
		}
	},
	methods: {
		fabScroll(info) {
			this.fabBool = info.position + screen.height < this.$refs.input.offsetTop;
		},
		scrollDown() {
			let target = scroll.getScrollTarget(this.$refs.input);
			let offset = this.$refs.input.offsetTop;
			let duration = 500;
			scroll.setScrollPosition(target, offset, duration);
		},
		enviarResolvido() {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja marcar como resolvido?',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
        var response = await this.executeMethod({url:`api/Conversas/resolvido/${this.conversa.id}`,method:'post'})
				if (response.status===200) {
					this.$store.commit('removerChat',this.conversa.coleta_id)
					this.conversa = {}
				}
			})
		},
		abrirMensagem(item) {
			this.conversa = item
			this.marcarLida()
			setTimeout(()=>{
				if (this.$refs.mensagem) this.$refs.mensagem.focus()
				this.scrollDown()
			},200)
		},
		async enviarMensagem() {
			if (this.$root.chat_connect) {
				this.$root.chat.emit('message',{
					coleta_id: this.conversa.coleta_id,
					motoboy_id: this.conversa.motoboy_id,
					mensagem: this.mensagem
				})
				this.mensagem = ""
			}
		},
		async marcarLida() {
			if (this.conversa.id) await this.executeMethod({url:`api/Conversas/lida/${this.conversa.id}`,method:'get'})
			if (this.conversa.coleta_id) this.$store.commit('lidaChat',{coleta_id:this.conversa.coleta_id,usuario_id:this.getUsuario.id,cliente_id:this.conversa.cliente_id,isCliente:this.usuarioPerfil==='admin'})
			else this.$store.commit('lidaChat',{usuario_id:this.getUsuario.id,motoboy_id:this.conversa.motoboy_id,isCliente:this.usuarioPerfil==='admin'})
		},
		atualizarScroll(item) {
			if (item.coleta_id.toString()===this.conversa.coleta_id.toString()) this.conversa.id = item.id
			if (this.conversa.id===item.id) {
				this.scrollDown()
				this.marcarLida()
			}
		},
		async carregarTelaChat() {
			if (this.$route.params.id) {
				let c = this.getChats['coleta'+this.$route.params.id]
				if (!c) {
					await this.$store.commit('abrirChat',{coleta_id:this.$route.params.id,naoLida:0,mensagens:[]})
					c = this.getChats['coleta'+this.$route.params.id]
				}
				if (c) this.abrirMensagem(c)
			}
		}
	},
	created() {
		this.carregarTelaChat()
		this.$root.$on('atualizarScroll',this.atualizarScroll)
		this.$root.$on('carregarTelaChat',this.carregarTelaChat)
	},
	destroyed() {
		this.$root.$off('atualizarScroll',this.atualizarScroll)
		this.$root.$off('carregarTelaChat',this.carregarTelaChat)
	}
}
</script>

<style lang="sass">
.grid-chat
	display: grid
	grid-template-columns: 1fr 4fr
	height: 100%

.lista-conversas
	background: $grey-3

.grid-input
	display: grid
	grid-template-columns: 1fr 4fr

.round-input > .q-field__inner > .q-field__control > .q-field__control-container
	padding: 0 14px
.round-input > .q-field__inner > .q-field__control
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)
	border-radius: 24px !important

</style>