<template>
	<q-layout view="hHh Lpr lFf">
		<q-header elevated class="bg-white">
			<q-toolbar>
				<router-link to="/">
					<q-img src="images/avenida_web_simbolo.png" style="width: 50px"></q-img>
				</router-link>
				<q-space></q-space>
				<q-item>
					<q-item-section class="text-right">
						<q-item-label class="text-primary">Olá, {{ getUsuario.nome }}</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn label="sair" icon="exit_to_app" color="primary" flat no-caps stack @click="efetuarLogout()" v-if="$q.platform.is.desktop" />
						<q-btn label="menu" icon="list" color="primary" flat no-caps stack @click="leftDrawerOpen = true" v-else />
					</q-item-section>
				</q-item>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2" elevated>
			<q-list>
				<div v-for="categoria in categorias" :key="categoria.name" v-show="mostrarItemMenu(categoria)">
					<q-expansion-item v-if="categoria.name" :icon="categoria.icon" expand-separator :label="categoria.name" header-class="text-body1 text-primary">
						<q-list separator class="q-pl-sm">
							<router-link :to="item.path" v-for="item in categoria.links" :key="item.title" v-show="mostrarItemMenu(item)">
								<q-item class="text-body1 text-primary" clickable>
									<q-item-section side>
										<q-icon :name="item.icon" color="primary" size="20px"></q-icon>
									</q-item-section>
									<q-item-section>
										{{ item.title }}
									</q-item-section>
								</q-item>
							</router-link>
						</q-list>
					</q-expansion-item>
					<router-link :to="categoria.path" v-else>
						<q-item class="text-body1 text-primary" clickable>
							<q-item-section avatar>
								<q-icon :name="categoria.icon" color="primary"></q-icon>
							</q-item-section>
							<q-item-section>
								{{ categoria.title }}
							</q-item-section>
							<q-item-section v-if="categoria.path == '/chat'" side>
								<q-chip color="negative" text-color="white" v-if="getTotalNaoLidas > 0">{{ getTotalNaoLidas }}</q-chip>
							</q-item-section>
							<q-item-section v-if="categoria.path == '/cadastroColetas'" side>
								<q-chip color="negative" text-color="white" v-if="contadorColeta > 0">{{ contadorColeta }}</q-chip>
							</q-item-section>
						</q-item>
					</router-link>
					<q-separator />
				</div>
			</q-list>
		</q-drawer>

		<q-page-container>
			<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<router-view key="router-main" />
			</transition>
		</q-page-container>
	</q-layout>
