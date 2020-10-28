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
						<q-item-label class="text-primary">Olá, Nome do Administrador</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn label="sair" icon="exit_to_app" color="primary" flat no-caps stack @click="efetuarLogout"></q-btn>
					</q-item-section>
				</q-item>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2" elevated>
			<q-list separator>
				<div v-for="categoria in categorias" :key="categoria.name">
					<q-expansion-item v-if="categoria.name" icon="edit" expand-separator :label="categoria.name" header-class="text-body1 text-primary">
						<q-list separator class="q-pl-sm">
							<q-item v-for="item in categoria.links" :key="item.title" clickable @click="item.click">
								<q-item-section side>
									<q-icon :name="item.icon" color="primary"></q-icon>
								</q-item-section>
								<q-item-section>
									{{item.title}}
								</q-item-section>
							</q-item>
						</q-list>
					</q-expansion-item>
					<q-item v-else clickable @click="categoria.click">
						<q-item-section side>
							<q-icon :name="categoria.icon" color="primary"></q-icon>
						</q-item-section>
						<q-item-section>
							{{categoria.title}}
						</q-item-section>
					</q-item>
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
			leftDrawerOpen: true,
			categorias: [
				{
					name: "Cadastros",
					links: [
						{
							icon: "emoji_people",
							title: "Clientes",
							click: () => { this.$router.push('/cadastroClientes') }
						},
						{
							icon: "person",
							title: "Usuarios",
							click: () => { this.$router.push('/cadastroUsuarios') }
						},
						{
							icon: "card_travel",
							title: "Coletas",
							click: () => { this.$router.push('/cadastroColetas') }
						},
						{
							icon: "moped",
							title: "Motoboys",
							click: () => { this.$router.push('/motoboys') }
						},
					]
				},
			]
		}
	},
	created() {
		if (this.isBlank(this.getLogin.token)) this.$router.push('/login');
	}
}
</script>
