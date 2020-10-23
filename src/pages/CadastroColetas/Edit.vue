<template>
	<div>
		<q-card>
			<q-card-section>
				<q-item-label class="text-h6 text-primary">Cadastro de Coletas</q-item-label>
			</q-card-section>
			<q-separator></q-separator>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-8">
						<q-select v-model="coleta.cliente" :options="clientesFiltrados" option-label="nome" label="Nome*" :rules="[valRequired]" :readonly="isShowRoute" use-input filled @filter="filterFn">
							<q-btn slot="after" icon="add" color="primary" @click="abrirModalCliente"></q-btn>
						</q-select>
					</div>
					<div class="col-3 offset-1">
						<q-select v-model="coleta.status" :options="['Aberto', 'Encaminhado', 'Em Coleta', 'Em Entrega', 'Finalizado', 'Cancelado']"  label="Status*" :rules="[valRequired]" :readonly="isShowRoute"></q-select>
					</div>
				</q-card-section>

				<q-card-section class="row q-col-gutter-sm">
					<q-item-label class="col-12 text-h6 text-primary">
						Endereço de Coleta
					</q-item-label>
					<div class="col-3">
						<q-input v-model="coleta.responsavelColeta.nome" label="Com Quem Coleta" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.responsavelColeta.telefone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[valRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-xl-6"></div>

					<div class="col-xl-1 col-xs-3">
						<q-input v-model="coleta.enderecoColeta.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[valRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep(coleta.enderecoColeta)" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-xl-3 col-xs-3">
						<q-input v-model="coleta.enderecoColeta.rua" label="Rua*" :loading="cepLoading" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-xl-1 col-xs-3">
						<q-input v-model="coleta.enderecoColeta.numero" label="Número" :loading="cepLoading" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.enderecoColeta.complemento" label="Complemento" :loading="cepLoading" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.enderecoColeta.bairro" label="Bairro*" :loading="cepLoading" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-xl-2 col-xs-3">
						<q-input v-model="coleta.enderecoColeta.cidade" label="Cidade*" :loading="cepLoading" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-xl-1 col-xs-3">
						<q-select v-model="coleta.enderecoColeta.estado" label="Estado*" :options="estadosOptions" :loading="cepLoading" :rules="[valRequired]"></q-select>
					</div>
				</q-card-section>

				<q-card-section>
					<q-item-label class="col-12 text-h6 text-primary">
						Endereços de Entrega
						<q-btn icon="add" color="primary" flat @click="adicionarEnderecoEntrega"></q-btn>
					</q-item-label>
					<q-list class="q-gutter-y-md" separator>
						<q-item v-for="(endereco, index) in coleta.enderecosEntrega" :key="'endereco-'+index">
							<q-item-section side class="text-h5 text-primary text-bold">
								{{index}} -
							</q-item-section>
							<q-item-section>
								<div class="row q-col-gutter-sm">
									<div class="col-3">
										<q-input v-model="endereco.destinatario.nome" label="Pra Quem Entrega" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-3">
										<q-input v-model="endereco.destinatario.telefone" label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[valRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-xl-6"></div>

									<div class="col-xl-1 col-xs-3">
										<q-input v-model="endereco.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[valRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep(endereco)" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-xl-3 col-xs-3">
										<q-input v-model="endereco.rua" label="Rua*" :loading="cepLoading" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-xl-1 col-xs-3">
										<q-input v-model="endereco.numero" label="Número" :loading="cepLoading" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.complemento" label="Complemento" :loading="cepLoading" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.bairro" label="Bairro*" :loading="cepLoading" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-xl-2 col-xs-3">
										<q-input v-model="endereco.cidade" label="Cidade*" :loading="cepLoading" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
									</div>
									<div class="col-xl-1 col-xs-3">
										<q-select v-model="endereco.estado" label="Estado*" :options="estadosOptions" :loading="cepLoading" :rules="[valRequired]"></q-select>
									</div>
								</div>
							</q-item-section>
							<q-item-section side>
								<q-btn icon="close" color="negative" flat @click="removerEnderecoEntrega(index)"></q-btn>
							</q-item-section>
						</q-item>

					</q-list>
				</q-card-section>

				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="coleta.telefone" label="Telefone" :rules="[valRequired, val => val.length >= 14 || 'Telefone incompleto']" v-mask="['(##) ####-####', '(##) #####-####']" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.comRetorno" :options="['Sim', 'Não']" label="Com Retorno" :rules="[valRequired]" :readonly="isShowRoute"></q-select>
					</div>

					<div class="col-12 q-pb-md">
						<q-input v-model="coleta.observacoes" type="textarea" label="Observações" :readonly="isShowRoute"></q-input>
					</div>
					
					<div class="col-3">
						<q-select v-model="coleta.tipoEntrega" :options="['Expresso', 'Convencional']" label="Tipo da Entrega" :rules="[valRequired]" :readonly="isShowRoute"></q-select>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.valorEntrega" label="Valor da Entrega" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.formaPagamento" :options="['Dinheiro', 'Boleto', 'Crédito', 'Débito', 'Depósito']" label="Tipo da Entrega" :rules="[valRequired]" :readonly="isShowRoute"></q-select>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.numeroBoleto" label="Número do Boleto" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="coleta.motoboy" :options="motoboys" option-label="nome" label="Nome*" :rules="[valRequired]" :readonly="isShowRoute"></q-select>
					</div>
					<div class="col-3">
						<q-input v-model="coleta.porcentagemComissao" label="Porcentagem de Comissão" :rules="[valRequired]" :readonly="isShowRoute"></q-input>
					</div>
				</q-card-section>

				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-6 text-grey-6">
						*Campos obrigatórios
					</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="isShowRoute" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="isShowRoute" label="Remover" icon="delete" color="negative" flat @click="removerColeta"></q-btn>
						<q-btn v-if="isShowRoute" label="Editar" icon="edit" color="primary" @click="isShowRoute = false"></q-btn>

						<q-btn v-if="!isShowRoute" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!isShowRoute" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
			</q-form>
		</q-card>
		<modal-cliente ref="modalCliente" @clienteCadastrado="clienteCadastrado"></modal-cliente>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import ModalCliente from "../../components/ModalCliente.vue"

export default {
	components: {
		ModalCliente
	},
	data: () => ({
		cepLoading: false,
		estadosOptions: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
		isShowRoute: false,
		clientesFiltrados: [],
		coleta: {
			id: "",
			cliente: {
				nome: "",
			},
			enderecoColeta: {
				cep: "",
				rua: "",
				numero: "",
				complemento: "",
				bairro: "",
				cidade: "",
				estado: "",
			},
			responsavelColeta: {
				nome: "",
				telefone: "",
			},
			telefone: "",
			enderecosEntrega: [
				{
					cep: "",
					rua: "",
					numero: "",
					complemento: "",
					bairro: "",
					cidade: "",
					estado: "",
					destinatario: {
						nome: "",
						telefone: "",
					},
				},
			],
			comRetorno: "",
			observacoes: "",
			tipoEntrega: "",
			valorEntrega: "",
			formaPagamento: "",
			numeroBoleto: "",
			motoboy: {
				nome: "",
			},
			porcentagemComissao: "",
		},
	}),
	computed: {
		...mapGetters({
			selectColeta: "selectColeta",
			clientes: "clientes",
			motoboys: "motoboys"
		}),
	},
	methods: {
		adicionarEnderecoEntrega() {
			this.coleta.enderecosEntrega.push({
				cep: "",
				rua: "",
				numero: "",
				complemento: "",
				bairro: "",
				cidade: "",
				estado: "",
				destinatario: {
					nome: "",
					telefone: "",
				},
			})
		},
		abrirModalCliente() {
			this.$refs.modalCliente.abrirModal();
		},
		clienteCadastrado(cliente) {
			console.log("IHSDAPDIHP", cliente);
			this.coleta.cliente = cliente;
		},
		filterFn(val, update) {
			if(val == "") {
				update(() => {
					this.clientesFiltrados = this.clientes;
				})
			} else {
				update(() => {
					this.clientesFiltrados = this.clientes.filter(v => v.nome.toLowerCase().includes(val.toLowerCase()));
				})
			}
		},
		onSubmit() {
			this.$store.dispatch("adicionarColeta", this.coleta);
			this.$router.push("/cadastroColetas");
			this.$q.notify({
				message: "Coleta cadastrado com sucesso.",
				type: "positive"
			})
		},
		onReset() {
			if(!this.isShowRoute && this.coleta.id) {
				this.isShowRoute = true;
			} else {
				this.$router.push("/cadastroColetas");
			}
		},
		pesquisarCep(endereco) {
			let cep = endereco.cep.replace(/[^0-9]/g, "");
			if(cep.length != 8) {
				return false;
			}
			this.cepLoading = true;

			this.$axios.request({
				method: "get",
				url: "https://viacep.com.br/ws/" + cep + "/json/"
			}).then(response => {
				this.cepLoading = false;
				endereco.rua = response.data.logradouro;
				endereco.bairro = response.data.bairro;
				endereco.cidade = response.data.localidade;
				endereco.estado = response.data.uf;
				this.$refs.rua.focus();
			}).catch(error => {
				console.log("ERROR", error);
			})
		},
		removerEnderecoEntrega(index) {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este endereço de entrega?",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.coleta.enderecosEntrega.splice(index, 1);
				this.$q.notify({
					message: "Endereço de entrega removido com sucesso",
					type: "positive"
				})
			})
		},
		removerColeta() {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerColeta", this.coleta.id);
				this.$q.notify({
					message: "Coleta removido com sucesso",
					type: "positive"
				})
				this.$router.push("/cadastroColetas")
			})
		},
		valEmail(val) {
			let index = val.indexOf("@");
			return (index > 0 && val.includes(".", index)) || "Este email é inválido."
		},
		valRequired(val) {
			return val !== null && val !== "" || "Este campo é obrigatório."
		}
	},
	created() {
		if(this.$route.params.id) {
			let selectedColeta = JSON.parse(JSON.stringify(this.selectColeta(this.$route.params.id)))
			if(selectedColeta) this.coleta = {...selectedColeta[0]};
			else {
				this.$q.notify({
					message: "Coleta não encontrado",
					type: "negative"
				})
				this.$router.push("/cadastroColetas")
			}

			this.isShowRoute = this.$route.meta.show
		}
	}
}
</script>

<style lang="sass">
</style>