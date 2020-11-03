<template>
	<q-page style="height: 80vh">
		<div class="grid-chat">
			<div class="lista-conversas shadow-3">
				<q-scroll-area class="full-height">
					<q-list separator>
						<q-item v-for="n in 50" :key="'conversa'+n" clickable>
							<q-item-section>
								<q-item-label>
									Conversa {{n}}
								</q-item-label>
								<q-item-label caption>
									Resumo da mensagem
								</q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-icon name="keyboard_arrow_right" color="primary"></q-icon>
							</q-item-section>
						</q-item>
					</q-list>
				</q-scroll-area>
			</div>
			<div class="q-pa-md">
				<q-scroll-area class="full-height">
					<div v-for="n in 50" :key="'test'+n">
						<mensagem-recebida></mensagem-recebida>
						<mensagem-enviada></mensagem-enviada>
					</div>
					<div ref="input" style="height: 48px"></div>
				</q-scroll-area>
			</div>
		</div>
				
		<q-page-sticky position="bottom" :offset="[10, 18]" expand>
			<div class="q-px-lg full-width grid-input">
				<div></div>
				<q-input class="round-input" v-model="chatbox" placeholder="Inserir mensagem" bg-color="grey-2" rounded borderless dense>
					<q-btn class="shadow-2" slot="after" icon="send" dense round color="primary" @click="responderPergunta"></q-btn>
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
	data: () => ({
		chatbox: "",
		fabBool: false,
	}),
	methods: {
		fabScroll(info) {
			this.fabBool = info.position + screen.height < this.$refs.input.offsetTop;
		},
		scrollDown() {
			let target = scroll.getScrollTarget(this.$refs.input);
			let offset = this.$refs.input.offsetTop;
			let duration = 500;
			scroll.setScrollPosition(target, offset, duration);
		}
	},
	mounted() {
		this.scrollDown();
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