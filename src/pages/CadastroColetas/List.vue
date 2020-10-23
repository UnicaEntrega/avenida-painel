<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="indexBool" key="list">
				<q-table :data="coletasFilter" :columns="coletaColumns" align="left">
					<template v-slot:top>
						<div class="col-9 text-h5 text-primary">Coletas</div>
						<div class="col-3">
							<q-input v-model="search" placeholder="Pesquisar">
								<q-icon slot="append" name="search" color="primary"></q-icon>
							</q-input>
						</div>
					</template>

					<template v-slot:body-cell-actions="props">
						<q-td>
							<q-btn icon="edit" color="primary" flat dense @click="editarColeta(props.row.id)">
								<q-tooltip>Editar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="visibility" color="primary" flat dense @click="showColeta(props.row.id)">
								<q-tooltip>Mostrar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="delete" color="negative" flat dense @click="removerColeta(props.row.id)">
								<q-tooltip>Excluir {{props.row.nome}}</q-tooltip>
							</q-btn>
						</q-td>
					</template>

					<template v-slot:body-cell-cliente="props">
						<q-td>
							{{props.row.cliente.nome}}
						</q-td>
					</template>

					<template v-slot:body-cell-motoboy="props">
						<q-td>
							{{props.row.motoboy.nome}}
						</q-td>
					</template>
				</q-table>
				<q-page-sticky position="bottom-right" :offset="[18, 18]">
					<q-btn icon="add" color="primary" fab @click="adicionarColeta">
						<q-tooltip>Adicionar Coleta</q-tooltip>
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
		coletaColumns: [
			{ name: "actions", label: "Ações", field: "actions", align: "left" },
			{ name: "id", label: "ID", field: "id", align: "left" },
			{ name: "status", label: "Status", field: "status", align: "left" },
			{ name: "cliente", label: "Cliente", field: "cliente", align: "left" },
			{ name: "motoboy", label: "Motoboy", field: "motoboy", align: "left" },
		]
	}),
	computed: {
		...mapGetters({
			coletas: "coletas"
		}),
		coletasFilter() {
			return this.coletas.filter(val => {
				return val.id.includes(this.search) || val.cliente.nome.includes(this.search) || val.motoboy.nome.includes(this.search)
			})
		},
		indexBool() {
			return this.$route.path == "/cadastroColetas"
		}
	},
	methods: {
		adicionarColeta() {
			// this.editBool = true;
			this.$router.push("cadastroColetas/edit")
		},
		editarColeta(id) {
			this.$router.push("cadastroColetas/edit/"+id);
		},
		removerColeta(id) {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerColeta", id);
				this.$q.notify({
					message: "Coleta removido com sucesso",
					type: "positive"
				})
			})
		},
		showColeta(id) {
			this.$router.push("cadastroColetas/show/"+id)
		}
	}
}
</script>

<style>

</style>