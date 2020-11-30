<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div>
				<q-table :data="coletas" :columns="coletaColumns" align="left" row-key="id" :pagination.sync="pagination" @update:pagination="v=>buscar()" :loading="loading" @request="buscar" :rows-per-page-options="[10,20,50,100]" :pagination-label="paginationLabel" binary-state-sort>
					<template v-slot:top>
						<div class="col-10 text-h5 text-primary">Minhas Coletas</div>
						<div class="col-2">
							<q-select v-model="status" :options="coletaStatusOptions"  label="Status*" @input="buscar()" multiple></q-select>
						</div>
					</template>

					<template v-slot:body-cell-actions="props">
						<q-td>
							<q-btn icon="visibility" color="primary" flat dense @click="$router.push('cadastroColetas/show/'+props.row.id)">
								<q-tooltip>Mostrar {{props.row.nome}}</q-tooltip>
							</q-btn>
						</q-td>
					</template>

					<template v-slot:body-cell-motoboy="props">
						<q-td>
							{{props.row.motoboy ? props.row.motoboy.nome : ''}}
						</q-td>
					</template>
				</q-table>
				<q-page-sticky position="bottom-right" :offset="[18, 18]">
					<q-btn icon="add" color="primary" fab @click="adicionarColeta">
						<q-tooltip>Adicionar Coleta</q-tooltip>
					</q-btn>
				</q-page-sticky>
			</div>
		</transition>
	</q-page>
</template>
<script>
export default {
	data () {
		return {
			status: [],
			coletas: [],
			coletaColumns: [
				{ name: "actions", label: "Ações", field: "actions", align: "left" },
				{ name: "id", label: "ID", field: "id", align: "left" },
				{ name: "status", label: "Status", field: "status", align: "left" },
				{ name: "motoboy", label: "Motoboy", field: "motoboy", align: "left" },
			],
      loading: false,
      pagination: {
        sortBy: 'status',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
		}
	},
	methods: {
    paginationLabel(first,end,total) {
      return 'Registros '+first+' até '+end+' de '+total
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
				filter: '',
				status: this.status,
        ...this.pagination
      }
      var response = await this.executeMethod({url:'api/Coletas',method:'get',params:data})
      if (response.status===200) {
        this.pagination.rowsNumber = parseInt(response.data.total)
				this.coletas = response.data.data
      }
      this.loading = false
    },
		adicionarColeta() {
			this.$router.push("cadastroColetas/edit")
		}
	}
}
</script>