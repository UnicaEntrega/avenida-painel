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
						<q-item-label class="text-primary">Olá, {{getUsuario.nome}}</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn label="sair" icon="exit_to_app" color="primary" flat no-caps stack @click="efetuarLogout"></q-btn>
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
										{{item.title}}
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
								{{categoria.title}}
							</q-item-section>
						</q-item>
					</router-link>
					<q-separator></q-separator>
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
import { mapGetters } from "vuex"

export default {
	name: 'MainLayout',
	data () {
		return {
			usuario: {
				tipo: "Admin"
			},
			leftDrawerOpen: true,
			categorias: [
				{
					icon: "emoji_people",
					title: "Clientes",
					path: "/cadastroClientes",
					tipo: "Admin",
				},
				{
					icon: "person",
					title: "Usuarios",
					path: "/cadastroUsuarios",
					tipo: "Admin",
				},
				{
					icon: "topic",
					title: "Coletas",
					path: "/cadastroColetas",
					tipo: "Admin",
				},
				{
					icon: "img:images/avenida_web_motoboysOnline.png",
					title: "Motoboys",
					path: "/motoboys",
					tipo: "Admin",
				},
				{
					icon: "img:images/avenida_web_chat.png",
					title: "Chat",
					path: '/chat',
					tipo: "Ambos",
				},
				{
					icon: "person",
					title: "Meus Dados",
					path: '/',
					tipo: "Cliente",
				},
				{
					icon: "topic",
					title: "Minhas Coletas",
					path: '/',
					tipo: "Cliente",
				},
				{
					icon: "create_new_folder",
					title: "Nova Coleta",
					path: '/',
					tipo: "Cliente",
				},
				{
					icon: "img:images/avenida_web_motoboysOnline.png",
					name: "Coletas em Andamento",
					tipo: "Cliente",
					links: [
						{
							icon: "img:images/avenida_web_motoboysOnline.png",
							title: "3165 - 10/12/2020",
							path: '/coleta',
							tipo: "Cliente",
						},
						{
							icon: "img:images/avenida_web_motoboysOnline.png",
							title: "2125 - 10/12/2020",
							path: '/coleta',
							tipo: "Cliente",
						},
						{
							icon: "img:images/avenida_web_motoboysOnline.png",
							title: "7076 - 10/12/2020",
							path: '/coleta',
							tipo: "Cliente",
						},
					]
				},
			]
		}
	},
	methods: {
		mostrarItemMenu(categoria) {
			return (this.usuario.tipo == categoria.tipo) || categoria.tipo == "Ambos"
		}
	},
	created() {
		if (this.isBlank(this.getLogin.token)) this.$router.push('/login');
	}
}
</script>
