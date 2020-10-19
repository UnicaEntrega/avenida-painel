<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="indexBool" key="list">
				<q-table :data="usuariosFilter" :columns="usuarioColumns" align="left">
					<template v-slot:top>
						<div class="col-9 text-h5 text-primary">Usuarios</div>
						<div class="col-3">
							<q-input v-model="search" placeholder="Pesquisar">
								<q-icon slot="append" name="search" color="primary"></q-icon>
							</q-input>
						</div>
					</template>
					<template v-slot:body-cell-actions="props">
						<q-td>
							<q-btn icon="edit" color="primary" flat dense @click="editarUsuario(props.row.id)">
								<q-tooltip>Editar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="visibility" color="primary" flat dense @click="showUsuario(props.row.id)">
								<q-tooltip>Mostrar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="delete" color="negative" flat dense @click="removerUsuario(props.row.id)">
								<q-tooltip>Excluir {{props.row.nome}}</q-tooltip>
							</q-btn>
						</q-td>
					</template>
					<template v-slot:body-cell-ativo="props">
						<q-td>
							<q-checkbox v-model="props.row.ativo" readonly></q-checkbox>
						</q-td>
					</template>
				</q-table>
				<q-page-sticky position="bottom-right" :offset="[18, 18]">
					<q-btn icon="add" color="primary" fab @click="adicionarUsuario">
						<q-tooltip>Adicionar Usuario</q-tooltip>
					</q-btn>
				</q-page-sticky>
			</div>
			<router-view v-else key="router-view"></router-view>
		</transition>
	</q-page>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	data: () => ({
		// editBool: false,
		search: "",
		usuarioColumns: [
			{ name: "actions", label: "Ações", field: "actions", align: "left" },
			{ name: "nome", label: "Nome", field: "nome", align: "left" },
			{ name: "email", label: "E-mail", field: "email", align: "left" },
			{ name: "ativo", label: "Ativo", field: "ativo", align: "left" },
		]
	}),
	computed: {
		...mapGetters({
			usuarios: "usuarios"
		}),
		usuariosFilter() {
			return this.usuarios.filter(val => {
				return val.nome.includes(this.search) || val.email.includes(this.search)
			})
		},
		indexBool() {
			return this.$route.path == "/cadastroUsuarios"
		}
	},
	methods: {
		adicionarUsuario() {
			// this.editBool = true;
			this.$router.push("cadastroUsuarios/edit")
		},
		editarUsuario(id) {
			this.$router.push("cadastroUsuarios/edit/"+id);
		},
		removerUsuario(id) {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerUsuario", id);
				this.$q.notify({
					message: "Usuario removido com sucesso",
					type: "positive"
				})
			})
		},
		showUsuario(id) {
			this.$router.push("cadastroUsuarios/show/"+id)
		}
	}
}
</script>

<style>

</style>