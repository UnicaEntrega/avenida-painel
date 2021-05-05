<template>
	<div>
		<q-card>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row">
					<div class="col-6 text-h6 text-primary">Cadastro de Coletas</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool && usuarioPerfil !== 'cliente'" label="Status" icon="refresh" color="primary" flat @click="abrirModalStatus"></q-btn>
						<q-btn v-if="showBool && usuarioPerfil !== 'cliente'" label="Motoboy" icon="refresh" color="primary" flat @click="abrirModalMotoboy"></q-btn>
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool && usuarioPerfil !== 'cliente'" label="Remover" icon="delete" color="negative" flat @click="removerColeta"></q-btn>
						<q-btn v-if="showBool && usuarioPerfil !== 'cliente'" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
						<q-btn v-if="showBool && usuarioPerfil === 'cliente' && coleta.status === 'Entregue' && dataRelatarProblema && !coleta.problema" label="Relatar Problema" icon="edit" color="primary" @click="abrirModalProblema"></q-btn>
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row q-col-gutter-sm" v-if="usuarioPerfil !== 'cliente'">
					<div class="col-8">
						<q-select v-model="coleta.cliente_id" :options="clienteOptions" option-label="nome" option-value="id" map-options emit-value label="Cliente*" :rules="[validatorRequired]" :readonly="showBool" use-input filled @filter="buscarCliente" @input="selecionarBoletins">
							<q-btn slot="after" icon="add" color="primary" @click="abrirModalCliente" v-if="!showBool"></q-btn>
						</q-select>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.status" :options="coletaStatusOptions" label="Status*" :rules="[validatorRequired]" :readonly="showBool"></q-select>
					</div>
				</q-card-section>
				<q-card-section class="row q-col-gutter-sm">
					<q-item-label class="col-12 text-h6 text-primary">
						Endereço de Coleta
						<q-btn icon="content_copy" color="primary" flat @click="copiarEnderecoColetaCliente" v-if="!showBool"></q-btn>
					</q-item-label>
					<div class="col-3">
						<q-input v-model="coleta.quem" label="Com Quem Coleta" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.telefone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="showBool"></q-input>
					</div>
					<div class="col-xl-6"></div>
					<div class="col-xl-1 col-xs-3">
						<q-input v-model="coleta.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[validatorRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep(coleta)" :readonly="showBool"></q-input>
					</div>
					<div class="col-xl-3 col-xs-3">
						<q-input v-model="coleta.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool" @input="geocodeEndereco()" :debounce="1000"></q-input>
					</div>
					<div class="col-xl-1 col-xs-3">
						<q-input v-model="coleta.endereco_numero" label="Número" :loading="cepLoading" :readonly="showBool" ref="endereco_numero" @input="geocodeEndereco()" :debounce="1000"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.complemento" label="Complemento" :loading="cepLoading" :readonly="showBool" @input="geocodeEndereco()" :debounce="1000"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool" @input="geocodeEndereco()" :debounce="1000"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool" @input="geocodeEndereco()" :debounce="1000"></q-input>
					</div>
					<div class="col-xl-1 col-xs-3">
						<q-select v-model="coleta.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]" @input="geocodeEndereco()"></q-select>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.ponto_referencia" label="Ponto de referência" :readonly="showBool"></q-input>
					</div>
				</q-card-section>

				<q-card-section>
					<q-item-label class="col-12 text-h6 text-primary">
						Endereços de Entrega
						<q-btn icon="add" color="primary" flat @click="adicionarEnderecoEntrega" v-if="!showBool"></q-btn>
					</q-item-label>
					<q-list class="q-gutter-y-md" separator>
						<q-item v-for="(endereco, index) in coleta.enderecosEntregas" :key="'endereco-' + index">
							<q-item-section>
								<div class="row q-col-gutter-sm">
									<div class="col-3 div-input-add">
										<q-select v-model="endereco.quem" label="Pra Quem Entrega" :options="enderecoQuemOptions" input-debounce="0" use-input new-value-mode="add" @new-value="enderecoQuemAdd" :rules="[validatorRequired]" :readonly="showBool"></q-select>
									</div>
									<div class="col-3">
										<q-input v-model="endereco.telefone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="showBool"></q-input>
									</div>
									<div class="col-3">
										<q-select v-model="endereco.retorno" :options="simNaoOptions" map-options emit-value label="Com Retorno" :rules="[validatorRequired]" :readonly="showBool"></q-select>
									</div>
									<div class="col-xl-3"></div>
									<div class="col-xl-1 col-xs-3">
										<q-input v-model="endereco.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[validatorRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep(endereco, index)" :readonly="showBool"></q-input>
									</div>
									<div class="col-xl-3 col-xs-3">
										<q-input v-model="endereco.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool" @input="geocodeEndereco(index)" :debounce="1000"></q-input>
									</div>
									<div class="col-xl-1 col-xs-3">
										<q-input v-model="endereco.endereco_numero" label="Número" :loading="cepLoading" :readonly="showBool" :ref="'endereco_numero' + index" @input="geocodeEndereco(index)" :debounce="1000"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.complemento" label="Complemento" :loading="cepLoading" :readonly="showBool" @input="geocodeEndereco(index)" :debounce="1000"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool" @input="geocodeEndereco(index)" :debounce="1000"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool" @input="geocodeEndereco(index)" :debounce="1000"></q-input>
									</div>
									<div class="col-xl-1 col-xs-3">
										<q-select v-model="endereco.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]" @input="geocodeEndereco(index)"></q-select>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.ponto_referencia" label="Ponto de referência" :readonly="showBool"></q-input>
									</div>
								</div>
							</q-item-section>
							<q-item-section side>
								<q-btn icon="content_copy" color="primary" flat @click="copiarEnderecoEntregaCliente(index)" v-if="!showBool"></q-btn>
								<q-btn icon="close" color="negative" flat @click="removerEnderecoEntrega(index)" v-if="!showBool"></q-btn>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>

				<q-card-section class="row q-col-gutter-sm">
					<div class="col-12 q-pb-md">
						<q-input v-model="coleta.observacao" type="textarea" label="Observações" :readonly="showBool" :autogrow="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.tipo_veiculo" label="Tipo de Veículo*" :options="tipoVeiculoOptions" :rules="[validatorRequired]" :readonly="showBool" @input="calcularValorColeta()"></q-select>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.tipo_entrega" :options="tipoEntregaOptions" label="Tipo da Entrega*" map-options emit-value :rules="[validatorRequired]" :readonly="showBool" @input="calcularValorColeta()"></q-select>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.valor_entrega" label="Valor da Entrega*" :rules="[validatorRequired]" :readonly="showBool || usuarioPerfil === 'cliente'" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.forma_pagamento" :options="formaPagamentoOptions" label="Forma de Pagamento*" map-options emit-value :rules="[validatorRequired]" :readonly="showBool" @input="selecionarBoletins" hint="O motoboy só leva a máquina quando solicitado (débito ou crédito)."></q-select>
					</div>
					<div class="col-3" v-if="coleta.forma_pagamento === 'Dinheiro'">
						<q-input v-model="coleta.troco" label="Precisa de troco?*" :rules="[validatorRequired]" :readonly="showBool" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
					</div>
					<div class="col-3" v-if="coleta.forma_pagamento === 'Boleto'">
						<q-input v-model="coleta.numero_boleto" label="Número do Boleto*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3" v-if="coleta.forma_pagamento === 'Boletim de Transporte'">
						<q-select v-model="coleta.cliente_boletim_id" :options="boletimOptions" map-options emit-value :label="'Número do Boletim' + (usuarioPerfil === 'cliente' ? '' : '*')" :rules="usuarioPerfil === 'cliente' ? [validatorBoletim] : [validatorRequired, validatorBoletim]" :readonly="showBool"></q-select>
					</div>
					<div class="col-3" v-if="usuarioPerfil !== 'cliente'">
						<q-select v-model="coleta.motoboy_id" :options="motoboyOptions" option-label="nome" option-value="id" map-options emit-value label="Motoboy" :readonly="showBool" use-input filled @filter="buscarMotoboy" />
					</div>
					<div class="col-3" v-if="usuarioPerfil !== 'cliente'">
						<q-input v-model="coleta.comissao" label="Porcentagem de Comissão" :rules="[validatorRequired]" :readonly="showBool" mask="#,##" fill-mask="0" reverse-fill-mask suffix="%"></q-input>
					</div>
					<div class="col-12 q-pb-md" v-if="showBool && !isBlank(coleta.observacao_cancelamento)">
						<q-input v-model="coleta.observacao_cancelamento" type="textarea" label="Observações de cancelamento" :readonly="showBool" :autogrow="showBool"></q-input>
					</div>
					<div class="col-12 text-center" v-if="false">
						<q-btn label="Ver nossa tabela de Valores" icon="list" @click="abrirTabelaValores()" color="primary" flat></q-btn>
					</div>
				</q-card-section>
				<q-card-section class="row q-col-gutter-sm" v-if="pontoDestino">
					<gmap-map :center="coordsDefault" :zoom="15" style="width:100%;height:60vh;" :options="{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }">
						<gmap-direcao modo="DRIVING" :origem="coordsDefault" :destino="pontoDestino" :pontosEntre="pontosEntre" />
					</gmap-map>
				</q-card-section>
				<q-card-section class="row q-col-gutter-sm" v-if="showBool && !isBlank(coleta.foto_finalizado)">
					<div class="col-12 q-pb-md">
						<div>Foto</div>
						<q-img :src="fotoSrc" style="width:300px;" />
						<q-btn label="Abrir localização da foto" icon="map" color="primary" @click="abrirMapa()" />
					</div>
				</q-card-section>
				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-6 text-grey-6">
						{{ showBool ? '' : '*Campos obrigatórios' }}
					</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
			</q-form>
		</q-card>
		<modal-cliente ref="modalCliente" @clienteCadastrado="clienteCadastrado"></modal-cliente>
		<q-dialog v-model="modalStatus">
			<q-card style="min-width: 300px">
				<q-card-section class="text-body1 text-primary text-bold">
					Mudar o status da coleta
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section>
					<q-list separator>
						<q-item v-for="(item, index) in coletaStatusOptions" :key="index" :class="c_statusItem(item)" clickable @click="status = item">
							<q-item-section>{{ item }}</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row justify-end">
					<q-btn label="Cancelar" color="negative" no-caps flat v-close-popup></q-btn>
					<q-btn label="Confirmar" color="positive" no-caps @click="atualizar({ status: status })"></q-btn>
				</q-card-section>
			</q-card>
		</q-dialog>
		<q-dialog v-model="modalMotoboy">
			<q-card style="min-width: 500px">
				<q-card-section class="text-body1 text-primary text-bold">
					Mudar o motoboy encarregado
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section>
					<q-select v-model="motoboy_id" :options="motoboyOptions2" option-label="nome" option-value="id" map-options emit-value label="Motoboy*" :rules="[validatorRequired]" use-input filled @filter="buscarMotoboy2" />
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row justify-end">
					<q-btn label="Cancelar" color="negative" no-caps flat v-close-popup></q-btn>
					<q-btn label="Confirmar" color="positive" no-caps @click="atualizar({ motoboy_id: motoboy_id, status: 'Encaminhado' })"></q-btn>
				</q-card-section>
			</q-card>
		</q-dialog>
		<q-dialog v-model="modalProblema">
			<q-card style="min-width: 700px">
				<q-card-section class="text-body1 text-primary text-bold">
					Informe qual foi o problema
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section>
					<q-input v-model="problema" type="textarea" label="Descreva o problema" :rules="[validatorRequired]"></q-input>
				</q-card-section>
				<q-card-section class="row justify-end">
					<q-btn label="Cancelar" color="negative" flat no-caps v-close-popup></q-btn>
					<q-btn label="Confirmar" color="positive" no-caps @click="enviarProblema()"></q-btn>
				</q-card-section>
			</q-card>
		</q-dialog>
		<q-dialog v-model="mapa.mostrar">
			<q-card style="min-width:90vw;min-heigth:90vh;" class="relative-position">
				<div class="absolute" style="left:calc((90vw / 2) - 21px);top:5px;z-index:6000;">
					<q-btn round icon="close" color="primary" @click="mapa.mostrar = false" />
				</div>
				<gmap-map :center="mapa.coords" :zoom="15" style="height:calc(100vh - 48px);width:100%;">
					<gmap-marker :position="mapa.coords" :label="mapa.label" :icon="mapa.icon" :clickable="true" @click="modalMarker = true" />
				</gmap-map>
			</q-card>
		</q-dialog>
		<q-dialog v-model="modalMarker">
			<q-card>
				<q-card-section>
					<div class="col-12 text-center">{{ mapa.label }}</div>
					<div class="col-12 q-pb-sm">{{ mapa.endereco }}</div>
				</q-card-section>
			</q-card>
		</q-dialog>
		<q-dialog v-model="modalTabelaValores">
			<q-card style="min-width:700px;">
				<q-card-section>
					<div class="row items-center justify-between">
						<div class="text-primary text-h6">Tabela de Valores</div>
						<q-btn icon="close" color="primary" flat v-close-popup></q-btn>
					</div>
				</q-card-section>
				<q-card-section>
					<q-table :data="tabelaValores" :columns="tabelaValorColumns" align="left" row-key="id" :pagination.sync="pagination" @update:pagination="v => tabelaValoresBuscar()" :loading="loading" :rows-per-page-options="[10, 20, 50, 100]" @request="tabelaValoresBuscar" :pagination-label="paginationLabel" />
				</q-card-section>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
