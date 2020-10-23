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
							<q-input v-model="cliente.nome" label="Nome*" :rules="[valRequired]"></q-input>
						</div>
						<div class="col-3">
							<q-input v-model="cliente.cpf" label="CPF/CNPJ*" v-mask="['###.###.###-##', '##.###.###/####-##']" :rules="[valRequired, val => (val.length == 14 || val.length == 18) || 'CPF/CNPJ inválido']"></q-input>
						</div>
						<div class="col-3">
							<q-input v-model="cliente.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[valRequired, val => val.length >= 14 || 'Telefone incompleto']"></q-input>
						</div>
						<div class="col-3">
							<q-input v-model="cliente.email" label="E-mail*" :rules="[valRequired, valEmail]"></q-input>
						</div>

						<div class="col-12">
							<q-input v-model="cliente.observacoes" type="textarea" label="Observações"></q-input>
						</div>
					</q-card-section>
					<q-card-section class="row q-col-gutter-sm">
							<q-item-label class="col-12 text-h6 text-primary">
								Endereço
							</q-item-label>
							<div class="col-xl-1 col-xs-3">
								<q-input v-model="cliente.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[valRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep"></q-input>
							</div>
							<div class="col-xl-3 col-xs-3">
								<q-input v-model="cliente.rua" label="Rua*" :loading="cepLoading" :rules="[valRequired]"></q-input>
							</div>
							<div class="col-xl-1 col-xs-3">
								<q-input v-model="cliente.numero" label="Número" :loading="cepLoading"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.complemento" label="Complemento" :loading="cepLoading"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.bairro" label="Bairro*" :loading="cepLoading" :rules="[valRequired]"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.cidade" label="Cidade*" :loading="cepLoading" :rules="[valRequired]"></q-input>
							</div>
							<div class="col-xl-1 col-xs-3">
								<q-select v-model="cliente.estado" label="Estado*" :options="estadosOptions" :loading="cepLoading" :rules="[valRequired]"></q-select>
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
	data: () => ({
		modalAberto: false,
		cepLoading: false,
		estadosOptions: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
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
			observações: "",
		},
	}),
	methods: {
		abrirModal() {
			this.modalAberto = true;
		},
		onSubmit() {
			this.$store.dispatch("adicionarCliente", this.cliente);
			this.$emit("clienteCadastrado", this.cliente);
			this.modalAberto = false;
			this.cliente = {
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
				observações: "",
			}
			this.$q.notify({
				message: "Cliente cadastrado com sucesso.",
				type: "positive"
			})
		},
		onReset() {
			this.modalAberto = false;
			this.cliente =  {
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
				observações: "",
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
		valEmail(val) {
			let index = val.indexOf("@");
			return (index > 0 && val.includes(".", index)) || "Este email é inválido."
		},
		valRequired(val) {
			return val !== null && val !== "" || "Este campo é obrigatório."
		}
	}
}
</script>

<style>

</style>