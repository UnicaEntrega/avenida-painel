<template>
	<div>
		<q-dialog v-model="modalAberto" full-width>
			<q-card>
				<q-card-section>
					<q-item-label class="text-h6 text-primary">Cadastro de Clientes</q-item-label>
				</q-card-section>
				<q-separator></q-separator>
				<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
					<q-card-section class="row q-col-gutter-sm">
						<div class="col-3">
							<q-input v-model="cliente.nome" label="Nome*" :rules="[validatorRequired]"></q-input>
						</div>
						<div class="col-3">
							<q-input v-model="cliente.cpf_cnpj" label="CPF/CNPJ*" v-mask="['###.###.###-##', '##.###.###/####-##']" :rules="[validatorRequired, val => ((val.length == 14 && testarCpf(val)) || (val.length == 18 && testarCnpj(val))) || 'CPF/CNPJ inválido']"></q-input>
						</div>
						<div class="col-3">
							<q-input v-model="cliente.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']"></q-input>
						</div>
						<div class="col-3">
							<q-input v-model="cliente.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]"></q-input>
						</div>

						<div class="col-12">
							<q-input v-model="cliente.observacao" type="textarea" label="Observações"></q-input>
						</div>
					</q-card-section>
					<q-card-section class="row q-col-gutter-sm">
							<q-item-label class="col-12 text-h6 text-primary">
								Endereço
							</q-item-label>
							<div class="col-xl-1 col-xs-3">
								<q-input v-model="cliente.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[validatorRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep"></q-input>
							</div>
							<div class="col-xl-3 col-xs-3">
								<q-input v-model="cliente.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-xl-1 col-xs-3">
								<q-input v-model="cliente.endereco_numero" label="Número" :loading="cepLoading" ref="endereco_numero"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.complemento" label="Complemento" :loading="cepLoading"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-xl-1 col-xs-3">
								<q-select v-model="cliente.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]"></q-select>
							</div>
					</q-card-section>
					<q-card-section class="q-col-gutter-md row items-center">
						<div class="col-6 text-grey-6">
							*Campos obrigatórios
						</div>
						<div class="col-6 row justify-end">
							<q-btn label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
							<q-btn label="Salvar" icon="save" type="submit" color="primary"></q-btn>
						</div>
					</q-card-section>
				</q-form>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
export default {
	data () {
		return {
			modalAberto: false,
			cepLoading: false,
			cliente: this.clienteDefault()
		}
	},
	methods: {
		clienteDefault() {
			return {
				nome: "",
				cpf_cnpj: "",
				telefone: "",
				email: "",
				cep: "",
				endereco: "",
				endereco_numero: "",
				complemento: "",
				bairro: "",
				cidade: "",
				estado: "",
				observacao: ""
			}
		},
		abrirModal() {
			this.modalAberto = true;
		},
		async onSubmit() {
			var response = await this.executeMethod({url:'api/Clientes',method:'post',data:this.cliente})
			if (response.status===200) {
				this.$emit("clienteCadastrado", response.data);
				this.modalAberto = false;
				this.$q.notify({
					message: "Cliente cadastrado com sucesso.",
					type: "positive"
				})
				this.cliente = this.clienteDefault()
			}
		},
		onReset() {
			this.modalAberto = false;
			this.cliente = this.clienteDefault()
		},
		async pesquisarCep() {
			this.cepLoading = true;
			let r = await this.buscarCep(this.cliente.cep)
			if (r) {
				this.cliente.endereco = r.logradouro
				this.cliente.bairro = r.bairro
				this.cliente.cidade = r.localidade
				this.cliente.estado = r.uf
				this.$refs.endereco_numero.focus()
			}
			this.cepLoading = false;
		}
	}
}
</script>