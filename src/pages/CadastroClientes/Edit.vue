<template>
	<div>
		<q-card>
			<q-card-section>
				<q-item-label class="text-h6 text-primary">Cadastro de Clientes</q-item-label>
			</q-card-section>
			<q-separator></q-separator>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="cliente.nome" label="Nome*" :rules="[valRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="cliente.cpf" label="CPF/CNPJ*" v-mask="['###.###.###-##', '##.###.###/####-##']" :rules="[valRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="cliente.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[valRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="cliente.email" label="E-mail*" :rules="[valRequired, valEmail]" :readonly="showBool"></q-input>
					</div>

					<div class="col-12">
						<q-input v-model="cliente.observacoes" type="textarea" label="Observações" :readonly="showBool"></q-input>
					</div>
				</q-card-section>
				<q-card-section class="row q-col-gutter-sm">
						<q-item-label class="col-12 text-h6 text-primary">
							Endereço
						</q-item-label>
						<div class="col-xl-1 col-xs-3">
							<q-input v-model="cliente.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[valRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-3 col-xs-3">
							<q-input v-model="cliente.rua" label="Rua*" :loading="cepLoading" :rules="[valRequired]" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-1 col-xs-3">
							<q-input v-model="cliente.numero" label="Número" :loading="cepLoading" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-2 col-xs-3">
							<q-input v-model="cliente.complemento" label="Complemento" :loading="cepLoading" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-2 col-xs-3">
							<q-input v-model="cliente.bairro" label="Bairro*" :loading="cepLoading" :rules="[valRequired]" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-2 col-xs-3">
							<q-input v-model="cliente.cidade" label="Cidade*" :loading="cepLoading" :rules="[valRequired]" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-1 col-xs-3">
							<q-select v-model="cliente.estado" label="Estado*" :options="estadosOptions" :loading="cepLoading" :rules="[valRequired]"></q-select>
						</div>
				</q-card-section>
				<q-card-section>
					<q-item-label class="text-h6 text-primary">
						Contatos
						<q-btn icon="add" color="primary" flat dense @click="adicionarContato"></q-btn>
					</q-item-label>
					<q-list separator>
						<transition-group enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
							<q-item v-for="(contato, index) in cliente.contatos" :key="'contato'+index">
								<q-item-section side class="text-primary text-h6 text-bold">
									{{index}} -
								</q-item-section>
								<q-item-section>
									<div class="row q-col-gutter-sm">
										<div class="col-4">
											<q-input v-model="contato.nome" label="Nome*" :rules="[valRequired]" :readonly="showBool"></q-input>
										</div>
										<div class="col-4">
											<q-input v-model="contato.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[valRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="showBool"></q-input>
										</div>
										<div class="col-4">
											<q-input v-model="contato.email" label="E-mail*" :rules="[valRequired, valEmail]" :readonly="showBool"></q-input>
										</div>
									</div>
								</q-item-section>
								<q-item-section side>
									<q-btn icon="close" color="primary" flat @click="removerContato(index)"></q-btn>
								</q-item-section>
							</q-item>
						</transition-group>
					</q-list>
				</q-card-section>
				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-6 text-grey-6">
						*Campos obrigatórios
					</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerCliente"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>

						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
			</q-form>
		</q-card>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	data: () => ({
		cepLoading: false,
		estadosOptions: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
		showBool: false,
		cliente: {
			nome: "",
			cpf: "",
			telefone: "",
			email: "",
			cep: "",
			rua: "",
			número: "",
			complemento: "",
			bairro: "",
			cidade: "",
			estado: "",
			contatos: [
				{
					nome: "",
					telefone: "",
					email: ""
				}
			],
			observações: "",
		},
	}),
	computed: {
		...mapGetters({
			selectCliente: "selectCliente"
		}),
	},
	methods: {
		adicionarContato() {
			this.cliente.contatos.push({
				nome: "",
				telefone: "",
				email: ""
			})
		},
		onSubmit() {
			this.$store.dispatch("adicionarCliente", this.cliente);
			this.$router.push("/cadastroClientes");
			this.$q.notify({
				message: "Cliente cadastrado com sucesso.",
				type: "positive"
			})
		},
		onReset() {
			console.log(!this.showBool && this.cliente.id)
			if(!this.showBool && this.cliente.id) {
				this.showBool = true;
			} else {
				this.$router.push("/cadastroClientes");
			}
		},
		pesquisarCep() {
			let cep = this.cliente.cep.replace(/[^0-9]/g, "");
			if(cep.length != 8) {
				return false;
			}
			this.cepLoading = true;

			this.$axios.request({
				method: "get",
				url: "https://viacep.com.br/ws/" + cep + "/json/"
			}).then(response => {
				this.cepLoading = false;
				this.cliente.rua = response.data.logradouro;
				this.cliente.bairro = response.data.bairro;
				this.cliente.cidade = response.data.localidade;
				this.cliente.estado = response.data.uf;
				this.$refs.rua.focus();
			}).catch(error => {
				console.log("ERROR", error);
			})
		},
		removerContato(index) {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este contato?",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.cliente.contatos.splice(index, 1);
				this.$q.notify({
					message: "Contato removido com sucesso",
					type: "positive"
				})
			})
		},
		removerCliente() {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerCliente", this.cliente.id);
				this.$q.notify({
					message: "Cliente removido com sucesso",
					type: "positive"
				})
				this.$router.push("/cadastroClientes")
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
			let selectedCliente = this.selectCliente(this.$route.params.id)
			if(selectedCliente) this.cliente = {...selectedCliente[0]};
			else {
				this.$q.notify({
					message: "Cliente não encontrado",
					type: "negative"
				})
				this.$router.push("/cadastroClientes")
			}

			this.showBool = this.$route.meta.show
		}
	}
}
</script>

<style lang="sass">
</style>