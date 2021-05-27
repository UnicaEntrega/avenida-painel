<template>
	<q-layout view="hHh Lpr lFf">
		<q-page-container>
			<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<q-page class="row items-start justify-center padding-page bg-primary">
					<div class="col-12 align-center bg-primary q-ma-md">
						<q-img src="images/avenida_web_marca_bco.png" width="150px" no-default-spinner></q-img>
					</div>
					<q-card class="padding-page">
						<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
							<h1 class="text-center text-h5 text-primary" v-if="step === 1">Cadastro de novo cliente</h1>
							<h1 class="text-center text-h5 text-primary" v-else>Cadastro sua senha</h1>
							<q-card-section class="row q-col-gutter-sm" v-show="step === 1">
								<q-item-label class="col-12 text-h6 text-primary">
									<q-icon name="person" size="md" class="q-mr-sm" />
									Dados Pessoais
								</q-item-label>
								<div class="col-12 col-sm-7 col-md-4">
									<q-input v-model="cliente.nome" label="Nome*" :rules="[validatorRequired]"></q-input>
								</div>
								<div class="col-6 col-sm-5 col-md-3">
									<q-input v-model="cliente.cpf_cnpj" label="CPF/CNPJ*" v-mask="['###.###.###-##', '##.###.###/####-##']" :rules="[validatorRequired, val => (val.length == 14 && testarCpf(val)) || (val.length == 18 && testarCnpj(val)) || 'CPF/CNPJ inválido']"></q-input>
								</div>
								<div class="col-6 col-sm-5 col-md-2">
									<q-input v-model="cliente.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']"></q-input>
								</div>
								<div class="col-12 col-sm-7 col-md-3">
									<q-input v-model="cliente.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]"></q-input>
								</div>
							</q-card-section>
							<q-card-section class="row q-col-gutter-sm" v-show="step === 1">
								<q-item-label class="col-12 text-h6 text-primary">
									<q-icon name="map" size="md" class="q-mr-sm" />
									Endereço
								</q-item-label>
								<div class="col-12 col-sm-3 col-md-2">
									<q-input v-model="cliente.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[validatorRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep"></q-input>
								</div>
								<div class="col-9 col-sm-9 col-md-8">
									<q-input v-model="cliente.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
								</div>
								<div class="col-3 col-sm-3 col-md-2">
									<q-input v-model="cliente.endereco_numero" label="Número" :loading="cepLoading" ref="endereco_numero"></q-input>
								</div>
								<div class="col-12 col-sm-9 col-md-4">
									<q-input v-model="cliente.complemento" label="Complemento" :loading="cepLoading"></q-input>
								</div>
								<div class="col-12 col-sm-5 col-md-3">
									<q-input v-model="cliente.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
								</div>
								<div class="col-8 col-sm-4 col-md-3">
									<q-input v-model="cliente.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
								</div>
								<div class="col-4 col-sm-3 col-md-2">
									<q-select v-model="cliente.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]"></q-select>
								</div>
							</q-card-section>
							<q-card-section class="row q-col-gutter-sm" v-if="step === 2">
								<div class="col-12">
									<q-input type="password" v-model="password" label="Senha*" :rules="[validatorRequired]"></q-input>
								</div>
								<div class="col-12">
									<q-input
										type="password"
										v-model="password2"
										label="Repita a senha*"
										:rules="[
											validatorRequired,
											val => {
												return val === password || 'As senhas não são iguais'
											}
										]"
									></q-input>
								</div>
							</q-card-section>
							<q-card-actions class="row justify-between">
								<q-btn label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat />
								<q-btn label="Avançar" icon-right="keyboard_arrow_right" type="submit" color="primary" v-if="step === 1" />
								<q-btn label="Concluir" icon="save" type="submit" color="primary" v-else />
							</q-card-actions>
						</q-form>
					</q-card>
				</q-page>
			</transition>
		</q-page-container>
	</q-layout>
</template>
<script>
export default {
	name: 'Login',
	data() {
		return {
			cepLoading: false,
			showBool: false,
			cliente: {
				nome: '',
				cpf_cnpj: '',
				telefone: '',
				email: '',
				cep: '',
				endereco: '',
				endereco_numero: '',
				complemento: '',
				bairro: '',
				cidade: '',
				estado: ''
			},
			password: '',
			password2: '',
			step: 1
		}
	},
	methods: {
		async pesquisarCep() {
			this.cepLoading = true
			let r = await this.buscarCep(this.cliente.cep)
			if (r) {
				this.cliente.endereco = r.logradouro
				this.cliente.bairro = r.bairro
				this.cliente.cidade = r.localidade
				this.cliente.estado = r.uf
				this.$refs.endereco_numero.focus()
			}
			this.cepLoading = false
		},
		onReset() {
			if (this.step === 1) this.$router.push('/login')
			else this.step = 1
		},
		async onSubmit() {
			this.$q.loading.show()
			if (this.step === 1) {
				var response = await this.executeMethod({ url: 'api/Clientes/cadastro', method: 'post', data: this.cliente })
				if (response.status === 200) this.step = 2
				else this.$q.notify({ message: 'Email já foi utilizado antes, por favor escolha outro.', type: 'negative' })
			} else {
				let d = { ...this.cliente }
				d.password = this.password
				var response = await this.executeMethod({ url: 'api/Clientes/cadastro', method: 'post', data: d })
				if (response.status === 200) {
					await this.$store.dispatch('limparStore')
					response = await this.executeMethod({ url: 'auth/login', method: 'post', data: { email: this.cliente.email, password: this.password } })
					if (response) {
						if (response.status === 200) {
							await this.$store.commit('setDados', { key: 'login', value: response.data.login })
							await this.$store.commit('setDados', { key: 'usuario', value: response.data.usuario })
							this.$router.push('/')
						} else this.$q.notify({ message: 'Email já foi utilizado antes, por favor escolha outro.', type: 'negative' })
					}
				} else this.responseError(response)
			}
			this.$q.loading.hide()
		}
	}
}
</script>
