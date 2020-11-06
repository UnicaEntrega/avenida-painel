<template>
	<div>
		<q-card>
			<q-card-section>
				<q-item-label class="text-h6 text-primary">Cadastro de Coletas</q-item-label>
			</q-card-section>
			<q-separator></q-separator>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-8" v-if="usuarioPerfil!=='Cliente'">
						<q-select v-model="coleta.cliente_id" :options="clienteOptions" option-label="nome" option-value="id" map-options emit-value label="Cliente*" :rules="[validatorRequired]" :readonly="showBool" use-input filled @filter="buscarCliente">
							<q-btn slot="after" icon="add" color="primary" @click="abrirModalCliente" v-if="!showBool"></q-btn>
						</q-select>
					</div>
					<div class="col-3" :class="usuarioPerfil==='Cliente' ? '' : 'offset-1'">
						<q-select v-model="coleta.status" :options="coletaStatusOptions"  label="Status*" :rules="[validatorRequired]" :readonly="showBool"></q-select>
					</div>
				</q-card-section>

				<q-card-section class="row q-col-gutter-sm">
					<q-item-label class="col-12 text-h6 text-primary">
						Endereço de Coleta
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
						<q-input v-model="coleta.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-xl-1 col-xs-3">
						<q-input v-model="coleta.endereco_numero" label="Número" :loading="cepLoading" :readonly="showBool" ref="endereco_numero"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.complemento" label="Complemento" :loading="cepLoading" :readonly="showBool"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-xl-1 col-xs-3">
						<q-select v-model="coleta.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]"></q-select>
					</div>
				</q-card-section>

				<q-card-section>
					<q-item-label class="col-12 text-h6 text-primary">
						Endereços de Entrega
						<q-btn icon="add" color="primary" flat @click="adicionarEnderecoEntrega" v-if="!showBool"></q-btn>
					</q-item-label>
					<q-list class="q-gutter-y-md" separator>
						<q-item v-for="(endereco, index) in coleta.enderecosEntregas" :key="'endereco-'+index">
							<q-item-section>
								<div class="row q-col-gutter-sm">
									<div class="col-3">
										<q-input v-model="endereco.quem" label="Pra Quem Entrega" :rules="[validatorRequired]" :readonly="showBool"></q-input>
									</div>
									<div class="col-3">
										<q-input v-model="endereco.telefone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="showBool"></q-input>
									</div>
									<div class="col-3">
										<q-select v-model="endereco.retorno" :options="simNaoOptions" map-options emit-value label="Com Retorno" :rules="[validatorRequired]" :readonly="showBool"></q-select>
									</div>
									<div class="col-xl-3"></div>
									<div class="col-xl-1 col-xs-3">
										<q-input v-model="endereco.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[validatorRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep(endereco,index)" :readonly="showBool"></q-input>
									</div>
									<div class="col-xl-3 col-xs-3">
										<q-input v-model="endereco.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
									</div>
									<div class="col-xl-1 col-xs-3">
										<q-input v-model="endereco.endereco_numero" label="Número" :loading="cepLoading" :readonly="showBool" :ref="'endereco_numero'+index"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.complemento" label="Complemento" :loading="cepLoading" :readonly="showBool"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
									</div>
									<div class="col-xl-1 col-xs-3">
										<q-select v-model="endereco.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]"></q-select>
									</div>
								</div>
							</q-item-section>
							<q-item-section side>
								<q-btn icon="close" color="negative" flat @click="removerEnderecoEntrega(index)" v-if="!showBool"></q-btn>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>

				<q-card-section class="row q-col-gutter-sm">
					<div class="col-12 q-pb-md">
						<q-input v-model="coleta.observacao" type="textarea" label="Observações" :readonly="showBool"></q-input>
					</div>					
					<div class="col-3">
						<q-select v-model="coleta.tipo_entrega" :options="tipoEntregaOptions" label="Tipo da Entrega" :rules="[validatorRequired]" :readonly="showBool"></q-select>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.valor_entrega" label="Valor da Entrega" :rules="[validatorRequired]" :readonly="showBool" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.forma_pagamento" :options="formaPagamentoOptions" label="Forma de Pagamento" :rules="[validatorRequired]" :readonly="showBool"></q-select>
					</div>
					<div class="col-3" v-if="coleta.forma_pagamento==='Boleto'">
						<q-input v-model="coleta.numero_boleto" label="Número do Boleto" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.motoboy_id" :options="motoboyOptions" option-label="nome" option-value="id" map-options emit-value label="Motoboy*" :rules="[validatorRequired]" :readonly="showBool" use-input filled @filter="buscarMotoboy"/>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.comissao" label="Porcentagem de Comissão" :rules="[validatorRequired]" :readonly="showBool" mask="#,##" fill-mask="0" reverse-fill-mask suffix="%"></q-input>
					</div>
					<div class="col-12 q-pb-md" v-if="showBool && !isBlank(coleta.observacao_cancelamento)">
						<q-input v-model="coleta.observacao_cancelamento" type="textarea" label="Observações de cancelamento" :readonly="showBool"></q-input>
					</div>	
				</q-card-section>

				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-6 text-grey-6">
						*Campos obrigatórios
					</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Status" icon="refresh" color="primary" flat @click="abrirModalStatus"></q-btn>
						<q-btn v-if="showBool" label="Motoboy" icon="refresh" color="primary" flat @click="abrirModalMotoboy"></q-btn>
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerColeta"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
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
						<q-item v-for="status in coletaStatusOptions" :key="status" :class="c_statusItem(status)" clickable @click="selecionarStatus(status)">
							<q-item-section>
								{{status}}
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row justify-end">
					<q-btn label="Cancelar" color="negative" no-caps flat v-close-popup></q-btn>
					<q-btn label="Confirmar" color="positive" no-caps v-close-popup></q-btn>
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
					<q-select v-model="coleta.motoboy_id" :options="motoboyOptions" option-label="nome" option-value="id" map-options emit-value label="Motoboy*" :rules="[validatorRequired]" use-input filled @filter="buscarMotoboy"/>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row justify-end">
					<q-btn label="Cancelar" color="negative" no-caps flat v-close-popup></q-btn>
					<q-btn label="Confirmar" color="positive" no-caps v-close-popup></q-btn>
				</q-card-section>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
