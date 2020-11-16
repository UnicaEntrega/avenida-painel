<template>
	<q-page style="height: 80vh">
		<div class="grid-chat">
			<div class="lista-conversas shadow-3">
				<q-scroll-area class="full-height">
					<q-list separator>
						<q-item v-for="(item,index) in conversas" :key="index" clickable>
							<q-item-section @click="abrirMensagem(item)">
								<q-item-label>
									Conversa {{index++}}
								</q-item-label>
								<q-item-label caption>
									Resumo da mensagem
								</q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-chip v-if="index % 2 == 0" color="negative" text-color="white">22</q-chip>
							</q-item-section>
						</q-item>
					</q-list>
				</q-scroll-area>
			</div>
			<div class="q-pa-md">
				<q-scroll-area class="full-height">
					<div v-for="(item,index) in conversa.mensagens" :key="index">
						<mensagem-enviada :item="item" v-if="item.usuario_id===getUsuario.id"/>
						<mensagem-recebida :item="item" v-else/>
					</div>
					<div ref="input" style="height: 48px"></div>
				</q-scroll-area>
			</div>
		</div>
				
		<q-page-sticky position="bottom" :offset="[10, 18]" expand>
			<div class="q-px-lg full-width grid-input">
				<div></div>
				<q-input class="round-input" v-model="mensagem" placeholder="Inserir mensagem" bg-color="grey-2" rounded borderless dense v-on:keyup.enter="enviarMensagem()">
					<q-btn class="shadow-2" slot="after" icon="send" dense round color="primary" @click="enviarMensagem()"></q-btn>
				</q-input>
			</div>
		</q-page-sticky>

		<q-page-sticky position="top-right" :offset="[30, 18]" expand>
			<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
				<q-btn v-if="fabBool" icon="keyboard_arrow_down" color="primary" fab-mini @click="scrollDown"></q-btn>
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
			conversas: [],
			conversa: {mensagens:[]},
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
		async abrirMensagem(item) {
			/*var response = await this.executeMethod({url:`api/Conversas/mensagens/${item.id}`,method:'get',data:{}})
			if (response.status===200) console.log(response.data)*/
			this.conversa = item
		},
		async enviarMensagem() {
			let d = {
				coleta_id: this.conversa.coleta_id,
				usuario_id: this.getUsuario.id,
				mensagem: this.mensagem
			}
			var response = await this.executeMethod({url:'api/Conversas',method:'post',data:d})
			if (response.status===200) this.conversa.mensagens.push(response.data)
			this.mensagem = ""
		},
		async buscar() {
			let c = null
			var response = await this.executeMethod({url:'api/Conversas',method:'get'})
			if (response.status===200) {
				for (let item of response.data) {
					if (item.coleta_id.toString()===(this.$route.params.id || '')) c = item
					this.conversas.push(item)
				}
			}
			if (this.$route.params.id) {
				if (!c) {
					c = {coleta_id:this.$route.params.id,mensagens:[]}
					this.conversas.unshift(c)
				}
				this.abrirMensagem(c)
			}
		}
	},
	mounted() {
		this.scrollDown();
	},
	created() {
		this.buscar()
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