<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="$route.path == '/cadastroUsuarios'" key="list">
				<q-table :data="usuarios" :columns="usuarioColumns" align="left" row-key="id" :pagination.sync="pagination" @update:pagination="v=>buscar()" :loading="loading" @request="buscar" :rows-per-page-options="[10,20,50,100]" :pagination-label="paginationLabel" binary-state-sort>
					<template v-slot:top>
						<div class="col-6 text-h5 text-primary">Usuarios</div>
						<div class="col-3 q-px-xs">
							<q-input v-model="search" placeholder="Pesquisar" @input="buscar()" :debounce="400">
								<q-icon slot="append" name="search" color="primary"/>
							</q-input>
						</div>
						<div class="col-3 q-px-xs">
							<q-select v-model="perfil" placeholder="Perfil" clearable :options="perfilOptions" map-options emit-value option-label="name" option-value="id" @input="buscar()"/>
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
export default {
	data () {
		return {
			search: "",
			perfil: '',
			perfilOptions: [],
			usuarios: [],
			usuarioColumns: [
				{ name: "actions", label: "Ações", field: "actions", align: "left" },
				{ name: "nome", label: "Nome", field: "nome", align: "left" },
				{ name: "email", label: "E-mail", field: "email", align: "left" },
				{ name: "perfis", label: "Perfis", field: "perfis", align: "left", format:val=>val ? val : '' },
				{ name: "ativo", label: "Ativo", field: "ativo", align: "left", format:val=>val ? 'Sim' : 'Não' }
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
				perfil: this.perfil,
        ...this.pagination
      }
      var response = await this.executeMethod({url:'api/Usuarios',method:'get',params:data})
      if (response.status===200) {
        this.pagination.rowsNumber = parseInt(response.data.total)
				for (let idx in response.data.data) {
					let s = ''
					for (let item of response.data.data[idx].perfis)
						s += (s==='' ? '' : ', ')+item.name
					response.data.data[idx].perfis = s
				}
				this.usuarios = response.data.data
      }
      this.loading = false
    },
		adicionarUsuario() {
			this.$router.push("cadastroUsuarios/edit")
		},
		editarUsuario(id) {
			this.$router.push("cadastroUsuarios/edit/"+id);
		},
		removerUsuario(id) {
      this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover este usuário? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
        var response = await this.executeMethod({url:'api/Usuarios/'+id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Usuario removido com sucesso",
						type: "positive"
					})
					this.buscar()
				}
      })
		},
		showUsuario(id) {
			this.$router.push("cadastroUsuarios/show/"+id)
		}
	},
	async created() {
		var response = await this.executeMethod({url:'api/Usuarios/perfis',method:'get'})
		if (response.status===200) this.perfilOptions = response.data
	}
}
</script>