import GmapDirecao from '../../components/maps/GmapDirecao.vue'
import ModalCliente from '../../components/ModalCliente.vue'
export default {
	components: {
		ModalCliente,
		GmapDirecao
	},
	data() {
		return {
			coleta: {
				cliente_id: '',
				cep: '',
				endereco: '',
				endereco_numero: '',
				complemento: '',
				bairro: '',
				cidade: '',
				estado: '',
				ponto_referencia: '',
				quem: '',
				telefone: '',
				observacao: '',
				tipo_veiculo: '',
				tipo_entrega: '',
				valor_entrega: 0,
				troco: 0,
				forma_pagamento: '',
				numero_boleto: '',
				motoboy_id: '',
				comissao: '65,00',
				status: 'Aberto',
				observacao_cancelamento: '',
				latitude: 0,
				longitude: 0,
				cliente_boletim_id: '',
				enderecosEntregas: []
			},
			cepLoading: false,
			showBool: false,
			clienteOptions: [],
			motoboyOptions: [],
			motoboyOptions2: [],
			modalStatus: false,
			status: '',
			modalMotoboy: false,
			motoboy_id: '',
			modalProblema: false,
			problema: '',
			boletimOptions: [],
			mapa: {
				mostrar: false,
				coords: this.coordsDefault,
				endereco: '',
				label: '',
				icon: {}
			},
			modalMarker: false,
			enderecoQuemOptions: ['Deixar na Portaria', 'Entregar em Mãos', 'Deixar na Residência'],
			modalTabelaValores: false,
			tabelaValores: [],
			tabelaValorColumns: [
				{ name: 'bairro', label: 'Bairro', field: 'bairro', align: 'left' },
				{
					name: 'valor',
					label: 'Valor',
					field: 'valor',
					align: 'left',
					format: val =>
						'R$ ' +
						(val
							? parseFloat(val)
									.toFixed(2)
									.replace('.', ',')
							: '0,00')
				}
			],
			pagination: {
				sortBy: 'bairro',
				descending: false,
				page: 1,
				rowsPerPage: 10,
				rowsNumber: 0
			},
			loading: false,
			configuracao: {},
			pontoDestino: undefined,
			pontosEntre: []
		}
	},
	computed: {
		c_statusItem() {
			return status => {
				return status == this.status ? 'bg-primary shadow-2 rounded-borders text-white' : ''
			}
		},
		dataRelatarProblema() {
			if (!this.coleta.data_finalizado) return false
			let m = this.getMoment()
			return (
				m(this.coleta.data_finalizado, 'YYYY-MM-DD')
					.add(1, 'days')
					.format('YYYYMMDD') >= m().format('YYYYMMDD')
			)
		},
		fotoSrc() {
			return this.coleta && this.isBlank(this.coleta.foto_finalizado) ? '' : `${process.env.API_URL}api/Arquivos/Coleta/download/${this.coleta.foto_finalizado}`
		}
	},
	methods: {
		paginationLabel(first, end, total) {
			return 'Registros ' + first + ' até ' + end + ' de ' + total
		},
		abrirTabelaValores() {
			this.tabelaValoresBuscar()
			this.modalTabelaValores = true
		},
		async tabelaValoresBuscar(props) {
			this.loading = true
			if (props) {
				this.pagination.page = props.pagination.page
				this.pagination.rowsPerPage = props.pagination.rowsPerPage
				this.pagination.sortBy = props.pagination.sortBy
				this.pagination.descending = props.pagination.descending
			}
			var response = await this.executeMethod({ url: 'api/TabelaValores', method: 'get', params: { ...this.pagination } })
			if (response.status === 200) {
				this.pagination.rowsNumber = parseInt(response.data.total)
				this.tabelaValores = response.data.data
			}
			this.loading = false
		},
		copiarEnderecoColetaCliente() {
			this.$q
				.dialog({
					title: 'Confirmação',
					message: 'Tem certeza que deseja copiar o endereço do cliente?',
					ok: 'Sim',
					cancel: 'Não'
				})
				.onOk(() => {
					for (let cliente of this.clienteOptions) {
						if (cliente.id === this.coleta.cliente_id) {
							this.coleta.cep = cliente.cep
							this.coleta.endereco = cliente.endereco
							this.coleta.endereco_numero = cliente.endereco_numero
							this.coleta.complemento = cliente.complemento
							this.coleta.bairro = cliente.bairro
							this.coleta.cidade = cliente.cidade
							this.coleta.estado = cliente.estado
						}
					}
					this.$q.notify({
						message: 'Endereço copiado com sucesso',
						type: 'positive'
					})
					this.geocodeEndereco()
				})
		},
		copiarEnderecoEntregaCliente(index) {
			this.$q
				.dialog({
					title: 'Confirmação',
					message: 'Tem certeza que deseja copiar o endereço do cliente?',
					ok: 'Sim',
					cancel: 'Não'
				})
				.onOk(() => {
					for (let cliente of this.clienteOptions) {
						if (cliente.id === this.coleta.cliente_id) {
							this.coleta.enderecosEntregas[index].cep = cliente.cep
							this.coleta.enderecosEntregas[index].endereco = cliente.endereco
							this.coleta.enderecosEntregas[index].endereco_numero = cliente.endereco_numero
							this.coleta.enderecosEntregas[index].complemento = cliente.complemento
							this.coleta.enderecosEntregas[index].bairro = cliente.bairro
							this.coleta.enderecosEntregas[index].cidade = cliente.cidade
							this.coleta.enderecosEntregas[index].estado = cliente.estado
						}
					}
					this.$q.notify({
						message: 'Endereço copiado com sucesso',
						type: 'positive'
					})
					this.geocodeEndereco(index)
				})
		},
		enderecoQuemAdd(val, done) {
			if (val.length > 0) {
				if (!this.enderecoQuemOptions.includes(val)) this.enderecoQuemOptions.push(val)
				done(val)
			}
		},
		async abrirMapa() {
			this.mapa.coords = { lat: parseFloat(this.coleta.latitude_finalizado), lng: parseFloat(this.coleta.longitude_finalizado) }
			this.mapa.endereco = await this.buscarGeocode(null, this.mapa.coords)
			this.mapa.label = 'Entrega - Entregue'
			this.mapa.icon = { url: 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png', size: { width: 27, height: 43, f: 'px', b: 'px' } }
			this.mapa.mostrar = true
		},
		async selecionarBoletins() {
			this.boletimOptions = []
			if (this.coleta.forma_pagamento !== 'Boletim de Transporte') return
			var response = await this.executeMethod({ url: 'api/Clientes/boletins', method: 'post', data: { cliente_id: this.coleta.cliente_id, coleta_id: this.coleta.id } })
			if (response.status === 200 && response.data.length > 0) {
				for (let item of response.data) {
					this.boletimOptions.push({ label: item.numero, value: item.id })
					if (this.coleta.id && item.coleta_id && item.coleta_id.toString() === this.coleta.id.toString()) this.coleta.cliente_boletim_id = item.id
				}
			} else {
				this.boletimOptions = [{ label: 'Cliente sem boletim disponível', value: '0' }]
				this.coleta.cliente_boletim_id = '0'
			}
		},
		abrirModalProblema() {
			this.problema = ''
			this.modalProblema = true
		},
		enviarProblema() {
			if (this.$root.chat_connect) {
				this.$root.chat.emit('problema', {
					coleta_id: this.coleta.id,
					problema: this.problema
				})
				this.modalProblema = false
				this.$router.push('/chat/' + this.coleta.id)
			}
		},
		abrirModalStatus() {
			this.status = this.coleta.status
			this.modalStatus = true
		},
		abrirModalMotoboy() {
			this.motoboy_id = this.coleta.motoboy_id
			if (this.coleta.motoboy) this.motoboyOptions2.push(this.coleta.motoboy)
			this.modalMotoboy = true
		},
		async atualizar(d) {
			var response = await this.executeMethod({ url: `api/Coletas/${this.coleta.id}`, method: 'put', data: d })
			if (response.status === 200) {
				this.modalStatus = false
				this.modalMotoboy = false
				this.buscar()
			}
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
		async buscarMotoboy2(val, update, abort) {
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
			if (response.status === 200) this.motoboyOptions2 = response.data.data
			update()
		},
		adicionarEnderecoEntrega() {
			this.coleta.enderecosEntregas.push({
				cep: '',
				endereco: '',
				endereco_numero: '',
				complemento: '',
				bairro: '',
				cidade: '',
				estado: '',
				ponto_referencia: '',
				retorno: '',
				quem: '',
				telefone: '',
				latitude: 0,
				longitude: 0
			})
		},
		abrirModalCliente() {
			this.$refs.modalCliente.abrirModal()
		},
		clienteCadastrado(cliente) {
			this.coleta.cliente_id = cliente.id
			this.clienteOptions = [cliente]
		},
		async onSubmit() {
			var response = await this.executeMethod({ url: 'api/Coletas' + (this.coleta.id ? '/' + this.coleta.id : ''), method: this.coleta.id ? 'put' : 'post', data: this.coleta })
			if (response.status === 200) {
				if (this.usuarioPerfil === 'cliente') this.$router.push('/')
				else this.$router.push('/cadastroColetas')
				this.$q.notify({
					message: 'Coleta cadastrado com sucesso.',
					type: 'positive'
				})
			} else this.responseError(response)
		},
		onReset() {
			if (this.usuarioPerfil === 'cliente') this.$router.push('/')
			else if (!this.showBool && this.coleta.id) this.showBool = true
			else this.$router.push('/cadastroColetas')
		},
		async pesquisarCep(endereco, idx) {
			this.cepLoading = true
			let r = await this.buscarCep(endereco.cep)
			if (r) {
				endereco.endereco = r.logradouro
				endereco.bairro = r.bairro
				endereco.cidade = r.localidade
				endereco.estado = r.uf
				if (idx !== undefined) {
					if (this.$refs['endereco_numero' + idx]) this.$refs['endereco_numero' + idx][0].focus()
				} else this.$refs.endereco_numero.focus()
			}
			this.cepLoading = false
			this.geocodeEndereco(idx)
		},
		removerEnderecoEntrega(index) {
			this.$q
				.dialog({
					title: 'Confirmação',
					message: 'Tem certeza que deseja remover este endereço de entrega?',
					ok: 'Sim',
					cancel: 'Não'
				})
				.onOk(() => {
					this.coleta.enderecosEntregas.splice(index, 1)
					this.$q.notify({
						message: 'Endereço de entrega removido com sucesso',
						type: 'positive'
					})
					this.calcularValorColeta()
				})
		},
		removerColeta() {
			this.$q.dialog({ title: 'Confirmação', message: 'Tem certeza que deseja remover esta coleta? Esta ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				var response = await this.executeMethod({ url: 'api/Coletas/' + this.usuario.id, method: 'delete' })
				if (response.status === 200) {
					this.$q.notify({
						message: 'Coleta removido com sucesso',
						type: 'positive'
					})
					this.$router.push('/cadastroColetas')
				}
			})
		},
		async buscar() {
			if (this.$route.params.id) {
				let response = await this.executeMethod({ url: `api/Coletas/show/${this.$route.params.id}`, method: 'get' })
				if (response.status === 200) {
					if (response.data.cliente) this.clienteOptions = [response.data.cliente]
					if (response.data.motoboy) this.motoboyOptions = [response.data.motoboy]
					this.coleta = response.data
					this.selecionarBoletins()
				} else {
					this.$q.notify({
						message: 'Coleta não encontrado',
						type: 'negative'
					})
					this.$router.push('/cadastroColetas')
				}
				this.showBool = this.$route.meta.show
			}
			if (this.coleta.enderecosEntregas.length === 0) this.adicionarEnderecoEntrega()
			this.calcularValorColeta(false, false)
		},
		async geocodeEndereco(index) {
			if (index !== undefined && this.testarEndereco(this.coleta.enderecosEntregas[index])) {
				let pos = await this.buscarGeocode(this.formatarEndereco(this.coleta.enderecosEntregas[index]))
				this.coleta.enderecosEntregas[index].latitude = pos.lat
				this.coleta.enderecosEntregas[index].longitude = pos.lng
			} else if (this.testarEndereco(this.coleta)) {
				let pos = await this.buscarGeocode(this.formatarEndereco(this.coleta))
				this.coleta.latitude = pos.lat
				this.coleta.longitude = pos.lng
			}
			this.calcularValorColeta(false)
		},
		async calcularValorColeta(testar, alterarValor) {
			if (!this.testarEndereco(this.coleta) || this.coleta.enderecosEntregas.length === 0 || !this.testarEndereco(this.coleta.enderecosEntregas[0])) {
				if (testar !== false) this.$q.notify({ message: 'É necessário inserir endereço de coleta e entrega para calcular o valor!', type: 'negative' })
				this.pontoDestino = undefined
				this.pontosEntre = []
				this.coleta.valor_entrega = '0,00'
			} else {
				let pontos = []
				pontos.push(this.coordsDefault)
				pontos.push({ lat: parseFloat(this.coleta.latitude), lng: parseFloat(this.coleta.longitude) })
				let pontosEntre = []
				pontosEntre.push({ location: { lat: parseFloat(this.coleta.latitude), lng: parseFloat(this.coleta.longitude) } })
				let retornos = 0
				for (let index in this.coleta.enderecosEntregas) {
					let item = this.coleta.enderecosEntregas[index]
					pontos.push({ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) })
					if (item.retorno === '1') retornos++
					if (parseInt(index) === this.coleta.enderecosEntregas.length - 1) this.pontoDestino = { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }
					else pontosEntre.push({ location: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) } })
				}
				this.pontosEntre = pontosEntre

				if (alterarValor !== false) {
					let tipo = this.coleta.tipo_entrega === 'Expresso' ? 'expresso' : 'normal'
					let veiculo = this.coleta.tipo_veiculo.toLowerCase() === 'caminhão' ? 'caminhao' : this.coleta.tipo_veiculo.toLowerCase()
					let totalKm = await this.calcularTotalKm(pontos)
					let valorKm = parseFloat(this.configuracao['entrega_' + tipo + '_km_minimo'])
					let valorVeiculo = parseFloat(this.configuracao['entrega_' + tipo + '_km_' + veiculo])
					let valorRetorno = parseFloat(this.configuracao['entrega_' + tipo + '_retorno_minimo'])

					let p1 = parseFloat(this.configuracao['entrega_' + tipo + '_valor_minimo']) * this.coleta.enderecosEntregas.length
					let p2 = (totalKm < valorKm ? valorKm : totalKm - valorKm) * valorVeiculo
					let p3 = totalKm < valorKm ? valorKm - totalKm : totalKm - valorKm
					let p4 = valorRetorno * retornos
					this.coleta.valor_entrega = (p1 + p2 + p3 + p4).toFixed(2).replace('.', ',')
				}
			}
		}
	},
	async created() {
		var response = await this.executeMethod({ url: 'api/Configuracoes', method: 'get' })
		if (response.status === 200) this.configuracao = response.data
		if (this.usuarioPerfil === 'cliente') {
			response = await this.executeMethod({ url: 'api/Clientes/meusDados', method: 'get' })
			if (response.status === 200) {
				this.coleta.cliente_id = response.data.id
				this.clienteOptions.push(response.data)
			}
		}
		this.buscar()
	}
}
</script>
<style>
.div-input-add .q-field__input {
	min-width: 0 !important;
}
</style>
