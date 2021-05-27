<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="$route.path == '/cadastroColetas'" key="list">
				<q-table :data="coletas" :columns="coletaColumns" align="left" row-key="id" :pagination.sync="pagination" @update:pagination="v => buscar()" :loading="loading" @request="buscar" :rows-per-page-options="[10, 20, 50, 100]" :pagination-label="paginationLabel" binary-state-sort>
					<template v-slot:top>
						<div class="col-6 text-h5 text-primary">Coletas</div>
						<div class="col-4 q-px-xs">
							<q-input v-model="search" placeholder="Pesquisar id, cliente ou motoboy" @input="buscar()" :debounce="400">
								<q-icon slot="append" name="search" color="primary"></q-icon>
							</q-input>
						</div>
						<div class="col-2">
							<q-select v-model="status" :options="coletaStatusOptions" label="Status*" @input="buscar()" multiple></q-select>
						</div>
					</template>

					<template v-slot:body-cell-actions="props">
						<q-td>
							<q-btn icon="edit" color="primary" flat dense @click="editarColeta(props.row.id)">
								<q-tooltip>Editar {{ props.row.nome }}</q-tooltip>
							</q-btn>
							<q-btn icon="visibility" color="primary" flat dense @click="showColeta(props.row.id)">
								<q-tooltip>Mostrar {{ props.row.nome }}</q-tooltip>
							</q-btn>
							<q-btn icon="delete" color="negative" flat dense @click="removerColeta(props.row.id)">
								<q-tooltip>Excluir {{ props.row.nome }}</q-tooltip>
							</q-btn>
						</q-td>
					</template>

					<template v-slot:body-cell-cliente="props">
						<q-td>
							<q-btn size="12px" dense flat icon="error" color="negative" v-if="props.row.status === 'Aberto' && !props.row.motoboy" />
							{{ props.row.cliente.nome }}
						</q-td>
					</template>

					<template v-slot:body-cell-motoboy="props">
						<q-td>
							{{ props.row.motoboy ? props.row.motoboy.nome : '' }}
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
export default {
	data() {
		return {
			search: '',
			status: [],
			coletas: [],
			coletaColumns: [
				{ name: 'actions', label: 'Ações', field: 'actions', align: 'left' },
				{ name: 'created_at', label: 'Data', field: 'created_at', align: 'left', format: val => (val ? this.formatarDataHora(val, 'DD/MM/YYYY HH:mm:ss') : '') },
				{ name: 'id', label: 'ID', field: 'id', align: 'left' },
				{ name: 'status', label: 'Status', field: 'status', align: 'left' },
				{ name: 'cliente', label: 'Cliente', field: 'cliente', align: 'left' },
				{ name: 'motoboy', label: 'Motoboy', field: 'motoboy', align: 'left' },
				{ name: 'status_pagamento', label: 'Status de pagamento', field: 'status_pagamento', align: 'left' }
			],
			loading: false,
			pagination: {
				sortBy: 'created_at',
				descending: true,
				page: 1,
				rowsPerPage: 10,
				rowsNumber: 0
			}
		}
	},
	methods: {
		paginationLabel(first, end, total) {
			return 'Registros ' + first + ' até ' + end + ' de ' + total
		},
		async buscar(props) {
			this.loading = true
			if (props) {
				this.pagination.page = props.pagination.page
				this.pagination.rowsPerPage = props.pagination.rowsPerPage
				this.pagination.sortBy = props.pagination.sortBy
				this.pagination.descending = props.pagination.descending
			}
			let data = {
				filter: this.search,
				status: this.status,
				...this.pagination
			}
			var response = await this.executeMethod({ url: 'api/Coletas', method: 'get', params: data })
			if (response.status === 200) {
				this.pagination.rowsNumber = parseInt(response.data.total)
				this.coletas = response.data.data
			}
			this.loading = false
		},
		adicionarColeta() {
			this.$router.push('cadastroColetas/edit')
		},
		editarColeta(id) {
			this.$router.push('cadastroColetas/edit/' + id)
		},
		removerColeta(id) {
			this.$q.dialog({ title: 'Confirmação', message: 'Tem certeza que deseja remover esta coleta? Esta ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				var response = await this.executeMethod({ url: 'api/Coletas/' + id, method: 'delete' })
				if (response.status === 200) {
					this.$q.notify({
						message: 'Coleta removido com sucesso',
						type: 'positive'
					})
					this.buscar()
				}
			})
		},
		showColeta(id) {
			this.$router.push('cadastroColetas/show/' + id)
		}
	}
}
</script>