</template>
<script>
import Ws from '@adonisjs/websocket-client/index'
export default {
	name: 'MainLayout',
	data() {
		return {
			leftDrawerOpen: true,
			categorias: [
				{
					icon: 'emoji_people',
					title: 'Clientes',
					path: '/cadastroClientes',
					tipo: 'admin'
				},
				{
					icon: 'person',
					title: 'Usuarios',
					path: '/cadastroUsuarios',
					tipo: 'admin'
				},
				{
					icon: 'topic',
					title: 'Coletas',
					path: '/cadastroColetas',
					tipo: 'admin'
				},
				{
					icon: 'two_wheeler',
					title: 'Veículos',
					path: '/cadastroVeiculos',
					tipo: 'admin'
				},
				/*{
					icon: 'table_chart',
					title: 'Tabela de Valores',
					path: '/cadastroTabelaValores',
					tipo: 'admin'
				},*/
				{
					icon: 'img:images/avenida_web_motoboysOnline.png',
					title: 'Motoboys',
					path: '/cadastroMotoboys',
					tipo: 'admin'
				},
				{
					icon: 'img:images/avenida_web_chat.png',
					title: 'Chat',
					path: '/chat',
					tipo: 'Ambos'
				},
				{
					icon: 'emoji_people',
					title: 'Relatórios',
					path: '/relatorios',
					tipo: 'admin'
				},
				{
					icon: 'emoji_people',
					title: 'Configurações',
					path: '/configuracoes',
					tipo: 'admin'
				},
				{
					icon: 'person',
					title: 'Meus Dados',
					path: '/meusDados',
					tipo: 'cliente'
				},
				{
					icon: 'topic',
					title: 'Minhas Coletas',
					path: '/minhasColetas',
					tipo: 'cliente'
				},
				{
					icon: 'create_new_folder',
					title: 'Nova Coleta',
					path: '/cadastroColetas/edit',
					tipo: 'cliente'
				}
			],
			contadorColeta: 0
		}
	},
	methods: {
		mostrarItemMenu(categoria) {
			return this.usuarioPerfil == categoria.tipo || categoria.tipo == 'Ambos'
		},
		async carregarColetas() {
			let categorias = JSON.parse(JSON.stringify(this.categorias))
			for (let index in categorias) {
				if (categorias[index].name === 'Coletas em Andamento') {
					categorias.splice(index, 1)
					break
				}
			}
			var response = await this.executeMethod({ url: 'api/Coletas/minhas', method: 'get' })
			if (response.status === 200 && response.data.length > 0) {
				let coletas = {
					icon: 'img:images/avenida_web_motoboysOnline.png',
					name: 'Coletas em Andamento',
					tipo: 'cliente',
					links: []
				}
				for (let item of response.data) {
					coletas.links.push({
						icon: 'img:images/avenida_web_motoboysOnline.png',
						title: `${item.id} - ${this.formatarDataHora(item.created_at, 'DD/MM/YYYY')}`,
						path: `/coleta/${item.id}`,
						tipo: 'cliente'
					})
				}
				categorias.push(coletas)
			}
			this.categorias = categorias
		},
		async carregarMotoboys() {
			let categorias = JSON.parse(JSON.stringify(this.categorias))
			for (let index in categorias) {
				if (categorias[index].name === 'Motoboys Online') {
					categorias.splice(index, 1)
					break
				}
			}
			if (this.getMotoboysOnline.length > 0) {
				let motoboys = {
					icon: 'img:images/avenida_web_motoboysOnline.png',
					name: 'Motoboys Online',
					tipo: 'admin',
					links: []
				}
				if (this.getMotoboysOnline.length > 2)
					motoboys.links.push({
						icon: 'img:images/avenida_web_motoboysOnline.png',
						title: 'Todos',
						path: '/',
						tipo: 'admin'
					})
				for (let item of this.getMotoboysOnline) {
					motoboys.links.push({
						icon: 'img:images/avenida_web_motoboysOnline.png',
						title: `${item.nome} - ${item.veiculo ? item.veiculo.placa : ''}`,
						path: `/motoboy/${item.id}`,
						tipo: 'admin'
					})
				}
				categorias.push(motoboys)
			}
			this.categorias = categorias
		}
	},
	async created() {
		if (this.isBlank(this.getLogin.token)) this.$router.push('/login')
		else {
			if (this.usuarioPerfil === 'cliente') {
				this.carregarColetas()
			} else {
				var response = await this.executeMethod({ url: 'api/Motoboys/lista', method: 'get' })
				if (response.status === 200) this.$store.commit('setDados', { key: 'motoboysOnline', value: response.data })
				this.carregarMotoboys()
				response = await this.executeMethod({ url: 'api/Coletas/abertas', method: 'post' })
				if (response.status === 200) this.contadorColeta = parseInt(response.data)
			}
			await this.carregarChats()
			this.$root.chat_connect = false
			this.$root.chat_ws = Ws(`${process.env.API_URL}`.replace('http', 'ws'))
				.withJwtToken(this.getLogin.token)
				.connect()
			this.$root.chat_ws.on('open', () => {
				this.$root.chat = this.$root.chat_ws.subscribe(`chat:${this.usuarioPerfil === 'cliente' ? 'usuario:' + this.getUsuario.id : 'admin'}`)
				this.$root.chat.on('ready', () => {
					this.$root.chat_connect = true
				})
				this.$root.chat.on('message', m => {
					this.$store.commit('mensagemChat', m)
					this.$root.$emit('atualizarScroll', m)
					if (m.mensagem.usuario_id !== this.getUsuario.id) this.emitirSomChat()
				})
				this.$root.chat.on('atualizarLista', () => {
					this.carregarChats()
				})
				if (this.usuarioPerfil === 'cliente') {
					this.$root.chat.on('atualizarClienteColetas', coleta_id => {
						this.carregarColetas()
						if (this.$route.path.indexOf('coleta') > -1 && this.$route.params.id == coleta_id) this.$root.$emit('atualizarColetas')
						if (this.$route.path.indexOf('minhasColetas') > -1 || (this.$route.path.indexOf('cadastroColetas/show') > -1 && this.$route.params.id == coleta_id)) this.$root.$emit('atualizarColetas')
					})
				} else {
					this.$root.chat.on('atualizarMotoboysOnline', m => {
						this.$store.commit('setDados', { key: 'motoboysOnline', value: m })
						this.carregarMotoboys()
					})
					this.$root.chat.on('atualizarMotoboysPosicao', m => {
						let mb = JSON.parse(JSON.stringify(this.getMotoboysOnline))
						for (let index in mb) {
							if (mb[index].id === m.id) {
								mb[index] = m
								this.$store.commit('setDados', { key: 'motoboysOnline', value: mb })
								this.$root.$emit('atualizarIndex')
								break
							}
						}
					})
					this.$root.chat.on('atualizarContadorColeta', c => {
						this.contadorColeta = c
						if (this.$route.path.indexOf('cadastroColetas') > -1 && this.$route.path.indexOf('edit') === -1) this.$root.$emit('atualizarColetas')
					})
				}
			})
			this.$root.chat_ws.on('close', () => {
				this.$root.chat_connect = false
			})
			if (!this.$q.platform.is.desktop)
				this.categorias.push({
					icon: 'exit_to_app',
					title: 'Sair',
					path: '/?logoff=1',
					tipo: 'Ambos'
				})
		}
	},
	watch: {
		$route: function(a) {
			if (a.query.logoff !== undefined) this.efetuarLogout()
		}
	}
}
</script>
