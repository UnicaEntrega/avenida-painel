<template>
	<q-layout view="hHh Lpr lFf">
		<q-header elevated class="bg-white">
			<q-toolbar>
				<q-img src="images/avenida_web_simbolo.png" style="width: 50px"></q-img>
				<q-space></q-space>
				<q-item>
					<q-item-section class="text-right">
						<q-item-label class="text-primary">Olá, Nome do Administrador</q-item-label>
						<q-item-label caption class="text-grey-9">acessar painel</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn label="sair" icon="exit_to_app" color="primary" flat no-caps stack @click="logout"></q-btn>
					</q-item-section>
				</q-item>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2" elevated>
			<q-list separator>
				<q-item v-for="item in links" :key="item.title" clickable @click="item.click">
					<q-item-section side>
						<q-icon :name="item.icon" color="primary"></q-icon>
					</q-item-section>
					<q-item-section>
						{{item.title}}
					</q-item-section>
				</q-item>
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
			leftDrawerOpen: true,
			links: [
				{
					icon: "emoji_people",
					title: "Cadastros de Clientes",
					click: () => { this.$router.push('/cadastroClientes') }
				},
				{
					icon: "person",
					title: "Cadastros de Usuarios",
					click: () => { this.$router.push('/cadastroUsuarios') }
				},
				{
					icon: "moped",
					title: "Cadastros de Motoboys",
					click: () => { this.$router.push('/motoboys') }
				},
			]
		}
	},
	computed: {
		...mapGetters({
			loginBool: "loginBool"
		})
	},
	methods: {
		logout() {
			this.$store.dispatch("logout");
			this.$router.push("/login");
		}
	},
	created() {
		if(!this.loginBool) this.$router.push('/login');
	}
}
</script>
