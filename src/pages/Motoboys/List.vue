<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="isIndexRoute" key="list">
				<q-table :data="motoboysFilter" :columns="motoboyColumns" align="left">
					<template v-slot:top>
						<div class="col-9 text-h5 text-primary">Motoboys</div>
						<div class="col-3">
							<q-input v-model="search" placeholder="Pesquisar">
								<q-icon slot="append" name="search" color="primary"></q-icon>
							</q-input>
						</div>
					</template>
					<template v-slot:body-cell-actions="props">
						<q-td>
							<q-btn icon="edit" color="primary" flat dense @click="editarMotoboy(props.row.id)">
								<q-tooltip>Editar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="visibility" color="primary" flat dense @click="showMotoboy(props.row.id)">
								<q-tooltip>Mostrar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="delete" color="negative" flat dense @click="removerMotoboy(props.row.id)">
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
					<q-btn icon="add" color="primary" fab @click="adicionarMotoboy">
						<q-tooltip>Adicionar Motoboy</q-tooltip>
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
		motoboyColumns: [
			{ name: "actions", label: "Ações", field: "actions", align: "left" },
			{ name: "nome", label: "Nome", field: "nome", align: "left" },
			{ name: "email", label: "E-mail", field: "email", align: "left" },
		]
	}),
	computed: {
		...mapGetters({
			motoboys: "motoboys"
		}),
		motoboysFilter() {
			return this.motoboys.filter(val => {
				return val.nome.includes(this.search) || val.email.includes(this.search)
			})
		},
		isIndexRoute() {
			return this.$route.path == "/motoboys"
		}
	},
	methods: {
		adicionarMotoboy() {
			// this.editBool = true;
			this.$router.push("motoboys/edit")
		},
		editarMotoboy(id) {
			this.$router.push("motoboys/edit/"+id);
		},
		removerMotoboy(id) {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerMotoboy", id);
				this.$q.notify({
					message: "Motoboy removido com sucesso",
					type: "positive"
				})
			})
		},
		showMotoboy(id) {
			this.$router.push("motoboys/show/"+id)
		}
	}
}
</script>

<style>

</style>