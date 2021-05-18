<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<q-table :data="coletas" :columns="coletaColumns" align="left" row-key="id" :pagination.sync="pagination" @update:pagination="v => buscar()" :loading="loading" @request="buscar" :rows-per-page-options="[10, 20, 50, 100]" :pagination-label="paginationLabel" binary-state-sort>
				<template v-slot:top>
					<div class="col-6 text-h5 text-primary">Relatório</div>
					<div class="col-3 q-px-xs">
						<q-select v-model="pesquisa.cliente_id" :options="clienteOptions" option-label="nome" option-value="id" map-options emit-value label="Cliente" use-input @filter="buscarCliente" clearable @input="buscar()" />
					</div>
					<div class="col-3 q-px-xs">
						<q-select v-model="pesquisa.motoboy_id" :options="motoboyOptions" option-label="nome" option-value="id" map-options emit-value label="Motoboy" use-input @filter="buscarMotoboy" clearable @input="buscar()" />
					</div>
					<div class="col-6 q-px-xs row items-center justify-around">
						<div class="col-5 q-px-xs"><q-input type="date" v-model="pesquisa.data_solicitacao1" stack-label label="Data da solicitação" clearable @input="buscar()" /></div>
						<div class="col-1 q-px-xs">até</div>
						<div class="col-6 q-px-xs"><q-input type="date" v-model="pesquisa.data_solicitacao2" clearable @input="buscar()" /></div>
					</div>
					<div class="col-6 q-px-xs row items-center justify-around">
						<div class="col-5 q-px-xs"><q-input type="date" v-model="pesquisa.data_entrega1" stack-label label="Data da entrega" clearable @input="buscar()" /></div>
						<div class="col-1 q-px-xs">até</div>
						<div class="col-6 q-px-xs"><q-input type="date" v-model="pesquisa.data_entrega2" clearable @input="buscar()" /></div>
					</div>
					<div class="col-3 q-px-xs">
						<q-select v-model="pesquisa.tipo_entrega" :options="tipoEntregaOptions" label="Tipo de entrega" @input="buscar()" multiple map-options emit-value></q-select>
					</div>
					<div class="col-3 q-px-xs">
						<q-select v-model="pesquisa.forma_pagamento" :options="formaPagamentoOptions" map-options emit-value label="Forma de pagamento" @input="buscar()" multiple></q-select>
					</div>
					<div class="col-4 q-px-xs">
						<q-btn outline icon="import_export" label="CSV" color="primary" @click="exportar('csv')" class="q-mr-xs" />
						<q-btn outline icon="print" label="PDF" color="primary" @click="exportar('pdf')" class="q-ml-xs" />
					</div>
				</template>
				<template v-slot:body-cell-valor_comissao="props">
					<q-td>
						R$
						{{
							parseFloat(props.row.valor_comissao ? props.row.valor_comissao : '0')
								.toFixed(2)
								.replace('.', ',')
						}}
						({{
							parseFloat(props.row.comissao ? props.row.comissao : '0')
								.toFixed(2)
								.replace('.', ',')
						}}%)
					</q-td>
				</template>
				<template v-slot:bottom>
					<div class="col-12 text-right text-bold">Qtde: {{ resumo.q }}</div>
					<div class="col-12 text-right text-bold">
						Total bruto: R$
						{{
							parseFloat(resumo.vb)
								.toFixed(2)
								.replace('.', ',')
						}}
					</div>
					<div class="col-12 text-right text-bold">
						Total comissão: R$
						{{
							parseFloat(resumo.vc)
								.toFixed(2)
								.replace('.', ',')
						}}
					</div>
					<div class="col-12 text-right text-bold">
						Total líquido: R$
						{{
							parseFloat(resumo.vl)
								.toFixed(2)
								.replace('.', ',')
						}}
					</div>
				</template>
			</q-table>
		</transition>
	</q-page>
</template>
<script>
export default {
	data() {
		return {
			pesquisa: {
				cliente_id: '',
				motoboy_id: '',
				data_solicitacao1: '',
				data_solicitacao2: '',
				data_entrega1: '',
				data_entrega2: '',
				tipo_entrega: [],
				forma_pagamento: []
			},
			clienteOptions: [],
			motoboyOptions: [],
			coletas: [],
			coletaColumns: [
				{ name: 'cliente', label: 'Cliente', field: 'cliente', align: 'left', format: val => (val ? val.nome : '') },
				{ name: 'motoboy', label: 'Motoboy', field: 'motoboy', align: 'left', format: val => (val ? val.nome : '') },
				{ name: 'tipo_entrega', label: 'Tipo de entrega', field: 'tipo_entrega', align: 'left' },
				{ name: 'forma_pagamento', label: 'Forma de pagamento', field: 'forma_pagamento', align: 'left' },
				{
					name: 'valor_entrega',
					label: 'Valor bruto',
					field: 'valor_entrega',
					align: 'left',
					format: val =>
						'R$ ' +
						(val
							? parseFloat(val)
									.toFixed(2)
									.replace('.', ',')
							: '')
				},
				{ name: 'valor_comissao', label: 'Valor comissão', field: 'valor_comissao', align: 'left' },
				{
					name: 'valor_liquido',
					label: 'Valor líquido',
					field: 'valor_liquido',
					align: 'left',
					format: val =>
						'R$ ' +
						(val
							? parseFloat(val)
									.toFixed(2)
									.replace('.', ',')
							: '')
				}
			],
			resumo: { q: 0, vb: 0, c: 0, vl: 0 },
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
				...this.pesquisa,
				...this.pagination
			}
			var response = await this.executeMethod({ url: 'api/Coletas/relatorio', method: 'get', params: data })
			if (response.status === 200) {
				this.pagination.rowsNumber = parseInt(response.data.total)
				this.coletas = response.data.data
				this.resumo = response.data.resumo
			}
			this.loading = false
		},
		async buscarCliente(val, update, abort) {
			let data = {
				url: 'api/Clientes',
				method: 'get',
				params: {
					page: 1,
					rowsPerPage: 20,
					sortBy: 'nome',
					descending: false,
					filter: val
				}
			}
			var response = await this.executeMethod(data)
			if (response.status === 200) this.clienteOptions = response.data.data
			update()
		},
		async buscarMotoboy(val, update, abort) {
			let data = {
				url: 'api/Motoboys',
				method: 'get',
				params: {
					page: 1,
					rowsPerPage: 20,
					sortBy: 'nome',
					descending: false,
					filter: val
				}
			}
			var response = await this.executeMethod(data)
			if (response.status === 200) this.motoboyOptions = response.data.data
			update()
		},
		exportar(tipo) {
			window.open(encodeURI(`${process.env.API_URL}api/Coletas/Relatorio?token=${this.getLogin.token}&export=${tipo}&filter=` + JSON.stringify({ ...this.pesquisa, ...this.pagination })), '_blank')
		}
	}
}
</script>
