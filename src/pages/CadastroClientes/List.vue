<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="$route.path == '/cadastroClientes'" key="list">
				<q-table :data="clientes" :columns="clienteColumns" align="left" row-key="id" :pagination.sync="pagination" @update:pagination="v=>buscar()" :loading="loading" @request="buscar" :rows-per-page-options="[10,20,50,100]" :pagination-label="paginationLabel" binary-state-sort>
					<template v-slot:top>
						<div class="col-9 text-h5 text-primary">Clientes</div>
						<div class="col-3">
							<q-input v-model="search" placeholder="Pesquisar" @input="buscar()" :debounce="400">
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
export default {
	data () {
		return {
			search: "",
			clientes: [],
			clienteColumns: [
				{ name: "actions", label: "Ações", field: "actions", align: "left" },
				{ name: "nome", label: "Nome", field: "nome", align: "left" },
				{ name: "cpf_cnpj", label: "CPF/CNPJ", field: "cpf_cnpj", align: "left" },
				{ name: "telefone", label: "Telefone", field: "telefone", align: "left" },
				{ name: "email", label: "E-mail", field: "email", align: "left" },
			],
      loading: false,
      pagination: {
        sortBy: 'nome',
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
      var response = await this.executeMethod({url:'api/Clientes',method:'get',params:data})
      if (response.status===200) {
        this.pagination.rowsNumber = parseInt(response.data.total)
				this.clientes = response.data.data
      }
      this.loading = false
    },
		adicionarCliente() {
			this.$router.push("cadastroClientes/edit")
		},
		editarCliente(id) {
			this.$router.push("cadastroClientes/edit/"+id);
		},
		removerCliente(id) {
      this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover este cliente? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
        var response = await this.executeMethod({url:'api/Clientes/'+id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Cliente removido com sucesso",
						type: "positive"
					})
					this.buscar()
				}
      })
		},
		showCliente(id) {
			this.$router.push("cadastroClientes/show/"+id)
		}
	},
	created() {
		if (this.usuarioPerfil==='cliente' && this.$route.path.indexOf('cadastroClientes')>-1) this.$router.push('/')
	}
}
</script>