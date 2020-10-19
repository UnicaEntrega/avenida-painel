<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="indexBool" key="list">
				<q-table :data="clientesFilter" :columns="clienteColumns" align="left">
					<template v-slot:top>
						<div class="col-9 text-h5 text-primary">Clientes</div>
						<div class="col-3">
							<q-input v-model="search" placeholder="Pesquisar">
								<q-icon slot="append" name="search" color="primary"></q-icon>
							</q-input>
						</div>
					</template>
					<template v-slot:body-cell-actions="props">
						<q-td>
							<q-btn icon="edit" color="primary" flat dense @click="editarCliente(props.row.id)">
								<q-tooltip>Editar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="visibility" color="primary" flat dense @click="showCliente(props.row.id)">
								<q-tooltip>Mostrar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="delete" color="negative" flat dense @click="removerCliente(props.row.id)">
								<q-tooltip>Excluir {{props.row.nome}}</q-tooltip>
							</q-btn>
						</q-td>
					</template>
				</q-table>
				<q-page-sticky position="bottom-right" :offset="[18, 18]">
					<q-btn icon="add" color="primary" fab @click="adicionarCliente">
						<q-tooltip>Adicionar Cliente</q-tooltip>
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
		clienteColumns: [
			{ name: "actions", label: "Ações", field: "actions", align: "left" },
			{ name: "nome", label: "Nome", field: "nome", align: "left" },
			{ name: "cpf", label: "CPF", field: "cpf", align: "left" },
			{ name: "telefone", label: "Telefone", field: "telefone", align: "left" },
			{ name: "email", label: "E-mail", field: "email", align: "left" },
		]
	}),
	computed: {
		...mapGetters({
			clientes: "clientes"
		}),
		clientesFilter() {
			return this.clientes.filter(val => {
				return val.nome.includes(this.search) || val.cpf.includes(this.search) || val.telefone.includes(this.search) || val.email.includes(this.search)
			})
		},
		indexBool() {
			return this.$route.path == "/cadastroClientes"
		}
	},
	methods: {
		adicionarCliente() {
			// this.editBool = true;
			this.$router.push("cadastroClientes/edit")
		},
		editarCliente(id) {
			this.$router.push("cadastroClientes/edit/"+id);
		},
		removerCliente(id) {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerCliente", id);
				this.$q.notify({
					message: "Cliente removido com sucesso",
					type: "positive"
				})
			})
		},
		showCliente(id) {
			this.$router.push("cadastroClientes/show/"+id)
		}
	}
}
</script>

<style>

</style>