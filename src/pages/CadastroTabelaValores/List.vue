<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="$route.path == '/cadastroTabelaValores'" key="list">
				<q-table :data="tabelas" :columns="tabelaColumns" align="left" row-key="id" :pagination.sync="pagination" @update:pagination="v=>buscar()" :loading="loading" @request="buscar" :rows-per-page-options="[10,20,50,100]" :pagination-label="paginationLabel" binary-state-sort>
					<template v-slot:top>
						<div class="col-9 text-h5 text-primary">Tabela de Valores</div>
						<div class="col-3">
							<q-input v-model="search" placeholder="Pesquisar" @input="buscar()" :debounce="400">
								<q-icon slot="append" name="search" color="primary"></q-icon>
							</q-input>
						</div>
					</template>
					<template v-slot:body-cell-actions="props">
						<q-td>
							<q-btn icon="edit" color="primary" flat dense @click="editarTabela(props.row.id)">
								<q-tooltip>Editar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="visibility" color="primary" flat dense @click="showTabela(props.row.id)">
								<q-tooltip>Mostrar {{props.row.nome}}</q-tooltip>
							</q-btn>
							<q-btn icon="delete" color="negative" flat dense @click="removerTabela(props.row.id)">
								<q-tooltip>Excluir {{props.row.nome}}</q-tooltip>
							</q-btn>
						</q-td>
					</template>
				</q-table>
				<q-page-sticky position="bottom-right" :offset="[18, 18]">
					<q-btn icon="add" color="primary" fab @click="adicionarTabela">
						<q-tooltip>Adicionar Tabela de Valor</q-tooltip>
					</q-btn>
				</q-page-sticky>
			</div>
			<router-view v-else key="router-view"></router-view>
		</transition>
	</q-page>
</template>
<script>
export default {
	data () {
		return {
			search: "",
			tipo_tabela: '',
			tabelas: [],
			tabelaColumns: [
				{ name: "actions", label: "Ações", field: "actions", align: "left" },
				{ name: "bairro", label: "Bairro", field: "bairro", align: "left" },
				{ name: "valor", label: "Valor", field: "valor", align: "left", format:val=>'R$ '+(val ? parseFloat(val).toFixed(2).replace('.',',') : '0,00') }
			],
			loading: false,
			pagination: {
				sortBy: 'bairro',
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
				filter: this.search,
				...this.pagination
			}
			var response = await this.executeMethod({url:'api/TabelaValores',method:'get',params:data})
			if (response.status===200) {
				this.pagination.rowsNumber = parseInt(response.data.total)
				this.tabelas = response.data.data
			}
			this.loading = false
		},
		adicionarTabela() {
			this.$router.push("cadastroTabelaValores/edit")
		},
		editarTabela(id) {
			this.$router.push("cadastroTabelaValores/edit/"+id);
		},
		removerTabela(id) {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover esta tabela de valor? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
				var response = await this.executeMethod({url:'api/TabelaValores/'+id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Tabela de valor removida com sucesso",
						type: "positive"
					})
					this.buscar()
				}
			})
		},
		showTabela(id) {
			this.$router.push("cadastroTabelaValores/show/"+id)
		}
	}
}
</script>