import ModalCliente from "../../components/ModalCliente.vue"
export default {
	components: {
		ModalCliente
	},
	data () {
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
				quem: '',
				telefone: '',
				observacao: '',
				tipo_entrega: '',
				valor_entrega: 0,
				forma_pagamento: '',
				numero_boleto: '',
				motoboy_id: '',
				comissao: 0,
				status: '',
				observacao_cancelamento: '',
				enderecosEntregas: []
			},
			cepLoading: false,
			showBool: false,
			clienteOptions: [],
			motoboyOptions: [],
			modalStatus: false,
			modalMotoboy: false,
		}
	},
	computed: {
		c_statusItem() {
			return (status) => {
				return status == this.coleta.status ? "bg-primary shadow-2 rounded-borders text-white" : ""
			}
		}
	},
	methods: {
		abrirModalStatus() {
			this.modalStatus = true;
		},
		selecionarStatus(status) {
			this.coleta.status = status;
		},
		abrirModalMotoboy() {
			this.modalMotoboy = true;
		},
		selecionarMotoboy(motoboy) {
			this.coleta.motoboy = motoboy;
		},
		async buscarCliente(val,update,abort) {
			let data = {url: 'api/Clientes', method: 'get', params: {
					page: 1,
					rowsPerPage: 20,
					sortBy: 'nome',
					descending: false,
					filter: val
				}
			}
			var response = await this.executeMethod(data)
			if (response.status===200) this.clienteOptions = response.data.data
			update()
		},
		async buscarMotoboy(val,update,abort) {
			let data = {url: 'api/Motoboys', method: 'get', params: {
					page: 1,
					rowsPerPage: 20,
					sortBy: 'nome',
					descending: false,
					filter: val
				}
			}
			var response = await this.executeMethod(data)
			if (response.status===200) this.motoboyOptions = response.data.data
			update()
		},
		adicionarEnderecoEntrega() {
			this.coleta.enderecosEntregas.push({
				cep: "",
				endereco: "",
				endereco_numero: "",
				complemento: "",
				bairro: "",
				cidade: "",
				estado: "",
				retorno: '',
				quem: '',
				telefone: ''
			})
		},
		abrirModalCliente() {
			this.$refs.modalCliente.abrirModal();
		},
		clienteCadastrado(cliente) {
			this.coleta.cliente_id = cliente.id
			this.clienteOptions = [cliente]
		},
		async onSubmit() {
			var response = await this.executeMethod({url:'api/Coletas'+(this.coleta.id ? '/'+this.coleta.id : ''),method:this.coleta.id ? 'put' : 'post',data:this.coleta})
			if (response.status===200) {
				if (this.usuarioPerfil==='Cliente') this.$router.push("/");
				else this.$router.push("/cadastroColetas");
				this.$q.notify({
					message: "Coleta cadastrado com sucesso.",
					type: "positive"
				})
			}
			else {
				this.$q.notify({
					message: response.data.error.message,
					type: "negative"
				})
			}
		},
		onReset() {
			if (this.usuarioPerfil==='Cliente') this.$router.push("/");
			else if (!this.showBool && this.coleta.id) this.showBool = true;
			else this.$router.push("/cadastroColetas");
		},
		async pesquisarCep(endereco,idx) {
			this.cepLoading = true;
			let r = await this.buscarCep(endereco.cep)
			if (r) {
				endereco.endereco = r.logradouro
				endereco.bairro = r.bairro
				endereco.cidade = r.localidade
				endereco.estado = r.uf
				if (idx) {
					if (this.$refs['endereco_numero'+idx]) this.$refs['endereco_numero'+idx][0].focus()
				}
				else this.$refs.endereco_numero.focus()
			}
			this.cepLoading = false;
		},
		removerEnderecoEntrega(index) {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este endereço de entrega?",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.coleta.enderecosEntregas.splice(index, 1);
				this.$q.notify({
					message: "Endereço de entrega removido com sucesso",
					type: "positive"
				})
			})
		},
		removerColeta() {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover esta coleta? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
        var response = await this.executeMethod({url:'api/Coletas/'+this.usuario.id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Coleta removido com sucesso",
						type: "positive"
					})
					this.$router.push("/cadastroColetas")
				}
			})
		}
	},
	async created() {
		if (this.$route.params.id) {
			let response = await this.executeMethod({url:`api/Coletas/show/${this.$route.params.id}`,method:'get'})
			if (response.status===200) {
				if (response.data.cliente) this.clienteOptions = [response.data.cliente]
				if (response.data.motoboy) this.motoboyOptions = [response.data.motoboy]
				this.coleta = response.data
			}
			else {
				this.$q.notify({
					message: "Coleta não encontrado",
					type: "negative"
				})
				this.$router.push("/cadastroColetas")
			}
			this.showBool = this.$route.meta.show
		}
		if (this.coleta.enderecosEntregas.length===0) this.adicionarEnderecoEntrega()
	}
}
</script>